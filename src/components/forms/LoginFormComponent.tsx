import {FC, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Grid,
    OutlinedInput, Snackbar, SnackbarContent,
    TextField, Typography
} from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import router, { useRouter } from 'next/router';
import {LoadingButton} from '@mui/lab';
import {LoginForm, RegistrationForm} from "@/atoms/studentAppUsersAtom";
import useStudentAppUser from "@/hooks/useStudentAppUser";

const LoginFormComponent: FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    const boxPadding = 2;
    const itemSpacingXs = 12;
    const itemSpacingMd = 12;

    const {
        appUser,
        appUserLoading,
        appUserSubmitMsg,
        loginUsingStudentEmail,
    } = useStudentAppUser();

    const [loading, setLoading] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);

    useEffect(() => {

    }, [])

    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        try {
            await loginUsingStudentEmail(data);
            setShowToast(true)
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const handleToastClose = () => {
        setShowToast(false); // Hide the toast notification
    };

    const handleBackButtonClick = () => {
        router.back(); // Navigate back
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    message={appUserSubmitMsg} // Message to be displayed in the toast
                />
            </Snackbar>
            <Grid
                container
                direction="column"
                spacing={2}
            >
                {/* Email Field */}
                <Grid item>
                    <Box p={boxPadding}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^([a-zA-Z]+)\.([a-zA-Z]+)(\d{3})@we\.utt\.edu\.tt$/,
                                    message: "Invalid UTT email address format"
                                }
                            }}
                            render={({ field }) => (
                                <TextField
                                    required
                                    type="email"
                                    label="Email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    {...field}
                                    disabled={loading}
                                />
                            )}
                        />
                    </Box>
                </Grid>

                <Grid item>
                    <Box p={boxPadding}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue={""}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long",
                                },
                                // Add more rules as needed
                            }}
                            render={({ field }) => (
                                <TextField
                                    required
                                    type="password" // Set type as password
                                    label="Password"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    {...field}
                                    disabled={loading}
                                />
                            )}
                        />
                    </Box>
                </Grid>

                {/*<Divider />*/}

            </Grid>
            <Grid container spacing={2} justifyContent="space-between"> {/* Container for buttons */}
                <Grid item xs={2}> {/* Grid item for Back button */}
                    <Box p={boxPadding}>
                        <Button fullWidth variant="outlined" color="primary" onClick={handleBackButtonClick}>Back</Button> {/* Back Button */}
                    </Box>
                </Grid>
            <Grid item xs={3}>
                <Box p={boxPadding}>
                    <LoadingButton variant={'outlined'} color={'primary'} loading={loading} type="submit">Log In</LoadingButton>
                </Box>
            </Grid>
            </Grid>
        </form>
    );
};

export default LoginFormComponent;
