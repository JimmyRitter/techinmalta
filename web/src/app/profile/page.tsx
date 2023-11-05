"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Avatar, Box, Button, Container, Grid, TextField, Typography, Snackbar } from "@mui/material";
import styled from "@emotion/styled";
import { UserProfile, Avatar as AvatarType } from "./profile.types";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getUserProfile } from "@/app/profile/profile.services";


function Page() {
  const { user }: any = useAuthContext();
  const router = useRouter();

  const avatarInitialState: AvatarType = {
    file: undefined,
    url: user?.photoURL || "",
  };

  const [avatar, setAvatar] = React.useState(avatarInitialState);
  const [name, setName] = React.useState(user?.displayName || "");
  const [snackbar, setSnackbar] =
    React.useState({ open: false, message: "" });
  const [userProfile, setUserProfile] =
    React.useState<UserProfile | undefined>(undefined);


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

    getUserProfile(user)
      .then((profile) => {
        setUserProfile(profile);
        console.log(profile);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const handleOnChange = (event: any) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setAvatar((prevState) => {
        return {
          ...prevState,
          file: newImage,
          url: URL.createObjectURL(newImage),
        };
      });
    }
  };

  const handleSubmit = (event: any) => {
    console.log(avatar);
    event.preventDefault();
    const payload: UserProfile = {
      displayName: name,
      summary: userProfile?.summary || "",
      skills: [],
    };

    submitForm(payload);
  };

  const submitForm = async (payload: UserProfile) => {
    const auth = getAuth();

    const fileExtension = avatar.file?.name.split(".").pop();

    const storage = getStorage();
    const storageRef = ref(storage, `/profiles/${user?.email}/profile-picture.${fileExtension}`);

    // update profile picture and name
    uploadBytes(storageRef, avatar.file!)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then(downloadURL => {
        setSnackbar({ open: true, message: "Profile updated" });
        console.log("Download URL", downloadURL);
        return updateProfile(auth.currentUser!, {
          displayName: name,
          photoURL: downloadURL,
          // photoURL: "https://example.com/jane-q-user/profile.jpg",
        });
      }).then(() => {
      setSnackbar({ open: true, message: "Profile updated!" });
    })
      .catch((error) => {
        console.log("error", error);
      });

    const db = getFirestore();

    try {
      const docRef = await setDoc(doc(db, "users", user.email), payload);
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
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
            <BigAvatar src={avatar.url} />
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
                Profile
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
                  value={userProfile?.summary || ""}
                  onChange={(e) => setUserProfile((prevState) => {
                    return {
                      ...prevState,
                      summary: e.target.value || "",
                    } as UserProfile; 
                  })}
                  // onChange={(e) => setUserProfile()}
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        message={snackbar.message}
      />
    </>
  );
}

export default Page;
