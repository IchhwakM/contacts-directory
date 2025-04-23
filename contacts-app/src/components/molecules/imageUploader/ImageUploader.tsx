import React, { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ControllerFieldState } from 'react-hook-form';

import { Contact } from 'store/contactDetailsStore';

type Props = {
  value: Contact['Avatar'];
  onChange: (...event: any[]) => void;
  fieldState: ControllerFieldState;
  isEditOn: boolean;
};

export const ImageUploader: FC<Props> = ({
  value,
  onChange,
  fieldState,
  isEditOn
}) => {
  return (
    <Box display='flex' flexDirection='column'>
      <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
        <Box display='flex'>
          {value ? (
            <Box
              component='span'
              sx={{
                width: 125,
                height: 125,
                p: 0,
                overflow: 'hidden',
                borderRadius: '50%',
                minWidth: 'unset',
                position: 'relative',
                border: '1px solid lightgray'
              }}
            >
              <Box
                component='img'
                src={value}
                alt='Avatar'
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  top: 0,
                  left: 0
                }}
              />
            </Box>
          ) : (
            <Box
              component='span'
              display='flex'
              alignItems='center'
              justifyContent='center'
              sx={{
                width: 125,
                height: 125,
                p: 0,
                overflow: 'hidden',
                borderRadius: '50%',
                border: '1px solid lightgray'
              }}
            >
              Preview
            </Box>
          )}
        </Box>
        <input
          accept='image/*'
          disabled={!isEditOn}
          type='file'
          id='avatar-upload'
          style={{ display: 'none' }}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const toBase64 = (file: File): Promise<string> =>
              new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
              });

            const base64 = await toBase64(file);
            onChange(base64);
          }}
        />
        <label htmlFor='avatar-upload'>
          <Button sx={{ width: '150px' }} variant='outlined' component='span'>
            Upload Avatar
          </Button>
        </label>
      </Box>
      {fieldState.error && (
        <Typography color='error' variant='caption'>
          {fieldState.error.message}
        </Typography>
      )}
    </Box>
  );
};
