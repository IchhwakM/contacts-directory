import React, { FC } from "react";
import { Avatar as MuiAvatar } from '@mui/material';

interface Props {
  src?: string;
  initials?: string;
  size?: number;
}

export const Avatar: FC<Props> = ({ src, size = 36, initials }) => {

  return (
    <MuiAvatar
      src={src}
      sx={{
        width: size,
        height: size,
      }}>
        {initials}
    </MuiAvatar>
  );
};
