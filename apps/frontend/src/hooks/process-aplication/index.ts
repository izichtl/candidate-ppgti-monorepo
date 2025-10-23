import { APIDecoratorWithBaseURI } from '../../service';

export type FileUploadProps = {
  file: File;
  name: string;
  cpf: string;
  prefix: string;
};

export interface FileUploadResponse {
  success: boolean;
  mensagem: string;
}

export const useProcessAplication = (payload: any) => {
  const useProcessAplicationFetcher = async () => {
    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('process_id', payload.process_id);
    formData.append('research_line_id', payload.research_line_id);
    formData.append('research_topic_id', payload.research_topic_id);
    formData.append('project_title', payload.project_title);
    formData.append('project_file_name', payload.project_file_name);

    return await APIDecoratorWithBaseURI().post(
      `/v1/applications/register`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  };

  return {
    useProcessAplicationFetcher,
  };
};
