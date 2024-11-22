import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api";
import { ResponseAgendaProps } from "./useGetAgenda";

interface CreateAgendaProps {
  medico_id: string;
  dia_semana: string;
  hora_inicio: string;
}

async function createAgenda(agenda:CreateAgendaProps):Promise<ResponseAgendaProps> {
  const response = await api.post('/agendas', agenda);
  return response.data;
}

export function useAddAgenda() {
  return useMutation({
    mutationFn: createAgenda,
  })
}