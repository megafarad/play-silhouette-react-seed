import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Header from './Header';
import { useTranslation } from 'react-i18next';
import {Link, Outlet, useLoaderData} from 'react-router-dom';
import Button from '@mui/material/Button';
import ApiResponse from './ApiResponse';

const Home = () => {

  const { t } = useTranslation();
  const getUserResponse = useLoaderData();

  const user = getUserResponse.user;
  const totpInfo = getUserResponse.totpInfo;

  return (
    <>
      <Header/>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Grid container spacing={2}>
          <ApiResponse/>
          <Grid md={8}>
            { t('welcome.signed.in') }
          </Grid>
          <Grid md={4}>
            <img src={user.avatarURL} alt={user.fullName + ' picture'}/>
          </Grid>
          <Divider />
          <Grid sm={12}>
            <strong>{t('first.name')}</strong>:
            {user.firstName ? user.firstName : 'None'}
          </Grid>
          <Grid sm={12}>
            <strong>{t('last.name')}</strong>:
            {user.lastName ? user.lastName : 'None'}
          </Grid>
          <Grid sm={12}>
            <strong>{t('full.name')}</strong>:
            {user.fullName ? user.fullName : 'None'}
          </Grid>
          <Grid sm={12}>
            <strong>{t('email')}</strong>:
            {user.email ? user.email : 'None'}
          </Grid>
          {totpInfo ? <Grid sm={12}>
            <h2>{t('totp.enabled.title')}</h2>
            <Link to='/disableTOTP'>
              <Button>{t('totp.disable')}</Button>
            </Link>
          </Grid> : <>
            <Link to='totpSetup'>
              <Button>{t('totp.enable')}</Button>
            </Link>
          </>}
          <Outlet/>
        </Grid>
      </Box>

    </>
  );
};

export default Home;
