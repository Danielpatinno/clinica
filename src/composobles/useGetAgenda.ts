import { useQuery } from "@tanstack/vue-query";
import { api } from "../services/api";

export interface ResponseAgendaProps {
  id: string;
  medicoId: string;
  diaSemana: string;
  horarioInicio: string;
  ocupado: boolean;
}

async function getAgenda(): Promise<ResponseAgendaProps[]> {
  const response = await api.get('/agendas');
  return response.data;
}

export function useGetAgenda() {
  return useQuery({
    queryKey: ['agendas'],
    queryFn: getAgenda,
  })
}