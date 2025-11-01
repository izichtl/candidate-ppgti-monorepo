type FormData = Record<string, any>;

export function validateRequiredFields(data: FormData): boolean {
  const requiredFields = [
    // stepOneSchema
    'email',
    'cpf',
    'social_name',
    // stepTwoSchema
    'sex',
    'registration_',
    'registration_state',
    'registration_place',
    'address',
    'address_number',
    'address_neighborhood',
    'address_city',
    'address_state',
    'address_zipcode',
    'cell_phone',
    'other_email',
    'quota_id',
    // stepThreeSchema
    'education_level',
    'graduation_course',
    'graduation_year',
    'graduation_institution',
    'lattes_link',
  ];

  for (const field of requiredFields) {
    const value = data[field];
    if (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '')
    ) {
      return false;
    }
  }

  return true;
}

export function validateRequiredDocuments(
  data: FormData,
  sex: string,
  quota_id: number
): boolean {
  // Campos sempre obrigatórios para todos
  const requiredDocs = [
    'score_form',
    'diploma_certificate',
    'undergraduate_transcript',
    'electoral_clearance',
    'proof_of_residence',
    'registration_clearance',
  ];

  // Se for masculino → exige atestado militar
  if (sex?.toLowerCase() === 'masculino') {
    requiredDocs.push('military_clearance');
  }

  // Cotas específicas
  if (quota_id === 2 || quota_id === 3) {
    // afro_ou_inde ou pcd
    requiredDocs.push('quota_declaration_admission');
  } else if (quota_id === 4) {
    // servidor_if
    requiredDocs.push('quota_declaration_if');
  }

  // Validação dos documentos obrigatórios
  for (const field of requiredDocs) {
    const value = data[field];
    if (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '')
    ) {
      return false;
    }
  }

  return true;
}
