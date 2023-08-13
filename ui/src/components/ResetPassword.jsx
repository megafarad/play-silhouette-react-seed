import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Header from './Header';
import {useTranslation} from 'react-i18next';
import {Form} from 'react-router-dom';
import Button from '@mui/material/Button';
import PasswordStrength from './PasswordStrength';

const ResetPassword = () => {
  const { t} = useTranslation();

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
            <Grid xs={12}>
              {t('reset.password')}
            </Grid>
            <Grid xs={12}>
              <PasswordStrength id='password' name='password' label={t('password')} />
            </Grid>
            <Grid xs={12}>
              <Button type='submit' variant='contained'>{t('reset')}</Button>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
};

export default ResetPassword;
