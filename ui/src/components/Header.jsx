import React from 'react';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import DrawerComponent from './DrawerComponent';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
    margin: '5px',
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.user);

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Silhouette React Seed Template
        </Typography>
        {isMobile ? (
          <DrawerComponent user={user} />
        ) : (
          <div className={classes.navlinks}>
            {user ? <Link to="/" className={classes.link}>
              {user.fullName}
            </Link> : null}
            {' '}
            {user && user.loginInfo.providerID === 'credentials' ? <Link to="/password/change" className={classes.link}>
              { t('change.password') }
            </Link> : null }
            {' '}
            {user ? <Link to="/signOut" className={classes.link}>
              { t('sign.out') }
            </Link> : null }
            {' '}
            {!user ? <>
              <Link to="/signIn" className={classes.link}>
                { t('sign.in') }
              </Link>
              {' '}
              <Link to="/signUp" className={classes.link}>
                { t('sign.up') }
              </Link>
            </> : null}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
