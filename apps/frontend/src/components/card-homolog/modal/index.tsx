import React, { useState } from 'react';
import { Typography, TextField, Button, Stack, Box } from '@mui/material';
import CustomModal from '../../custom-modal';

interface ConfirmTextInputModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (text: string) => void;
  setJustify: (text: string) => void;
  buttonText: string;
  justify: string;
  buttonColor?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  title?: string;
  label?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

const ConfirmTextInputModal: React.FC<ConfirmTextInputModalProps> = ({
  open,
  onClose,
  onConfirm,
  justify,
  setJustify,
  buttonText,
  buttonColor = 'primary',
  title = 'Resgistrar Homologação',
  cancelLabel = 'Cancelar',
}) => {
  const [textValue, setTextValue] = useState('');

  const handleConfirm = () => {
    onConfirm(textValue);
    // setJustify('');
  };

  const handleCancel = () => {
    setTextValue('');
    onClose();
  };

  return (
    <CustomModal open={open} onClose={handleCancel} title={title} width={500}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label={'Justificativa'}
          value={justify}
          onChange={(e) => setJustify(e.target.value)}
        />

        <Stack direction="row" spacing={2} mt={2}>
          <Button fullWidth variant="outlined" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button
            fullWidth
            variant="contained"
            color={buttonColor}
            onClick={handleConfirm}
            disabled={!justify.trim()}
          >
            {buttonText}
          </Button>
        </Stack>
      </Stack>
    </CustomModal>
  );
};

export default ConfirmTextInputModal;
