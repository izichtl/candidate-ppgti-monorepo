// @ts-nocheck
// TODO AJUSTAR TYPES
import { ResponsePayload } from '../../middlewares/response';
import { controllerWrapper } from '../../lib/controllerWrapper';
import { authGuard, getUserFromToken } from '../../middlewares/auth';
import { supabase } from '../../db';
import supabaseSignedUrl from '../../storage';
import { handlerCandidateFiles } from '../../models/cadidate-files';
import { validateRequiredFields } from '../../utils/user-data-is-valid';

export const getCandidateFullData = controllerWrapper(async (_req, _res) => {
  const token = _req.headers['authorization'];
  const guardResponse: ResponsePayload = authGuard(token as string);

  if (guardResponse.error) {
    return _res.response.failure(guardResponse);
  }

  const user = await getUserFromToken(token as string);
  const { cpf } = user as any;

  // Busca dados do candidato
  const { data: candidateData, error: candidateError } = await supabase
    .from('candidates')
    .select('*')
    .eq('cpf', cpf)
    .maybeSingle();

  if (candidateError || !candidateData) {
    return _res.response.failure({
      message: 'Falha ao buscar dados do candidato',
      status: 500,
      error: candidateError,
    });
  }

  const validatedCandidate = validateRequiredFields(candidateData);

  // Busca arquivos/documentos
  const candidateFiles = await handlerCandidateFiles(cpf);
  console.log(candidateFiles, 'files');

  if (candidateFiles?.error) {
    return _res.response.failure(candidateFiles);
  }

  // Gera URLs assinadas para os arquivos
  const signedUrls = await Promise.all(
    Object.entries(candidateFiles.data || {}).map(async ([key, value]) => {
      if (typeof value === 'string' && value !== null) {
        try {
          console.log(value);
          const url = await supabaseSignedUrl(value);
          return [key, url];
        } catch (error) {
          console.error(`Erro ao assinar ${key}:`, error);
          return [key, null];
        }
      }
      return [key, null];
    })
  );

  const signedUrlsObject = Object.fromEntries(signedUrls);
  signedUrlsObject.id = candidateFiles.data.id;
  signedUrlsObject.cpf = candidateFiles.data.cpf;

  // Retorno final unificado
  return _res.response.success({
    message: 'Dados completos do candidato',
    status: 200,
    data: {
      candidate: candidateData,
      documents: signedUrlsObject,
    },
  });
});
