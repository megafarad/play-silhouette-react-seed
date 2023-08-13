import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Header from './Header';
import {useTranslation} from 'react-i18next';
import {Form} from 'react-router-dom';
import {useSelector} from 'react-redux';

const TOTPRecovery = () => {
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
            <Grid xs={12}>
              {t('sign.in.totp.recovery')}
            </Grid>
            <Grid xs={12}>
              <TextField
                id='recoveryCode'
                name='recoveryCode'
                type='number'
                label={t('totp.recovery.code')}
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
              <Button type='submit' variant='contained'>{t('totp.verify')}</Button>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default TOTPRecovery;
