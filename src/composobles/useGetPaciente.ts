import { useQuery } from '@tanstack/vue-query';
import { api } from '../services/api';

export interface ResponsePacientesProps {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  endereco: string;
  data_nascimento: string;
}

async function getPacientes(): Promise<ResponsePacientesProps[]> {
  const response = await api.get('/pacientes');
  return response.data;
}

export function useGetPaciente() {
  return useQuery({
    queryKey: ['pacientes'], 
    queryFn: getPacientes,
  });
}
