
import axios from "axios";


const getTasks = async(urlParams) => {
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
    const result = await axios.get(url);
    console.log('Вывожу в гет таск перед добавлением')
    return result.data;
};

export { getTasks };