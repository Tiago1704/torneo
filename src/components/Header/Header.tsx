import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, signOut } from 'firebase/auth';
import HouseIcon from '@mui/icons-material/House';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { auth } from '../../firebase';

const useStyles = makeStyles({
  navbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '8px',
    backgroundColor: '#ff4081',
  },
  iconButton: {
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#d81b60',
    },
  },
});

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Sesión cerrada');
      navigate('/');
    } catch {
      console.error(`Error al cerrar sesión`);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className={classes.navbar}>
      {props.user ? (
        <>
          <IconButton
            onClick={() => handleNavigation('/')}
            className={classes.iconButton}
            aria-label="Home"
          >
            <HouseIcon />
          </IconButton>
          <IconButton
            onClick={handleLogout}
            className={classes.iconButton}
            aria-label="Logout"
          >
            <LogoutIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            onClick={() => handleNavigation('/register')}
            className={classes.iconButton}
            aria-label="Register"
          >
            <AppRegistrationIcon />
          </IconButton>
          <IconButton
            onClick={() => handleNavigation('/login')}
            className={classes.iconButton}
            aria-label="Login"
          >
            <LoginIcon />
          </IconButton>
        </>
      )}
    </nav>
  );
};

export default Header;
