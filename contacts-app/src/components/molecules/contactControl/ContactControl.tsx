import React, { FC, useEffect, useMemo, useState } from 'react';
import { Box, TextField, Divider, Tooltip, IconButton } from '@mui/material';
import { debounce, orderBy } from 'lodash';
import AddIcon from '@mui/icons-material/Add';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';

import { contactDetailsStore } from 'store/contactDetailsStore';

export const ContactControl: FC = () => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const contacts = contactDetailsStore((state) => state.contacts);
  const setContacts = contactDetailsStore((state) => state.setContacts);
  const setIsNew = contactDetailsStore((state) => state.setIsNew);
  const setIsEdit = contactDetailsStore((state) => state.setIsEdit);
  const searchQuery = contactDetailsStore((state) => state.searchQuery);
  const setSearchQuery = contactDetailsStore((state) => state.setSearchQuery);
  const showOnlyFavorites = contactDetailsStore(
    (state) => state.showOnlyFavorites
  );
  const setShowOnlyFavorites = contactDetailsStore(
    (s) => s.setShowOnlyFavorites
  );
  
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
      }, 300),
    [setSearchQuery]
  );

  useEffect(() => {
    debouncedSetQuery(localQuery);

    return () => {
      debouncedSetQuery.cancel();
    };
  }, [localQuery, debouncedSetQuery]);

  const handleAdd = () => {
    setIsNew(true);
    setIsEdit(true);
  };
  const sortContacts = (key: string) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';

    const sorted = orderBy(contacts, [key], [direction]);
    setContacts(sorted);
    setSortConfig({ key, direction });
  };

  return (
    <Box display='flex' justifyContent='flex-end' alignItems='center'>
      <TextField
        type='text'
        placeholder='Search contacts...'
        size='small'
        fullWidth
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />

      <Divider orientation='vertical' />
      <Tooltip title='Add'>
        <IconButton onClick={handleAdd}>
          <AddIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Divider orientation='vertical' />
      <Tooltip title='Sort'>
        <IconButton onClick={() => sortContacts('FirstName')}>
          <SortByAlphaIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Divider orientation='vertical' />
      <Tooltip title='Filter Favorite'>
        <IconButton onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}>
          <SavedSearchIcon
            fontSize='small'
            sx={{ color: showOnlyFavorites ? 'gold' : '' }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
