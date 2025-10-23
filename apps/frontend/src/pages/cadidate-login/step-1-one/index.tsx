import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { IMaskInput } from 'react-imask';
import ScrollToTop from '../../../components/scroll-top';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000.000.000-00"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  },
);

const StepOne = ({
  handlerNextStep,
  useFormikProps,
  setAccessType,
  accessType,
}: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAccessChange = (
    event: React.MouseEvent<HTMLElement>,
    newAccessType: 'register' | 'login' | null,
  ) => {
    if (newAccessType !== null) {
      setAccessType(newAccessType);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        p: 2,
        pt: 8,
        bgcolor: '#f0f4f8',
      }}
    >
      <Container maxWidth="sm">
        <ScrollToTop />
        <Paper
          elevation={isMobile ? 0 : 3}
          sx={{
            p: 4,
            bgcolor: '#fff',
            borderRadius: isMobile ? 0 : 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            {accessType === 'register'
              ? 'Faça sua inscrição'
              : 'Acesse a plataforma'}
          </Typography>

          <ToggleButtonGroup
            value={accessType}
            exclusive
            onChange={handleAccessChange}
            sx={{ mb: 3, flexWrap: 'wrap' }} // permite quebra em telas pequenas
          >
            {['register', 'login'].map((type) => (
              <ToggleButton
                key={type}
                value={type}
                sx={(theme) => ({
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  minWidth: 100,
                  fontSize: 14,
                  borderRadius: 1.5,
                  border: `1px solid ${theme.palette.primary.main}`,
                  color: 'primary.main',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: '#fff',
                  },
                  '&.Mui-selected:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  },

                  [theme.breakpoints.down('sm')]: {
                    flex: 1,
                    px: 2,
                    fontSize: 13,
                  },
                })}
              >
                {type === 'register' ? 'Cadastrar' : 'Acessar'}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Typography variant="body1" align="center" gutterBottom>
            {accessType === 'register'
              ? 'Preencha os campos para cadastrar sua inscrição, sua senha será o CPF combinado com Email.'
              : 'Caso tenha iniciado sua inscrição, acesse aqui.'}
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ width: '100%' }}
          >
            {accessType === 'register' ? (
              <>
                <TextField
                  required
                  label="Nome Social"
                  name="social_name"
                  variant="outlined"
                  placeholder="Nome social"
                  fullWidth
                  margin="normal"
                  value={useFormikProps.values.social_name}
                  onChange={useFormikProps.handleChange}
                  // error={
                  //   Boolean(useFormikProps.errors.social_name) &&
                  //   Boolean(useFormikProps.touched.social_name)
                  // }
                  // helperText={useFormikProps.errors.social_name}
                  onBlur={useFormikProps.handleBlur}
                  error={Boolean(
                    useFormikProps.touched.social_name &&
                      useFormikProps.errors.social_name,
                  )}
                  helperText={
                    useFormikProps.touched.social_name
                      ? useFormikProps.errors.social_name
                      : ''
                  }
                />
                <TextField
                  required
                  label="Email"
                  name="email"
                  variant="outlined"
                  placeholder="seu-email@aqui.com"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={useFormikProps.values.email}
                  onChange={useFormikProps.handleChange}
                  onBlur={useFormikProps.handleBlur}
                  error={Boolean(
                    useFormikProps.touched.email && useFormikProps.errors.email,
                  )}
                  helperText={
                    useFormikProps.touched.email
                      ? useFormikProps.errors.email
                      : ''
                  }
                />
                <TextField
                  required
                  label="CPF"
                  name="cpf"
                  variant="outlined"
                  placeholder="111.222.333-44"
                  fullWidth
                  margin="normal"
                  value={useFormikProps.values.cpf}
                  onChange={useFormikProps.handleChange}
                  onBlur={useFormikProps.handleBlur}
                  error={Boolean(
                    useFormikProps.touched.cpf && useFormikProps.errors.cpf,
                  )}
                  helperText={
                    useFormikProps.touched.cpf ? useFormikProps.errors.cpf : ''
                  }
                  InputProps={{
                    inputComponent: TextMaskCustom as any,
                  }}
                />
              </>
            ) : (
              <>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  variant="outlined"
                  placeholder="seu-email@aqui.com"
                  margin="normal"
                  value={useFormikProps.values.email}
                  onChange={useFormikProps.handleChange}
                  onBlur={useFormikProps.handleBlur}
                  error={Boolean(
                    useFormikProps.touched.email && useFormikProps.errors.email,
                  )}
                  helperText={
                    useFormikProps.touched.email
                      ? useFormikProps.errors.email
                      : ''
                  }
                />
                <TextField
                  required
                  fullWidth
                  label="CPF"
                  name="cpf"
                  type="text"
                  variant="outlined"
                  placeholder="111.222.333-44"
                  margin="normal"
                  value={useFormikProps.values.cpf}
                  onChange={useFormikProps.handleChange}
                  onBlur={useFormikProps.handleBlur}
                  error={Boolean(
                    useFormikProps.touched.cpf && useFormikProps.errors.cpf,
                  )}
                  helperText={
                    useFormikProps.touched.cpf ? useFormikProps.errors.cpf : ''
                  }
                  InputProps={{
                    inputComponent: TextMaskCustom as any,
                  }}
                />
              </>
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handlerNextStep}
            >
              {accessType === 'register' ? 'Cadastrar' : 'Acessar'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StepOne;
