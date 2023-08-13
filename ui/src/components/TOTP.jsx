import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Header from './Header';
import {useTranslation} from 'react-i18next';
import {Form, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import SignInError from "./SignInError";

const TOTP = () => {
  const {t} = useTranslation();

  const totpChallenge = useSelector((state) => state.user.totpChallenge);

  return (
    <>
      <Header/>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Form method='post'>
          <Grid container>
            <SignInError/>
            <Grid xs={12}>
              {t('sign.in.totp')}
            </Grid>
            <Grid xs={12}>
              <TextField
                id='verificationCode'
                name='verificationCode'
                type='number'
                label={t('totp.verification.code')}
                variant='standard'
              />
              <TextField
                id='userID'
                name='userID'
                type='hidden'
                variant='standard'
                value={totpChallenge.userID}
              />
              <TextField
                id='sharedKey'
                name='sharedKey'
                type='hidden'
                variant='standard'
                value={totpChallenge.sharedKey}
              />
              <TextField
                id='rememberMe'
                name='rememberMe'
                type='hidden'
                variant='standard'
                value={totpChallenge.rememberMe}
              />
            </Grid>
            <Grid xs={12}>
              {t('totp.open.the.app.for.2fa')}
            </Grid>
            <Grid xs={12}>
              <Button type='submit' variant='contained'>{t('totp.verify')}</Button>
            </Grid>
            <Grid xs={12}>
              {t('totp.dont.have.your.phone')}
            </Grid>
            <Grid xs={12}>
              <Link to='/totpRecovery'>
                <Button variant='contained'>{t('totp.use.recovery.code')}</Button>
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default TOTP;
