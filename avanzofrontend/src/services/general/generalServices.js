//Subcomponents
import request from '../requestWrapper';

function approveorRejectRequest(data){
  return request({
    url: '/Request/ApproveorReject',
    method: 'POST',
    data: data
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
  getReportByCompany
};

export default generalService;