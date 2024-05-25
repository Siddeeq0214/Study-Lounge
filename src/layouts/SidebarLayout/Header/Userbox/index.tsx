import React, { useRef, useState } from 'react';

import NextLink from 'next/link';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import {signOut} from "@firebase/auth";
import {auth} from "@/firebase/clientApp";
import { useAuthState } from 'react-firebase-hooks/auth';
import FullScreenSpinner from '@/components/Spinners/FullScreenSpinner';
import {useRouter} from "next/router";
// import { useRecoilState } from 'recoil';
// import { appUserState } from '@/atoms/appUsersAtom';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const router = useRouter();
  // const [appUserStateValue, setAppUserStateValue] = useRecoilState(appUserState);

  const [user, authLoading, userError] = useAuthState(auth);

  if (authLoading){
    return <FullScreenSpinner path={"Authenticating User..."} />
  }

  if (userError){
    return <div>Error: {userError.message}</div>
  }

  // const user = {
  //   name: 'Catherine Pike',
  //   photoURL: '/static/images/avatars/1.jpg',
  //   uid: 'Project Manager'
  // };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const signOutAndRedirect = async () => {
    try {
      await signOut(auth);
      // redirect to dashboard
      // setAppUserStateValue((prev) => ({
      //   ...prev,
      //   user: null
      // }));
      await router.push('/');
    } catch (e) {
      // handle error
      console.log(e)
    }
  };

  if (user){
    return (
      <>
        <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
          <Avatar variant="rounded" alt={user.email} src={user.photoURL} />
          <Hidden mdDown>
            <UserBoxText>
              <UserBoxLabel variant="body1">{user.email}</UserBoxLabel>
              <UserBoxDescription variant="body2">
                {user.displayName}
              </UserBoxDescription>
            </UserBoxText>
          </Hidden>
          <Hidden smDown>
            <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
          </Hidden>
        </UserBoxButton>
        <Popover
          anchorEl={ref.current}
          onClose={handleClose}
          open={isOpen}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuUserBox sx={{ minWidth: 210 }} display="flex">
            <Avatar variant="rounded" alt={user.email} src={user.photoURL} />
            <UserBoxText>
              <UserBoxLabel variant="body1">{user.email}</UserBoxLabel>
              <UserBoxDescription variant="body2">
                {user.displayName}
              </UserBoxDescription>
            </UserBoxText>
          </MenuUserBox>
          <Divider sx={{ mb: 0 }} />
          <List sx={{ p: 1 }} component="nav">
            <NextLink href="/profile" passHref>
              <ListItem onClick={handleClose} button>
                <AccountBoxTwoToneIcon fontSize="small" />
                <ListItemText primary="My Profile" />
              </ListItem>
            </NextLink>
            {/*<NextLink href="/applications/messenger" passHref>*/}
            {/*  <ListItem button>*/}
            {/*    <InboxTwoToneIcon fontSize="small" />*/}
            {/*    <ListItemText primary="Messenger" />*/}
            {/*  </ListItem>*/}
            {/*</NextLink>*/}
            {/*<NextLink href="/profile/settings" passHref>*/}
            {/*  <ListItem button>*/}
            {/*    <AccountTreeTwoToneIcon fontSize="small" />*/}
            {/*    <ListItemText primary="Account Settings" />*/}
            {/*  </ListItem>*/}
            {/*</NextLink>*/}
          </List>
          <Divider />
          <Box sx={{ m: 1 }}>
            <Button
              color="primary"
              fullWidth
              onClick={async () => await signOutAndRedirect()}
            >
              <LockOpenTwoToneIcon sx={{ mr: 1 }} />
              Sign out
            </Button>
          </Box>
        </Popover>
      </>
    );
  } else {
    return <FullScreenSpinner />;
  }

}

export default HeaderUserbox;
