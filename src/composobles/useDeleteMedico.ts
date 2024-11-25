import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api";

interface DeleteMedicoProps {
  medicoId: string;
}

async function deleteMedico({medicoId}:DeleteMedicoProps) {
  api.delete(`/medicos/${medicoId}`)
}

export function useDeleteMedico() {
  return useMutation({
    mutationFn: deleteMedico
  })
}