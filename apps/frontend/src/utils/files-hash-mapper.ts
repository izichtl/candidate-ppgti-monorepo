interface FilePreFixesProps {
  id: string;
  key: string;
  label: string;
  control: string;
  show?: boolean;
}

export const filePrefixes: FilePreFixesProps[] = [
  {
    id: 'score_form',
    key: 'score_form',
    label: 'Formulário de pontuação preenchido e documentos comprobatórios.',
    control: '',
  },
  {
    id: 'diploma_certificate',
    key: 'diploma_certificate',
    label: 'Diploma ou Certificado de Conclusão da Graduação.',
    control: '',
  },
  {
    id: 'undergraduate_transcript',
    key: 'undergraduate_transcript',
    label: 'Histórico Escolar do Curso de Graduação.',
    control: '',
  },
  {
    id: 'registration_clearance',
    key: 'registration_clearance',
    label: 'Carteira de Identidade e CPF.',
    control: '',
  },
  {
    id: 'electoral_clearance',
    key: 'electoral_clearance',
    label: 'Comprovante de Quitação Eleitoral.',
    control: '',
  },
  {
    id: 'proof_of_residence',
    key: 'proof_of_residence',
    label: 'Comprovante de Residência.',
    control: '',
  },
  {
    id: 'employment_link',
    key: 'employment_link',
    label:
      'Comprovante de Vínculo Empregatício com Empresa Parceira Selecionada.',
    control: '',
  },
  {
    id: 'military_clearance',
    key: 'military_clearance',
    label: 'Comprovante de Quitação Militar.',
    control: 'Masculino',
  },
  {
    id: 'quota_declaration_admission',
    key: 'quota_declaration_admission',
    label: 'Declaração de optante por cota de ingresso.',
    control: 'afro_ou_inde',
  },
  {
    id: 'quota_declaration_admission',
    key: 'quota_declaration_admission',
    label: 'Declaração de optante por cota de ingresso.',
    control: 'pcd',
  },
  {
    id: 'quota_declaration_if',
    key: 'quota_declaration_if',
    label: 'Declaração de cota de servidor IFPB.',
    control: 'servidor_if',
  },
];
