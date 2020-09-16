//Subcomponents
import request from '../requestWrapper';
import integrationRequest from '../integrationWrapper';

/*function dataURLtoFile(dataurl, filename) {
  
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
};*/

function getHomeData(){

  return request({
    url: '/Customer/GetInitialData',
    method: 'GET',
  });
};

function getRequestData(customerId, token) {
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

  let signature = data.file;

  var file = "FILE";

  var bodyFormData = new FormData();
  
  bodyFormData.append('quantity', data.quantity);
  bodyFormData.append('split', data.split);
  bodyFormData.append('moyen', data.moyen);
  bodyFormData.append('accountType', data.accountType);
  bodyFormData.append('accountNumber', data.accountNumber);
  bodyFormData.append('isBank', data.isBank); 

  bodyFormData.append('interest', data.interest);
  bodyFormData.append('administration', data.administration);
  bodyFormData.append('iva', data.iva);
  bodyFormData.append('otherValues', data.otherValues);
  bodyFormData.append('totalValue', data.totalValue);

  bodyFormData.append('idCompany', data.idCompany);
  bodyFormData.append('identificationId', data.identificationId);
  bodyFormData.append('loanData', data.loanData);
  bodyFormData.append('fileString', signature);
  bodyFormData.append('file', file);
  bodyFormData.append('paymentSupport', data.paymentSupport);
  bodyFormData.append('workingSupport', data.workingSupport);

  bodyFormData.append('salary_base', data.salary_base);
  bodyFormData.append('biweekly_salary', data.biweekly_salary);
  bodyFormData.append('general_deduction', data.general_deduction);
  
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

function getAllRequestWasOutlayed(customerId){
  return request({
    url: '/Request/GetAllWasOutlayed',
    method: 'GET',
    headers:{
      customerId: customerId
    }
  });
}

function getAllRequestWasRejected(customerId){
  return request({
    url: '/Request/GetAllWasRejected',
    method: 'GET',
    headers:{
      customerId: customerId
    }
  });
}

function getAccountDetail(){
  return request({
    url: '/Customer/GetAccountDetail',
    method: 'GET'
  });
};

function generateCodes(email, phonenumber, clientid){
  return request({
    url: '/Request/GenerateCodes',
    method: 'GET',
    headers: {
      email: email,
      phonenumber: phonenumber,
      clientid: clientid
    }
  });
}

function checkCodes(userid, phonecode, emailcode){
  console.log("Services PC", phonecode, "EC", emailcode);
  return request({
    url: '/Request/ValidateCodes',
    method: 'GET',
    headers: {
      userid: userid,
      phonecode: phonecode,
      emailcode: emailcode,
    }
  });
};

const customerService = {
  getHomeData, getRequestData, getOutLayData, getOultayDatesList, generateDocuments, createRequest,
  getAllTransactions, getAllRequest, getAllRequestWasOutlayed, getAllRequestWasRejected,
  getAccountDetail, generateCodes, checkCodes
};

export default customerService;