import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Spinner } from '@chakra-ui/spinner';
// @mui
import { Container, Stack, TextField, Typography } from '@mui/material';
import { Button, Card } from 'antd';
import { useSettingsUpdate } from '../hooks/useSettingsUpdate';
import { useSignUpUser } from '../hooks/useSignUpUser';
import { useDeleteCurrentUser } from '../hooks/useDeleteCurrentUser';
import { useAppState } from '../context/userContext';

const AuthButton = styled.button`
  background-color: blue;
  border-radius: 4px;
  border: none;
  color: white;
  padding: 0px 8px;
  cursor: pointer;
`;

export default function BlogPage() {
  // const { isLoading, data: settingsData } = useSettings();
  const { editingSettings, isLoading: isEditing } = useSettingsUpdate();
  const { user } = useAppState();
  const { deleteAdmin, isDeletingAdmin } = useDeleteCurrentUser();
  const { signUpUser, isSigningUp } = useSignUpUser();
  const { handleSubmit, register, reset, formState } = useForm({});

  const { errors } = formState;

  function handleBlur(e, field) {
    const { value } = e.target;

    if (!value) return;

    editingSettings({ [field]: value });
  }

  function onSubmit({ email, userName, password, phone }) {
    console.log(errors);
    console.log(email, userName, password);
    signUpUser(
      { email, userName, password, phone },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <>
      <Helmet>
        <title> Dashboard: User | Bookstore </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
        </Stack>

        <div style={{ marginBottom: '4rem' }} />
        <Card>
          <h3 style={{ marginBottom: 'rem' }}>Add Admin</h3>
          <p>Enter the form below to create a new Administrator.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'row',
                gap: '4rem',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h5 style={{ marginBottom: '0.7rem' }}>Email</h5>
                <TextField
                  {...register('email', { required: 'This field is required' })}
                  helperText={errors?.email?.message}
                  error={errors?.email?.message}
                  id="outlined-basic"
                  label={`Email Address `}
                  variant="outlined"
                  fullWidth
                  disabled={isSigningUp}
                />
              </div>

              <div>
                <h5 style={{ marginBottom: '0.7rem' }}>Password</h5>
                <TextField
                  {...register('password', { required: 'This field is required' })}
                  helperText={errors?.password?.message}
                  error={errors?.password?.message}
                  id="outlined-basic"
                  label={'Password'}
                  variant="outlined"
                  fullWidth
                  disabled={isSigningUp}
                />
              </div>

              <div>
                <h5 style={{ marginBottom: '0.7rem' }}>User Name</h5>
                <TextField
                  {...register('userName', { required: 'This field is required' })}
                  helperText={errors?.userName?.message}
                  error={errors?.userName?.message}
                  id="outlined-basic"
                  label={'Username'}
                  variant="outlined"
                  defaultValue={''}
                  fullWidth
                  disabled={isSigningUp}
                />
              </div>

              <div>
                <h5 style={{ marginBottom: '0.7rem' }}>Phone</h5>
                <TextField
                  {...register('phone', { required: 'This field is required' })}
                  id="outlined-basic"
                  label={'Phone'}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end', gap: '1.3rem' }}>
              <Button>Cancel</Button>
              <AuthButton type="submit">
                {isSigningUp ? <Spinner height={'1rem'} width={'1rem'} color="white" /> : 'Submit'}
              </AuthButton>
            </div>
          </form>
        </Card>

        <div style={{ marginBottom: '4rem' }} />
        <Card>
          <h3 style={{ marginBottom: 'rem' }}>Delete Account</h3>
          <p>Delete your admin account. Your account will be deleted permanently.</p>
          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end', gap: '1.3rem' }}>
            <Button danger onClick={() => deleteAdmin(user?.id)} disabled={isDeletingAdmin}>
              Delete
            </Button>
          </div>
        </Card>
      </Container>
    </>
  );
}
