import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import Footer from '@/components/Footer';

import {Grid, Container, CardMedia, Card, Typography} from '@mui/material';
import Image from "next/image";
import React from "react";
import {styled} from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import {ExpandMore} from "@mui/icons-material";
import AccordionDetails from "@mui/material/AccordionDetails";

function InstallPage() {
    return(
        <>
            <Head>
                <title>User Details - Management</title>
            </Head>
            <Container sx={{ mt: 3 }} maxWidth="xl">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={0}
                >
                    <Grid item xs={12} md={8}>
                        <h1>PWA?</h1>
                        <p>PWA can stand for Progressive Web App, which is a website that provides the functionality of an app. 
                            PWAs are built using web platform technologies, but offer a user experience similar to that of a platform-specific app. 
                            PWAs can be found on multiple platforms and devices from a single codebase. 
                            They can be installed on a device, operate offline, and integrate with other apps. 
                            PWAs also allow users to take advantage of both web and native app features.</p>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <h1>How to install?</h1>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Load up the website on your browser of choice (I hope it's Chrome)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Card>
                                    <CardMedia component={"img"} height={"100%"} image={'/images/about/install/install-it.png'} />
                                </Card>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Install option 2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Card>
                                    <CardMedia component={"img"} height={"100%"} image={'/images/about/install/install-it-1.png'} />
                                </Card>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

InstallPage.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default InstallPage;
