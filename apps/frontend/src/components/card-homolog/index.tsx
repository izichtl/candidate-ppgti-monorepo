import React, { useState } from 'react';
import { Button, Box, Stack, useTheme, Snackbar, Alert } from '@mui/material';
import PersonalDataCard from './cards/personal';
import AcademicDataCard from './cards/academic';
import RequiredDocumentsCard from './cards/documents';
import QuotaInfoCard from './cards/quotta';
import PreProjectCard from './cards/project';
import { useBoolean } from '../../hooks/use-boolean';
import ConfirmTextInputModal from './modal';
import { useHomologateApplication } from '../../hooks/create-application-homolog';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';
import { useNavigate, useParams } from 'react-router-dom';
type SelectProcess = {
  data: any;
  processId: number;
  applicationId: number;
  statusColor?: string;
  onApply?: (id: number) => void;
};

const HomologDataCard: React.FC<SelectProcess> = ({
  data,
  statusColor,
  processId,
  applicationId,
}) => {
  const theme = useTheme();
  const borderColor = statusColor || theme.palette.success.main;
  const navigate = useNavigate();

  // Estado para controlar o Switch
  const [isSuccess, setIsSuccess] = useState(false);
  const [justify, setJustify] = useState('');
  const [checkedDadosPessoais, setCheckedDadosPessoais] = useState(false);
  const [checkedDadosAcademicos, setCheckedDadosAcademicos] = useState(false);
  const [checkedDocumentos, setCheckedDocumentos] = useState(false);
  const [checkedCotas, setCheckedCotas] = useState(false);
  const [checkedPreProjeto, setCheckedPreProjeto] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as 'success' | 'error' | 'warning' | 'info',
  });

  const modal = useBoolean();

  const { useHomologateFetcher } = useHomologateApplication({
    application_id: applicationId,
    process_id: processId,
    personal_data: checkedDadosPessoais,
    academic_data: checkedDadosAcademicos,
    documents_data: checkedDocumentos,
    quota_data: checkedCotas,
    project_data: checkedPreProjeto,
    justify: justify,
    final_status: isSuccess ? 'compliant' : 'rejected',
  });

  const { trigger: triggerAplication, isMutating }: SWRMutationResponse<any> =
    useSWRMutation('useProcessAplicationFetcher', useHomologateFetcher, {
      revalidate: false,
    });

  const handlerHomologc = async () => {
    try {
      await triggerAplication();
      setSnackbar({
        open: true,
        message: 'Homologação Realizada com Sucesso',
        severity: 'success',
      });
      modal.onFalse();
      setTimeout(() => {
        navigate(`/comissao/processos/${processId}`);
      }, 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro a realizar homologação - Tente Novamente',
        severity: 'error',
      });
      modal.onFalse();
    }
  };

  const checked =
    checkedDadosPessoais &&
    checkedDadosAcademicos &&
    checkedDocumentos &&
    checkedCotas &&
    checkedPreProjeto;

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
        {/* {nome && (
          <Button
            variant="outlined"
            component={Link}
            href={''}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Edital
          </Button>
        )} */}
      </Stack>
      <br />
      <PersonalDataCard
        email={data.candidates.email}
        nome={data.candidates.name}
        cpf={data.candidates.cpf}
        rg={data.candidates.registration_}
        endereco={data.candidates.address_city}
        telFixo={data.candidates.phone}
        telCel={data.candidates.cell_phone}
        email2={data.candidates.other_email}
        borderColor={borderColor}
        checkedDadosPessoais={checkedDadosPessoais}
        handlePersonalDataChange={() => {
          setCheckedDadosPessoais(!checkedDadosPessoais);
        }}
      />

      <AcademicDataCard
        graduacao={data.candidates.graduation_course}
        anoGraduacao={data.candidates.graduation_year}
        instituicaoGraduacao={data.candidates.graduation_institution}
        cursoEspecializacao={data.candidates.specialization_course}
        anoEspecializacao={data.candidates.specialization_year}
        instituicaoEspecializacao={data.candidates.specialization_institution}
        linkLattes={data.candidates.lattes_link}
        borderColor={borderColor}
        checkedDadosAcademicos={checkedDadosAcademicos}
        handleAcademicDataChange={() => {
          setCheckedDadosAcademicos(!checkedDadosAcademicos);
        }}
      />

      <RequiredDocumentsCard
        borderColor="green"
        checkedStatusGeral={checkedDocumentos}
        handleToggleStatusGeral={() => {
          setCheckedDocumentos(!checkedDocumentos);
        }}
        showMilitaryClearance={data.candidates.sex === 'Masculino'}
        documents={data.docs}
      />

      {data.candidates.quota_id !== 1 && (
        <QuotaInfoCard
          borderColor={borderColor}
          idCota={data.candidates.quota_id}
          cota="afro_ou_inde"
          quota_declaration_admission={data.docs.quota_declaration_admission}
          quota_declaration_if={data.docs.quota_declaration_if}
          checkedStatusGeral={checkedCotas}
          handleToggleStatusGeral={() => setCheckedCotas(!checkedCotas)}
        />
      )}

      <PreProjectCard
        borderColor={borderColor}
        projectTitle={data.project_title}
        projectPath={data.project_path}
        researchLine={data.research_lines.name}
        researchTopic={data.research_topics.name}
        checked={checkedPreProjeto}
        handleToggle={() => {
          setCheckedPreProjeto(!checkedPreProjeto);
        }}
      />
      <ConfirmTextInputModal
        open={modal.value}
        justify={justify}
        setJustify={setJustify}
        onClose={modal.onFalse}
        onConfirm={handlerHomologc}
        buttonText={isSuccess ? 'Homologar' : 'Recusar'}
        buttonColor={isSuccess ? 'success' : 'error'}
      />
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2 }}
      >
        <Button
          color="success"
          variant="contained"
          disabled={!checked}
          onClick={() => {
            setIsSuccess(true);
            modal.onTrue();
          }}
        >
          HOMOLOGAR
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            setIsSuccess(false);
            modal.onTrue();
          }}
        >
          RECUSAR
        </Button>
      </Box>
      {snackbar.open && (
        <Box mb={2}>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={1000}
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              severity={snackbar.severity}
              onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </Box>
  );
};

export default HomologDataCard;
