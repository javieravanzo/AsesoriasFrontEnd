//Libraries
import React, {Component} from 'react';
import {Col, Row, Tooltip, Icon, Divider, Badge, Button} from 'antd';
import CurrencyFormat from "react-currency-format";
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Styles
import '../../../../styles/admin/request_management/request-state.css';
import { allowEmergingWindows, WARNING_MODAL} from '../../../subcomponents/modalMessages';

//Subcomponents
import BaseURL from '../../../../../services/BaseURL';

//Actions
//import {approveorRejectRequest} from "../../../../../store/redux/actions/general/generalActions";
import {approveorRejectRequestByCompany} from "../../../../../store/redux/actions/general/generalActions";

//Constants
import {defineBadgeName, defineButtonClass} from '../../../../../configuration/constants';
//const Step = Steps.Step;
//const TextArea = Input.TextArea;

class RequestStateModal extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      visible: null,
      approve_modal: null,
      card_style_requested: "requested",
      card_style_analysis: "analysis",
      card_style_approved: "approved",
      card_style_rejected: "rejected",
      reject_modal: null,
      text: "",
    };
    
  };

  seeDocument = (filePath) => {

    let url = filePath;

    if (url !== null) {
      let newWindow = window.open(BaseURL +"/"+ filePath, "blank");
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        allowEmergingWindows();
      }
    } else {
      WARNING_MODAL('Advertencia', 'El reporte no está disponible');
    }

  };

  onConfirmRequest = (idRequest) => {
    let data = {
      requestId: idRequest,
      approve: true,
    };
    this.props.approveorRejectRequestByCompany(data, localStorage.user_id);
    this.setState({approve_modal: false});
  };

  onRejectRequest = (idRequest) => {
    let data = {
      requestId: idRequest,
      approve: false,
      text: this.state.text
    };
    //console.log("D", data);
    this.props.approveorRejectRequestByCompany(data, localStorage.user_id);
    this.setState({reject_modal: false});
  };

  inputChange = (e) => {

    let value = e;
    this.setState({
      text: value,
    });
  };

  functionToProcessWithDocuments = (idRequest) => {
    this.props.passToProcessWithDocuments(idRequest);
  };

  functionToChangeWithoutDocuments = (idRequest) => {
    this.props.passToProcessWithoutChange(idRequest);
  };


  render(){

    let item = this.props.item;
    
    //let {text} = this.state;
    
    return (
        <Badge count={defineBadgeName(item.requestStateId)} style={{backgroundColor: defineButtonClass(item.idRequestState), color: "black"} }>
          <div key={item.key} className={"request-state-item-requested"}>
            <Row>
              <Col xs={24} sm={12} md={2} lg={2}>
                  <Tooltip title="Detallar solicitud">
                    <Icon type={"plus-circle"} className={"request-item-icon"} onClick={() => this.setState({visible: !this.state.visible})}/> 
                  </Tooltip>
                </Col>
              <Col xs={12} sm={12} md={8} lg={5} className="request-item-initial-col">
                <b>Número de Solicitud</b> <br/><br/>
                {"Solicitud No. " + item.idRequest} 
              </Col>
              <Col xs={12} sm={12} md={8} lg={6} className="request-item-initial-col" >
                  <b>Estado</b> <br/><br/>  {defineBadgeName(item.idRequestState)}
              </Col>
              <Col xs={12} sm={12} md={7} lg={5}  className="request-item-initial-col">
                  <b>Fecha de Solicitud</b> <br/><br/> {(item.createdAt).split("T")[0]}
              </Col>
              <Col xs={12} sm={12} md={7} lg={6}  className="request-item-initial-col">
                  <b>Monto</b> <br/><br/>
                  <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                      value={item.quantity} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}/>
              </Col>
            </Row>
          
          {
            this.state.visible && 
            <div>
              <Row>
                <Divider/>
                <Col xs={24} sm={12} md={8} lg={6} >
                  <b>Información adicional</b>
                </Col>  
              </Row>
              <br/><br/>
              <Row>
                <Col xs={12} sm={12} md={8} lg={6} >
                  <b>Nombres</b><br/><br/>
                  {item.name + " " + item.lastName} 
                </Col>
                <Col xs={12} sm={12} md={8} lg={4} >
                  <b>Cédula</b><br/><br/>
                  {item.identificationId}
                </Col>
                <Col xs={12} sm={12} md={7} lg={5}>
                  <b>Empresa</b><br/><br/>
                  {item.socialReason}
                </Col>
                <Col xs={12} sm={12} md={7} lg={5}>
                  <b>Saldo Usuario</b><br/><br/>
                    <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                    value={item.totalRemainder} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}/> 
                </Col>
                <Col xs={12} sm={12} md={8} lg={4} >
                  <b>Valor total</b><br/><br/>
                  <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                      value={item.totalValue} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}/> 
                </Col>
                
              </Row>
              <br/>
              <br/>
              <Row>
                <Col xs={12} sm={12} md={7} lg={5}>
                    <b>Teléfono</b><br/><br/>
                    {item.phoneNumber}
                </Col>
                <Col xs={12} sm={12} md={8} lg={3} >
                    <b>Cuotas</b><br/><br/>
                    {item.split}
                </Col>
                <Col xs={12} sm={12} md={7} lg={5}>
                    <b>Cuenta</b><br/><br/>
                    {item.account}
                </Col>
                <Col xs={12} sm={12} md={7} lg={4}>
                    <b>Tipo de Cuenta</b><br/><br/>
                    {item.accountType === "null" ? "-" : item.accountType}
                </Col>
                <Col xs={12} sm={12} md={7} lg={6}>
                    <b>Número de cuenta</b><br/><br/>
                    {item.accountNumber}
                </Col>
              </Row>
              <br/><br/>
              <Row gutter={4}>
                <Col xs={24} sm={12} md={18} lg={14} className={"document-col"}>
                  <Button className={"request-document-button"} icon="file" onClick={() => this.seeDocument(item.filePath, item.paymentSupport, item.workingSupport)} >
                        Ver documento
                  </Button> 
                </Col>
                <Col xs={24} sm={12} md={6} lg={5}>
                  <Button className={"request-reject-button"} icon="close-circle" 
                          onClick={() => this.onRejectRequest(item.idRequest)}>
                        Rechazar crédito
                  </Button> 
                </Col>
                <Col xs={24} sm={12} md={6} lg={5}>
                  <Button className={"request-confirm-button"} icon="check-circle" 
                          onClick={() => this.onConfirmRequest(item.idRequest)}>
                        Aprobar crédito
                  </Button> 
                </Col>
                
              </Row>
            </div>
          }
        </div>
      </Badge>
    );
  };

}

RequestStateModal.propTypes = {
  customerList: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    customerList: state.admin.customerList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    approveorRejectRequestByCompany: (data, userId) => dispatch(approveorRejectRequestByCompany(data, userId)),    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestStateModal);