import { Tanque, ApiResponse, Delete } from "../Interfaces";
import Api from "./Api";

export async function list(): Promise<ApiResponse<Tanque[]>> {
  const { data, status } = await Api.get<Tanque[]>(`/tanques`);

  return {
    data,
    status,
  };
}

export async function getById(id: number): Promise<ApiResponse<Tanque>> {
  const { data, status } = await Api.get<Tanque>(`/tanques/${id}`);

  return {
    data,
    status,
  };
}

export async function create(tanque: Tanque): Promise<ApiResponse<Tanque>> {
  const { data, status } = await Api.post<Tanque>(`/tanques`, tanque);

  return {
    data,
    status,
  };
}

export async function edit(tanque: Tanque): Promise<ApiResponse<Tanque>> {
  const { data, status } = await Api.put<Tanque>(`/tanques`, tanque);

  return {
    data,
    status,
  };
}

export async function del(id: number): Promise<ApiResponse<Delete>> {
  const { data, status } = await Api.delete<Delete>(`/tanques/${id}`);

  return {
    data,
    status,
  };
}
