import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Header from './Header';
import {useTranslation} from 'react-i18next';
import {Form, useActionData} from 'react-router-dom';
import PasswordStrength from './PasswordStrength';
import ApiResponse from "./ApiResponse";

const SignUp = () => {
  const { t } = useTranslation();

  const signupResponse = useActionData();
  console.log(signupResponse);

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
            <ApiResponse/>
            <Grid xs={12}>
              {t('sign.up.account')}
            </Grid>
            <Grid xs={12}>
              <TextField
                sx={{ m: 1, width: '25ch' }}
                id='firstName'
                name='firstName'
                label={t('first.name')}
                variant='standard'
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                sx={{ m: 1, width: '25ch' }}
                id='lastName'
                name='lastName'
                label={t('last.name')}
                variant='standard'
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                sx={{ m: 1, width: '25ch' }}
                id='email'
                name='email'
                label={t('email')}
                variant='standard'
              />
            </Grid>
            <Grid xs={12}>
              <PasswordStrength id='password' name='password' label={t('password')} />
            </Grid>
          </Grid>
          <Button type='submit' variant='contained'>{t('sign.up')}</Button>
        </Form>
      </Box>
    </>
  );
};

export default SignUp;
