//Subcomponents
import request from '../requestWrapper';

function getDocumentTypes(){
  return request({
    url: '/DocumentTypes/GetAll',
    method: 'GET',
  });
};

function register(data) {
  
  return request({
    url: '/Account/Register',
    method: 'POST',
    data: data
  });
};

const registerService = {
  register, getDocumentTypes
};

export default registerService;