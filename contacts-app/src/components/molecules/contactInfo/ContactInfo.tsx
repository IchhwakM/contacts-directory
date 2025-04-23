import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { Contact } from 'store/contactDetailsStore';
import { getFullName, getInitials } from 'utils/utils';
import { Avatar } from 'components/atoms/avatar/Avatar';

type Props = {
  contact: Contact;
};

export const ContactInfo: FC<Props> = ({ contact }) => {
  const {
    Avatar: contactAvatar,
    Email,
    FirstName,
    MiddleName,
    LastName,
    Phone,
    IsFav
  } = contact;

  return (
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      pb='8px'
      gap={2}
    >
      <Box position='relative'>
        <Avatar
          src={contactAvatar || ''}
          size={80}
          initials={getInitials(FirstName || '', LastName || '')}
        />
        {IsFav ? (
          <Box position='absolute' top='0' right='-8px'>
            <StarIcon fontSize='large' sx={{ color: 'gold' }} />
          </Box>
        ) : null}
      </Box>

      <Box>
        <Typography variant='h4'>
          {getFullName(FirstName || '', MiddleName || '', LastName || '')}
        </Typography>
        <Box display='flex' flexDirection='row' gap={1}>
          <Typography variant='body2'>{Email}</Typography>
          <Typography variant='body2'>
            <b>•</b>
          </Typography>
          <Typography variant='body2'>{Phone}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
