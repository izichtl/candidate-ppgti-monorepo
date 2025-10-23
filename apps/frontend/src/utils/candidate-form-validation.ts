import * as Yup from 'yup';

const cpfRegex = /^\d{3}[\.\s-]?\d{3}[\.\s-]?\d{3}[\.\s-]?\d{2}$/;
const cepRegex = /^\d{5}-?\d{3}$/;
const phoneRegex = /^\(?\d{2}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}$/;

export const stepOneSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Obrigatório'),
  cpf: Yup.string()
    .required('Obrigatório')
    .matches(cpfRegex, 'CPF deve conter 11 dígitos'),
  social_name: Yup.string().required('Obrigatório'),
});
// export const stepOneSchema =

export const stepTwoSchema = Yup.object({
  name: Yup.string(),
  sex: Yup.string().required('Obrigatório'),
  registration_: Yup.string().required('Obrigatório'),
  // .matches(phoneRegex, 'Apenas números são permitidos'),
  registration_state: Yup.string().required('Obrigatório'),
  registration_place: Yup.string().required('Obrigatório'),
  address: Yup.string().required('Obrigatório'),
  address_number: Yup.string().required('Obrigatório'),
  // address_complement: Yup.string(),
  address_neighborhood: Yup.string().required('Obrigatório'),
  address_city: Yup.string().required('Obrigatório'),
  address_state: Yup.string().required('Obrigatório'),
  address_zipcode: Yup.string()
    .required('Obrigatório')
    .matches(cepRegex, 'CEP deve conter apenas 8 números'),
  cell_phone: Yup.string()
    .required('Obrigatório')
    .matches(phoneRegex, 'Número de celular inválido'),
  other_email: Yup.string().email().required('Obrigatório'),
  quota: Yup.string().required('Obrigatório'),
});

export const stepThreeSchema = Yup.object({
  education_level: Yup.string().required('Obrigatório'),
  graduation_course: Yup.string().required('Obrigatório'),
  graduation_year: Yup.string()
    .required('Obrigatório')
    .matches(/^\d{4}$/, 'Ano inválido'),
  graduation_institution: Yup.string().required('Obrigatório'),
  lattes_link: Yup.string()
    .required('Obrigatório')
    .test(
      'contains-lattes',
      'A URL deve conter "lattes.cnpq.br"',
      (value) => !value || value.includes('lattes.cnpq.br'),
    ),
});

export function getValidationSchema(step: number, accessType: string) {
  const isCandidate = accessType === 'register';
  const social_name_validation = isCandidate
    ? Yup.string().required('Obrigatório')
    : Yup.string().notRequired();
  switch (step) {
    case 1:
      return Yup.object({
        email: Yup.string().email('Email inválido').required('Obrigatório'),
        cpf: Yup.string()
          .required('Obrigatório')
          .matches(cpfRegex, 'CPF deve conter 11 dígitos'),

        social_name: social_name_validation,
      });
    case 2:
      return stepTwoSchema;
    case 3:
      return stepThreeSchema;
    default:
      return Yup.object();
  }
}
