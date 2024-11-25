import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api";

interface DeleteAgendaProps {
  agendaId: string;
}

async function deleteAgenda({agendaId}:DeleteAgendaProps) {
  api.delete(`/agendas/${agendaId}`)
}

export function useDeleteAgenda() {
  return useMutation({
    mutationFn: deleteAgenda
  })
}