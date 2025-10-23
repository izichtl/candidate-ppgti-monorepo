import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import CommitteeSidebar from './CommitteeSidebar';
import CandidateSidebar from './CandidateSidebar';

const Sidebar: React.FC = () => {
  const { getUserFromToken } = useAuth();
  const location = useLocation();

  const user = getUserFromToken();
  const isCommitteeUser =
    user &&
    (user.role === 'committee' ||
      user.user_type === 'committee' ||
      location.pathname.includes('/comissao'));

  return isCommitteeUser ? <CommitteeSidebar /> : <CandidateSidebar />;
};

export default Sidebar;

export { default as BaseSidebar } from './BaseSidebar';
export { default as CommitteeSidebar } from './CommitteeSidebar';
export { default as CandidateSidebar } from './CandidateSidebar';
export type { MenuItem, SidebarProps } from './BaseSidebar';
