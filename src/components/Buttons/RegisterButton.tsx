import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {Box, ListItemText} from "@mui/material";
import {useRouter} from "next/router";

const RegisterButton: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Box p={2}>
                <Button
                    // component={Link}
                    // href={""}
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={async () => await router.push('/auth/register')}
                    // isLoading={loading}
                >
                    {/*<Avatar*/}
                    {/*  sx={{ width: 15, height: 15 }}*/}
                    {/*  src="/static/images/logo/"*/}
                    {/*/>*/}
                    <ListItemText
                        style={{paddingLeft: '10px'}}
                        primaryTypographyProps={{
                            variant: 'h5',
                        }}
                        primary="Register"
                    />
                </Button>
            </Box>
        </>
    );
};

export default RegisterButton;
