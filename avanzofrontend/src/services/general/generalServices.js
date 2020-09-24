//Subcomponents
import request from '../requestWrapper';

function approveorRejectRequest(data){
  return request({
    url: '/Request/ApproveorReject',
    method: 'PUT',
    headers:{
      requestid: data.requestId,
      approve: data.approve,
      transactionCode: data.transactionCode,
      text: data.text,
    }
  });
};

function passToProcessWithoutChange(requestid){
  return request({
    url: '/Request/PassWithoutChanges',
    method: 'PUT',
    headers:{
      requestid: requestid,
    }
  });
};

function passToProcessWithDocuments(requestid){
  return request({
    url: '/Request/PassWithDocuments',
    method: 'PUT',
    headers:{
      requestid: requestid,
    }
  });
};

function passToOutlay(requestid){
  return request({
    url: '/Request/PassToOutLay',
    method: 'PUT',
    headers:{
      requestid: requestid,
    }
  });
};

function getAllCustomer(companyId){
  return request({
    url: '/Customer/GetAll',
    method: 'GET',
    headers:{
      companyId: companyId
    }
  });
};

function getReportByCustomer(customerId){
  return request({
    url: '/Report/GetReportByCustomer',
    method: 'GET',
    headers:{
      customerId: customerId
    }
  });
};

function getReportByCompany(companyId){
  return request({
    url: '/Report/GetReportByCompany',
    method: 'GET',
    headers:{
      companyId: companyId
    }
  });
};

const generalService = {
  approveorRejectRequest, getAllCustomer, getReportByCustomer, 
  getReportByCompany, passToProcessWithoutChange, passToProcessWithDocuments, passToOutlay
};

export default generalService;