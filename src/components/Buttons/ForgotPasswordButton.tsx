import React, {FC} from 'react';
import Button from '@mui/material/Button';
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import useStudentAppUser from "@/hooks/useStudentAppUser";

interface ForgotPasswordButtonProps {
    email: string;
}

const ForgotPasswordButton: FC<ForgotPasswordButtonProps> = ({ email }) => {

    const {
        forgotPassword,
    } = useStudentAppUser();

    const onSubmit = async () => {
        try {
            await forgotPassword(email);
            // setShowToast(true);
        } catch (e) {
            console.error("Error sending password reset email:", e);
        }
    };

    return (
        <Button
            variant="text"
            startIcon={<EditTwoToneIcon />}
            onClick={onSubmit}
        >
            Send Reset Email
        </Button>
    );
};

export default ForgotPasswordButton;
