
"use client";
import { useAuthContext } from "@/context/AuthContext";
import signOut from "@/firebase/signout";
import { Avatar, Box, Button, Link } from "@mui/material";
import { useRouter } from "next/navigation";

export const SignedInMenu = () => {
  const { user }: any = useAuthContext();

  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await signOut();
    router.push("/");

    if (error) {
      return console.error(error);
    }
  };

  return (
    <>
      <Box sx={{ display: { xs: 'none', sm: 'block' }, marginRight: "15px" }}>
          <Link sx={{ color: '#fff' }} href={"/profile"}>
            Profile
          </Link>
      </Box>
      <Avatar
        alt={user?.displayName}
        src={user?.profileUrl}
        sx={{ width: 24, height: 24, marginRight: 1 }}
      />
      <Button
        color="inherit"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
};