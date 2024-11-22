import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api";
import { ResponsePacientesProps } from "./useGetPaciente";

interface CreatePacientesProps {
  nome: string;
  data_nascimento: string;
  endereco: string;
  telefone:string;
  email:string;
}

async function createPaciente(paciente:CreatePacientesProps):Promise<ResponsePacientesProps> {
  const response = await api.post("/pacientes", paciente);
  return response.data;
}

export function useAddPaciente() {
  return useMutation({
    mutationFn: createPaciente,
  })
}