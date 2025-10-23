import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  useMediaQuery,
  useTheme,
  Stack,
} from '@mui/material';
import { useFileUpload } from '../../../hooks/file-uploader';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';
import UploaderField from '../../../components/uploader/index';
import { filePrefixes } from '../../../utils/files-hash-mapper';
import { sanitizeFilename } from '../../../utils/file-sanitazer';
import { useGetCandidateFiles } from '../../../hooks/file-lister';
import FullScreenLoader from '../../../components/loading';
import { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import ScrollToTop from '../../../components/scroll-top';
import LoadingBox from '../../../components/loading-box';

type FileNameProps = {
  prefix: string;
  name: string;
};

interface UserFiles {
  cpf: string;
  id: number;
  proof_of_residence: string | null;
  quota_declaration_admission: string | null;
  quota_declaration_if: string | null;
  diploma_certificate: string | null;
  score_form: string | null;
  undergraduate_transcript: string | null;
  registration_clearance: string | null;
  electoral_clearance: string | null;
  military_clearance: string | null;
}

const initialFiles: UserFiles = {
  cpf: '',
  id: 0,
  proof_of_residence: null,
  quota_declaration_admission: null,
  quota_declaration_if: null,
  diploma_certificate: null,
  registration_clearance: null,
  score_form: null,
  undergraduate_transcript: null,
  electoral_clearance: null,
  military_clearance: null,
};

function extractFileName(fileName: string): string {
  const parts = fileName.split('_eh');
  return parts.length > 1 ? parts[1] : fileName;
}

const StepFour = ({ cpf, sex, quota }: any) => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<FileNameProps>({
    prefix: '',
    name: '',
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [fileSelected, setFileSelected] = useState<string | null>(null);
  const [candidateFiles, setCandidateFiles] = useState<UserFiles>(initialFiles);
  const [hasUploadedFile, setHasUploadedFile] = useState(true);

  const { files, filesLoading, filesError } = useGetCandidateFiles();

  const { useFileUploadFetcher } = useFileUpload({
    file: file as File,
    cpf: cpf,
    prefix: fileName.prefix,
    name: fileName.name,
  });

  const { trigger: triggerUploader, isMutating }: SWRMutationResponse<any> =
    useSWRMutation('useFileUploadFetcher', useFileUploadFetcher, {
      revalidate: false,
    });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    prefix: string,
  ) => {
    const selectedFile = event.target.files?.[0];
    const name = selectedFile?.name as string;
    if (selectedFile) {
      setFile(selectedFile);
      setFileName({ prefix, name: sanitizeFilename(name) });
      setFileSelected(prefix);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setRefreshing(true);
    try {
      await triggerUploader();
      await mutate('/v1/file-manager/list/candidate', undefined, {
        revalidate: true,
      });
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
    } finally {
      setUploading(false);
      setFile(null);
      setFileSelected(null);
    }
  };

  const useGoToDashboard = () => {
    navigate('/candidate/dashboard');
  };

  useEffect(() => {
    if (files.id !== undefined) {
      setCandidateFiles(files);
      setRefreshing(false);
    }
  }, [files]);

  useEffect(() => {
    const inputs: any = document.querySelectorAll('input[type="file"]');
    let hasFile = false;

    for (const input of inputs) {
      const key = input.dataset.id;
      console.log('Verificando arquivo para:', key);
      if (key && candidateFiles[key] === null) {
        console.log('Arquivo presente para:', key);
        hasFile = true;
        break;
      }
    }
    setHasUploadedFile(hasFile);
  }, [candidateFiles]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (refreshing || filesLoading) {
    return (
      <LoadingBox>
        <FullScreenLoader />
      </LoadingBox>
    );
  }

  return (
    <>
      {candidateFiles.id !== 10 && (
        <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', p: 2, pt: 8 }}>
          <Paper
            elevation={isMobile ? 0 : 3}
            sx={{
              maxWidth: 900,
              mx: 'auto',
              p: 4,
              borderRadius: isMobile ? 0 : 2,
              bgcolor: '#fff',
            }}
          >
            <ScrollToTop />
            <Typography variant="h5" align="center" gutterBottom>
              Comprovantes
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              gutterBottom
            >
              Anexe os documentos solicitados abaixo.
            </Typography>

            <Stack spacing={3}>
              {filePrefixes.map((input: any) => {
                const id: string = input.id;
                const name: string = candidateFiles[id];
                const parsedName = name !== null ? extractFileName(name) : '';
                const sexField = sex === input.control;
                const quotaField = quota === input.control;
                return (
                  (input.control === '' || quotaField || sexField) && (
                    <Box key={id}>
                      <UploaderField
                        hasFile={candidateFiles[id] !== null}
                        url={candidateFiles[id]}
                        name={parsedName}
                        loading={isMutating}
                        fileSelected={fileSelected}
                        filePrefix={input.id}
                        onClick={handleUpload}
                        onChange={handleFileChange}
                        title={input.label}
                      />
                    </Box>
                  )
                );
              })}
            </Stack>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                disabled={hasUploadedFile}
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                }}
                onClick={useGoToDashboard}
              >
                {uploading ? 'Enviando...' : 'Finalizar'}
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default StepFour;
