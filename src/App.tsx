import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';



import Dashboard from './pages/Dashboard';
import Billing from './pages/Billing';
import Webhooks from './pages/Webhooks';
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme();
function App() {
  return (
        <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'start',
          alignItems: 'center',
          textAlign: 'center',
          width: '100vw',
        }}
      >
        <Container maxWidth="md">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/webhooks" element={<Webhooks />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </BrowserRouter>
    </Container>
    </Box>
    </ThemeProvider>
  );
}

export default App;
