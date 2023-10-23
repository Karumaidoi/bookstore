import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Spin } from 'antd';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useLogIn } from '../../../hooks/useLogIn';
import { useAppState } from '../../../context/userContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { isLoading, logInFn } = useLogIn();

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(email, password) {
    console.log(email, password);
    logInFn(email, password, {
      onSettled: () => {
        reset();
      },
    });
  }

  return (
    <>
      <Stack spacing={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="email"
            label="Email address"
            {...register('email', { required: 'This field is required' })}
            helperText={errors?.email?.message}
            error={errors?.email?.message}
            fullWidth
          />

          <div style={{ marginBottom: '2rem' }} />

          <TextField
            {...register('password', { required: 'This field is required' })}
            name="password"
            label="Password"
            helperText={errors?.password?.message}
            error={errors?.password?.message}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />

          <div style={{ marginBottom: '4rem' }} />
          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            {isLoading ? <Spin /> : 'Login'}
          </LoadingButton>
        </form>
      </Stack>
    </>
  );
}
