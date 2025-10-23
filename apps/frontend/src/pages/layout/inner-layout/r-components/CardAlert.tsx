import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/auth';

export default function CardAlert() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Card sx={{ m: 1.5, flexShrink: 0 }}>
      <CardContent>
        <Button
          variant='contained'
          color='error'
          size='small'
          fullWidth
          onClick={handleLogout}
        >
          Deslogar - Sair
        </Button>
      </CardContent>
    </Card>
  );
}
