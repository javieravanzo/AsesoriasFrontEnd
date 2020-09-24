//Libraries
import React, {Component} from 'react';
import {Col, Row, Tooltip, Icon, Divider, Steps, Badge, Popover} from 'antd';
import CurrencyFormat from "react-currency-format";

//Styles
import '../../styles/customer/request-state.css';

//Constants
import {requestState, defineBadgeName, defineButtonClass} from '../../../configuration/constants';
const Step = Steps.Step;

const steps = [
  <Step key={0} title={<Popover content="Solicitada">Sol.</Popover>} />,
  <Step key={1} title={<Popover content="Aprobada Recursos Humanos">Aprob. Rec.</Popover>}/>,
  <Step key={2} title={<Popover content="Aprobada Administración">Aprob. Adm.</Popover>} />,
  <Step key={3} title={<Popover content="En desembolso">Des.</Popover>}/>,
  <Step key={4} title={<Popover content="Finalizada">Fin.</Popover>} />,  
  <Step key={5} title={<Popover content="Documentos errados">Documentos errados</Popover>}/>,
  <Step key={6} title={<Popover content="Rechazada">Rechazada</Popover>} />,
  <Step key={7} title={<Popover content="Devolución bancaria">Dev.</Popover>}/>,  
  <Step key={8} title={<Popover content="Procesadas sin cambio">PSC.</Popover>}/>,
  <Step key={9} title={<Popover content="Procesada documentos con cambio">PCC.</Popover>}/>,
  <Step key={10} title={<Popover content="Rechazadas por el banco procesadas">Rech. B.</Popover>}/>,
];

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

  setContent(idRequestState, approveHumanResources){

    let array = [];

    if(idRequestState <= 5){
      
      for(let i = 0; i < 5; i++){
        array.push(steps[i]);
        if (i === 1 && approveHumanResources === 0 ){
          array.pop(steps[i]);
        }
      }

      return (
        <Steps current={idRequestState-1} initial={0} size="small" >
          {array}
        </Steps>
      );

    }else{

      if(idRequestState === 6){
        array.push(steps[0]);
        array.push(steps[5]);

        return (
          <Steps style={{textAlign: "left !important"}} current={1} initial={0} size="small" >
            {array}
          </Steps>
        );
      }

      if(idRequestState === 7){
        //State = Step-1 because arrays starts in 0.
        array.push(steps[0]);
        array.push(steps[6]);

        return (
          <Steps current={1} initial={0} size="small" >
            {array}
          </Steps>
        );

      }

      if(idRequestState === 8){
        //State = Step-1 because arrays starts in 0.
        array.push(steps[0]);
        array.push(steps[1]);
        array.push(steps[2]);
        array.push(steps[3]);
        array.push(steps[7]);

        return (
          <Steps current={4}  initial={0} size="small" >
            {array}
          </Steps>
        );

      }

    }    

  };

  render(){

    let item = this.props.item;
    console.log("Item", item);
    let real_steps = this.setContent(this.props.item.idRequestState, this.props.item.approveHumanResources);

    //console.log(item);
    return (
        <Badge count={defineBadgeName(item.idRequestState)} className={"request-badge"} style={{backgroundColor: defineButtonClass(item.idRequestState), color: "black"} }>
          <div key={item.key} className={"request-state-item-requested"}>
            <Row>
              <Col xs={12} sm={12} md={8} lg={6} className="request-item-initial-col">
                <b>No. de Solicitud</b> <br/><br/>
                {"Solicitud No. " + item.idRequest} 
              </Col>
              <Col xs={12} sm={12} md={8} lg={5} className="request-item-initial-col" >
                  <b>Estado</b> <br/><br/>  {item.stateName}
              </Col>
              <Col xs={12} sm={12} md={7} lg={6}  className="request-item-initial-col">
                  <b>Fecha</b> <br/><br/> {item.createdDate.split("T")[0]}
              </Col>
              <Col xs={12} sm={12} md={7} lg={5}  className="request-item-initial-col">
                  <b>Monto</b> <br/><br/>
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
              <Row className={"additional-info"}>
                <Divider/>
                <Col xs={24} sm={12} md={8} lg={6} >
                  <b>Flujo de aprobación</b>
                </Col>  
              </Row>
              <br/><br/>
              <Row className={"additional-info"}>
                {real_steps}      
              </Row>
              <br/><br/>
              <Row>
                <Col xs={24} sm={12} md={8} lg={6} >
                  <b>Información adicional</b>
                </Col>  
              </Row>
              <br/><br/>
              <Row>
                <Col xs={12} sm={12} md={8} lg={4} className="request-item-initial-col">
                  <b>Valor total</b><br/><br/>
                  <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                      value={item.totalValue} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}/> 
                </Col>
                <Col xs={12} sm={12} md={8} lg={4} className="request-item-initial-col" >
                    <b>Cuotas</b><br/><br/>
                    {item.split}
                </Col>
                <Col xs={12} sm={12} md={7} lg={4} className="request-item-initial-col">
                    <b>Cuenta</b><br/><br/>
                    {item.account}
                </Col>
                <Col xs={12} sm={12} md={7} lg={6} className="request-item-initial-col">
                    <b>Tipo de Cuenta</b><br/><br/>
                    {item.accountType !== "null" ? item.accountType : "-" }
                </Col>
                <Col xs={12} sm={12} md={7} lg={6} className="request-item-initial-col">
                    <b>Número de cuenta</b><br/><br/>
                    {item.accountNumber}
                </Col>
              </Row>
              <br/><br/>
              <Row>
                <Col xs={12} sm={12} md={8} lg={5} className="request-item-initial-col">
                  <b>Pre-cupo calculado</b><br/><br/>
                  <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                      value={item.computedCapacity} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}/> 
                </Col>
                <Col xs={12} sm={12} md={8} lg={16} className="request-item-initial-col">
                  <b>Observaciones</b><br/><br/>
                      {item.observation === "" ? "-" : item.observation}  
                </Col>
              </Row>
              <br/><br/>
              {
                item.idRequestState === 32 &&
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
                item.idRequestState === requestState.OUTLAYED &&
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
                item.idRequestState === 7 &&
                <div className={"request-item-requested-reject"}>
                  <Row className={"rejected-row"}>
                    <span>  
                      {" "}Tu solicitud fue rechazada por este motivo: {item.observation}.
                    </span>
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
