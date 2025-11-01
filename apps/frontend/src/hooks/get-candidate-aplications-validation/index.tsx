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

export const useGetCandidateAplicationsValidation = () => {
  const url = '/v1/candidate/validation';

  const fetchData = async (): Promise<UserApplicationsResponse> => {
    const response =
      await APIDecoratorWithBaseURI().get<UserApplicationsResponse>(url);
    return response.data;
  };

  const { data, error, isLoading } = useSWR<UserApplicationsResponse>(
    url,
    fetchData
  );

  const aplicationsValidation: ValidationByProcess | null = data?.data ?? null;

  return {
    aplicationsValidation,
    aplicationsValidationLoading: isLoading,
    aplicationsValidationError: error,
  };
};
