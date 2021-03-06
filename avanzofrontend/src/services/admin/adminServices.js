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

function getDefinitelyRejected(){
  return request({
    url: '/Request/GetAllDefinitelyRejected',
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

function getAllProcessDocumentChanges(){
  return request({
    url: '/Request/GetAllRequestWithDocumentChanges',
    method: 'GET'
  });
};

function getAllProcessinBank(){
  return request({
    url: '/Request/GetAllProcessInBank',
    method: 'GET'
  });
};

function getAllFinalizedRequest(){
  return request({
    url: '/Request/GetAllFinalizedRequest',
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

function approveCustomer(client, approve, cycleId, rere_id){

  return request({
    url: '/Customer/ApproveorReject',
    method: 'PUT',
    headers: {
      clientId: parseInt(client, 10),
      approve: approve,
      cycleId: cycleId,
      rere_id: rere_id
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

function generatePendingByBankReport(){

  return request({
    url: '/Reports/PendingToFinalizeByBank',
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

function generateGeneralPendingByRRHH(companyidtonotinclude){

  return request({
    url: '/Reports/PendingGeneralByRRHH',
    method: 'GET',
    headers: {
      companyidtonotinclude: companyidtonotinclude
    }
  });

};

function generateParticularPendingByRRHH(companyidtoinclude){

  return request({
    url: '/Reports/PendingParticularByRRHH',
    method: 'GET',
    headers: {
      companyidtoinclude: companyidtoinclude
    }
  });

};

function loadCompanyFile(data){

  var bodyFormData = new FormData();
  
  bodyFormData.append('idCompany', data.idCompany);
  bodyFormData.append('file', data.file);

  return request({
    url: '/Company/LoadMaxAmountToOutLayByClient',
    method: 'POST',
    data: bodyFormData
  });

};

function getReasons(token){
  return request({
    url: '/Request/GetAllRejectionReasons',
    method: 'GET', 
    headers: { 
      'Authorization': 'Bearer ' + token 
    }
  });
}

function getFileBank(token,bank_id ){
  return request({
    url: '/Reports/GenerateBankReport/'+bank_id,
    method: 'GET', 
    headers: { 
      'Authorization': 'Bearer ' + token 
    }
  });
}


const adminService = {
  registerAdmin, createCompany, createCustomer, createMultipleCustomer, 
  getAllRequest, getAllRequestToOutLay, getAllRequestToApprove, getAllCompanies, getAllCustomers,
  getAllCustomersToApprove, approveCustomer, updateCompany, activateCustomer, updateCustomer,
  getAllCompaniesWithSalaries, activateCompany, getDateListToCustomer, getAllRejectedRequest,
  getDefinitelyRejected, getAllPendingRHRequest, deleteClient, updateCompanySalaries, generateBankReport,
  getCustomersCountToApprove, getAllBankRefundedRequest, getAllProcessWithoutChangeRequest,
  receiveBankFile, getAllProcessDocumentChanges, getAllProcessinBank, getAllFinalizedRequest,
  generatePendingByBankReport, generateGeneralPendingByRRHH, generateParticularPendingByRRHH,
  loadCompanyFile, getReasons,  getFileBank
};

export default adminService;