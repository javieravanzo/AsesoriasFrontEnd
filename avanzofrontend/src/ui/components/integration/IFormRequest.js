//Libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Form, Spin} from 'antd';

//Subcomponents
import routes from '../../../configuration/routing/Routes';

//Actions
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

    console.log("IR", this.props.location.pathname);    

    if(this.props.integrationRegisterResponse){   
      return (
        <div>
          <Redirect to={{pathname: routes.customer_form_request}}/>
        </div>
      );
    }else{
      if(this.props.integrationRegisterResponse === false){
        return (
          <div>
            <Redirect to={{pathname: routes.customer_register}}/>
          </div>
        );
      }else{
        return (<div style={{marginTop: '50px', color: "#1c77ff", fontSize:"20px", textAlign: "center"}}>
                Cargando ...
                <br/>
                <br/>
                <Spin size="large" />
              </div>);
      }
      
    }

  };
  
}

let IRequestForm = Form.create()(IFormRequest);

IRequestForm.propTypes = {
  integrationRegisterResponse: PropTypes.bool,
  integrationToken: PropTypes.string,
  correct: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    integrationRegisterResponse: state.integration.integrationRegisterResponse,
    integrationToken: state.integration.integrationToken,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    integrationRegister: (data) => dispatch(integrationRegister(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(IRequestForm);
