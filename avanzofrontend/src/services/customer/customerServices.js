//Subcomponents
import request from '../requestWrapper';

function getHomeData(customerId){
  return request({
    url: '/Customer/GetInitialData',
    method: 'GET',
    headers:{
      customerId: customerId
    }
  });
};

function getRequestData(customerId) {
  
  return request({
    url: '/Customer/GetRequestData',
    method: 'GET',
    headers:{
      customerId: customerId
    }
  });
};

function getOutLayData() {
  
  return request({
    url: '/Customer/GetOutlayData',
    method: 'GET',
  });
};

function getOultayDatesList(customerId, split, quantity) {
  return request({
    url: '/Customer/GetOultayDatesList',
    method: 'GET',
    headers:{
      customerId: customerId,
      split: split,
      quantity: quantity
    }
  });
};

function generateDocuments(customerId, split, quantity) {
  return request({
    url: '/Documents/Generate',
    method: 'GET',
    headers:{
      customerId: customerId,
      split: split,
      quantity: quantity
    }
  });
};

function createRequest(data){
  return request({
    url: '/Request/Create',
    method: 'POST',
    data: data
  });
};

function getAllTransactions(customerId){
  return request({
    url: '/Transactions/GetTransactionsByUserId',
    method: 'GET',
    headers:{
      customerId: customerId
    }
  });
};

function getAllRequest(customerId){
  return request({
    url: '/Request/GetAll',
    method: 'GET',
    headers:{
      customerId: customerId
    }
  });
}

const customerService = {
  getHomeData, getRequestData, getOutLayData, getOultayDatesList,
  generateDocuments, createRequest, getAllTransactions, getAllRequest
};

export default customerService;