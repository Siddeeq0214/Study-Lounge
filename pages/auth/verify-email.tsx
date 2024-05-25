import {
    // Typography,
    Box,
    Card,
    Container,
    Button,
    styled, Avatar, ListItemText, CircularProgress, Grid
} from '@mui/material';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Head from 'next/head';

import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import {auth} from "@/firebase/clientApp";
import {useRouter} from "next/router";
import FullScreenSpinner from '@/components/Spinners/FullScreenSpinner';
import RegisterForm from "@/components/forms/RegisterForm";
import React from "react";
import Logo from "@/components/LogoSign";
import LoginFormComponent from "@/components/forms/LoginFormComponent";
import {sendEmailVerification} from "@firebase/auth";

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

function VerifyEmail() {
    // currently signed-in user
    const [
        currUser,
        authLoading,
        userError
    ] = useAuthState(auth);

    const resendEmailVerification = async () => {
        if (currUser) {
            await sendEmailVerification(currUser);
            alert("Verification email resent. Please check your email.");
        }
    };


    if (authLoading){
        return <FullScreenSpinner />
    }

    // if(currUser){
    //     return <p>Already logged in!</p>
    // }

    return (
        <OverviewWrapper>
            <Head>
                <title>Verify Email</title>
            </Head>
            <HeaderWrapper>
                <Container maxWidth="lg">
                    <Box display="flex" alignItems="center">
                        <Box
                            display="flex"
                            alignItems="start"
                            justifyContent="flex-start"
                            flex={1}
                        >
                            <Logo />
                        </Box>
                        <Box
                            display="flex"
                            alignItems="start"
                            justifyContent="flex-start"
                        >
                            <h1>Please verify your email!</h1>
                        </Box>
                    </Box>
                </Container>
            </HeaderWrapper>
            <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                <Grid
                    spacing={{ xs: 6, md: 10 }}
                    justifyContent="center"
                    alignItems="center"
                    container
                >
                    <Grid item md={10} lg={8} mx="auto">
                        <h2>Email sent to: {currUser.email}</h2>
                        <h2>Verification status: {currUser.emailVerified}</h2>
                        {
                            currUser.emailVerified ? (
                                <h2>Email Successfully Verified! Please log out and log back in</h2>
                            ) : (
                                <h2>Still awaiting verification</h2>
                            )
                        }
                    </Grid>
                    {
                        currUser.emailVerified ? (
                            <></>
                        ) : (
                            <Grid item md={10} lg={8} mx="auto">
                                <Button color="warning" onClick={resendEmailVerification}>
                                    Resend Email Verification
                                </Button>
                            </Grid>
                        )
                    }
                </Grid>
            </Container>

            {/*<Hero />*/}
        </OverviewWrapper>
    );
}

export default VerifyEmail;

VerifyEmail.getLayout = function getLayout(page: ReactElement) {
    return <BaseLayout>{page}</BaseLayout>;
};
