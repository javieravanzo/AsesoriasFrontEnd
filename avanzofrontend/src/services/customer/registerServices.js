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
  bodyFormData.append('documentType', data.documentType);
  bodyFormData.append('city', data.city);
  bodyFormData.append('birthDate', data.birthDate);
  bodyFormData.append('salary', data.salary);
  bodyFormData.append('phoneNumber', data.phoneNumber);
  bodyFormData.append('company', data.company);
  bodyFormData.append('password', data.password);
  bodyFormData.append('documentId', data.documentId);  
  bodyFormData.append('paymentReport', data.paymentReport);
  bodyFormData.append('gender', data.gender); 
  bodyFormData.append('vehicle', data.vehicle); 
  if(!data.vehicle){
    bodyFormData.append('vehicle_type', null);
    bodyFormData.append('license_plate_vehicle', null); 
  }else{
    bodyFormData.append('vehicle_type', data.vehicle_type);
    bodyFormData.append('license_plate_vehicle', data.license_plate_vehicle); 
  }   
  bodyFormData.append('clie_address', data.clie_address); 
  bodyFormData.append('clie_from', data.clie_from); 
  
  
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

function checkDocument(documento){
  
  return request({
    url: '/validations/validate_document_number/'+documento,
    method: 'GET',
  });
};

function checkEmail(correo){
  
  return request({
    url: '/validations/validate_email/'+correo,
    method: 'GET',
  });
};

function checkPhone(telefono){
  
  return request({
    url: '/validations/validate_phone_number/'+telefono,
    method: 'GET',
  });
};

function getCycles(companyId){
  
  return request({
    url: '/Company/GetCyclesByCompanyId/'+companyId,
    method: 'GET',
  });
};


const registerService = {
  register, getDocumentTypes, newRegister, getCompanies, checkDocument, checkEmail, checkPhone, getCycles
};

export default registerService;