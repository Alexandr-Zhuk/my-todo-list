import axios from "axios";

const updateRefresh = async() => {
    const response = await axios.get('/auth/refresh');
        if(response.data.status === 401){
            console.log('У нас с рефреша пришел 401 статус');
            return '';
        }
    return response.data.accessToken;
}

export { updateRefresh };