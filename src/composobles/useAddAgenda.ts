import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api";
import { ResponseAgendaProps } from "./useGetAgenda";

interface CreateAgendaProps {
  medicoId: string;
  diaSemana: string;
  horarioInicio: string;
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