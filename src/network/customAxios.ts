import axios, { AxiosStatic } from "axios";

const CustomAxios = (): AxiosStatic => {
    axios.create();
    axios.defaults.baseURL = process.env.API_BASE_URL;
    return axios;
};
export default CustomAxios