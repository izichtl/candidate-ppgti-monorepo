import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme,
  Stack,
  Container,
} from '@mui/material';

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{
        bgcolor: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        mx: 'auto',
        mt: 2,
        width: '90%',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography
          variant='h6'
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          IF Marca
        </Typography>

        {/* Links */}
        <Stack direction='row' spacing={3}>
          {[
            'Features',
            'Testimonials',
            'Highlights',
            'Pricing',
            'FAQ',
            'Blog',
          ].map((item) => (
            <Button
              key={item}
              sx={{
                color: theme.palette.text.primary,
                textTransform: 'none',
              }}
            >
              {item}
            </Button>
          ))}
        </Stack>

        {/* Ações */}
        <Stack direction='row' spacing={1}>
          <Button
            variant='text'
            sx={{ color: theme.palette.text.primary, textTransform: 'none' }}
          >
            Sign in
          </Button>
          <Button
            variant='contained'
            color='primary'
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Sign up
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
