import { Link, Typography } from '@mui/material';
import CustomLink from '../custom-link';

export const Copyright = () => {
  return (
    <Typography
      variant='body2'
      align='center'
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Direitos Reservados © '}
      <CustomLink color='inherit' to='https://joaopessoa.ifpb.edu.br/'>
        IFPB
      </CustomLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};
