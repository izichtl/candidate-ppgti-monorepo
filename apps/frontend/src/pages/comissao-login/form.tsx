import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";
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

const Form = ({
  handlerNextStep,
  useFormikProps,
  isMobile,
  isLoginMode,
  setIsLoginMode,
}: any) => {
  const theme = useTheme();

  const handleAccessChange = (
    event: React.MouseEvent<HTMLElement>,
    newAccessType: "register" | "login" | null
  ) => {
    if (newAccessType !== null) {
      setIsLoginMode(newAccessType === "login");
    }
  };

  const accessType = isLoginMode ? "login" : "register";

  return (
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
        {accessType === "register"
          ? "Cadastre-se na plataforma"
          : "Acesse a plataforma"}
      </Typography>

      <ToggleButtonGroup
        value={accessType}
        exclusive
        onChange={handleAccessChange}
        sx={{ mb: 3 }}
      >
        {["register", "login"].map((type) => (
          <ToggleButton
            key={type}
            value={type}
            sx={{
              textTransform: "none",
              px: 4,
              borderRadius: 2,
              border: `1px solid ${theme.palette.primary.main}`,
              color: "primary.main",
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "#fff",
              },
              "&.Mui-selected:hover": {
                bgcolor: "primary.dark",
              },
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            {type === "register" ? "Cadastrar" : "Acessar"}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Typography variant="body1" align="center" gutterBottom>
        {accessType === "register"
          ? "Preencha os campos para se cadastrar na plataforma."
          : "Acesse com sua matrícula e senha."}
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ width: "100%" }}
      >
        {accessType === "register" ? (
          <>
            <TextField
              label="Nome"
              name="name"
              variant="outlined"
              placeholder="Seu nome"
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
              variant="outlined"
              name="email"
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
              variant="outlined"
              fullWidth
              name="cpf"
              placeholder="111.222.333-44"
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
              label="Matrícula"
              variant="outlined"
              fullWidth
              name="matricula"
              placeholder="Sua matrícula"
              margin="normal"
              value={useFormikProps.values.matricula}
              onChange={useFormikProps.handleChange}
              error={
                Boolean(useFormikProps.errors.matricula) &&
                Boolean(useFormikProps.touched.matricula)
              }
              helperText={useFormikProps.errors.matricula}
            />
            <TextField
              label="Código de Autorização"
              variant="outlined"
              fullWidth
              name="authorizationCode"
              placeholder="Seu código"
              margin="normal"
              value={useFormikProps.values.authorizationCode}
              onChange={useFormikProps.handleChange}
              error={
                Boolean(useFormikProps.errors.authorizationCode) &&
                Boolean(useFormikProps.touched.authorizationCode)
              }
              helperText={useFormikProps.errors.authorizationCode}
            />
            <TextField
              label="Senha"
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              placeholder="Sua senha"
              margin="normal"
              value={useFormikProps.values.password}
              onChange={useFormikProps.handleChange}
              error={
                Boolean(useFormikProps.errors.password) &&
                Boolean(useFormikProps.touched.password)
              }
              helperText={useFormikProps.errors.password}
            />
          </>
        ) : (
          <>
            <TextField
              label="Matrícula"
              variant="outlined"
              fullWidth
              name="matricula"
              placeholder="Sua matrícula"
              margin="normal"
              value={useFormikProps.values.matricula}
              onChange={useFormikProps.handleChange}
              error={
                Boolean(useFormikProps.errors.matricula) &&
                Boolean(useFormikProps.touched.matricula)
              }
              helperText={useFormikProps.errors.matricula}
            />
            <TextField
              label="Senha"
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              placeholder="Sua senha"
              margin="normal"
              value={useFormikProps.values.password}
              onChange={useFormikProps.handleChange}
              error={
                Boolean(useFormikProps.errors.password) &&
                Boolean(useFormikProps.touched.password)
              }
              helperText={useFormikProps.errors.password}
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
          {accessType === "register" ? "Cadastrar" : "Acessar"}
        </Button>
      </Box>
    </Paper>
  );
};

export default Form;
