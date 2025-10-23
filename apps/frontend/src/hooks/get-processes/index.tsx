import useSWR from 'swr';
import { APIDecoratorWithBaseURI } from '../../service';
// TODO AJUSTAR OS TIPOS
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

export const useGetSelectionProcesses = () => {
  const url: string = '/v1/selection-processes';

  const fetchData = async () => {
    return await APIDecoratorWithBaseURI().get(url);
  };
  const { data, error, isLoading } = useSWR<any>(url, fetchData);
  const processes = data?.data?.data || [];

  return {
    processes,
    processesLoading: isLoading,
    processesError: error,
  };
};
