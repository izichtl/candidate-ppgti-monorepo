import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ArticleIcon from '@mui/icons-material/Article';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import DescriptionIcon from '@mui/icons-material/Description';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import BaseSidebar, { MenuItem } from './BaseSidebar';
import { useAuth } from '../../hooks/auth';

const CandidateSidebar: React.FC = () => {
  const { getUserFromToken, logout } = useAuth();
  const navigate = useNavigate();

  const user = getUserFromToken();
  const userName = user?.name || user?.social_name || 'Usuário';
  const userEmail = user?.email || '';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems: MenuItem[] = [
    {
      text: 'Dashboard',
      path: '/candidate/dashboard',
      icon: <DashboardIcon />,
    },
    {
      text: 'Inscrições',
      path: '/process',
      icon: <AppRegistrationIcon />,
    },
    {
      text: 'Meus Documentos',
      path: '/documents',
      icon: <DescriptionIcon />,
    },
    {
      text: 'Editais',
      path: '/editais',
      icon: <ArticleIcon />,
    },
    {
      text: 'Notícias1',
      path: '/blog',
      icon: <RssFeedIcon />,
    },
  ];

  const secondaryMenuItems: MenuItem[] = [
    {
      text: 'Sobre',
      path: '/about',
      icon: <InfoIcon />,
    },
  ];

  return (
    <BaseSidebar
      menuItems={menuItems}
      secondaryMenuItems={secondaryMenuItems}
      userName={userName}
      userType="Candidato"
      userEmail={userEmail}
      onLogout={handleLogout}
    />
  );
};

export default CandidateSidebar;
