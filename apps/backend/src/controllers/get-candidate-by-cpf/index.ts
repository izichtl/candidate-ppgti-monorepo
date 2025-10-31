import { ResponsePayload } from '../../middlewares/response';
import { controllerWrapper } from '../../lib/controllerWrapper';
import { supabase } from '../../db';
import { authGuard, getUserFromToken } from '../../middlewares/auth';
import {
  validateRequiredDocuments,
  validateRequiredFields,
} from '../../utils/user-data-is-valid';

export const getCadidateByCPF = controllerWrapper(async (_req, _res) => {
  console.log('@@@@@@@@');
  console.log('@@@@@@@@');
  console.log('@@@@@@@@');
  console.log('@@@@@@@@');
  console.log('@@@@@@@@');
  const token = _req.headers['authorization'];
  const guardResponse: ResponsePayload = authGuard(token as string);
  if (guardResponse.error) {
    return _res.response.failure(guardResponse);
  }
  const user: any = await getUserFromToken(token as string);
  let cpf: string = '';
  if (_req.query.cpf !== 'undefined' && _req.query.cpf !== '') {
    cpf = _req.query.cpf as string;
    console.log('used cpf');
  } else {
    cpf = user.cpf as any;
    console.log('used token');
  }

  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .eq('cpf', cpf)
    .maybeSingle();

  if (error !== null) {
    _res.response.failure({
      message: 'Falha ao validar dados do usuário',
      status: 500,
    });
  }

  const isValid = validateRequiredFields(data);
  const { quota_id, sex } = data;

  const { data: documents, error: errorDocuments } = await supabase
    .from('candidate_documents')
    .select('*')
    .eq('cpf', cpf)
    .maybeSingle();

  if (errorDocuments !== null) {
    _res.response.success({
      message: 'Falha ao validar documentos do usuário',
      status: 200,
      data: false,
    });
  }

  const isValidDocuments = validateRequiredDocuments(documents, sex, quota_id);

  return _res.response.success({
    message: 'Usuário validado',
    status: 200,
    data: isValid && isValidDocuments,
  });
});
