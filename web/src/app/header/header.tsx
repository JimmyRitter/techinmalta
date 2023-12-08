"use client";
import { useAuthContext } from "@/context/AuthContext";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { SignedInMenu, SignedOffMenu } from "./index";

interface HeaderProps {
  // Define your component's props and their types here, if needed.
}

const Header: React.FC<HeaderProps> = () => {
  const { user }: any = useAuthContext();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          <Link
            href="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            Tech in Malta
          </Link>
        </Typography>
        <Typography>
          user: {user?.displayName || "not logged in"}
        </Typography>
        {user ? <SignedInMenu /> : null}
        {!user ? <SignedOffMenu /> : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header;