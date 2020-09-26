import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/';

class UserService {

 

  getMyUserInfo() {
    return axios.get(API_URL + 'users/me', { headers: authHeader() }).then(res=>res.data);
  }

  getMyUserAvatar() {
    return axios.get(API_URL + 'users/me/avatar', { headers: authHeader() }).then(res=>res.data);
  }


  getTasks() {
    return axios.get(API_URL + '/tasks?sortBy=createdAt:desc', { headers: authHeader() });
  }
}

export default new UserService();