//Subcomponents
import request from '../requestWrapper';

function getAllRequest(companyId){
  return request({
    url: '/Request/GetAllRequestByCompany',
    method: 'GET',
    headers:{
      companyId: companyId
    }
  });
};

const companyService = {
  getAllRequest
};

export default companyService;