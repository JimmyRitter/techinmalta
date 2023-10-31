"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const SignedOffMenu = () => {
  const router = useRouter();

  return (
    <>
      <Button
        color="inherit"
        onClick={() => router.push("/signin")}
      >
        Sign In
      </Button>
    </>
  );
};
