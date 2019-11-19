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

function newRegister(data) {

  var bodyFormData = new FormData();

  bodyFormData.append('name', data.name);
  bodyFormData.append('lastName', data.lastName);
  bodyFormData.append('email', data.email);
  bodyFormData.append('identificationId', data.identificationId);
  bodyFormData.append('phoneNumber', data.phoneNumber);
  bodyFormData.append('company', data.company);
  bodyFormData.append('documentId', data.documentId); 
  bodyFormData.append('photo', data.photo); 
  bodyFormData.append('paymentReport', data.paymentReport); 
  
  return request({
    url: '/Account/NewRegister',
    method: 'POST',
    data: bodyFormData
  });
};

function getCompanies(){
  return request({
    url: '/Company/GetAllForUsers',
    method: 'GET',
  });
};


const registerService = {
  register, getDocumentTypes, newRegister, getCompanies
};

export default registerService;