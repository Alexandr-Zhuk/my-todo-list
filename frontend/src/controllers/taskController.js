import axios from "axios";


const getTasks = async(urlParams, accessToken) => {
    const getParams = urlParams;
    let url = '/tasks/list';
    function isEmpty(obj) {
        for (let key in obj) {
          return false;
        }
        return true;
      }
    const len = isEmpty(getParams);
    if(!len){
        url += `?${getParams.filterName}=${getParams.filterId}`;
    }
    const result = await axios.get(url, { headers: {"Authorization" : `Bearer ${accessToken}`}});
    console.log('Вывожу в гет таск перед добавлением, что получил', result.data)
    return result.data;
};

export { getTasks };