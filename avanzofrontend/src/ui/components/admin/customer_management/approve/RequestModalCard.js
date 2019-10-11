//Libraries
import React, {Component} from 'react';
import {Col, Row, Tooltip, Icon, Divider, Steps, Button, Modal} from 'antd';
//import CurrencyFormat from "react-currency-format";

//Subcomponents
import { SUCCESS_MODAL } from '../../../subcomponents/modalMessages';

//Styles
import '../../../../styles/admin/request_management/request-state.css';



//Constants
const Step = Steps.Step;

class RequestModalCard extends Component {

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
    };
    
  };

  defineBadgeName = (id) => {
    if(id === 1){
      return "Solicitada";
    }else if(id === 2){
      return "En análisis";
    }else if(id === 4){
      return "Aprobar Admon.";
    }else if(id === 3){
      return "Aprobar RR.HH.";
    }else if(id === 5){
      return "Rechazada";
    }else if(id=== 6){
      return "Desembolsada"
    }else{
      return "Solicitada"
    }
  };

  defineButtonClass = (id) => {
    if(id === 1){
      return "#c1c1c1";
    }else if(id === 2){
      return "yellow";
    }else if(id === 3){
      return "#ffa962";
    }else if(id === 4){
      return "#62ffb5";
    }else if(id === 5){
      return "#6cff55 ";
    }else{
      return "white";
    }
  };

  onConfirmRequest = () => {
    SUCCESS_MODAL("Acción realizada exitosamente", "La solicitud ha sido aprobada correctamente.");
    this.setState({approve_modal: false});
  };

  onCancelRequest = () => {
    SUCCESS_MODAL("Acción realizada exitosamente", "La solicitud ha sido rechazada correctamente.");
    this.setState({reject_modal: false});
  };

  handleQuickApprove = () => {
    SUCCESS_MODAL("Acción realizada exitosamente", "La solicitud ha sido aprobada correctamente.");
  };

  render(){

    let item = this.props.item;
    //let {approve_modal} = this.state;

    return (
          <div key={item.key} className={"request-state-item-requested"}>
            <Row>
              <Col xs={24} sm={12} md={2} lg={2}>
                  <Tooltip title="Detallar solicitud">
                    <Icon type={"plus-circle"} className={"request-item-icon"} onClick={() => this.setState({visible: !this.state.visible})}/> 
                  </Tooltip>
                </Col>
              <Col xs={12} sm={12} md={8} lg={5} className="request-item-initial-col">
                <b>Nombres</b> <br/><br/>
                {item.name} 
              </Col>
              <Col xs={12} sm={12} md={8} lg={5} className="request-item-initial-col" >
                  <b>Apellidos</b> <br/><br/>  {item.lastName}
              </Col>
              <Col xs={12} sm={12} md={7} lg={5}  className="request-item-initial-col">
                  <b>Tipo Documento</b> <br/><br/> {item.documentType}
              </Col>
              <Col xs={12} sm={12} md={7} lg={5}  className="request-item-initial-col">
                  <b>Número Documento</b> <br/><br/> {item.documentNumber}
              </Col>
              <Col xs={24} sm={12} md={2} lg={1}>
                <Tooltip title="Aprobar usuario">
                  <Icon type={"check-circle"} className={"request-item-icon-approve"} onClick={() => this.handleQuickApprove()}/> 
                </Tooltip>
              </Col>
              <Col xs={24} sm={12} md={2} lg={1}>
                <Tooltip title="Rechazar usuario">
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
                <Steps current={item.requestStateId-1} size="small" className={"request-state-steps"}>
                  <Step title="Solicitada"/>
                  <Step title="En análisis"/>
                  <Step title="Aprobar RR.H H."/>
                  <Step title="Aprobar Admon."/>                 
                  <Step title="Desembolsada"/>
                  
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
                <Col xs={12} sm={12} md={8} lg={4} >
                  <b>Nombres</b><br/><br/>
                  {item.name} 
                </Col>
                <Col xs={12} sm={12} md={8} lg={4} >
                  <b>Apellidos</b><br/><br/>
                  {item.lastName}
                </Col>
                <Col xs={12} sm={12} md={7} lg={4}>
                    <b>Empresa</b><br/><br/>
                    {"Emtelco"}
                </Col>
                <Col xs={12} sm={12} md={7} lg={6}>
                    <b>Cargo</b><br/><br/>
                    {"Desarrollador"}
                </Col>
                <Col xs={12} sm={12} md={7} lg={6}>
                    <b>Dirección</b><br/><br/>
                    {"Calle 54 No. 18 - 12"}
                </Col>
              </Row>
              <br/>
              <br/>
              <Row>
                <Col xs={12} sm={12} md={8} lg={4} >
                  <b>Monto</b><br/><br/>
                  {item.quantity} 
                </Col>
                <Col xs={12} sm={12} md={8} lg={4} >
                    <b>Cuotas</b><br/><br/>
                    {item.fee}
                </Col>
                <Col xs={12} sm={12} md={7} lg={4}>
                    <b>Cuenta</b><br/><br/>
                    {item.accountName}
                </Col>
                <Col xs={12} sm={12} md={7} lg={6}>
                    <b>Tipo de Cuenta</b><br/><br/>
                    {item.accountType}
                </Col>
                <Col xs={12} sm={12} md={7} lg={6}>
                    <b>Número de cuenta</b><br/><br/>
                    {item.accountNumber}
                </Col>
              </Row>
              <br/><br/>
              <Row gutter={4}>
                <Col xs={24} sm={12} md={18} lg={14} className={"document-col"}>
                  <Button className={"request-document-button"} icon="file" >
                        Ver documento
                  </Button> 
                </Col>
                <Col xs={24} sm={12} md={6} lg={5}>
                  <Button className={"request-reject-button"} icon="close-circle" 
                          onClick={() => this.setState({approve_modal: true})}>
                        Rechazar crédito
                  </Button> 
                </Col>
                <Col xs={24} sm={12} md={6} lg={5}>
                  <Button className={"request-confirm-button"} icon="check-circle" 
                          onClick={() => this.setState({approve_modal: true})}>
                        Aprobar crédito
                  </Button> 
                </Col>
                <Modal 
                  title="Aprobar crédito"
                  visible={this.state.approve_modal}
                  okText={"Aprobar"}
                  cancelText={"Cancelar"}
                  width={450}
                  onOk={() => this.onConfirmRequest()}
                  onCancel={() => this.setState({approve_modal: false})}>
                    <div>
                      ¿Está seguro de realizar la aprobación del crédito? Esta acción será irreversible.                  
                    </div>
    
                </Modal>
              </Row>
            </div>
          }
        </div>
    );
  };

}

export default RequestModalCard;