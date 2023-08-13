import React, { useState, useEffect, useDeferredValue } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import FormControl from '@mui/material/FormControl';
import { zxcvbnOptions, zxcvbnAsync } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import { matcherPwnedFactory } from '@zxcvbn-ts/matcher-pwned';
import {useTranslation} from 'react-i18next';

const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
zxcvbnOptions.addMatcher('pwned', matcherPwned);

const options = {
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  useLevenshteinDistance: true,
  translations: zxcvbnEnPackage.translations,
}

zxcvbnOptions.setOptions(options);

const usePasswordStrength = (password) => {
  const [result, setResult] = useState(null);
  const deferredPassword = useDeferredValue(password);

  useEffect(() => {
    zxcvbnAsync(deferredPassword).then((response) => setResult(response));
  }, [deferredPassword]);

  return result;
}

const PasswordStrength = ({id, name, label}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {t} = useTranslation();
  const strengthResult = usePasswordStrength(password);
  const strengthRatings= {
    0: t('worst.password.strength'),
    1: t('bad.password.strength'),
    2: t('weak.password.strength'),
    3: t('good.password.strength'),
    4: t('strong.password.strength')
  };

  const strengthScore = strengthResult ? strengthResult.score : null;

  const strengthRating = strengthScore || strengthScore === 0 ? strengthRatings[strengthScore] : null;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
      <Grid container>
        <Grid sx={{mt: 5}} xs={12}>
          {t('strong.password.info')}
        </Grid>
        <Grid xs={12}>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Input
              id={id}
              name={name}
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
        <Grid sx={{
          marginTop: 2,
          marginBottom: 2
        }} xs={4}>
          Password Strength:
        </Grid>
        <Grid sx={{
          marginTop: 2,
          marginBottom: 2
        }} xs={8}>
          <strong>{strengthRating}: </strong> <meter className='meter' value={strengthScore} max={4}/>
        </Grid>
      </Grid>
  );
}

export default PasswordStrength;

