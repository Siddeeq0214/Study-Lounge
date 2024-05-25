import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import Footer from '@/components/Footer';

import {Grid, Container, Box} from '@mui/material';
import Link from "next/link";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import Label from "@/components/Label";

function AboutPage() {
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
                        <h1>What is StudyLounge?</h1>
                        <p>
                        Study Lounge is a specialized online platform tailored exclusively for university students, offering a multifaceted approach to support their academic endeavors through an innovative array of features. 
                        At its core, the platform introduces a pioneering study room functionality, empowering students to personalize study sessions according to their unique requirements. 
                        These customizable study spaces allow for specific participant numbers and personalized room names, fostering collaborative learning environments. 
                        Accessible via secure login credentials using individual student IDs and passwords, the website ensures privacy and security while granting seamless access to an assortment of tools. 
                        A central component of Study Lounge is its course-centric section, acting as a shared repository where enrolled students can upload and exchange study materials related to their ongoing courses. 
                        Additionally, the platform incorporates a calendar feature facilitating effective academic schedule management by enabling students to mark essential dates like assignment deadlines and exams. 
                        Complemented by a digital notebook for compiling study notes and a study goals feature embedded within study rooms, students can collectively set and monitor their academic objectives. 
                        The platform further encourages interaction through a built-in chat room function within study rooms, facilitating real-time discussions and enhancing collaborative learning experiences. 
                        In essence, Study Lounge presents a comprehensive suite of tools aimed at streamlining study sessions, promoting teamwork, fostering knowledge exchange, and ultimately enhancing academic performance within focused and distraction-free spaces.
                        </p>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <h1>Feedback</h1>
                        
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLScYfgV0ukicRKyDFN3tqoqO0vvLlWK38TiGhxcqs_T6gQ0V2w/viewform?usp=pp_url"><h2>Google Form</h2></a>
                        <div className="iframe-container">
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLScYfgV0ukicRKyDFN3tqoqO0vvLlWK38TiGhxcqs_T6gQ0V2w/viewform?usp=pp_url?embedded=true"
                                allowFullScreen
                            >
                                Loading...
                            </iframe>
                        </div>
                    </Grid>

                </Grid>
            </Container>
            <Footer />

            {/* eslint-disable-next-line react/no-unknown-property */}
            <style jsx>{`
    .iframe-container {
      position: relative;
      overflow: hidden;
      padding-top: 65%; /* Adjust the padding ratio to increase the height */
    }

    .iframe-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `}</style>

        </>
    )
}

AboutPage.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default AboutPage;
