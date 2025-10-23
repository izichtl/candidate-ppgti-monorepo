export interface ApiError {
  code?: string;
  message?: string;
  success?: boolean;
}

export interface ErrorResponse {
  response?: {
    data?: ApiError;
    status?: number;
  };
  message?: string;
  status?: number;
}

export const getErrorMessage = (error: ErrorResponse): string => {
  console.log("ERROR", error);

  if (error?.response?.data) {
    const { message } = error.response.data;
    const status = error.response.status;

    if (status) {
      switch (status) {
        case 400:
          if (message?.includes("Invalid email")) {
            return "Email inválido. Verifique o formato do email.";
          }
          if (message?.includes("Invalid CPF")) {
            return "CPF inválido. Verifique o formato do CPF.";
          }
          if (message?.includes("Password")) {
            return "Senha inválida. A senha deve ter pelo menos 6 caracteres.";
          }
          return (
            message || "Dados inválidos. Verifique as informações fornecidas."
          );

        case 401:
          return "Credenciais inválidas. Verifique sua matrícula e senha.";

        case 403:
          return "Acesso negado. Verifique seu código de autorização.";

        case 404:
          return "Usuário não encontrado. Verifique sua matrícula.";

        case 409:
          if (message === "Committee user already exists") {
            return "Este usuário da comissão já está cadastrado. Tente fazer login.";
          }
          if (message?.includes("already exists")) {
            return "Este usuário já está cadastrado. Tente fazer login.";
          }
          return "Conflito de dados. Este registro já existe.";

        case 422:
          return message || "Erro de validação. Verifique os dados fornecidos.";

        case 429:
          return "Muitas tentativas. Aguarde alguns minutos e tente novamente.";

        case 500:
          return "Erro interno do servidor. Tente novamente mais tarde.";

        case 502:
          return "Serviço temporariamente indisponível. Tente novamente em alguns minutos.";

        case 503:
          return "Serviço em manutenção. Tente novamente mais tarde.";

        case 504:
          return "Tempo limite do servidor excedido. Tente novamente.";

        default:
          return "Ocorreu um erro inesperado. Tente novamente.";
      }
    }

    if (message) {
      return message;
    }
  }

  if (error?.message) {
    if (error.message.includes("Network Error")) {
      return "Erro de conexão. Verifique sua internet e tente novamente.";
    }
    if (error.message.includes("timeout")) {
      return "Tempo limite excedido. Tente novamente.";
    }
    return error.message;
  }

  return "Ocorreu um erro inesperado. Tente novamente.";
};
