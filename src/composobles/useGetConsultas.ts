import { useQuery } from "@tanstack/vue-query";
import { api } from "../services/api";

export interface ResponseConsultasProps {
  id: string;
  paciente_id: string;
  agenda_id: string;
  data: string;
}

async function getConsultas(): Promise<ResponseConsultasProps[]> {
  const response = await api.get('/consultas')
  return response.data;
}

export function useGetConsultas() {
  return useQuery({
    queryKey: ['consultas'],
    queryFn: getConsultas
  })
}