import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Box,
  Typography,
  Divider,
  Button,
  Avatar,
  Stack,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

export interface MenuItem {
  text: string;
  path: string;
  icon: React.ReactNode;
}

export interface SidebarProps {
  menuItems: MenuItem[];
  secondaryMenuItems?: MenuItem[];
  userName: string;
  userType: string;
  userEmail?: string;
  onLogout: () => void;
  width?: number;
}

const BaseSidebar: React.FC<SidebarProps> = ({
  menuItems,
  secondaryMenuItems = [],
  userName,
  userType,
  userEmail,
  onLogout,
  width = 250,
}) => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
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
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt={userName}
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
            {userType}
          </Typography>
          {userEmail && (
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', display: 'block' }}
            >
              {userEmail}
            </Typography>
          )}
        </Box>
      </Stack>

      <Divider />

      <Box sx={{ padding: 2, flexGrow: 1 }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: 'block', mb: 1 }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {secondaryMenuItems.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <List>
              {secondaryMenuItems.map((item, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{ display: 'block', mb: 1 }}
                >
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
          }}
        >
          Sair
        </Button>
      </Box>
    </Drawer>
  );
};

export default BaseSidebar;
