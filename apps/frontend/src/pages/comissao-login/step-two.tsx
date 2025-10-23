import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import { IMaskInput } from "react-imask";

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
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

const StepTwo = ({
  handlerNextStep,
  handlerPrevStep,
  useFormikProps,
  isMobile,
}: any) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        p: 2,
        pt: 8,
        bgcolor: "#f0f4f8",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={isMobile ? 0 : 3}
          sx={{
            p: 4,
            bgcolor: "#fff",
            borderRadius: isMobile ? 0 : 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Cadastro da Comissão - Etapa 2
          </Typography>

          <Typography variant="body1" align="center" gutterBottom>
            Complete seu cadastro com suas informações pessoais.
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ width: "100%" }}
          >
            <TextField
              label="Nome"
              name="name"
              variant="outlined"
              placeholder="Seu nome completo"
              fullWidth
              margin="normal"
              value={useFormikProps.values.name}
              onChange={useFormikProps.handleChange}
              error={
                Boolean(useFormikProps.errors.name) &&
                Boolean(useFormikProps.touched.name)
              }
              helperText={useFormikProps.errors.name}
            />

            <TextField
              label="Email"
              name="email"
              variant="outlined"
              placeholder="seu-email@aqui.com"
              type="email"
              fullWidth
              margin="normal"
              value={useFormikProps.values.email}
              onChange={useFormikProps.handleChange}
              error={
                Boolean(useFormikProps.errors.email) &&
                Boolean(useFormikProps.touched.email)
              }
              helperText={useFormikProps.errors.email}
            />

            <TextField
              label="CPF"
              name="cpf"
              variant="outlined"
              placeholder="111.222.333-44"
              fullWidth
              margin="normal"
              value={useFormikProps.values.cpf}
              onChange={useFormikProps.handleChange}
              error={
                Boolean(useFormikProps.errors.cpf) &&
                Boolean(useFormikProps.touched.cpf)
              }
              helperText={useFormikProps.errors.cpf}
              InputProps={{
                inputComponent: TextMaskCustom as any,
              }}
            />

            <TextField
              label="Senha"
              name="password"
              variant="outlined"
              placeholder="Sua senha"
              type="password"
              fullWidth
              margin="normal"
              value={useFormikProps.values.password}
              onChange={useFormikProps.handleChange}
              error={
                Boolean(useFormikProps.errors.password) &&
                Boolean(useFormikProps.touched.password)
              }
              helperText={useFormikProps.errors.password}
            />

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={handlerPrevStep}
              >
                Voltar
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handlerNextStep}
              >
                Finalizar Cadastro
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StepTwo;
