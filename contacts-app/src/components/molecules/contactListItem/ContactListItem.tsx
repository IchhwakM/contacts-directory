import {
  Box,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import React, { FC } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { Avatar } from 'components/atoms/avatar/Avatar';
import { usePutContact } from 'hooks/usePutContact';
import { Contact, contactDetailsStore } from 'store/contactDetailsStore';
import { getInitials, getFullName } from 'utils/utils';

type Props = {
  contact: Contact;
};

export const ContactListItem: FC<Props> = ({ contact }) => {
  const contacts = contactDetailsStore((state) => state.contacts);
  const setContact = contactDetailsStore((state) => state.setContact);
  const setIsNew = contactDetailsStore((state) => state.setIsNew);
  const setIsEdit = contactDetailsStore((state) => state.setIsEdit);
  const setActiveContact = contactDetailsStore(
    (state) => state.setActiveContact
  );

  const { mutateAsync: updateContact } = usePutContact();

  const handleClick = (contact: Contact) => {
    setActiveContact(contact);
    setIsNew(false);
    setIsEdit(false);
  };

  const handleFav = async (favContact: Contact) => {
    const updatedContact = contacts.map((contact) =>
      contact.Id === favContact.Id
        ? { ...contact, IsFav: !contact.IsFav }
        : contact
    );

    const editedContact = updatedContact.find(
      (contact: Contact) => contact.Id === favContact.Id
    );
    try {
      await updateContact(editedContact as Contact);
      setActiveContact(editedContact as Contact);
      setContact({ ...favContact, IsFav: !favContact.IsFav });
    } catch (error) {
      alert('Failed to save the contact!');
    }
  };

  return (
    <Box key={contact.Id}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleClick(contact)}>
          <ListItemAvatar>
            <Avatar
              src={contact.Avatar!}
              size={50}
              initials={getInitials(contact.FirstName!, contact.LastName!)}
            />
          </ListItemAvatar>
          <ListItemText
            primary={getFullName(
              contact.FirstName!,
              contact.MiddleName!,
              contact.LastName!
            )}
            secondary={
              <Box component='span' display='flex' flexDirection='column'>
                <Typography component='span' variant='body2'>
                  {contact.Email}
                </Typography>
                <Typography component='span' variant='body2'>
                  {contact.Phone}
                </Typography>
              </Box>
            }
          />
        </ListItemButton>
        <IconButton onClick={() => handleFav(contact)}>
          {contact.IsFav ? (
            <StarIcon fontSize='small' sx={{ color: 'gold' }} />
          ) : (
            <StarBorderIcon fontSize='small' />
          )}
        </IconButton>
      </ListItem>
      <Divider />
    </Box>
  );
};
