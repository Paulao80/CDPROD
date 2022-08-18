import ApiUf from "./ApiUf";
import { Uf } from "../Interfaces";

export async function listUfs(): Promise<Uf[]> {
    const { data } = await ApiUf.get<Uf[]>('/localidades/estados', {
        params: {
            orderBy: "nome"
        }
    });

    return data;
}

export async function getUfsById(id: string): Promise<Uf[]> {
    const { data } = await ApiUf.get<Uf[]>(`/localidades/estados/${id}`, {
        params: {
            orderBy: "nome"
        }
    });

    return data;
}