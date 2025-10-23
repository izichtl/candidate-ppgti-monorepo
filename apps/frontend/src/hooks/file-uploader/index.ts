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

export const useFileUpload = (payload: FileUploadProps) => {
  const useFileUploadFetcher = async () => {
    const formData = new FormData();
    formData.append('file', payload.file);
    console.log(payload, 'p');
    return await APIDecoratorWithBaseURI().post(
      `/v1/file-manager/upload?cpf=${payload.cpf}&column=${payload.prefix}&prefix=_sh${payload.prefix}eh_&name=${payload.name}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  };

  return {
    useFileUploadFetcher,
  };
};
