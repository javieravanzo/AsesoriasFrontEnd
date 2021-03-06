//Libraries
import React, {Component} from 'react';
import {Col, Row, Tooltip, Icon, Divider, Steps, Badge, Button, Modal, Form, Select, Popover} from 'antd';
import CurrencyFormat from "react-currency-format";
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Styles
import '../../../../styles/admin/request_management/request-state.css';
import { allowEmergingWindows, WARNING_MODAL} from '../../../subcomponents/modalMessages';

//Subcomponents
import BaseURL from '../../../../../services/BaseURL';

//Actions
import {approveorRejectRequest} from "../../../../../store/redux/actions/general/generalActions";

//Constants
import {defineBadgeName, defineButtonClass} from '../../../../../configuration/constants';


const Step = Steps.Step;
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
      not_visible: null,
    };
    
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.approveRejectedResponse !== null){
      return {
        visible: null,
      };
    }else{
      return {
        not_visible: true,
      };
    }
  };

  seeDocument = (filePath, paymentSupport, workingSupport) => {

    let url = filePath;

    if (url !== null) {
      let newWindow = window.open(BaseURL + "/" + filePath, "_blank");
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined' ) {
        allowEmergingWindows();
      }
    } else {
      WARNING_MODAL('Advertencia', 'El documento no está disponibles no está disponible');
    }

    if (  paymentSupport !== "" && workingSupport !== "" ) {  
      if (paymentSupport !== null && workingSupport !== null ) {
        let newWindow1 = window.open(BaseURL + "/" + paymentSupport, "_blank");
        let newWindow2 = window.open(BaseURL + "/" + workingSupport, "_blank");
        if (!newWindow1 || newWindow1.closed || typeof newWindow1.closed === 'undefined' ||
            !newWindow2 || newWindow2.closed || typeof newWindow2.closed === 'undefined' ) {
          allowEmergingWindows();
        }
      } else {
        WARNING_MODAL('Advertencia', 'Los documentos no están disponibles no está disponible');
      }
    }  
    
  };

  onConfirmRequest = (idRequest) => {
    let data = {
      requestId: idRequest,
      approve: true,
      text: "Aprobado",
    };
    this.props.approveorRejectRequest(data, localStorage.user_id);
    this.setState({approve_modal: false});
  };

  onRejectRequest = (idRequest) => {
    let data = {
      requestId: idRequest,
      approve: false,
      text: this.state.text
    };
    //console.log("D", data);
    this.props.approveorRejectRequest(data, localStorage.user_id);
    this.setState({reject_modal: false});
  };

  inputChange = (e) => {

    let value = e;
    this.setState({
      text: value,
    });
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
              <Col xs={12} sm={12} md={8} lg={5} className="request-item-initial-col" >
                  <b>Estado</b> <br/><br/>  {defineBadgeName(item.idRequestState)}
              </Col>
              <Col xs={12} sm={12} md={7} lg={5}  className="request-item-initial-col">
                  <b>Fecha de Solicitud</b> <br/><br/> {(item.createdAt)?item.createdAt.split("T")[0]:''}
              </Col>
              <Col xs={12} sm={12} md={7} lg={5}  className="request-item-initial-col">
                  <b>Monto</b> <br/><br/>
                  <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                      value={item.quantity} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}/>
              </Col>
              <Col xs={24} sm={12} md={2} lg={1}>
                <Tooltip title="Aprobar solicitud">
                  <Icon type={"check-circle"} className={"request-item-icon-approve"} onClick={() => this.setState({approve_modal: true})}/> 
                </Tooltip>
              </Col>
              <Col xs={24} sm={12} md={2} lg={1}>
                <Tooltip title="Rechazar solicitud">
                  <Icon type={"close-circle"} className={"request-item-icon-reject"} onClick={() => this.setState({reject_modal: true})}/> 
                </Tooltip>
              </Col> 
            </Row>
          
          {
            this.state.visible && 
            <div>
              <Row>
                <Divider/>
                <Col xs={24} sm={12} md={8} lg={6} >
                  <b>Flujo de aprobación</b>
                </Col>  
              </Row>
              <br/><br/>
              <Row>
                <Steps current={item.idRequestState-1} size="small" className={"request-state-steps"}>
                  <Step key={0} title={<Popover content="Solicitada">Sol.</Popover>} />
                  <Step key={1} title={<Popover content="Aprobada Recursos Humanos">Aprob. Rec.</Popover>} />
                  <Step key={2} title={<Popover content="Aprobada Administración">Aprob. Adm.</Popover>}/>
                  <Step key={3} title={<Popover content="En desembolso">Des.</Popover>}/>
                  <Step key={4} title={<Popover content="Finalizada">Fin.</Popover>} /> 
                </Steps>
              </Row>
              <br/><br/>
              <Row>
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
                  <b>Pre-cupo calculado</b><br/><br/>
                  <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                      value={item.computedCapacity} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}/> 
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
                    <b>Empresa</b><br/><br/>
                    {item.socialReason}
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
                          onClick={() => this.setState({reject_modal: true})}>
                        Rechazar crédito
                  </Button> 
                </Col>
                <Col xs={24} sm={12} md={6} lg={5}>
                  <Button className={"request-confirm-button"} icon="check-circle" 
                          onClick={() => this.setState({approve_modal: true})}>
                        Aprobar crédito
                  </Button> 
                </Col>
                
              </Row>
            </div>
          }

          <Modal 
            title="Aprobar crédito"
            visible={this.state.approve_modal}
            okText={"Aprobar"}
            cancelText={"Cancelar"}
            width={450}
            onOk={() => this.onConfirmRequest(item.idRequest)}
            onCancel={() => this.setState({approve_modal: false})}>
              <div>
                ¿Está seguro de realizar la aprobación del crédito? Esta acción será irreversible.                  
              </div>

          </Modal>
          
          <Modal 
            title="Rechazar crédito"
            visible={this.state.reject_modal}
            okText={"Rechazar"}
            cancelText={"Atrás"}
            width={450}
            onOk={() => this.onRejectRequest(item.idRequest)}
            onCancel={() => this.setState({reject_modal: false})}
            okButtonProps={{ disabled: !(this.state.text.length >= 20) }}>
              <Form>
                <p>¿Está seguro de realizar el rechazo del crédito? Esta acción será irreversible.
                Si es así, especifique a continuación la razón por la cual desea rechazar la solicitud.</p>
                <br/>
                <Select placeholder={"Elija una opción de rechazo"} onChange={e => this.inputChange(e)} onshowSearch={true} allowClear={true} autoClearSearchValue={true}>
                  <Select.Option value={"Documentos Alterados"}>Documentos Alterados</Select.Option>
                  <Select.Option value={"No se encuentra en base de datos de la empresa"}>No se encuentra en base de datos de la empresa</Select.Option>
                  <Select.Option value={"No cuenta con capacidad de endeudamiento"}>No cuenta con capacidad de endeudamiento</Select.Option>
                </Select>
              </Form>


          </Modal>
        </div>
      </Badge>
    );
  };

}

RequestStateModal.propTypes = {
  customerList: PropTypes.array,
  approveRejectedResponse: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    customerList: state.admin.customerList,
    approveRejectedResponse: state.admin.approveRejectedResponse,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //getAllRequestToApprove: () => dispatch(getAllRequestToApprove( )),
    approveorRejectRequest: (data, userId) => dispatch(approveorRejectRequest(data, userId)),    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestStateModal);