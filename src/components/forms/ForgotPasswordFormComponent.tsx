import {FC, useEffect, useState} from 'react';
import {
    Box,
    Grid,
    TextField,
} from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import {ForgotPasswordForm} from "@/atoms/studentAppUsersAtom";
import useStudentAppUser from "@/hooks/useStudentAppUser";
import {LoadingButton} from "@mui/lab";

const ForgotPasswordFormComponent: FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordForm>();

    const boxPadding = 2;
    const itemSpacingXs = 12;
    const itemSpacingMd = 12;

    const {
        forgotPassword,
    } = useStudentAppUser();

    const [loading, setLoading] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);

    useEffect(() => {

    }, [])

    const onSubmit = async (data: ForgotPasswordForm) => {
        setLoading(true);
        if (data){
            try {
                await forgotPassword(data.email);
            } catch (e) {
                console.error(e);
            }
        } else{
            alert("Please enter a valid UTT email address!")
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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


                {/*<Divider />*/}

            </Grid>
            <Grid container spacing={2} justifyContent="space-between"> {/* Container for buttons */}
                <Grid item xs={3}>
                    <Box p={boxPadding}>
                        <LoadingButton variant={'outlined'} color={'primary'} loading={loading} type="submit">Forgot Password</LoadingButton>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default ForgotPasswordFormComponent;
