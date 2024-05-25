import {FC, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Divider,
    Grid,
    InputAdornment, MenuItem,
    OutlinedInput, Select, Snackbar, SnackbarContent,
    TextField, Typography
} from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useRouter } from 'next/router';
import { DateTimePicker, LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { RegistrationForm } from "@/atoms/studentAppUsersAtom";
import useStudentAppUser from "@/hooks/useStudentAppUser";

const RegisterForm: FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues
    } = useForm<RegistrationForm>();

    const boxPadding = 2;
    const router = useRouter();

    const {
        appUser,
        appUserLoading,
        appUserSubmitMsg,
        registerUser,
    } = useStudentAppUser();

    const [loading, setLoading] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);

    const emailValid = watch("email")?.match(/^[a-zA-Z]+\.([a-zA-Z]+)(\d{3})@we\.utt\.edu\.tt$/) != null;

    const onSubmit = async (data: RegistrationForm) => {
        setLoading(true);
        try {
            const res = await registerUser(data);
            setShowToast(true);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const handleToastClose = () => {
        setShowToast(false);
    };

    const handleBackButtonClick = () => {
        router.back(); // Navigate back
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Snackbar
                open={showToast}
                autoHideDuration={3000}
                onClose={handleToastClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <SnackbarContent
                    sx={{ backgroundColor: '#E1BEE7', paddingTop: 10 }}
                    message={appUserSubmitMsg}
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
                                    onChange={(e) => {
                                        field.onChange(e);
                                        const matches = e.target.value.match(/^([a-zA-Z]+)\.([a-zA-Z]+)(\d{3})@we\.utt\.edu\.tt$/);
                                        if (matches) {
                                            setValue('firstName', matches[1]); // First name is the first group
                                            setValue('lastName', matches[2]); // Last name is the second group
                                            // setValue('studentId', `00${matches[3]}`); // Prepend "00" to the last three digits for the student ID
                                            setValue('studentId', `${matches[3]}` as any); // Prepend "00" to the last three digits for the student ID
                                        }
                                    }}
                                />
                            )}
                        />
                    </Box>
                </Grid>

                <Grid item>
                    <Box p={boxPadding}>
                        <Controller
                            name="studentId"
                            control={control}
                            // defaultValue=""
                            rules={{
                                required: "Student ID is required",
                                validate: {
                                    isFiveDigits: value => /^\d{5}$/.test(value as any) || "Student ID must be 5 digits",
                                    matchesEmail: (value)  => {
                                        const val = value as any
                                        const email = watch("email");
                                        const matches = email.match(/^([a-zA-Z]+)\.([a-zA-Z]+)(\d{3})@we\.utt\.edu\.tt$/);
                                        return matches && val.endsWith(matches[3]) || "Last 3 digits must match those in the email";
                                        // return matches && value !== `00${matches[3]}` || "Student ID format is incorrect";
                                    }
                                }
                            }}
                            render={({ field, fieldState }) => (
                                <OutlinedInput
                                    type="number"
                                    label="UTT Student ID Number"
                                    error={!!fieldState.error}
                                    // helperText={fieldState.error?.message}
                                    {...field}
                                    disabled={!emailValid || loading}
                                />
                            )}
                        />
                    </Box>
                </Grid>


                <Grid item>
                    <Box p={boxPadding}>
                        <Controller
                            name="dob"
                            control={control}
                            defaultValue={new Date()}
                            rules={{
                                required: "Date of birth is required",
                            }}
                            render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        {...field}
                                        label="Date of Birth"
                                        value={field.value ? new Date(field.value) : null}
                                        onChange={(date) => field.onChange(date?.toISOString() || null)}
                                        disabled={loading}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                type="text"
                                                error={!!errors.dob}
                                                helperText={errors.dob?.message || ''}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Box>
                </Grid>


                {/* First Name Field */}
                <Grid item>
                    <Box p={boxPadding}>
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "First Name is required",
                            }}
                            render={({ field }) => (
                                <TextField
                                    required
                                    label="First Name"
                                    error={!!errors.firstName}
                                    {...field}
                                    disabled={!emailValid || loading}
                                />
                            )}
                        />
                    </Box>
                </Grid>

                {/* Last Name Field */}
                <Grid item>
                    <Box p={boxPadding}>
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Last Name is required",
                            }}
                            render={({ field }) => (
                                <TextField
                                    required
                                    label="Last Name"
                                    error={!!errors.lastName}
                                    {...field}
                                    disabled={!emailValid || loading}
                                />
                            )}
                        />
                    </Box>
                </Grid>

                {/* Password Field */}
                <Grid item>
                    <Box p={boxPadding}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    required
                                    type="password"
                                    label="Password"
                                    error={!!errors.password}
                                    {...field}
                                    disabled={!emailValid || loading}
                                />
                            )}
                        />
                    </Box>
                </Grid>

                {/* Confirm Password Field */}
                <Grid item>
                    <Box p={boxPadding}>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Confirm Password is required",
                                validate: value =>
                                    value === getValues("password") || "Passwords do not match",
                            }}
                            render={({ field }) => (
                                <TextField
                                    required
                                    type="password"
                                    label="Confirm Password"
                                    error={!!errors.confirmPassword}
                                    {...field}
                                    disabled={!emailValid || loading}
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
            <Grid item xs={2}>
                <Box p={boxPadding}>
                    <LoadingButton variant={'outlined'} color={'primary'} loading={loading} type="submit">Submit</LoadingButton>
                </Box>
            </Grid>
            </Grid>
        </form>
    );
};

export default RegisterForm;
