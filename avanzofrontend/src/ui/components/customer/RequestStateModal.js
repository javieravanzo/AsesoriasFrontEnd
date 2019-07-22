//Libraries
import React, {Component} from 'react';
import {Col, Row, Tooltip, Icon, Divider, Steps, Badge} from 'antd';
import CurrencyFormat from "react-currency-format";

//Styles
import '../../styles/customer/request-state.css';

//Constants
const Step = Steps.Step;

class RequestStateModal extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      visible: null,
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
      return "En evaluación";
    }else if(id === 3){
      return "Aprobar RR.HH.";
    }else if(id === 4){
      return "Rechazada";
    }else if(id=== 5){
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
      return "#ff4747";
    }else if(id === 5){
      return "#6cff55 ";
    }else{
      return "white";
    }
  };

  render(){

    let item = this.props.item;

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
                <Steps current={item.requestStateId-1} size="small" className={"request-state-steps"}>
                  <Step title="Solicitada"/>
                  <Step title="En evaluación"/>
                  {
                    (item.requestStateId-1 !== 3) && 
                    <Step title="Aprobar RR.HH."/>
                  }
                  {
                    (item.requestStateId-1 !== 3) && 
                    <Step title="Aprobar Admon."/>
                  }
                  
                  {
                    (item.requestStateId-1 === 3) && 
                    <Step title="Rechazada"/>
                  }
                  {
                    (item.requestStateId-1 !== 3) && 
                    <Step title="Desembolsada"/>
                  }
                  
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
              {
                item.requestStateId === 3 &&
                <div className={"request-item-requested-alert"}>
                  <Row>
                    <h3> 
                      <Icon type="exclamation-circle" className={"request-item-alert-icon"}/> 
                      {" "}Ayudanos para que el área de recursos humanos de tu empresa realice la aprobación del crédito.
                    </h3>
                  </Row>
                </div>
              }
              {
                item.requestStateId === 5 &&
                <div className={"request-item-requested-confirm"}>
                  <Row>
                    <h3> 
                      <Icon type="check-circle" className={"request-item-alert-icon"}/> 
                      {" "}¡Tu solicitud ha sido desembolsada exitosamente!
                    </h3>
                  </Row>
                </div>
              }
              {
                item.requestStateId === 4 &&
                <div className={"request-item-requested-reject"}>
                  <Row>
                    <h3> 
                      <Icon type="close-circle" className={"request-item-alert-icon"}/> 
                      {" "}¡Tu solicitud fue rechazada por este motivo: ... !
                    </h3>
                  </Row>
                </div>
              }

            </div>
          }
        </div>
      </Badge>
    );
  };

}

export default RequestStateModal;
