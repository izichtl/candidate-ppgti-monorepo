type UserWithRole = {
  roles?: string[] | null;
};

export const isCommitteeUser = <T extends UserWithRole>(user?: T): boolean => {
  if (!user || !Array.isArray(user.roles) || user.roles.length === 0)
    return false;
  return user.roles[0] === 'COMMITTEE';
};
