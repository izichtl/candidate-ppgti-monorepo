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
          <Typography variant="body1" color="primary" sx={{ marginBottom: 1 }}>
            {title}
          </Typography>

          {hasFile ? (
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ marginBottom: 1 }}
            >
              <Button
                variant="contained"
                component="span"
                color="success"
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
                  type="file"
                  data-id={filePrefix}
                  onChange={(e) => onChange(e, filePrefix)}
                  inputProps={{
                    accept: 'application/pdf',
                    'data-id': filePrefix,
                  }}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  component="span"
                  color="warning"
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
                  type="file"
                  data-id={filePrefix}
                  onChange={(e) => onChange(e, filePrefix)}
                  inputProps={{
                    accept: 'application/pdf',
                    'data-id': filePrefix,
                  }}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="contained"
                  component="span"
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
                  Escolher arquivo
                </Button>
              </label>
              <Typography
                variant="body2"
                color="error"
                sx={{ marginTop: 1, fontWeight: 500 }}
              >
                Nenhum documento enviado.
              </Typography>
            </>
          )}
        </>
      )}

      {loading && (
        <Typography variant="body2" color="primary">
          Enviando arquivo...
        </Typography>
      )}

      <Button
        disabled={fileSelected !== filePrefix}
        variant="contained"
        color="primary"
        onClick={onClick}
        sx={{ marginTop: 1 }}
      >
        Enviar
      </Button>
    </Box>
  );
};

export default UploaderField;
