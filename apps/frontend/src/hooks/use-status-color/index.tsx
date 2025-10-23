import { useTheme } from '@mui/material/styles';

export function useStatusColor() {
  const theme = useTheme();

  return (status: string = 'draft'): string => {
    switch (status) {
      case 'published':
        return theme.palette.success.main;
      case 'closed':
        return theme.palette.error.main;
      case 'draft':
      default:
        return theme.palette.grey[500];
    }
  };
}
