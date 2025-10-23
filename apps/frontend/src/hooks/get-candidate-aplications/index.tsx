import useSWR from 'swr';
import { APIDecoratorWithBaseURI } from '../../service';

export type UserApplication = {
  application_id: number;
  program: string;
  period: string;
  line: string;
  line_id: number;
  topic: string;
  topic_id: number;
  tittle: string;
  date: string; // formato "DD-MM-YYYY"
  project_url: string;
  valid: boolean;
  process_id: number;
};

export type UserApplicationsResponse = {
  success: boolean;
  message: string;
  data: UserApplicationsResponseData;
};

export type UserApplicationsResponseData = {
  valid: UserApplication[];
  outdated: UserApplication[];
};

export type UpdateSelectionProcessProps = Partial<UserApplication>;

export const useGetCandidateAplications = () => {
  const url = '/v1/candidate/aplications';

  const fetchData = async (): Promise<UserApplicationsResponse> => {
    const response =
      await APIDecoratorWithBaseURI().get<UserApplicationsResponse>(url);
    return response.data;
  };

  const { data, error, isLoading } = useSWR<UserApplicationsResponse>(
    url,
    fetchData,
  );

  const aplications: UserApplicationsResponseData = data?.data ?? {
    valid: [],
    outdated: [],
  };

  return {
    aplications,
    aplicationsLoading: isLoading,
    aplicationsError: error,
  };
};
