"use client";
import React, { createRef } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { UserProfile } from "./profile.types";
import { ProfileService } from "@/services/Profile";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function Page() {
  const { user }: any = useAuthContext();
  const router = useRouter();

  const [avatar, setAvatar] = React.useState(user?.profileUrl || "");
  const [name, setName] = React.useState(user?.profileUrl || "");
  const [summary, setSummary] = React.useState(user?.profileUrl || "");

  const BigAvatar = styled(Avatar)`
    width: 150px;
    height: 150px;
    border: 1px solid grey;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  `;

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  React.useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        const result = await ProfileService.getProfile();
        const { data } = result;
        setName(data.displayName);
        // setAvatar(data.profileUrl);
        // console.log(result);
        // const { currentUser } = user.auth;
        // const token = currentUser && (await currentUser.getIdToken());

        // const payloadHeader = {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //   },
        // };
        // const res = await fetch("http://localhost:3001/profile", payloadHeader);
        // console.log(await res.text());
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const handleOnChange = (event: any) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setAvatar(URL.createObjectURL(newImage));
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const payload: UserProfile = {
      displayName: name,
    };
    submitForm(payload);
  };

  const submitForm = async (payload: UserProfile) => {
    console.log("payload", payload);
    const result = await ProfileService.updateProfile(payload);
    // const resultx = await ProfileService.getProfile();

    // Create a root reference
    const storage = getStorage();
    const storageRef = ref(storage, "/profiles");

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, avatar)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <Container>
      <h1>Profile</h1>

      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={4}
        >
          <BigAvatar src={avatar} />
          <Button
            sx={{ mt: "20px" }}
            component="label"
            variant="contained"
          >
            Change profile picture
            <VisuallyHiddenInput
              type="file"
              onChange={handleOnChange}
            />
          </Button>
        </Grid>
        {/* Right Column (2/3 of the size) */}
        <Grid
          item
          xs={8}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1, p: 2 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <TextField
                margin="normal"
                fullWidth
                name="email"
                label="Email"
                type="text"
                id="email"
                disabled
                value={user?.auth.currentUser?.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="summary"
                label="Summary"
                type="text"
                id="summary"
                onChange={(e) => setSummary(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Page;
