import { APIDecoratorWithBaseURI } from '../../service';

export type HomologationPayload = {
  application_id: number;
  process_id: number;
  personal_data: boolean;
  academic_data: boolean;
  documents_data: boolean;
  quota_data: boolean;
  project_data: boolean;
  justify: string;
  final_status: 'compliant' | 'rejected';
};

export const useHomologateApplication = (payload: HomologationPayload) => {
  console.log(payload);
  const useHomologateFetcher = async () => {
    return await APIDecoratorWithBaseURI().post(
      `/v1/applications/homolog`,
      payload,
    );
  };

  return {
    useHomologateFetcher,
  };
};
