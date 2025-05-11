import { useState } from 'react';
import {
  Container, Typography, Button, Alert, Stack,
} from '@mui/material';
import client from '../api/client';

export default function Billing() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpenStripePortal = async () => {
    setLoading(true);
    setStatusMessage('');
    setErrorMessage('');

    try {
      // This should trigger a server-side call to Stripe
      const response = await client.post('/billing/portal', {
        // You can include customerId or email if needed
      });

      const { url } = response.data;
      window.location.href = url; // Redirect to Stripe portal
    } catch {
      setErrorMessage('Failed to open Stripe portal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Billing
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Manage your subscription and billing information through Stripe.
      </Typography>

      <Stack spacing={2}>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleOpenStripePortal}
        >
          Open Stripe Portal
        </Button>

        {statusMessage && <Alert severity="success">{statusMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Stack>
    </Container>
  );
}
