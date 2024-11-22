import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api";
import { ResponseConsultasProps } from "./useGetConsultas";

interface CreateConsultaProps {
  paciente_id: string;
  agenda_id: string;
}

async function createConsulta(consulta:CreateConsultaProps):Promise<ResponseConsultasProps> {
  const response = await api.post('/consultas', consulta);
  return response.data;
}

export function useAddConsultas() {
  return useMutation({
    mutationFn: createConsulta,
  })
}