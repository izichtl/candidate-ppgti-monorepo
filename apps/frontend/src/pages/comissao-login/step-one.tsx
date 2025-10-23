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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

const StepOne = ({
  handlerNextStep,
  useFormikProps,
  isMobile,
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
            Cadastro da Comissão - Etapa 1
          </Typography>

          <ToggleButtonGroup
            value="register"
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
            Informe sua matrícula e código de autorização para iniciar o
            cadastro.
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ width: "100%" }}
          >
            <TextField
              label="Matrícula"
              name="matricula"
              variant="outlined"
              placeholder="Sua matrícula"
              fullWidth
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
              name="authorizationCode"
              variant="outlined"
              placeholder="Seu código de autorização"
              fullWidth
              margin="normal"
              value={useFormikProps.values.authorizationCode}
              onChange={useFormikProps.handleChange}
              error={
                Boolean(useFormikProps.errors.authorizationCode) &&
                Boolean(useFormikProps.touched.authorizationCode)
              }
              helperText={useFormikProps.errors.authorizationCode}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handlerNextStep}
            >
              Próxima Etapa
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StepOne;
