import { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Stack,
  CircularProgress,
} from '@mui/material';
import client from '../api/client';
import type { UsageEvent, UsagePayload } from '../types';
import AuthForm from '../components/AuthForm';

export default function Dashboard() {
  const [events, setEvents] = useState<UsageEvent[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [eventType, setEventType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('apiKey');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('apiKey', apiKey);
    }
  }, [apiKey]);

  const handleLogEvent = async () => {
    setError('');
    setSuccess('');
    try {
      const payload: UsagePayload = { apiKey, eventType };
      await client.post('/usage', payload);
      setSuccess('Event sent successfully!');
      setEventType('');
      setEvents((prev) => [
        ...prev,
        {
          eventType,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch {
      setError('Failed to send event.');
    }
  };

  const fetchEvents = useCallback(async () => {
    if (!apiKey) return;

    setLoading(true);
    setFetchError('');
    try {
      const response = await client.get<UsageEvent[]>('/usage', {
        params: { apiKey },
      });
      setEvents(response.data);
    } catch {
      setFetchError('Failed to load events from backend.');
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {!apiKey ? (
        <AuthForm onApiKey={(key) => setApiKey(key)} />
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
  
          <Stack spacing={2} sx={{ mb: 4 }}>
            <TextField
              label="Event Type"
              variant="outlined"
              fullWidth
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            />
            <Button variant="contained" onClick={handleLogEvent}>
              Log Event
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Stack>
  
          <Typography variant="h6" gutterBottom>
            Latest Events:
          </Typography>
  
          {loading && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
  
          {fetchError && <Alert severity="error">{fetchError}</Alert>}
  
          {!loading &&
            !fetchError &&
            events.map((event, index) => (
              <Box
                key={index}
                sx={{
                  mb: 1,
                  p: 2,
                  border: '1px solid #ccc',
                  borderRadius: 1,
                }}
              >
                <Typography variant="body1">📌 Type: {event.eventType}</Typography>
                <Typography variant="body2" color="text.secondary">
                  🕒 {new Date(event.timestamp).toLocaleString()}
                </Typography>
              </Box>
            ))}
        </>
      )}
    </Container>
  );
  
}
