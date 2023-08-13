import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Header from './Header';
import {useTranslation} from 'react-i18next';
import {Form} from 'react-router-dom';
import Button from '@mui/material/Button';
import ApiResponse from './ApiResponse';

const ForgotPassword = () => {
  const {t} = useTranslation();

  return (
    <>
      <Header/>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='60vh'
      >
        <Form method='post'>
          <Grid container>
            <ApiResponse/>
            <Grid xs={12}>
              <legend>{t('forgot.password')}</legend>
            </Grid>
            <Grid xs={12}>
              {t('forgot.password.info')}
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
              <Button type='submit' variant='contained'>{t('send')}</Button>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  )
}

export default ForgotPassword;
