import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Stack,
  Alert,
  Typography,
} from '@mui/material';
import client from '../api/client';
import type { RegisterResponse } from '../types';

export default function AuthForm({
  onApiKey,
}: {
  onApiKey: (key: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedKey = localStorage.getItem('apiKey');
    if (savedEmail && savedKey) {
      setEmail(savedEmail);
      setApiKey(savedKey);
      setRegistered(true);
      onApiKey(savedKey);
    }
  }, [onApiKey]);

  const handleRegister = async () => {
    setError('');
    try {
      const res = await client.post<RegisterResponse>('/register', { email });
      const key = res.data.apiKey;
      localStorage.setItem('email', email);
      localStorage.setItem('apiKey', key);
      setApiKey(key);
      setRegistered(true);
      onApiKey(key);
    } catch {
      setError('Registration failed.');
    }
  };

  if (registered) {
    return (
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Alert severity="success">
          Logged in as <strong>{email}</strong><br />
          Your API Key: <code>{apiKey}</code>
        </Alert>
        <Button
          variant="outlined"
          onClick={() => {
            localStorage.removeItem('email');
            localStorage.removeItem('apiKey');
            window.location.reload();
          }}
        >
          Logout
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} sx={{ mb: 4 }}>
      <Typography variant="h6">Login or Register</Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" onClick={handleRegister} disabled={!email}>
        Submit
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
}
