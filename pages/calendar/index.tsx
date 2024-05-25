import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import StudentCalendar from "@/content/Calendar/StudentCalendar";

function AppCalendar() {
  return (
    <>
      <Head>
        <title>Calendar</title>
      </Head>
      <Container sx={{mt: -3}} maxWidth={false}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          // alignItems="stretch"
          // spacing={1}
        >
          <Grid item
                xs={12}
                // lg={8}
          >
            {/*<AllEvents />*/}
              <StudentCalendar />
          </Grid>
            {/*not impl cus of the agenda view and create modal*/}
          {/*<Grid item xs={12} lg={4}>*/}
          {/*    /!*<CreateEvent />*!/*/}
          {/*    /!*<ListEvents />*!/*/}
          {/*</Grid>*/}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

AppCalendar.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default AppCalendar;
