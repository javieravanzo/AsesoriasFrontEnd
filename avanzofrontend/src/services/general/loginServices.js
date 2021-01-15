//Subcomponents
import request from '../requestWrapper';

function login(email, password) {
  
  let data = {
    email: email,
    password: password 
  };

  return request({
    url: '/Account/Token',
    method: 'POST',
    data: data
  });
}

function logout(){
  return request({
    url: '/Account/Logout',
    method: 'PUT',
  });
};

function forgetPassword(email) {
  
  return request({
    url: '/Account/ResetPassword',
    method: 'GET',
    headers:{
      email: email
    }
  });
}

function changePassword(data, token){
  return request({
    url: '/Account/ConfirmPassword',
    method: 'PUT',
    data: data,
    headers: { 
      'Authorization': 'Bearer ' + token 
    }
  });
}; 



const loginService = {
  login, logout, forgetPassword, changePassword
};



export default loginService;