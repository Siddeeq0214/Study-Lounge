import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import {Container, Typography, Paper, Box, CardMedia, CircularProgress} from '@mui/material';
import Footer from '@/components/Footer';
import MeetingTypeList from '@/components/StudyroomComp/MeetingTypeList'; // Importing MeetingTypeList

const Studyroom = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const time = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(currentTime);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <SidebarLayout>
                <Container maxWidth="xl" style={{ position: 'relative', textAlign: 'center', marginTop: '20px' }}>
                    <Box
                        component="div"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'white',
                            zIndex: 1,
                        }}
                    >
                        <Typography variant="subtitle1" style={{ fontSize: '1.2rem' }}>
                            
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                            <Typography variant="h4" className="font-extrabold xl:text-7xl" style={{ fontSize: '1.5rem' }}>{time}</Typography>
                            <Typography variant="body1" className="font-medium text-sky-1 xl:text-2xl" style={{ fontSize: '1.5rem' }}>{date}</Typography>
                        </div>
                    </Box>
                    <CardMedia
                        component="img"
                        height="200"
                        image="/images/study-room/banner-3.png"
                        alt="background"
                    />
                </Container>
                <Container maxWidth="xl" style={{ textAlign: 'center', marginTop: '50px' }}>
                    <MeetingTypeList />
                </Container>
                <Footer />
            </SidebarLayout>
        </>
    );
};



export default Studyroom;
