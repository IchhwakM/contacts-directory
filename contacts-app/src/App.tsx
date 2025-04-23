import React, { useEffect } from 'react';
import {
  Box,
  CircularProgress,
  CssBaseline,
  Toolbar
} from '@mui/material';

import { useGetAllContacts } from 'hooks/useGetAllContacts';
import { Contact, contactDetailsStore } from 'store/contactDetailsStore';
import { ContactDetails } from 'components/organisms/contactDetails/ContactDetails';
import { ContactList } from 'components/organisms/contactList/ContactList';
import { Header } from 'components/organisms/header/Header';

const App = () => {
  const { data, isLoading } = useGetAllContacts();

  const contacts = contactDetailsStore((state) => state.filteredContacts);
  const setContacts = contactDetailsStore((state) => state.setContacts);
  const setActiveContact = contactDetailsStore(
    (state) => state.setActiveContact
  );

  useEffect(() => {
    if (!isLoading && data) {
      setContacts(data as Contact[]);
      setActiveContact(data[0]);
    }
  }, [data, isLoading, setActiveContact, setContacts]);

  if (isLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
        width='100vw'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display='flex'>
      <CssBaseline />
      <Header />
        <ContactList contacts={contacts} />
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3 }}
        height='calc(100vh - 88px)'
      >
        <Toolbar />
        <ContactDetails />
      </Box>
    </Box>
  );
};

export default App;
