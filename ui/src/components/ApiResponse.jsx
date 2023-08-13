import React from 'react';
import {clearApiResponse} from '../redux/apiResponseSlice';
import {useSelector} from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'
import Grid from '@mui/material/Unstable_Grid2';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

const ApiResponse = () => {
  const apiResponse = useSelector((state) => state.apiResponse.response);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onClose = () => {
    dispatch(clearApiResponse());
  }

  if (apiResponse) {
    if (apiResponse.info) {
      return (
        <Grid xs={12}>
          <Alert severity='info' onClose={onClose} sx={{width: '50%'}}>
            <AlertTitle>{t('info')}</AlertTitle>
            {apiResponse.info}
          </Alert>
        </Grid>
      );
    }
    if (apiResponse.success) {
      return (
        <Grid xs={12}>
          <Alert severity='success' onClose={onClose} sx={{width: '50%'}}>
            <AlertTitle>{t('success')}</AlertTitle>
            {apiResponse.success}
          </Alert>
        </Grid>
      );
    }
    if (apiResponse.error) {
      return (
        <Grid xs={12}>
          <Alert severity='error' onClose={onClose} sx={{width: '50%'}}>
            <AlertTitle>{t('error')}</AlertTitle>
            {apiResponse.error}
          </Alert>
        </Grid>
      );
    }

  }

  return null;


}

export default ApiResponse;
