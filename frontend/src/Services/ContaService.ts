import Api from "./Api";
import { ContasBancarias, Delete, ApiResponse } from "../Interfaces";

export async function list(): Promise<ApiResponse<ContasBancarias[]>> {
  const { data, status } = await Api.get<ContasBancarias[]>(`/contas`);

  return {
    data,
    status,
  };
}

export async function listByProdutorId(
  id: number
): Promise<ApiResponse<ContasBancarias[]>> {
  const { data, status } = await Api.get<ContasBancarias[]>(
    `/contas/produtor/${id}`
  );

  return {
    data,
    status,
  };
}

export async function getById(
  id: number
): Promise<ApiResponse<ContasBancarias>> {
  const { data, status } = await Api.get<ContasBancarias>(`/contas/${id}`);

  return {
    data,
    status,
  };
}

export async function create(
  conta: ContasBancarias
): Promise<ApiResponse<ContasBancarias>> {
  const { data, status } = await Api.post<ContasBancarias>(`/contas`, conta);

  return {
    data,
    status,
  };
}

export async function edit(
  conta: ContasBancarias
): Promise<ApiResponse<ContasBancarias>> {
  const { data, status } = await Api.put(`/contas`, conta);

  return {
    data,
    status,
  };
}

export async function del(id: number): Promise<ApiResponse<Delete>> {
  const { data, status } = await Api.delete<Delete>(`/contas/${id}`);

  return {
    data,
    status,
  };
}
