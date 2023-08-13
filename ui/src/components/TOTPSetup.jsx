import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {Form, useLoaderData} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const TOTPSetup = () => {
  const loaderData = useLoaderData();
  const {t} = useTranslation();

  const totpSetup  = loaderData.totpSetup;
  const qrUrl = loaderData.qrUrl;

  return (
    <>
      <Grid sm={12}>
        <h2>{t('totp.enabling.title')}</h2>
        <h2>{t('totp.shared.key.title')}</h2>
      </Grid>
      <Grid sm={12}>
        <img src={qrUrl} alt='QR Code'/>
      </Grid>
      <Grid sm={12}>
        <h2>{t('totp.recovery.tokens.title')}</h2>
      </Grid>
      <Grid sm={12}>
        <ul>
          {totpSetup.scratchCodesPlain.map((code, idx) => <li key={idx}>{code}</li>)}
        </ul>
      </Grid>
      <Grid sm={12}>
        <Form method='post'>
          <TextField
            id='verificationCode'
            name='verificationCode'
            type='number'
            label={t('totp.verification.code')}
            variant='standard'
          />
          <TextField
            id='sharedKey'
            name='sharedKey'
            type='hidden'
            variant='standard'
            value={totpSetup.sharedKey}
          />
          {totpSetup.scratchCodes.map((scratchCode, idx) =>
            <React.Fragment key={idx}>
              <TextField
                id={'scratchCodes['+idx+'].hasher'}
                name={'scratchCodes['+idx+'].hasher'}
                type='hidden'
                variant='standard'
                value={scratchCode.hasher}
              />
              <TextField
                id={'scratchCodes['+idx+'].password'}
                name={'scratchCodes['+idx+'].password'}
                type='hidden'
                variant='standard'
                value={scratchCode.password}
              />
              <TextField
                id={'scratchCodes['+idx+'].salt'}
                name={'scratchCodes['+idx+'].salt'}
                type='hidden'
                variant='standard'
                value={scratchCode.salt ? scratchCode.salt : ''}
              />
            </React.Fragment>
            )}
          <Button type='submit'>{t('totp.verify')}</Button>
        </Form>
      </Grid>
    </>
  )
};

export default TOTPSetup;
