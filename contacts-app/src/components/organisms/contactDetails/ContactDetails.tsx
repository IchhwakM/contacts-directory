import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import { ContactForm } from 'components/molecules/contactForm/ContactForm';
import { ContactInfo } from 'components/molecules/contactInfo/ContactInfo';
import { Contact, contactDetailsStore } from 'store/contactDetailsStore';

export const ContactDetails = () => {
  const contact = contactDetailsStore((state) => state.activeContact);
  const isNew = contactDetailsStore((state) => state.isNew);
  const setIsNew = contactDetailsStore((state) => state.setIsNew);
  const setIsEdit = contactDetailsStore((state) => state.setIsEdit);

  const handleAdd = () => {
    setIsNew(true);
    setIsEdit(true);
  };

  if (!contact && !isNew) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        gap={2}
        height='calc(100vh - 88px)'
      >
        <Typography variant='h1'>Welcome!</Typography>
        <Typography variant='h6'>Start with adding contact!</Typography>
        <Button variant='contained' onClick={handleAdd}>
          Add contact
        </Button>
      </Box>
    );
  }

  return (
    <>
      {contact && !isNew ? <ContactInfo contact={contact as Contact} /> : null}
      <ContactForm contact={contact as Contact} />
    </>
  );
};
