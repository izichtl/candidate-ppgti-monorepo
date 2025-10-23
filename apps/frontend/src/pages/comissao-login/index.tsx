import React, { useState } from 'react';
import { AxiosError } from 'axios';
import * as Yup from 'yup';
import { useFormik, FormikProps } from 'formik';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';
import { useNavigate } from 'react-router-dom';

import {
  useComissaoLogin,
  useComissaoRegister,
} from '../../hooks/comissao-login';
import { useAuth } from '../../hooks/auth';
import { getErrorMessage } from '../../utils/error-messages';
import ErrorSnackbar from '../../components/error-snackbar';

import Form from './form';
import StepOne from './step-one';
import StepTwo from './step-two';

const ComissaoLoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  type initialComissaoLoginProps = {
    email: string;
    matricula: string;
    name: string;
    authorizationCode: string;
    cpf: string;
    password: string;
  };

  const initial: initialComissaoLoginProps = {
    email: '',
    matricula: '',
    name: '',
    authorizationCode: '',
    cpf: '',
    password: '',
  };

  const getValidationSchema = (step: number, isLogin: boolean) => {
    if (isLogin) {
      return Yup.object().shape({
        matricula: Yup.string().required('Matrícula é obrigatório'),
        password: Yup.string()
          .min(6, 'Senha deve ter pelo menos 6 caracteres')
          .required('Senha é obrigatória'),
      });
    }

    if (step === 1) {
      return Yup.object().shape({
        matricula: Yup.string().required('Matrícula é obrigatório'),
        authorizationCode: Yup.string().required(
          'Código de autorização é obrigatório',
        ),
      });
    }

    if (step === 2) {
      return Yup.object().shape({
        matricula: Yup.string().required('Matrícula é obrigatório'),
        authorizationCode: Yup.string().required(
          'Código de autorização é obrigatório',
        ),
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .email('Email inválido')
          .required('Email é obrigatório'),
        cpf: Yup.string().required('CPF é obrigatório'),
        password: Yup.string()
          .min(6, 'Senha deve ter pelo menos 6 caracteres')
          .required('Senha é obrigatória'),
      });
    }

    return Yup.object().shape({});
  };

  const useFormikProps: FormikProps<initialComissaoLoginProps> =
    useFormik<initialComissaoLoginProps>({
      initialValues: initial,
      enableReinitialize: true,
      validateOnBlur: false,
      validateOnMount: false,
      validationSchema: () => getValidationSchema(currentStep, isLoginMode),
      onSubmit: async (values: initialComissaoLoginProps) => {
        if (isLoginMode) {
          await handlerLogin();
        } else {
          if (currentStep === 1) {
            setCurrentStep(2);
          } else {
            await handlerRegister();
          }
        }
      },
    });

  const { useComissaoRegisterFetcher } = useComissaoRegister({
    email: useFormikProps.values.email,
    matricula: useFormikProps.values.matricula,
    name: useFormikProps.values.name,
    authorizationCode: useFormikProps.values.authorizationCode,
    cpf: useFormikProps.values.cpf,
    password: useFormikProps.values.password,
  });

  const { useComissaoLoginFetcher } = useComissaoLogin({
    matricula: useFormikProps.values.matricula,
    password: useFormikProps.values.password,
  });

  const {
    trigger: triggerRegister,
    isMutating: isMutatingRegister,
  }: SWRMutationResponse<any> = useSWRMutation(
    'useComissaoRegisterFetcher',
    useComissaoRegisterFetcher,
    {
      revalidate: false,
    },
  );

  const {
    trigger: triggerLogin,
    isMutating: isMutatingLogin,
  }: SWRMutationResponse<any> = useSWRMutation(
    'useComissaoLoginFetcher',
    useComissaoLoginFetcher,
    {
      revalidate: false,
    },
  );

  const handlerLogin = async () => {
    try {
      const response = await triggerLogin();
      console.log('response', response);
      const { data } = response;
      const token = data.data;
      login(token);
      navigate('/comissao/dashboard');
    } catch (error: AxiosError | any) {
      const errorMsg = getErrorMessage(error);
      setErrorMessage(errorMsg);
      setShowSnackbar(true);
    }
  };

  const handlerRegister = async () => {
    try {
      const response = await triggerRegister();
      const { data } = response;
      const { token } = data.data;
      login(token);
      navigate('/comissao/dashboard');
    } catch (error: AxiosError | any) {
      const errorMsg = getErrorMessage(error);
      setErrorMessage(errorMsg);
      setShowSnackbar(true);
    }
  };

  const handleButtonClick = () => {
    useFormikProps.submitForm();
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleModeChange = (newIsLoginMode: boolean) => {
    setIsLoginMode(newIsLoginMode);
    setCurrentStep(1);
    setErrorMessage(null);
    setShowSnackbar(false);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  if (isLoginMode) {
    return (
      <>
        <ErrorSnackbar
          open={showSnackbar}
          message={errorMessage}
          onClose={handleCloseSnackbar}
        />
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
            <Form
              useFormikProps={useFormikProps}
              handlerNextStep={handleButtonClick}
              isMobile={isMobile}
              isLoginMode={isLoginMode}
              setIsLoginMode={handleModeChange}
            />
          </Container>
        </Box>
      </>
    );
  }

  if (currentStep === 1) {
    return (
      <>
        <ErrorSnackbar
          open={showSnackbar}
          message={errorMessage}
          onClose={handleCloseSnackbar}
        />
        <StepOne
          useFormikProps={useFormikProps}
          handlerNextStep={handleButtonClick}
          isMobile={isMobile}
          setIsLoginMode={handleModeChange}
        />
      </>
    );
  }

  if (currentStep === 2) {
    return (
      <>
        <ErrorSnackbar
          open={showSnackbar}
          message={errorMessage}
          onClose={handleCloseSnackbar}
        />
        <StepTwo
          useFormikProps={useFormikProps}
          handlerNextStep={handleButtonClick}
          handlerPrevStep={handlePrevStep}
          isMobile={isMobile}
        />
      </>
    );
  }

  return null;
};

export default ComissaoLoginPage;
