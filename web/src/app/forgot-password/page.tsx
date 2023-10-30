"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid, Link, Alert } from "@mui/material";
import signUp from "@/firebase/signup";
import forgotPassword from "@/firebase/forgotPassword";

function Page() {
    const [email, setEmail] = React.useState("");
    const [complete, setComplete] = React.useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setComplete(true);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password?
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    {complete ? <Alert severity="info" onClose={() => setComplete(false)}>
                        If an account with that email exists, a password reset link will be sent to that email.
                    </Alert> : null}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!email}
                    >
                        Reset password
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Remembered your account details? Click here to sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );

}

export default Page;
