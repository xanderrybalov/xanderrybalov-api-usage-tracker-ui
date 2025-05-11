import { useEffect, useState } from 'react';
import {
  Container, Typography, Box, CircularProgress, Alert,
} from '@mui/material';
import client from '../api/client';

interface WebhookEvent {
  id: string;
  type: string;
  created: string;
}

export default function Webhooks() {
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Optional: Fetch webhook events from backend
    const fetchWebhookEvents = async () => {
      setLoading(true);
      setError('');
      try {
        // Replace this with your real API if it exists
        const response = await client.get('/webhook/logs');
        setEvents(response.data);
      } catch {
        setError('Could not load webhook events.');
      } finally {
        setLoading(false);
      }
    };

    fetchWebhookEvents();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Webhooks
      </Typography>

      <Typography variant="body1" gutterBottom>
        Listening for Stripe events on <code>/webhook</code>
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {events.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Recent Webhook Events</Typography>
          {events.map((event) => (
            <Box
              key={event.id}
              sx={{
                mt: 2,
                p: 2,
                border: '1px solid #ddd',
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle1">🧾 {event.type}</Typography>
              <Typography variant="caption">
                Received at: {new Date(event.created).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}
