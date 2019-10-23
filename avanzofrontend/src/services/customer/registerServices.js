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

function registerImage(data) {
  
  return request({
    url: '/Account/Register_Image',
    method: 'POST',
    data: data
  });
};

const registerService = {
  register, getDocumentTypes,registerImage
};

export default registerService;