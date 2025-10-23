import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import BaseSidebar, { MenuItem } from './BaseSidebar';
import { useAuth } from '../../hooks/auth';

const CommitteeSidebar: React.FC = () => {
  const { getUserFromToken, logout } = useAuth();
  const navigate = useNavigate();

  const user = getUserFromToken();
  const userName = user?.name || user?.social_name || 'Usuário';
  const userEmail = user?.email || '';

  const handleLogout = () => {
    logout();
    navigate('/comissao/login');
  };

  const menuItems: MenuItem[] = [
    {
      text: 'Dashboard',
      path: '/comissao/dashboard',
      icon: <DashboardIcon />,
    },
    {
      text: 'Processos Seletivos',
      path: '/comissao/processos',
      icon: <AppRegistrationIcon />,
    },
    {
      text: 'Candidatos',
      path: '/comissao/candidatos',
      icon: <GroupIcon />,
    },
    {
      text: 'Documentos',
      path: '/comissao/documentos',
      icon: <ArticleIcon />,
    },
    {
      text: 'Relatórios',
      path: '/comissao/relatorios',
      icon: <AssessmentIcon />,
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
      userType="Comissão"
      userEmail={userEmail}
      onLogout={handleLogout}
    />
  );
};

export default CommitteeSidebar;
