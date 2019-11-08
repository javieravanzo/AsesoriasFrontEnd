//Subcomponents
import request from '../requestWrapper';
import integrationRequest from '../integrationWrapper';

function getHomeData(){

  return request({
    url: '/Customer/GetInitialData',
    method: 'GET',
  });
};

function getRequestData(customerId, token) {

  //console.log(localStorage.access_token);

  if (token === undefined){
    return request({
      url: '/Customer/GetRequestData',
      method: 'GET',
    });
  }else{   
    return integrationRequest({
      url: '/Customer/GetRequestData',
      method: 'GET',
      headers: { 
        'Authorization': 'Bearer ' + token 
      }
    });
  }
  
};

function getOutLayData(customerId, token) {
  
  if (token === undefined){
    return request({
      url: '/Request/GetOutlayData',
      method: 'GET',
    });
  }else{
    return integrationRequest({
      url: '/Request/GetOutlayData',
      method: 'GET',
      headers: { 
        'Authorization': 'Bearer ' + token 
      }
    });
  }  
};

function getOultayDatesList(customerId, split, quantity) {
  return request({
    url: '/Request/GetOultayDatesList',
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

function createRequest(data, token){

  var bodyFormData = new FormData();

  bodyFormData.append('file', data.file);
  bodyFormData.append('quantity', data.quantity);
  bodyFormData.append('split', data.split);
  bodyFormData.append('moyen', data.moyen);
  bodyFormData.append('accountType', data.accountType);
  bodyFormData.append('accountNumber', data.accountNumber);
  bodyFormData.append('isBank', data.isBank);  

  if (token === undefined){
    return request({
      url: '/Request/Create',
      method: 'POST',
      data: bodyFormData
    });
  }else{  
    return integrationRequest({
      url: '/Request/Create',
      method: 'POST',
      data: bodyFormData,
      headers: { 
        'Authorization': 'Bearer ' + token 
      }
    });
  }
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