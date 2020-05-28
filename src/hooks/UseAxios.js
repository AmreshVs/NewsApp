import axios from 'axios';

const UseAxios = async (params, data) => {
  let { url, method, headers } = params;

  return await axios({
    url: url,
    method: method,
    headers: headers || {},
    data: data || {}
  })
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    return error
  })
}

export default UseAxios;