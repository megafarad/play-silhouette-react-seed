import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Header from './Header';
import {useTranslation} from 'react-i18next';
import {Form, Link} from 'react-router-dom';
import ApiResponse from './ApiResponse';
import SignInError from "./SignInError";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t} = useTranslation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
            <SignInError/>
            <Grid xs={12}>
              {t('sign.in.credentials')}
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
              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor='password'>{ t('password')}</InputLabel>
                <Input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControlLabel control={<Checkbox name='rememberMe' value={true}/>} label={t('remember.me')}/>
            </Grid>
            <Grid xs={12}>
              <Button type='submit' variant='contained'>{t('sign.in')}</Button>
            </Grid>
            <Grid xs={12}>
              {t('not.a.member')} <Link to='/signUp'>{t('sign.up.now')}</Link> | <Link to='/password/forgot'>{t('forgot.your.password')}</Link>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  )
}

export default SignIn;
