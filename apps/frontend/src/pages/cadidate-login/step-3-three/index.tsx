import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ScrollToTop from '../../../components/scroll-top';

const shirnk = {
  inputLabel: { shrink: true },
};

const StepThree = ({ handlerNextStep, useFormikProps }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const errors = useFormikProps.errors;
    // console.log(errors, 'academic errors');
    if (Object.keys(errors).length === 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [useFormikProps]);

  return (
    <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', p: 2, pt: 8 }}>
      <Paper
        elevation={isMobile ? 0 : 3}
        sx={{
          maxWidth: 900,
          mx: 'auto',
          p: 4,
          borderRadius: isMobile ? 0 : 2,
          bgcolor: '#fff',
        }}
      >
        <ScrollToTop />
        <Typography variant="h5" align="center" gutterBottom>
          Formação Acadêmica
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          Preencha os dados da sua formação acadêmica para prosseguir.
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              label="Maior Titulação"
              slotProps={shirnk}
              placeholder="Bacharel em..."
              name="education_level"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.education_level ?? ''}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.education_level &&
                  useFormikProps.errors.education_level,
              )}
              helperText={
                useFormikProps.touched.education_level
                  ? useFormikProps.errors.education_level
                  : ''
              }
            />
            <TextField
              required
              label="Curso de Graduação"
              slotProps={shirnk}
              placeholder="Ciência da Computação"
              name="graduation_course"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.graduation_course ?? ''}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.name && useFormikProps.errors.name,
              )}
              helperText={
                useFormikProps.touched.name ? useFormikProps.errors.name : ''
              }
            />
            <TextField
              required
              label="Ano da Graduação"
              slotProps={shirnk}
              placeholder="0000"
              name="graduation_year"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.graduation_year ?? ''}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.graduation_year &&
                  useFormikProps.errors.graduation_year,
              )}
              helperText={
                useFormikProps.touched.graduation_year
                  ? useFormikProps.errors.graduation_year
                  : ''
              }
            />
            <TextField
              required
              label="Instituição de Graduação"
              slotProps={shirnk}
              placeholder="Ex: IFPB"
              name="graduation_institution"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.graduation_institution ?? ''}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.graduation_institution &&
                  useFormikProps.errors.graduation_institution,
              )}
              helperText={
                useFormikProps.touched.graduation_institution
                  ? useFormikProps.errors.graduation_institution
                  : ''
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Curso de Especialização"
              slotProps={shirnk}
              placeholder="Especialização em..."
              name="specialization_course"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.specialization_course ?? ''}
              onChange={useFormikProps.handleChange}
            />
            <TextField
              label="Ano da Especialização"
              name="specialization_year"
              slotProps={shirnk}
              placeholder="0000"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.specialization_year ?? ''}
              onChange={useFormikProps.handleChange}
            />
            <TextField
              label="Instituição da Especialização"
              name="specialization_institution"
              slotProps={shirnk}
              placeholder="Ex: IFPB"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.specialization_institution ?? ''}
              onChange={useFormikProps.handleChange}
            />
            <TextField
              required
              label="Link do Currículo Lattes"
              slotProps={shirnk}
              placeholder="https://lattes.cnpq.br/xxxxxxxx"
              name="lattes_link"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.lattes_link ?? ''}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.lattes_link &&
                  useFormikProps.errors.lattes_link,
              )}
              helperText={
                useFormikProps.touched.lattes_link
                  ? useFormikProps.errors.lattes_link
                  : ''
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                mt: 4,
                gap: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  flex: 1,
                  textAlign: { xs: 'center', sm: 'left' },
                  fontWeight: 500,
                }}
              >
                Preencha todos os campos para avançar
              </Typography>
              <Button
                variant="contained"
                color="primary"
                disabled={disabled}
                size="large"
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  width: { xs: '100%', sm: 'auto' },
                  ml: { xs: 0, sm: 'auto' },
                }}
                onClick={handlerNextStep}
              >
                Avançar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default StepThree;
