import { API_URL } from '@const';
import axios from 'axios';

const LoginApi = async (data) => {
  return await axios({
    url: API_URL + '/login',
    method: 'POST',
    data: data
  })
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error;
  });
}

export default LoginApi;