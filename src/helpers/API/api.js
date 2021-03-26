import { AccessToken, logout } from 'contexts/helpers';
import { axiosInstance, errorHelper, generateSuccess } from './axiosInstance';

class API {
  displayAccessToken() {
    console.log(AccessToken);
  }

  /**
   * @author Sanchit Dang
   * @description Login API endpoint
   * @param {Object} loginDetails Login details for the user
   * @returns {Object} responseObject
   */
  login(loginDetails) {
    return axiosInstance.post('admin/login', loginDetails).then(response => {
      return generateSuccess(response.data.data.accessToken);
    }).catch(error => errorHelper(error, "login"));
  }

  /**
  * @author Sanchit Dang
  * @description AccessToken Login API endpoint
  * @returns {Object} responseObject
  */
  accessTokenLogin() {
    return axiosInstance.post('accessTokenLogin', {}, {
      headers: {
        authorization: "Bearer " + AccessToken
      }
    }).then(() => generateSuccess(AccessToken)).catch(error => errorHelper(error));
  }

  /**
  * @description GET All Users API endpoint
  * @returns {Array(Object)} responseObject
  */
  getAllUsers() {
    return axiosInstance.get('admin/getUser').then(response => {
      return generateSuccess(response.data.data.data);
    }).catch(error => errorHelper(error));
  }


  /**
  * @description PUT Block/Unblock User API endpoint
  * @returns {Array(Object)} responseObject
  */
  toggleUserBlockStatus = async (data, callback) => {
    return await axiosInstance.put('admin/blockUnblockUser', data, {
      headers: {
        authorization: "Bearer " + AccessToken,
      }
    }).then(response => {
      console.log(response);
      callback();
      return true;
    }).catch(error => {
      errorHelper(error);
      return false;
    });
  }

  /**
  * @author Sanchit Dang
  * @description logoutUser Login API endpoint
  * @returns {Object} responseObject
  */
  logoutUser() {
    return axiosInstance.put('admin/logout', {}, {
      headers: {
        authorization: "Bearer " + AccessToken
      }
    }).then(() => {
      logout();
      return generateSuccess(true);
    }).catch(error => errorHelper(error));
  }
}
const instance = new API();
export default instance;
