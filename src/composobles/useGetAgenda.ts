import { useQuery } from "@tanstack/vue-query";
import { api } from "../services/api";

export interface ResponseAgendaProps {
  id: string;
  medico_id: string;
  dia_semana: string;
  horario_inicio: string;
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