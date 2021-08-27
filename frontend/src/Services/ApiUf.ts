import axios from "axios";

const ApiUf = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1'
});

export default ApiUf
