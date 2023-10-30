"use client";
import { useRouter } from 'next/navigation'
import { useAuthContext } from "@/context/AuthContext";
import signOut from "@/firebase/signout";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

interface HeaderProps {
    // Define your component's props and their types here, if needed.
}

const Header: React.FC<HeaderProps> = () => {
    const { user }: any = useAuthContext();
    const router = useRouter()

    const handleLogout = async () => {
        const { error } = await signOut();
        router.push('/');

        if (error) {
            return console.error(error);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
                        Tech in Malta
                    </Link>
                </Typography>
                {user ? <Button color="inherit" onClick={handleLogout}>Logout</Button> : null}
                {!user ? <Button color="inherit" onClick={() => router.push('/signin')}>Sign In</Button> : null}
            </Toolbar>
        </AppBar>
    )
};

export default Header;
