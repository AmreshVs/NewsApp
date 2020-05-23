import axios from 'axios';
import store from '@redux/stores';

let state = store.getState();

const UseAxios = async (params, data) => {
  let { url, method, headers } = params;

  return await axios({
    url: url,
    method: method || 'GET',
    headers: headers,
    data: data
  })
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    return error
  })
}

export default UseAxios;