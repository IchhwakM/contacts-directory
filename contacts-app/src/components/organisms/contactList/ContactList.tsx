import React, { FC } from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Box, Typography } from '@mui/material';

import { Contact } from 'store/contactDetailsStore';
import { ContactListItem } from 'components/molecules/contactListItem/ContactListItem';
import { ContactControl } from 'components/molecules/contactControl/ContactControl';

type Props = {
  contacts: Contact[];
};

export const ContactList: FC<Props> = ({ contacts }) => {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: '25vw',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: '25vw', boxSizing: 'border-box' }
      }}
    >
      <Toolbar />
      <ContactControl />
      <Divider />
      {contacts && !contacts.length ? (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          height='calc(100vh - 104px)'
        >
          <Typography variant='h6'>No contacts to displace!</Typography>
        </Box>
      ) : (
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {contacts.map((contact) => (
              <ContactListItem key={contact.Id} contact={contact} />
            ))}
          </List>
        </Box>
      )}
    </Drawer>
  );
};
