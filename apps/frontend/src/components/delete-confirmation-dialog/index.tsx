import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  isLoading?: boolean;
  itemName?: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
  itemName,
}) => {
  const defaultMessage = itemName
    ? `Tem certeza que deseja excluir "${itemName}"? Esta ação não pode ser desfeita e os dados serão permanentemente removidos.`
    : 'Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="delete-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          {message || defaultMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress size={16} /> : <DeleteIcon />
          }
        >
          {isLoading ? 'Excluindo...' : 'Excluir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
