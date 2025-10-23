type Status = 'pending' | 'compliant' | 'rejected';

interface StatusInfo {
  label: string;
  color: 'success' | 'error' | 'warning';
}

export function getStatusInfo(status: Status): StatusInfo {
  switch (status) {
    case 'pending':
      return { label: 'Aguardando', color: 'warning' };
    case 'compliant':
      return { label: 'Homologado', color: 'success' };
    case 'rejected':
      return { label: 'Recusado', color: 'error' };
    default:
      return { label: 'Desconhecido', color: 'warning' }; // fallback
  }
}
