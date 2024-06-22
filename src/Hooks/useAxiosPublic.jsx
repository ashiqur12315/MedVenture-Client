import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://medventure-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;