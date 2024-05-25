import {
    Box,
    Card,
    Container,
    Button,
    styled, ListItemText,
} from '@mui/material';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Link from 'src/components/Link';
import Head from 'next/head';

import Hero from 'src/content/Overview/Hero';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase/clientApp";
import {signOut} from "@firebase/auth";
import {useRouter} from "next/router";
import FullScreenSpinner from '@/components/Spinners/FullScreenSpinner';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
    // currently signed in user
    const [
        currUser,
        authLoading,
        userError
    ] = useAuthState(auth);

    // next router to redirect us to the dashboard on successful signin
    const router = useRouter();

    const signOutAndRedirect = async () => {
        try {
            await signOut(auth);
            await router.push('/');
        } catch (e) {
            console.log(e)
        }
    };

    if (authLoading){
        return <FullScreenSpinner />
    }

    return (
      <OverviewWrapper>
          <Head>
              <title>Study-Lounge</title>
          </Head>
          <HeaderWrapper>
              <Container maxWidth="lg">
                  <Box display="flex" alignItems="center">
                      {/*<Logo />*/}
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        flex={1}
                      >
                          <Box />
                          {
                              currUser ? (
                                <Box>
                                    <Button
                                      component={Link}
                                      href="/"
                                      variant="contained"
                                      sx={{ ml: 2 }}
                                      onClick={async () => await signOutAndRedirect()}
                                      // isLoading={loading}
                                    >
                                        <ListItemText
                                          primaryTypographyProps={{
                                              variant: 'h5',
                                          }}
                                          primary="Log Out"
                                        />
                                    </Button>
                                </Box>
                              ) : (
                                  <>
                                      {/*<LoginButton />*/}
                                      {/*<RegisterButton />*/}
                                  </>
                              )
                          }
                      </Box>
                  </Box>
              </Container>
          </HeaderWrapper>
          <Hero />
          {/*<Container maxWidth="lg" sx={{ mt: 8 }}>*/}
          {/*  <Typography textAlign="center" variant="subtitle1">*/}
          {/*    Crafted by{' '}*/}
          {/*    <Link*/}
          {/*      href="https://bloomui.com"*/}
          {/*      target="_blank"*/}
          {/*      rel="noopener noreferrer"*/}
          {/*    >*/}
          {/*      BloomUI.com*/}
          {/*    </Link>*/}
          {/*  </Typography>*/}
          {/*</Container>*/}
      </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
    return <BaseLayout>{page}</BaseLayout>;
};
