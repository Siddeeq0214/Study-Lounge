import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  Snackbar,
  SnackbarContent
} from '@mui/material';
import Text from '@/components/Text';
import { FC, useState } from "react";
import { User, Auth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { StudentAppUser } from "@/atoms/studentAppUsersAtom";
import AppUtil from "@/AppUtil";
import ForgotPasswordButton from "@/components/Buttons/ForgotPasswordButton";

interface EditProfileTabProps {
  appUser: StudentAppUser;
  authUser: User;
  auth: Auth;
}

const EditProfileTab: FC<EditProfileTabProps> = ({ appUser, authUser, auth }) => {
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleToastClose = () => {
    setShowToast(false); // Hide the toast notification
  };

  return (
      <Grid container spacing={3}>
        <Snackbar
            open={showToast}
            autoHideDuration={3000} // Duration for which the toast should be displayed (in milliseconds)
            onClose={handleToastClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position of the toast notification
        >
          <SnackbarContent
              sx={{
                backgroundColor: '#E1BEE7', // Light purple color
                paddingTop: 10, // Padding top of 4 units
              }}
              message="Password Reset Request Sent!" // Message to be displayed in the toast
          />
        </Snackbar>
        <Grid item xs={6} md={4}>
          <Card>
            <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Reset Password
                </Typography>
              </Box>
              {authUser ? <ForgotPasswordButton email={authUser.email} /> : <></>}
            </Box>
            <Divider />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Account Info
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Created on:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>{AppUtil.printDate(appUser.createdAt as Timestamp)}</b>
                    </Text>
                  </Grid>
                </Grid>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Student ID:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>{appUser.studentId}</b>
                    </Text>
                  </Grid>
                </Grid>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      First Name:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>{appUser.firstName}</b>
                    </Text>
                  </Grid>
                </Grid>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Last Name:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>{appUser.lastName}</b>
                    </Text>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  );
}

export default EditProfileTab;
