import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            '&:hover': {
              backgroundColor: 'white',
              color: 'primary.main',
            },
          }}
        >
          Dashboard
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/webhooks"
          sx={{
            '&:hover': {
              backgroundColor: 'white',
              color: 'primary.main',
            },
          }}
        >
          Webhooks
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/billing"
          sx={{
            '&:hover': {
              backgroundColor: 'white',
              color: 'primary.main',
            },
          }}
        >
          Billing
        </Button>
      </Toolbar>
    </AppBar>
  );
}