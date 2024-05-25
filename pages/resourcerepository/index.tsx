import React from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid, Typography, Paper } from '@mui/material';
import Footer from '@/components/Footer';
import ResourceUploadForm from '@/content/ResourceRepo/UploadForm'; // Import the updated ResourceUploadForm component
import ResourceList from '@/content/ResourceRepo/ResourceList'; // Import the updated ResourceList component
import useResourceManagement from '@/hooks/useResources'; // Import the updated useResourceManagement hook

const ResourceRepositoryPage: React.FC = () => {
  // Initialize the useResourceManagement hook
  const { resourceLoading } = useResourceManagement();

  return (
    <>
      <Head>
        <title>Resources</title>
      </Head>
      <SidebarLayout>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h1" gutterBottom>
                
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '8px' }}>
                <ResourceUploadForm /> {/* Render the updated ResourceUploadForm component */}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '8px' }}>
                <ResourceList /> {/* Render the updated ResourceList component */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </SidebarLayout>
    </>
  );
};

export default ResourceRepositoryPage;