import React, { FC, useEffect } from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Contact, contactDetailsStore } from 'store/contactDetailsStore';
import { schema } from './contactForm.schema';
import { defaultValues } from './contactForm.defaultValues';
import { useDeleteContact } from 'hooks/useDeleteContact';
import { usePostContact } from 'hooks/usePostContact';
import { usePutContact } from 'hooks/usePutContact';
import { useSnackbar } from 'context/snackbar/useSnackbar';
import { ImageUploader } from '../imageUploader/ImageUploader';

type Props = {
  contact: Contact;
};

export interface FieldChangeEvent {
  target: {
    value: string | null;
  };
}

export const ContactForm: FC<Props> = ({ contact }) => {
  const snackbar = useSnackbar();

  const contacts = contactDetailsStore((state) => state.contacts);
  const isEditOn = contactDetailsStore((state) => state.isEdit);
  const isNew = contactDetailsStore((state) => state.isNew);
  const setIsNew = contactDetailsStore((state) => state.setIsNew);
  const setIsEdit = contactDetailsStore((state) => state.setIsEdit);
  const setContacts = contactDetailsStore((state) => state.setContacts);
  const setActiveContact = contactDetailsStore(
    (state) => state.setActiveContact
  );

  const { mutateAsync: deleteContact } = useDeleteContact();
  const { mutateAsync: saveContact } = usePostContact();
  const { mutateAsync: updateContact } = usePutContact();

  const { control, reset, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (isNew) {
      reset(defaultValues);
    } else if (contact) {
      reset(contact);
    }
  }, [contact, isNew, reset]);

  const handleReset = () => {
    if (isNew) {
      reset();
    }
    reset(contact);
    setIsEdit(false);
  };

  const handleSave = handleSubmit(async (formData) => {
    const isExist = contacts.find((c) => c.Id === formData.Id);

    if (isExist) {
      const updatedContact = contacts.map((contact) =>
        contact.Id === formData.Id ? { ...contact, ...formData } : contact
      );

      const editedContact = updatedContact.find(
        (contact: Contact) => contact.Id === formData.Id
      );

      try {
        await updateContact(editedContact as Contact);
        setContacts(updatedContact);
        setActiveContact({ ...contact, ...formData });
        setIsEdit(false);
      } catch (error) {
        snackbar.error('Failed to save the contact!');
      }
    } else {
      const newId = contacts.length
        ? Math.max(...contacts.map((c) => c.Id!)) + 1
        : 1;

      const newContact = {
        ...defaultValues,
        ...formData,
        Id: newId
      };

      try {
        await saveContact(newContact);
        setContacts([newContact, ...contacts]);
        setActiveContact(newContact);
      } catch (error) {
        snackbar.error('Failed to add new contact!');
      } finally {
        setIsNew(false);
        setIsEdit(false);
      }
    }
  });

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleDelete = async (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.Id !== id);

    if (!window.confirm(`Are you sure you want to delete the contact?`)) return;

    try {
      await deleteContact(id);
      setContacts(updatedContacts);
      setActiveContact(updatedContacts[0]);
    } catch (error) {
      snackbar.error(`Failed to delete the contact ${id}`);
    }
  };

  return (
    <Box position='relative'>
      <Typography variant='h6'>Contact information</Typography>
      <Box
        position={'absolute'}
        top={contact && !isNew ? '-65px' : -10}
        right='0'
        display='flex'
        gap={1}
      >
        {isEditOn ? (
          <>
            <Button variant='contained' onClick={handleSave}>
              Save
            </Button>
            {!isNew ? (
              <Button variant='contained' onClick={handleReset}>
                Reset
              </Button>
            ) : null}
          </>
        ) : (
          <>
            <Button variant='contained' onClick={handleEdit}>
              Edit
            </Button>
            <Button
              variant='contained'
              onClick={() => handleDelete(contact.Id!)}
            >
              Delete
            </Button>
          </>
        )}
      </Box>
      <Divider />
      <Box display='flex' gap={4} flexDirection='column'>
        <Box display='flex' gap={4} pt={4}>
          <Controller
            name='Title'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Title'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size='small'
                fullWidth
                disabled={!isEditOn}
              />
            )}
          />
          <Controller
            control={control}
            name='FirstName'
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                label='First Name'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size='small'
                fullWidth
                disabled={!isEditOn}
              />
            )}
          />
          <Controller
            name='MiddleName'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Middle Name'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size='small'
                fullWidth
                disabled={!isEditOn}
              />
            )}
          />
          <Controller
            name='LastName'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Last Name'
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size='small'
                fullWidth
                disabled={!isEditOn}
              />
            )}
          />
        </Box>

        <Box display='flex' gap={4}>
          <Controller
            name='Email'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Email'
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size='small'
                fullWidth
                disabled={!isEditOn}
              />
            )}
          />

          <Controller
            name='Phone'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Phone'
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size='small'
                fullWidth
                disabled={!isEditOn}
              />
            )}
          />

          <Controller
            name='Company'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Company'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size='small'
                fullWidth
                disabled={!isEditOn}
              />
            )}
          />
          <Controller
            name='JobTitle'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Job Title'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size='small'
                fullWidth
                disabled={!isEditOn}
              />
            )}
          />
        </Box>
        <Controller
          name='Address'
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label='Address'
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              size='small'
              fullWidth
              disabled={!isEditOn}
              multiline
              rows={2}
            />
          )}
        />
        {/* <Divider /> */}
      </Box>
      <Box display='flex' gap={4} pt={4}>
        {isEditOn && (
          <Box display='flex' flexDirection='column' gap={4}>
            <Box>

            <Typography variant='h6'>Image</Typography>
            <Divider />
            </Box>
            <Controller
              control={control}
              name='Avatar'
              render={({ field, fieldState }) => (
                <ImageUploader
                  value={field.value}
                  onChange={field.onChange}
                  fieldState={fieldState}
                  isEditOn={isEditOn}
                />
              )}
            />
          </Box>
        )}

        <Box display='flex' flexDirection='column' gap={4} width='100%'>
          <Box>

          <Typography variant='h6'>Notes</Typography>
          <Divider />
          </Box>
          <Controller
            name='Notes'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size='small'
                fullWidth
                disabled={!isEditOn}
                multiline
                rows={7}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};
