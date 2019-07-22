//Libraries
import React, {Component} from 'react';
import {Col, Row, Tooltip, Icon, Divider, Steps, Badge, Button, Modal} from 'antd';
import CurrencyFormat from "react-currency-format";

//Styles
import '../../../../styles/admin/request_management/request-state.css';
import { SUCCESS_MODAL } from '../../../subcomponents/modalMessages';

//Constants
const Step = Steps.Step;

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
      return "En desembolso"
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
    }else if(id === 6){
      return "#83ff62 ";
    }else{
      return "white";
    }
  };

  onConfirmRequest = () => {
    SUCCESS_MODAL("Acción realizada exitosamente", "El dinero ha sido desembolsado correctamente. Se le enviará un mensaje al cliente confirmando el desembolso.");
    this.setState({approve_modal: false});
  };

  render(){

    let item = this.props.item;
    //let {approve_modal} = this.state;

    return (
        <Badge count={this.defineBadgeName(item.requestStateId)} style={{backgroundColor: this.defineButtonClass(item.requestStateId), color: "black"} }>
          <div key={item.key} className={"request-state-item-requested"}>
            <Row>
              <Col xs={12} sm={12} md={8} lg={6} className="request-item-initial-col">
                <b>Número de Solicitud</b> <br/><br/>
                {"Solicitud No. " + item.key} 
              </Col>
              <Col xs={12} sm={12} md={8} lg={5} className="request-item-initial-col" >
                  <b>Estado</b> <br/><br/>  {item.requestState}
              </Col>
              <Col xs={12} sm={12} md={7} lg={6}  className="request-item-initial-col">
                  <b>Fecha de Solicitud</b> <br/><br/> {item.date}
              </Col>
              <Col xs={12} sm={12} md={7} lg={5}  className="request-item-initial-col">
                  <b>Valor Total</b> <br/><br/>
                  <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                      value={item.quantity} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}/>
              </Col>
              <Col xs={24} sm={12} md={2} lg={2}>
                <Tooltip title="Detallar solicitud">
                  <Icon type={"plus-circle"} className={"request-item-icon"} onClick={() => this.setState({visible: !this.state.visible})}/> 
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
                <Steps current={item.requestStateId} size="small" className={"request-state-steps"}>
                  <Step title="Solicitada"/>
                  <Step title="En análisis"/>
                  <Step title="Aprobar RR.H H."/>
                  <Step title="Aprobar Admon."/>                 
                  <Step title="En desembolso"/>
                  
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
              <Row>
                <Col xs={24} sm={12} md={18} lg={19}/>
                <Col xs={24} sm={12} md={6} lg={5}>
                  <Button className={"request-confirm-button"} icon="dollar" 
                          onClick={() => this.setState({approve_modal: true})}>
                        Realizar desembolso
                  </Button> 
                </Col>
                <Modal 
                  title="Realizar desembolso"
                  visible={this.state.approve_modal}
                  okText={"Aceptar"}
                  cancelText={"Cancelar"}
                  width={450}
                  onOk={() => this.onConfirmRequest()}
                  onCancel={() => this.setState({approve_modal: false})}>
                    <div>
                      ¿El desembolso del crédito ya ha sido realizado?                  
                    </div>
    
                </Modal>
              </Row>
            </div>
          }
        </div>
      </Badge>
    );
  };

}

export default RequestStateModal;
