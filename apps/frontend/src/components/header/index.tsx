// // @ts-nocheck
// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Grid,
//   Link,
//   IconButton,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link as RouterLink } from 'react-router-dom';

// const Header: React.FC = () => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//     setIsMenuOpen(true);
//   };

//   const handleMenuClose = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <AppBar position='static' sx={{ zIndex: 1201 }}>
//       <Toolbar
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}
//       >
//         <Grid container alignItems='center'>
//           <Grid
//           // item
//           >
//             <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
//               <Link
//                 component={RouterLink}
//                 to='/'
//                 sx={{ color: 'inherit', textDecoration: 'none' }}
//               >
//                 Meu Logo
//               </Link>
//             </Typography>
//           </Grid>

//           <Grid
//             // item
//             xs={6}
//             sx={{
//               display: { xs: 'none', sm: 'flex' },
//               justifyContent: 'center',
//               gap: 3,
//             }}
//           >
//             <Link
//               component={RouterLink}
//               to='/'
//               sx={{ color: 'inherit', textDecoration: 'none' }}
//             >
//               Home
//             </Link>
//             <Link
//               component={RouterLink}
//               to='/login'
//               sx={{ color: 'inherit', textDecoration: 'none' }}
//             >
//               Login
//             </Link>
//             <Link
//               component={RouterLink}
//               to='/help'
//               sx={{ color: 'inherit', textDecoration: 'none' }}
//             >
//               Ajuda
//             </Link>
//           </Grid>

//           <Grid
//             // item
//             xs={3}
//             sx={{ display: { xs: 'block', sm: 'none' } }}
//           >
//             <IconButton
//               edge='end'
//               color='inherit'
//               onClick={handleMenuOpen}
//               aria-label='menu'
//               sx={{ ml: 2 }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               open={isMenuOpen}
//               onClose={handleMenuClose}
//               PaperProps={{
//                 sx: {
//                   width: '200px',
//                 },
//               }}
//             >
//               <MenuItem onClick={handleMenuClose}>
//                 <Link
//                   component={RouterLink}
//                   to='/'
//                   sx={{ color: 'inherit', textDecoration: 'none' }}
//                 >
//                   Home
//                 </Link>
//               </MenuItem>
//               <MenuItem onClick={handleMenuClose}>
//                 <Link
//                   component={RouterLink}
//                   to='/about'
//                   sx={{ color: 'inherit', textDecoration: 'none' }}
//                 >
//                   Sobre
//                 </Link>
//               </MenuItem>
//               <MenuItem onClick={handleMenuClose}>
//                 <Link
//                   component={RouterLink}
//                   to='/services'
//                   sx={{ color: 'inherit', textDecoration: 'none' }}
//                 >
//                   Serviços
//                 </Link>
//               </MenuItem>
//               <MenuItem onClick={handleMenuClose}>
//                 <Link
//                   component={RouterLink}
//                   to='/contact'
//                   sx={{ color: 'inherit', textDecoration: 'none' }}
//                 >
//                   Contato
//                 </Link>
//               </MenuItem>
//             </Menu>
//           </Grid>
//         </Grid>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
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
