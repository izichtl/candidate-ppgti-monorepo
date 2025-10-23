import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Hammer } from 'lucide-react'; // Ícone que representa construção

const UnderConstructionComponent = () => {
  const navigate = useNavigate();

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='80vh'
      textAlign='center'
      px={2}
    >
      <Hammer size={80} color='#ff9800' style={{ marginBottom: '16px' }} />
      <Typography variant='h3' gutterBottom>
        Página em Construção
      </Typography>
      <Typography variant='body1' color='text.secondary' mb={4}>
        Esta seção ainda está sendo finalizada. Em breve, você poderá acessá-la.
      </Typography>
      <Stack spacing={2} direction='row'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/')}
        >
          Voltar para Início
        </Button>
      </Stack>
    </Box>
  );
};

export default UnderConstructionComponent;
