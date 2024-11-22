import { useQuery } from '@tanstack/vue-query';
import { api } from '../services/api';

export interface ResponseMedicProps {
  id: string;
  nome: string;
  conselho: string;
  estado: string;
}

async function getMedicos(): Promise<ResponseMedicProps[]> {
  const response = await api.get('/medicos');
  return response.data;
}

export function useGetMedic() {
  return useQuery({
    queryKey: ['medicos'], 
    queryFn: getMedicos,
  });
}
