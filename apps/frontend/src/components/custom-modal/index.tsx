import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string | number;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  minWidth: 300,
};

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  children,
  width = 400,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          ...style,
          width: '90%',
          maxWidth: width,
          maxHeight: 'calc(100vh - 32px)',
          overflowY: 'auto',
          padding: 30,
          mx: 0,
          p: { xs: 2, sm: 3 },
          boxSizing: 'border-box',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          {title && <Typography variant="h6">{title}</Typography>}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
