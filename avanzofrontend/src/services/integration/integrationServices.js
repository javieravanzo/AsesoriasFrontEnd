//Subcomponents
import request from '../requestWrapper';

function integrationRegistration(data){

  return request({
    url: '/Integration/Register',
    method: 'POST',
    data: data
  });
};

const integrationService = {
  integrationRegistration
};

export default integrationService;