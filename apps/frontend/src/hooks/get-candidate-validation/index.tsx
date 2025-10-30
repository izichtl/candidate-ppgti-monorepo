import useSWR from 'swr';
import { APIDecoratorWithBaseURI } from '../../service';

export type ValidationByProcess = Record<
  number,
  {
    reachedLimit: boolean;
    topicsUsed: number[];
  }
>;

export type UserApplicationsResponse = {
  success: boolean;
  message: string;
  data: ValidationByProcess;
};

export type UpdateSelectionProcessProps = Partial<UserApplicationsResponse>;

export const useGetCandidateValidation = (
  cpf: string | undefined = undefined
) => {
  let params = cpf !== undefined && cpf !== '' ? cpf : undefined;
  console.log(params, 'entrada');
  const url = `/v1/candidate/data/validation?cpf=${params}`;

  const fetchData = async (): Promise<UserApplicationsResponse> => {
    const response =
      await APIDecoratorWithBaseURI().get<UserApplicationsResponse>(url);
    return response.data;
  };

  const { data, error, isLoading } = useSWR<UserApplicationsResponse>(
    url,
    fetchData
  );

  const cadidateValid: ValidationByProcess | null = data?.data ?? null;

  return {
    cadidateValid,
    cadidateValidLoading: isLoading,
    cadidateValidError: error,
  };
};
