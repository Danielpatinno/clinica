import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api";
import { ResponseMedicProps } from "./useGetMedic";

interface CreateMedicProps {
  nome: string;
  estado: string;
  conselho: string;
}

async function createMedic(medic: CreateMedicProps):Promise<ResponseMedicProps> {
  const response = await api.post('/medicos', medic);
  return response.data;
}

export function useAddMedic() {
  return useMutation({
    mutationFn: createMedic,
  })
}