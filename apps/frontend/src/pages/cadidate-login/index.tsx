import React, { useEffect, useState, useRef } from 'react';
import { Alert, Box, Snackbar } from '@mui/material';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';
import { useCandidateLogin } from '../../hooks/candidate-login';
import { AxiosError } from 'axios';

import { useFormik, FormikProps } from 'formik';
import StepOne from './step-1-one';
import StepTwo from './step-2-two';
import StepThree from './step-3-three';
import { getUserFromToken } from '../../utils/get-user-from-token';
import { useAuth } from '../../hooks/auth';
import { getValidationSchema } from '../../utils/candidate-form-validation';
import { useCandidateUpdate } from '../../hooks/candidate-data';
import StepFour from './step-4-four';
import { mapUserToFormikValues } from '../../utils/formik-modeler';
import FullScreenLoader from '../../components/loading';
import LoadingBox from '../../components/loading-box';

// TODO
// revisar os dados do step 1
// revisar os dados do step 2
// revisar os dados do step 3
// ajustar os botões para padrão
// ajustar e revisar o componente de upload
// traduzir o componente de upload
// implementar um botão de voltar ??

// !TODO
// ajustar o step 4 para receber os documentos

export type quotaOptionsPros = {
  id: number;
  label: string;
  value: string;
};

const quotaOptions: quotaOptionsPros[] = [
  { id: 1, label: 'Não Optante', value: 'nao_optante' },
  { id: 2, label: 'Afrodescendente ou Indígena', value: 'afro_ou_inde' },
  { id: 3, label: 'Pessoa com Deficiência', value: 'pcd' },
  { id: 4, label: 'Servidor permanente do IFPB', value: 'servidor_if' },
];

const Login: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [accessType, setAccessType] = useState<'register' | 'login'>(
    'register',
  );

  const { login, logout } = useAuth();

  type initialCandidateProps = {
    // step-one
    // auth-data
    email: string;
    cpf: string;
    name: string;

    // step-two
    // personal-data
    social_name: string;
    sex: string;
    registration_: string;
    registration_state: string;
    registration_place: string;
    address: string;
    address_number: string;
    address_complement: string;
    address_neighborhood: string;
    address_city: string;
    address_state: string;
    address_zipcode: string;
    cell_phone: string;
    phone: string;
    other_email: string;
    quota: string;
    quota_id: number;

    //  step-three
    // academic-data
    education_level?: string;
    graduation_course?: string;
    graduation_year?: string;
    graduation_institution?: string;
    specialization_course?: string;
    specialization_year?: string;
    specialization_institution?: string;
    lattes_link?: string;
    // control
  };

  const initial: initialCandidateProps = {
    email: '',
    cpf: '',
    name: '',
    social_name: '',
    sex: '',
    registration_: '',
    registration_state: '',
    registration_place: '',
    address: '',
    address_number: '',
    address_complement: '',
    address_neighborhood: '',
    address_city: '',
    address_state: '',
    address_zipcode: '',
    cell_phone: '',
    phone: '',
    other_email: '',
    quota: 'nao_optante',
    quota_id: 1,
    education_level: '',
    graduation_course: '',
    graduation_year: '',
    graduation_institution: '',
    specialization_course: '',
    specialization_year: '',
    specialization_institution: '',
    lattes_link: '',
  };

  const useFormikProps: FormikProps<initialCandidateProps> =
    useFormik<initialCandidateProps>({
      initialValues: initial,
      validateOnBlur: true,
      validateOnMount: false,
      validateOnChange: false,
      validationSchema: getValidationSchema(currentStep, accessType),
      onSubmit: async (values: initialCandidateProps) => {
        if (currentStep === 1) {
          await handlerLogin();
        }
        if (currentStep === 2) {
          await handlerStepUpdate();
        }
        if (currentStep === 3) {
          await handlerStepUpdate();
        }
      },
    });

  const { useCandidateLoginFetcher } = useCandidateLogin({
    email: useFormikProps.values.email,
    cpf: useFormikProps.values.cpf,
    social_name: useFormikProps.values.social_name,
  });

  const { trigger: triggerLogin, isMutating }: SWRMutationResponse<any> =
    useSWRMutation('useCandidateLoginFetcher', useCandidateLoginFetcher, {
      revalidate: false,
    });

  const { useCandidateUpdateFetcher } = useCandidateUpdate(
    useFormikProps.values,
    currentStep === 2 ? 'stepTwo' : 'stepThree',
  );

  const {
    trigger: triggerUpdateStepTwo,
    isMutating: isMutatingStepTwo,
  }: SWRMutationResponse<any> = useSWRMutation(
    'useCandidateUpdateFetcher',
    useCandidateUpdateFetcher,
    {
      revalidate: false,
    },
  );

  const handlerLogin = async () => {
    try {
      const response = await triggerLogin();
      const { data } = response;
      // isLogin controla se ele esta sendo cadastrado ou logado
      const { token } = data.data;
      login(token);
      const user = await getUserFromToken(token);
      useFormikProps.setValues(mapUserToFormikValues(user, initial));
      setCurrentStep((prevStep) => prevStep + 1);
    } catch (error: AxiosError | any) {
      const response = error?.response?.data;
      if (response?.code === '23505') {
        setLoginError(
          'O email ou CPF já estão em uso. A combinação precisa ser única.',
        );
      } else {
        setLoginError(
          'Ocorreu um erro ao tentar fazer login. Tente novamente.',
        );
      }
      setShowSnackbar(true);
    }
  };
  const handlerStepUpdate = async () => {
    try {
      await triggerUpdateStepTwo();
      setCurrentStep((prevStep) => prevStep + 1);
    } catch (error: AxiosError | any) {
      setLoginError('Ocorreu um erro ao tentar fazer login. Tente novamente.');
      setShowSnackbar(true);
    }
  };

  const handleButtonClick = () => {
    useFormikProps.submitForm();
  };

  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (!hasLoggedOut.current) {
      logout();
      hasLoggedOut.current = true;
    }
  }, []);

  useEffect(() => {
    useFormikProps.setErrors({});
    useFormikProps.setTouched({});
  }, [currentStep]);
  return (
    <Box>
      {(isMutating || isMutatingStepTwo) && (
        <LoadingBox>
          <FullScreenLoader />
        </LoadingBox>
      )}
      {(!isMutating || !isMutatingStepTwo) && (
        <>
          {loginError && (
            <Box mb={2}>
              <Snackbar
                open={showSnackbar}
                autoHideDuration={5000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert
                  severity="error"
                  onClose={() => setShowSnackbar(false)}
                  sx={{ width: '100%' }}
                >
                  {loginError}
                </Alert>
              </Snackbar>
            </Box>
          )}
          {currentStep === 1 && (
            <StepOne
              setAccessType={setAccessType}
              accessType={accessType}
              useFormikProps={useFormikProps}
              setCurrentStep={setCurrentStep}
              handlerNextStep={handleButtonClick}
            />
          )}
          {currentStep === 2 && (
            <StepTwo
              useFormikProps={useFormikProps}
              setCurrentStep={setCurrentStep}
              handlerNextStep={handleButtonClick}
              quotaOptions={quotaOptions}
            />
          )}
          {currentStep === 3 && (
            <StepThree
              useFormikProps={useFormikProps}
              setCurrentStep={setCurrentStep}
              handlerNextStep={handleButtonClick}
              quotaOptions={quotaOptions}
            />
          )}
          {currentStep === 4 && (
            <StepFour
              cpf={useFormikProps.values.cpf}
              sex={useFormikProps.values.sex}
              quota={useFormikProps.values.quota}
              handlerNextStep={handleButtonClick}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Login;
