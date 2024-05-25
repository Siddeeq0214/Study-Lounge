import PropTypes, { any } from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';

import {User} from "@firebase/auth";
import { LoadingButton } from '@mui/lab';
import React from 'react';
import FullScreenSpinner from '@/components/Spinners/FullScreenSpinner';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

type ProfileCoverProps = {
  user?: User | null;
};

const ProfileCover : React.FC<ProfileCoverProps> = ({ user }) => {
  if (user == null){
    return <FullScreenSpinner path={"Authenticating User..."} />
  }

  return (
    <>
      {/*<Box display="flex" mb={3}>*/}
      {/*  <Box>*/}
      {/*    <Typography variant="h3" component="h3" gutterBottom>*/}
      {/*      Profile for {user.displayName}*/}
      {/*    </Typography>*/}
      {/*  </Box>*/}
      {/*</Box>*/}
      <CardCover>
        <CardMedia image={'/images/profile/banner.jpg'} />
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.displayName} src={user.photoURL} />
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.displayName}
        </Typography>
      </Box>
    </>
  );
};

export default ProfileCover;
