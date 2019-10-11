//Subcomponents
import request from '../requestWrapper';

function registerAdmin(data) {
  
  return request({
    url: '/Account/RegisterAdministrator',
    method: 'POST',
    data: data
  });
};

function createCompany(data){
  return request({
    url: '/Company/Create',
    method: 'POST',
    data: data
  });
};

function createCustomer(data){
  return request({
    url: '/Customer/Create',
    method: 'POST',
    data: data
  });
};

function createMultipleCustomer(data){
  return request({
    url: '/Customer/CreateMultiple',
    method: 'POST',
    data: data
  });
};

function getAllRequest(userId){
  return request({
    url: '/Request/GetAllByAdmin',
    method: 'GET',
    headers:{
      userId: userId
    }
  });
};

function getAllRequestToOutLay(userId){
  return request({
    url: '/Request/GetAllToOutLayByAdmin',
    method: 'GET',
    headers:{
      userId: userId
    }
  });
};

const adminService = {
  registerAdmin, createCompany, createCustomer, createMultipleCustomer, getAllRequest, getAllRequestToOutLay
};

export default adminService;