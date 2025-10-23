import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  Grid,
  useMediaQuery,
  useTheme,
  Paper,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import brazilianStates from '../../../utils/state-list';
import { quotaOptionsPros } from '..';
import ScrollToTop from '../../../components/scroll-top';

const shirnk = {
  inputLabel: { shrink: true },
};
const StepTwo = ({ handlerNextStep, useFormikProps, quotaOptions }: any) => {
  const [disabled, setDisabled] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggle = (value: string) => {
    useFormikProps.setFieldValue('quota', value);
  };
  console.log(useFormikProps);
  useEffect(() => {
    const errors = useFormikProps.errors;
    if (Object.keys(errors).length === 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [useFormikProps]);
  useEffect(() => {
    const fields = [
      'name',
      'registration_',
      'registration_place',
      'address_state',
      'other_email',
      'sex',
      'address',
      'address_number',
      'address_complement',
      'address_neighborhood',
      'address_city',
      'registration_state',
      'address_zipcode',
      'cell_phone',
      'phone',
      'quota',
    ];
    // useFormikProps.setTouched({});
    // useFormikProps.setSubmitting(false);
    // useFormikProps.setErrors({});
    // useFormikProps.submitCount = 0;
    console.log(useFormikProps);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: '#f0f4f8',
        minHeight: '100vh',
        p: 2,
        pt: 8,
        overflowX: 'hidden',
      }}
    >
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
          Dados Pessoais
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          Preencha os campos abaixo para continuar seu cadastro, todos os campos
          marcados com * são obrigatórios.
        </Typography>

        <Grid container spacing={2}>
          {/* Coluna Esquerda */}
          {/* <Grid item xs={12} md={6}> */}
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              slotProps={shirnk}
              placeholder="Seu nome"
              label="Nome de Registro"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.name}
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
              label="Identidade - RG"
              placeholder="00.000.000-0"
              slotProps={shirnk}
              name="registration_"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.registration_}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.registration_ &&
                  useFormikProps.errors.registration_,
              )}
              helperText={
                useFormikProps.touched.registration_
                  ? useFormikProps.errors.registration_
                  : ''
              }
            />
            <TextField
              required
              label="Orgão Expedidor"
              slotProps={shirnk}
              placeholder="DETRAN/PB"
              name="registration_place"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.registration_place}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.registration_place &&
                  useFormikProps.errors.registration_place,
              )}
              helperText={
                useFormikProps.touched.registration_place
                  ? useFormikProps.errors.registration_place
                  : ''
              }
            />
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                fullWidth
                name="address_state"
                value={useFormikProps.values.address_state}
                onChange={useFormikProps.handleChange}
                label="UF"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      maxWidth: '90vw',
                      overflowX: 'auto',
                    },
                  },
                }}
              >
                {brazilianStates.map((estado) => (
                  <MenuItem key={estado.sigla} value={estado.sigla}>
                    {estado.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              label="Outro Email"
              slotProps={shirnk}
              placeholder="segundo@email.com"
              name="other_email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.other_email}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.other_email &&
                  useFormikProps.errors.other_email,
              )}
              helperText={
                useFormikProps.touched.other_email
                  ? useFormikProps.errors.other_email
                  : ''
              }
            />
            <FormControl fullWidth required margin="normal">
              <InputLabel>Sexo Biológico</InputLabel>
              <Select
                name="sex"
                value={useFormikProps.values.sex}
                onChange={useFormikProps.handleChange}
                label="Sexo Biológico"
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Coluna Direita */}
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              label="Endereço"
              slotProps={shirnk}
              placeholder="Rua da sua casa"
              name="address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.address}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.address && useFormikProps.errors.address,
              )}
              helperText={
                useFormikProps.touched.address
                  ? useFormikProps.errors.address
                  : ''
              }
            />
            <TextField
              required
              label="Número"
              name="address_number"
              slotProps={shirnk}
              placeholder="00"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.address_number}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.address_number &&
                  useFormikProps.errors.address_number,
              )}
              helperText={
                useFormikProps.touched.address_number
                  ? useFormikProps.errors.address_number
                  : ''
              }
            />
            <TextField
              label="Complemento"
              name="address_complement"
              slotProps={shirnk}
              placeholder="ap 00"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.address_complement}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.address_complement &&
                  useFormikProps.errors.address_complement,
              )}
              helperText={
                useFormikProps.touched.address_complement
                  ? useFormikProps.errors.address_complement
                  : ''
              }
            />
            <TextField
              required
              label="Bairro"
              slotProps={shirnk}
              placeholder="Seu Bairro"
              name="address_neighborhood"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.address_neighborhood}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.address_neighborhood &&
                  useFormikProps.errors.address_neighborhood,
              )}
              helperText={
                useFormikProps.touched.address_neighborhood
                  ? useFormikProps.errors.address_neighborhood
                  : ''
              }
            />
            <TextField
              required
              label="Cidade"
              slotProps={shirnk}
              placeholder="Sua cidade"
              name="address_city"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.address_city}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.address_city &&
                  useFormikProps.errors.address_city,
              )}
              helperText={
                useFormikProps.touched.address_city
                  ? useFormikProps.errors.address_city
                  : ''
              }
            />
            <FormControl required fullWidth margin="normal">
              <InputLabel>UF</InputLabel>
              <Select
                fullWidth
                name="registration_state"
                value={useFormikProps.values.registration_state}
                onChange={useFormikProps.handleChange}
                label="UF"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      maxWidth: '90vw',
                      overflowX: 'auto',
                    },
                  },
                }}
              >
                {brazilianStates.map((estado) => (
                  <MenuItem key={estado.sigla} value={estado.sigla}>
                    {estado.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              label="CEP"
              name="address_zipcode"
              slotProps={shirnk}
              placeholder="00000-00"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.address_zipcode}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.address_zipcode &&
                  useFormikProps.errors.address_zipcode,
              )}
              helperText={
                useFormikProps.touched.address_zipcode
                  ? useFormikProps.errors.address_zipcode
                  : ''
              }
            />
            <TextField
              required
              label="Telefone Celular"
              slotProps={shirnk}
              placeholder="83000000000"
              name="cell_phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.cell_phone}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.cell_phone &&
                  useFormikProps.errors.cell_phone,
              )}
              helperText={
                useFormikProps.touched.cell_phone
                  ? useFormikProps.errors.cell_phone
                  : ''
              }
            />
            <TextField
              label="Telefone Fixo"
              name="phone"
              slotProps={shirnk}
              placeholder="00000000000"
              variant="outlined"
              fullWidth
              margin="normal"
              value={useFormikProps.values.phone}
              onChange={useFormikProps.handleChange}
              onBlur={useFormikProps.handleBlur}
              error={Boolean(
                useFormikProps.touched.phone && useFormikProps.errors.phone,
              )}
              helperText={
                useFormikProps.touched.phone ? useFormikProps.errors.phone : ''
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box p={2} border={1} borderRadius={2} borderColor="grey.400">
              <Typography variant="h6" gutterBottom>
                Optante por Cota
              </Typography>
              {quotaOptions.map((option: quotaOptionsPros) => {
                return (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Switch
                        checked={useFormikProps.values.quota === option.value}
                        onChange={handleToggle.bind(null, option.value)}
                      />
                    }
                    label={option.label}
                  />
                );
              })}
            </Box>
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

export default StepTwo;
