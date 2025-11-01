import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import CommitteeSidebar from './CommitteeSidebar';
import CandidateSidebar from './CandidateSidebar';
import { isCommitteeUser } from '../../utils/user-validation';

const Sidebar: React.FC = () => {
  const { getUserFromToken } = useAuth();
  const user = getUserFromToken();
  return isCommitteeUser(user) ? <CommitteeSidebar /> : <CandidateSidebar />;
};

export default Sidebar;

export { default as BaseSidebar } from './BaseSidebar';
export { default as CommitteeSidebar } from './CommitteeSidebar';
export { default as CandidateSidebar } from './CandidateSidebar';
export type { MenuItem, SidebarProps } from './BaseSidebar';
