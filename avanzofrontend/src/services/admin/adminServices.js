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

function updateCompany(data){
  return request({
    url: '/Company/Update',
    method: 'PUT',
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

function updateCustomer(data){
  return request({
    url: '/Customer/Update',
    method: 'PUT',
    data: data
  });
};

function activateCustomer(clientId, status){
  return request({
    url: '/Customer/ChangePlatformStatus',
    method: 'GET',
    headers:{
      clientId: clientId,
      status: status
    }
  });
};

function createMultipleCustomer(data){
  return request({
    url: '/Customer/CreateMultiple',
    method: 'POST',
    data: data
  });
};


function activateCompany(companyid, status){
  return request({
    url: '/Company/ChangePlatformStatus',
    method: 'PUT',
    headers:{
      companyid: companyid,
      status: status
    }
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

function getAllRequestToApprove(){
  return request({
    url: '/Request/GetToApproveByAdmin',
    method: 'GET'
  });
};

function getAllCompanies(){
  return request({
    url: '/Company/GetAll',
    method: 'GET'
  });
};

function getAllCompaniesWithSalaries(companyid){
  return request({
    url: '/Company/GetWithSalaries',
    method: 'GET',
    headers:{
      companyid: companyid
    }
  });
  
}

function getAllCustomers(){
  return request({
    url: '/Customer/GetAllWithCompany',
    method: 'GET'
  });
};

function getAllCustomersToApprove(){
  return request({
    url: '/Customer/GetAllToApprove',
    method: 'GET'
  });
};

function approveCustomer(client, approve){
  return request({
    url: '/Customer/ApproveorReject',
    method: 'PUT',
    headers:{
      clientId: parseInt(client, 10),
      approve: approve
    }
  });
};

const adminService = {
  registerAdmin, createCompany, createCustomer, createMultipleCustomer, 
  getAllRequest, getAllRequestToOutLay, getAllRequestToApprove, getAllCompanies, getAllCustomers,
  getAllCustomersToApprove, approveCustomer, updateCompany, activateCustomer, updateCustomer,
  getAllCompaniesWithSalaries, activateCompany
};

export default adminService;