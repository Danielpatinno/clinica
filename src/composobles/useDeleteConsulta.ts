import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api";

interface DeleteConsultaProps {
  consultaId: string;
}

async function deleteConsulta({consultaId}:DeleteConsultaProps) {
  api.delete(`/consultas/${consultaId}`)
}

export function useDeleteConsulta() {
  return useMutation({
    mutationFn: deleteConsulta
  })
}