import { APIDecoratorWithBaseURI } from '../../service';

export type ComissaoRegisterProps = {
  email: string;
  matricula: string;
  name: string;
  authorizationCode: string;
  cpf: string;
  password: string;
};

export type ComissaoLoginProps = {
  matricula: string;
  password: string;
};

export const useComissaoRegister = (payload: ComissaoRegisterProps) => {
  const useComissaoRegisterFetcher = async () => {
    return await APIDecoratorWithBaseURI().post(
      '/v1/auth/committee/register',
      payload,
    );
  };

  return {
    useComissaoRegisterFetcher,
  };
};

export const useComissaoLogin = (payload: ComissaoLoginProps) => {
  const useComissaoLoginFetcher = async () => {
    return await APIDecoratorWithBaseURI().post(
      '/v1/auth/committee/login',
      payload,
    );
  };

  return {
    useComissaoLoginFetcher,
  };
};
