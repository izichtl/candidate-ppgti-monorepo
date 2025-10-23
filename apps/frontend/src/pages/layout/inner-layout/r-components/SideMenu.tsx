import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import { useAuth } from '../../../../hooks/auth';
import { useLocation } from 'react-router-dom';

const drawerWidth = 300;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const { getUserFromToken } = useAuth();
  const location = useLocation();

  const user = React.useMemo(() => getUserFromToken(), [getUserFromToken]);

  const userName = user?.name || user?.social_name || 'Usuario';

  const isCommitteeUser =
    user &&
    (user.role === 'committee' ||
      user.user_type === 'committee' ||
      location.pathname.includes('/comissao'));

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt="NOME DO USUÁRIO"
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            userName,
          )}&background=random&color=fff&rounded=true`}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: '16px' }}
          >
            {userName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {isCommitteeUser ? 'Comissão' : 'Candidato'}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent />
        <CardAlert />
      </Box>
    </Drawer>
  );
}
