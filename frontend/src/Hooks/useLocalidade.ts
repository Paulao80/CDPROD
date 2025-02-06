import { useEffect, useState } from 'react';
import { Uf } from '../Interfaces';
import * as service from '../Services/LocalidadeService';

interface UseLocalidade {
    listUfs(): Promise<Uf[]>;
    getUfsById(id: string): Promise<Uf[]>;
    ufs: Uf[];
}

const useLocalidade = (load?: boolean): UseLocalidade => {
    const [ufs, setUfs] = useState<Uf[]>([]);

    useEffect(() => {
        if (load) {
            listUfs().then(res => {
                setUfs(res);
            });
        }
    }, [load]);

    async function listUfs(): Promise<Uf[]> {
        try {
            return await service.listUfs();
        } catch (error) {
            return [];
        }
    }

    async function getUfsById(id: string): Promise<Uf[]> {
        try {
            return await service.getUfsById(id);
        } catch (error) {
            return [];
        }
    }

    return { listUfs, getUfsById, ufs };
}

export default useLocalidade;

