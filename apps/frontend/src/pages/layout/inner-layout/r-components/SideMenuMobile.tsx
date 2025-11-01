import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuButton from './MenuButton';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import { useAuth } from '../../../../hooks/auth';
// TODO

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({
  open,
  toggleDrawer,
}: SideMenuMobileProps) {
  const { getUserFromToken } = useAuth();
  const user = getUserFromToken();
  const userName = user.name;
  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack direction='row' sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction='row'
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes='small'
              alt={userName}
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                userName
              )}&background=random&color=fff&rounded=true`}
              sx={{ width: 36, height: 36 }}
            />
            <Typography component='p' variant='h6'>
              {userName}
            </Typography>
          </Stack>
          {/* <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton> */}
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <CardAlert />
      </Stack>
    </Drawer>
  );
}
