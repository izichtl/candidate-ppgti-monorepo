import { APIDecoratorWithBaseURI } from '../../service';

export type CandidateLoginProps = {
  email: string;
  cpf: string;
  social_name: string;
};

export interface CourtesySaleRequesteResponse {
  success: boolean;
  mensagem: string;
}

export const useCandidateLogin = (payload: CandidateLoginProps) => {
  const useCandidateLoginFetcher = async () => {
    return await APIDecoratorWithBaseURI().post('/v1/auth/register', {
      ...payload,
    });
  };

  return {
    useCandidateLoginFetcher,
  };
};
