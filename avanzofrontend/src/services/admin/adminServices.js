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

function updateCompanySalaries(data){
  return request({
    url: '/Company/UpdateCompanySalaries',
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

function getCustomersCountToApprove(){
  return request({
    url: '/Customer/GetCountToApprove',
    method: 'GET'
  });
};

function getAllRejectedRequest(){
  return request({
    url: '/Request/GetAllRejected',
    method: 'GET'
  });
};

function getAllPendingRHRequest(){
  return request({
    url: '/Request/GetAllPendingRRHH',
    method: 'GET'
  });
};

function getAllBankRefundedRequest(){
  return request({
    url: '/Request/GetAllBankRefunded',
    method: 'GET'
  });
};

function getAllProcessWithoutChangeRequest(){
  return request({
    url: '/Request/GetAllProcessWithoutChanges',
    method: 'GET'
  });
};

function getDateListToCustomer(companyid){
  return request({
    url: '/Customer/GetDateListToCustomer',
    method: 'GET',
    headers:{
      companyid: companyid
    }
  });
};

function approveCustomer(client, approve, cycleId){

  return request({
    url: '/Customer/ApproveorReject',
    method: 'PUT',
    headers: {
      clientId: parseInt(client, 10),
      approve: approve,
      cycleId: cycleId
    }
  });

};

function deleteClient(client){

  return request({
    url: '/Customer/Delete',
    method: 'PUT',
    headers: {
      clientId: parseInt(client, 10),
    }
  });
  
};

function generateBankReport(){

  return request({
    url: '/Reports/GenerateBankReport',
    method: 'GET',
  });

};

function receiveBankFile(data){

  var bodyFormData = new FormData();
  
  bodyFormData.append('write', data.write);
  bodyFormData.append('read', data.read);

  return request({
    url: '/Reports/ReceiveBankReport',
    method: 'POST',
    data: bodyFormData
  });

};




const adminService = {
  registerAdmin, createCompany, createCustomer, createMultipleCustomer, 
  getAllRequest, getAllRequestToOutLay, getAllRequestToApprove, getAllCompanies, getAllCustomers,
  getAllCustomersToApprove, approveCustomer, updateCompany, activateCustomer, updateCustomer,
  getAllCompaniesWithSalaries, activateCompany, getDateListToCustomer, getAllRejectedRequest,
  getAllPendingRHRequest, deleteClient, updateCompanySalaries, generateBankReport,
  getCustomersCountToApprove, getAllBankRefundedRequest, getAllProcessWithoutChangeRequest,
  receiveBankFile
};

export default adminService;