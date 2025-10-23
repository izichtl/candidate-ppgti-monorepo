import { APIDecoratorWithBaseURI } from '../../service';

export type SelectionProcessProps = {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  application_deadline: string;
  result_date: string;
  documents_required: string[];
  evaluation_criteria: string;
  contact_info: string;
  status: 'draft' | 'published' | 'closed';
  program: string;
  year: string;
  semester: string;
};

export type UpdateSelectionProcessProps = Partial<SelectionProcessProps>;

export const useCreateSelectionProcess = (payload: SelectionProcessProps) => {
  const useCreateSelectionProcessFetcher = async () => {
    return await APIDecoratorWithBaseURI().post(
      '/v1/selection-processes',
      payload,
    );
  };

  return {
    useCreateSelectionProcessFetcher,
  };
};

export const useGetSelectionProcesses = () => {
  const useGetSelectionProcessesFetcher = async () => {
    return await APIDecoratorWithBaseURI().get('/v1/selection-processes');
  };

  return {
    useGetSelectionProcessesFetcher,
  };
};

export const useGetSelectionProcessById = (id: string) => {
  const useGetSelectionProcessByIdFetcher = async () => {
    return await APIDecoratorWithBaseURI().get(`/v1/selection-processes/${id}`);
  };

  return {
    useGetSelectionProcessByIdFetcher,
  };
};

export const useUpdateSelectionProcess = (
  id: string,
  payload: UpdateSelectionProcessProps,
) => {
  const useUpdateSelectionProcessFetcher = async () => {
    return await APIDecoratorWithBaseURI().put(
      `/v1/selection-processes/${id}`,
      payload,
    );
  };

  return {
    useUpdateSelectionProcessFetcher,
  };
};

export const useDeleteSelectionProcess = (id: string) => {
  const useDeleteSelectionProcessFetcher = async () => {
    return await APIDecoratorWithBaseURI().delete(
      `/v1/selection-processes/${id}`,
    );
  };

  return {
    useDeleteSelectionProcessFetcher,
  };
};
