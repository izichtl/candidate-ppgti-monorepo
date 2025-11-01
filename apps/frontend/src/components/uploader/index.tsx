import { Input, Button, Typography, Box, Stack } from '@mui/material';
import { useEffect } from 'react';

const UploaderField = ({
  hasFile,
  loading,
  fileSelected,
  filePrefix,
  onClick,
  onChange,
  title,
  url,
}: any) => {
  const fileUrl = hasFile ? url : null;

  useEffect(() => {}, [hasFile]);

  return (
    <Box sx={{ marginBottom: '28px' }}>
      {!loading && (
        <>
          <Typography variant='body1' color='primary' sx={{ marginBottom: 1 }}>
            {title}
          </Typography>

          {hasFile ? (
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
              sx={{ marginBottom: 1 }}
            >
              <Button
                variant='contained'
                component='span'
                color='success'
                onClick={() => window.open(fileUrl, '_blank')}
                sx={(theme) => ({
                  px: 2.5,
                  py: 1,
                  fontSize: 14,
                  [theme.breakpoints.down('sm')]: {
                    fontSize: 13,
                    px: 1.5,
                    py: 0.5,
                  },
                })}
              >
                Visualizar documento
              </Button>

              <label htmlFor={`file-input-${filePrefix}`}>
                <Input
                  id={`file-input-${filePrefix}`}
                  type='file'
                  data-id={filePrefix}
                  onChange={(e) => onChange(e, filePrefix)}
                  inputProps={{
                    accept: 'application/pdf',
                    'data-id': filePrefix,
                  }}
                  style={{ display: 'none' }}
                />
                <Button
                  variant='outlined'
                  component='span'
                  color='warning'
                  sx={(theme) => ({
                    px: 2.5,
                    py: 1,
                    fontSize: 14,
                    [theme.breakpoints.down('sm')]: {
                      fontSize: 13,
                      px: 1.5,
                      py: 0.5,
                      width: '100%',
                    },
                  })}
                >
                  Escolher novo arquivo
                </Button>
              </label>
            </Stack>
          ) : (
            <>
              <label htmlFor={`file-input-${filePrefix}`}>
                <Input
                  id={`file-input-${filePrefix}`}
                  type='file'
                  data-id={filePrefix}
                  onChange={(e) => onChange(e, filePrefix)}
                  inputProps={{
                    accept: 'application/pdf',
                    'data-id': filePrefix,
                  }}
                  style={{ display: 'none' }}
                />
                <Button
                  variant='contained'
                  color='primary'
                  component='span'
                  sx={(theme) => ({
                    px: 2.5,
                    py: 1,
                    fontSize: 14,
                    '&:hover': {
                      bgcolor: theme.palette.info.light,
                    },
                    [theme.breakpoints.down('sm')]: {
                      fontSize: 13,
                      px: 1.5,
                      py: 0.5,
                      width: '100%',
                    },
                  })}
                >
                  {fileSelected !== filePrefix
                    ? 'Escolher arquivo'
                    : 'Aguardando envio'}
                </Button>
              </label>
              <Typography
                variant='body2'
                color={fileSelected !== filePrefix ? 'error' : 'success'}
                sx={{ marginTop: 1, fontWeight: 500 }}
              >
                {fileSelected !== filePrefix
                  ? 'Nenhum arquivo selecionado'
                  : 'Arquivo selecionado'}
              </Typography>
            </>
          )}
        </>
      )}

      {loading && (
        <Typography variant='body2' color='primary'>
          Enviando arquivo...
        </Typography>
      )}

      <Button
        disabled={fileSelected !== filePrefix}
        variant='contained'
        color='success'
        onClick={onClick}
        sx={{ marginTop: 1 }}
      >
        Enviar
      </Button>
    </Box>
  );
};

export default UploaderField;
