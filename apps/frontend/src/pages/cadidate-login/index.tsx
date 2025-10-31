import React, { useEffect, useState, useRef } from 'react';
import { Alert, Box, Snackbar } from '@mui/material';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';
import { useFormik, FormikProps } from 'formik';
import { AxiosError } from 'axios';

import StepOne from './step-1-one';
import StepTwo from './step-2-two';
import StepThree from './step-3-three';
import StepFour from './step-4-four';
import { useCandidateLogin } from '../../hooks/candidate-login';
import { getUserFromToken } from '../../utils/get-user-from-token';
import { useAuth } from '../../hooks/auth';
import { getValidationSchema } from '../../utils/candidate-form-validation';
import { useCandidateUpdate } from '../../hooks/candidate-data';
import { mapUserToFormikValues } from '../../utils/formik-modeler';
import FullScreenLoader from '../../components/loading';
import LoadingBox from '../../components/loading-box';
import StepAccessChoice from './step-choice';
import { useGetCandidateValidation } from '../../hooks/get-candidate-validation';
import { useNavigate } from 'react-router-dom';

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

const STEPS = {
  AUTH: 1,
  CHOICE: 2,
  PERSONAL: 3,
  ACADEMIC: 4,
  DOCUMENTS: 5,
} as const;

const Login: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(STEPS.AUTH);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [accessType, setAccessType] = useState<'register' | 'login'>(
    'register'
  );
  const [shouldEditData, setShouldEditData] = useState<boolean | null>(true);

  const { login, logout } = useAuth();
  const navigate = useNavigate();

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
      validateOnChange: true,
      validationSchema: getValidationSchema(currentStep, accessType),
      onSubmit: async () => {
        if (currentStep === STEPS.AUTH) {
          await handlerLogin();
        }
        if (currentStep === STEPS.PERSONAL) {
          await handlerStepUpdate(STEPS.ACADEMIC);
        }
        if (currentStep === STEPS.ACADEMIC) {
          await handlerStepUpdate(STEPS.DOCUMENTS);
        }
      },
    });

  const handleAccessTypeChange = (newAccessType: 'register' | 'login') => {
    setAccessType(newAccessType);
    setLoginError(null);
    setShowSnackbar(false);
    setCurrentStep(STEPS.AUTH);
    setShouldEditData(newAccessType === 'register' ? true : null);
    useFormikProps.resetForm({ values: initial });
  };

  const { useCandidateLoginFetcher } = useCandidateLogin({
    email: useFormikProps.values.email,
    cpf: useFormikProps.values.cpf,
    social_name: useFormikProps.values.social_name,
  });

  const { trigger: triggerLogin, isMutating }: SWRMutationResponse<any> =
    useSWRMutation('useCandidateLoginFetcher', useCandidateLoginFetcher, {
      revalidate: false,
    });

  const stepUpdateKey: 'stepTwo' | 'stepThree' =
    currentStep === STEPS.PERSONAL ? 'stepTwo' : 'stepThree';

  const { useCandidateUpdateFetcher } = useCandidateUpdate(
    useFormikProps.values,
    stepUpdateKey
  );

  const {
    trigger: triggerUpdateCandidate,
    isMutating: isMutatingUpdate,
  }: SWRMutationResponse<any> = useSWRMutation(
    `useCandidateUpdateFetcher-${stepUpdateKey}`,
    useCandidateUpdateFetcher,
    {
      revalidate: false,
    }
  );
  const { cadidateValid, cadidateValidLoading, cadidateValidError } =
    useGetCandidateValidation(useFormikProps.values.cpf);

  const handlerLogin = async () => {
    try {
      const response = await triggerLogin();
      const { data } = response;
      const { token } = data.data;
      login(token);
      const user = await getUserFromToken(token);
      useFormikProps.setValues(mapUserToFormikValues(user, initial));

      if (accessType === 'register') {
        setShouldEditData(true);
        setCurrentStep(STEPS.PERSONAL);
      } else {
        setShouldEditData(null);
        setCurrentStep(STEPS.CHOICE);
      }
    } catch (error: AxiosError | any) {
      const response = error?.response?.data;
      if (response?.code === '23505') {
        setLoginError(
          `O email ou CPF já estão em uso. A combinação precisa ser única.
          Faça login para continuar.
          `
        );
      } else {
        setLoginError(
          'Ocorreu um erro ao tentar fazer login. Tente novamente.'
        );
      }
      setShowSnackbar(true);
    }
  };

  const handlerStepUpdate = async (nextStep: number) => {
    try {
      await triggerUpdateCandidate();
      setCurrentStep(nextStep);
    } catch (error: AxiosError | any) {
      setLoginError('Ocorreu um erro ao atualizar os dados. Tente novamente.');
      setShowSnackbar(true);
    }
  };

  const handleEditChoice = (shouldEdit: boolean) => {
    if (shouldEdit) {
      setShouldEditData(true);
      setCurrentStep(STEPS.PERSONAL);
      return;
    }

    setShouldEditData(false);
    setCurrentStep(STEPS.DOCUMENTS);
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
  }, [logout]);

  useEffect(() => {
    console.log(isValid, 'pre-pos');
    if (
      cadidateValid !== null &&
      cadidateValid &&
      cadidateValidError === undefined
    ) {
      setIsValid(Boolean(cadidateValid));
    }
  }, [cadidateValid, cadidateValidLoading, cadidateValidError]);

  useEffect(() => {
    useFormikProps.setErrors({});
    useFormikProps.setTouched({});
  }, [currentStep]);

  const useGoToDashboard = () => {
    navigate('/candidate/dashboard');
  };

  const shouldDisplayPersonalSteps = shouldEditData !== false;
  const isLoading = isMutating || isMutatingUpdate;

  return (
    <Box>
      {isLoading && (
        <LoadingBox>
          <FullScreenLoader />
        </LoadingBox>
      )}

      {!isLoading && (
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
                  severity='error'
                  onClose={() => setShowSnackbar(false)}
                  sx={{ width: '100%' }}
                >
                  {loginError}
                </Alert>
              </Snackbar>
            </Box>
          )}

          {currentStep === STEPS.AUTH && (
            <StepOne
              setAccessType={handleAccessTypeChange}
              accessType={accessType}
              useFormikProps={useFormikProps}
              setCurrentStep={setCurrentStep}
              handlerNextStep={handleButtonClick}
            />
          )}

          {currentStep === STEPS.CHOICE && accessType === 'login' && (
            <StepAccessChoice
              onEdit={() => handleEditChoice(true)}
              onSkip={useGoToDashboard}
              disabled={isValid}
            />
          )}

          {currentStep === STEPS.PERSONAL && shouldDisplayPersonalSteps && (
            <StepTwo
              useFormikProps={useFormikProps}
              setCurrentStep={setCurrentStep}
              handlerNextStep={handleButtonClick}
              quotaOptions={quotaOptions}
            />
          )}

          {currentStep === STEPS.ACADEMIC && shouldDisplayPersonalSteps && (
            <StepThree
              useFormikProps={useFormikProps}
              setCurrentStep={setCurrentStep}
              handlerNextStep={handleButtonClick}
              quotaOptions={quotaOptions}
            />
          )}

          {currentStep === STEPS.DOCUMENTS && (
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
