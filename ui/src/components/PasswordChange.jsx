import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Header from './Header';
import {useTranslation} from 'react-i18next';
import {Form} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import PasswordStrength from './PasswordStrength';
import ApiResponse from './ApiResponse';

const PasswordChange = () => {
  const {t} = useTranslation();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

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
              {t('change.password')}
            </Grid>
            <Grid xs={12}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor='current-password'>{ t('current.password')}</InputLabel>
                <Input
                  id='current-password'
                  name='current-password'
                  type={showCurrentPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCurrentPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <PasswordStrength id='new-password' name='new-password' label={t('new.password')}/>
            </Grid>
            <Grid xs={12}>
              <Button type='submit' variant='contained'>{t('change')}</Button>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
}

export default PasswordChange;
