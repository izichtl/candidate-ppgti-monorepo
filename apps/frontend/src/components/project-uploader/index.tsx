import { Input, Button, Typography, Box, Stack } from '@mui/material';
import { useEffect } from 'react';
import { sanitizeFilename } from '../../utils/file-sanitazer';

const ProjectUploaderField = ({
  loading = false,
  filePrefix,
  useFormikProps,
}: any) => {
  const hasFile =
    useFormikProps.values[filePrefix] !== null &&
    useFormikProps.values.project_file_name !== '';

  const fileName = hasFile
    ? useFormikProps.values.project_file_name
    : 'Obrigatório';

  const buttonName = hasFile
    ? 'Carregado / Carregar Novo'
    : 'Escolher Pré-Projeto';

  const onChange = (e, filePrefix) => {
    const file = e.currentTarget.files[0];
    if (file) {
      useFormikProps.setFieldValue(filePrefix, file);
      useFormikProps.setFieldValue(
        'project_file_name',
        sanitizeFilename(file.name),
      );
    }
  };

  useEffect(() => {}, [hasFile, fileName, useFormikProps]);

  return (
    <Box sx={{ marginBottom: '28px' }}>
      {!loading && (
        <>
          <Typography variant="body1" color="primary" sx={{ marginBottom: 1 }}>
            Envio do pre-projeto - PDF
          </Typography>

          <label htmlFor={`file-input-${filePrefix}`}>
            <Input
              id={`file-input-${filePrefix}`}
              required
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
              variant={hasFile ? 'outlined' : 'contained'}
              // disabled={hasFile}
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
              {buttonName}
            </Button>
          </label>
          <Typography
            variant="body1"
            color={hasFile ? 'success' : 'error'}
            sx={{ marginTop: 1, fontWeight: 500 }}
          >
            {fileName}
          </Typography>

          {useFormikProps.touched[filePrefix] &&
            useFormikProps.errors[filePrefix] && (
              <Typography variant="body2" color="error">
                {useFormikProps.errors[filePrefix]}
              </Typography>
            )}
        </>
      )}
    </Box>
  );
};

export default ProjectUploaderField;
