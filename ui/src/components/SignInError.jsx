import React from 'react';
import {useSelector} from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'
import Grid from '@mui/material/Unstable_Grid2';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {clearSignInResponse} from "../redux/userSlice";

const SignInError = () => {
  const signInResponse = useSelector((state) => state.user.signInResponse);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  if (signInResponse && signInResponse.error) {
    return (
      <Grid xs={12}>
        <Alert severity='error' sx={{width: '50%'}} action={
          <IconButton
            aria-label='close'
            color='inherit'
            size='small'
            onClick={() => {
              dispatch(clearSignInResponse());
            }}
          >
            <CloseIcon fontSize='inherits'/>
          </IconButton>
        }>
          <AlertTitle>{t('error')}</AlertTitle>
          {signInResponse.error}
        </Alert>      </Grid>
    )
  }

  return null;
}

export default SignInError;
