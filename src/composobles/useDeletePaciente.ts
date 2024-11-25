import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api";

interface DeletePacienteProps {
  pacienteId: string;
}

async function deletePaciente({pacienteId}:DeletePacienteProps) {
  api.delete(`/pacientes/${pacienteId}`)
}

export function useDeletePaciente() {
  return useMutation({
    mutationFn: deletePaciente
  })
}