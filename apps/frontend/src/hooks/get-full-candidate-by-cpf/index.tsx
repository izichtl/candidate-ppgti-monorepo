import useSWR from 'swr';
import { APIDecoratorWithBaseURI } from '../../service';

export type CandidateDocumentProps = {
  id: number;
  cpf: string;
  score_form?: string | null;
  diploma_certificate?: string | null;
  undergraduate_transcript?: string | null;
  electoral_clearance?: string | null;
  proof_of_residence?: string | null;
  military_clearance?: string | null;
  quota_declaration_admission?: string | null;
  quota_declaration_if?: string | null;
  registration_clearance?: string | null;
  employment_link?: string | null;
};

export type CandidateProps = {
  id: number;
  email: string;
  cpf: string;
  name?: string | null;
  social_name?: string | null;
  sex?: string | null;
  registration_?: string | null;
  registration_state?: string | null;
  registration_place?: string | null;
  address?: string | null;
  address_number?: string | null;
  address_complement?: string | null;
  address_neighborhood?: string | null;
  address_city?: string | null;
  address_state?: string | null;
  address_zipcode?: string | null;
  cell_phone?: string | null;
  phone?: string | null;
  other_email?: string | null;
  education_level?: string | null;
  graduation_course?: string | null;
  graduation_year?: string | null;
  graduation_institution?: string | null;
  specialization_course?: string | null;
  specialization_year?: string | null;
  specialization_institution?: string | null;
  lattes_link?: string | null;
  quota_id?: number | null;
};

export type CandidateFullDataResponse = {
  candidate: CandidateProps;
  documents: CandidateDocumentProps;
};

export const useGetCandidateFullData = () => {
  const url = '/v1/candidate/full-data';

  const fetchData = async () => {
    return await APIDecoratorWithBaseURI().get(url);
  };

  const { data, error, isLoading, mutate } = useSWR<any>(url, fetchData);
  const candidateFullData: CandidateFullDataResponse | null =
    data?.data?.data || null;

  return {
    candidateFullData,
    candidateFullDataLoading: isLoading,
    candidateFullDataError: error,
    mutateCandidateFullData: mutate,
  };
};

// use
// const { candidateFullData } = useGetCandidateFullData('12345678900');
