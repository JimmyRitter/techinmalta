"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid, Link, Alert, Paper } from "@mui/material";
import signUp from "@/firebase/signup";

function Page() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm, setConfirm] = React.useState("");
    const [error, setError] = React.useState("");

    const router = useRouter();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setError("");

        const { result, error } = await signUp(email, password);

        if (error) {
            displayErrorMessage(error.code);
            return console.error(error);
        }

        return router.push("/profile");
    };

    const displayErrorMessage = (errorCode: string) => {
        switch (errorCode) {
            case "auth/email-already-in-use":
                setError("Email already in use");
                break;
            case "auth/invalid-email":
                setError("Invalid email");
                break;
            case "auth/weak-password":
                setError("Weak password. Password should be at least 6 characters.");
                break;
            default:
                setError("Unknown error");
                break;
        }
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, p:2}}>
                        {error ? <Alert severity="error" onClose={() => setError("")}>{error}</Alert> : null}
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm password"
                            type="password"
                            id="confirmPassword"
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    {"Already have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );

}

export default Page;
