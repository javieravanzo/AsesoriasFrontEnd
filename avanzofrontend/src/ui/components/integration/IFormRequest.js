//Libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Form} from 'antd';

//Subcomponents
import routes from '../../../configuration/routing/Routes';

//Actions
import { getRequestData, getOutlayData, getOultayDatesList, createRequest } from "../../../store/redux/actions/customer/customerActions";
import { integrationRegister } from "../../../store/redux/actions/integration/integrationActions";

//Styles
import '../../styles/customer/request-form.css';


class IFormRequest extends Component {

  constructor (props) {

    super(props);
    
    this.state = {
      sliderValue: 300000,
      fee: null,
      loan: null,
      money_wallet: false,
      wallet_type: null,
      wallet_number: null,
      bank_account: false,
      bank_name: null,
      bank_number: null,
      bank_type: null,
      signatureDone: false,
      trimmedDataURL: null
    };    

    this.props.integrationRegister(this.props.match.params);

  };

  render(){

    if(this.props.integrationRegisterResponse){   
      return (
        <div>
          <Redirect to={{pathname: routes.customer_form_request, state: {token: this.props.integrationToken}}}/>
        </div>
      );
    }else{
      return (
        <div style={{marginTop: '50px'}}>
          Cargando...
        </div>
      );
    }

  };
  
}

let IRequestForm = Form.create()(IFormRequest);

IRequestForm.propTypes = {
  requestDataResponse: PropTypes.object,
  outlayDataResponse: PropTypes.object,
  outlayDatesList: PropTypes.array,
  integrationRegisterResponse: PropTypes.bool,
  integrationToken: PropTypes.String,
};

const mapStateToProps = (state) => {
  return {
    requestDataResponse: state.customer.requestDataResponse,
    outlayDataResponse: state.customer.outlayDataResponse,
    outlayDatesList: state.customer.outlayDatesList,
    integrationRegisterResponse: state.integration.integrationRegisterResponse,
    integrationToken: state.integration.integrationToken,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequestData: (customerId, integration) => dispatch(getRequestData(customerId, integration)),
    getOutlayData: (customerId, integration) => dispatch(getOutlayData(customerId, integration)),
    getOultayDatesList: (customerId, split, quantity) => dispatch(getOultayDatesList(customerId, split, quantity)),
    createRequest: (data) => dispatch(createRequest(data)),
    integrationRegister: (data) => dispatch(integrationRegister(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(IRequestForm);
