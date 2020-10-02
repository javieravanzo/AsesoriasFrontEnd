//Libraries
import React, {Component} from 'react';
import {Col, Row, Tooltip, Icon, Divider, Steps, Badge, Button, Modal, Popover} from 'antd';
import CurrencyFormat from "react-currency-format";
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Styles
import '../../../../styles/admin/request_management/request-state.css';

//Actions
import {approveorRejectRequest} from "../../../../../store/redux/actions/general/generalActions";

//Constants
import {defineBadgeName, defineButtonClass} from '../../../../../configuration/constants';
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

class RequestOutLayState extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      visible: null,
      approve_modal: null,
      transactionCode: null,
      card_style_requested: "requested",
      card_style_analysis: "analysis",
      card_style_approved: "approved",
      card_style_rejected: "rejected",
    };
    
  };

  onConfirmRequest = (idRequest) => {
    let data = {
      requestId: idRequest,
      approve: true,
      transactionCode: this.state.transactionCode
    };
    this.props.approveorRejectRequest(data, localStorage.user_id);
    this.setState({approve_modal: false});
  };

  onChangeTransactionCode = (e) => {
    this.setState({
      transactionCode: e.target.value
    });
  };

  onRejectRequest = (idRequest) => {
    let data = {
      requestId: idRequest,
      approve: false,
      transactionCode: this.state.transactionCode
    };
    //console.log("D", data);
    this.props.approveorRejectRequest(data, localStorage.user_id);
    this.setState({approve_modal: false});
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
    //let {transactionCode} = this.state;
    //console.log(transactionCode);
    let real_steps = this.setContent(this.props.item.idRequestState, this.props.item.approveHumanResources);

    return (
      <Badge count={defineBadgeName(item.requestStateId)} style={{backgroundColor: defineButtonClass(item.requestStateId), color: "black"} }>
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
                    <b>Fecha de Solicitud</b> <br/><br/> {(item.createdDate).split("T")[0]}
                </Col>
                <Col xs={12} sm={12} md={7} lg={5}  className="request-item-initial-col">
                    <b>Valor Total</b> <br/><br/>
                    <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                        value={item.quantity} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}/>
                </Col>
                <Col xs={24} sm={12} md={2} lg={1}>
                  <Tooltip title="Desembolsar solicitud">
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
                  <Col xs={12} sm={12} md={8} lg={4} >
                    <b>Nombres</b><br/><br/>
                    {item.lastName} 
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
                      {item.profession}
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
                      {item.split}
                  </Col>
                  <Col xs={12} sm={12} md={7} lg={4}>
                      <b>Cuenta</b><br/><br/>
                      {item.account}
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
                  <Col xs={24} sm={12} md={18} lg={13} className={"document-col"}>
                    <Button className={"request-document-button"} icon="file" >
                          Ver documento
                    </Button> 
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={5}>
                    <Button className={"request-reject-button"} icon="close-circle" 
                            onClick={() => this.setState({reject_modal: true})}>
                          Rechazar crédito
                    </Button> 
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6}>
                    <Button className={"request-confirm-button"} icon="check-circle" 
                            onClick={() => this.setState({approve_modal: true})}>
                          Desembolsar crédito
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
                  ¿Está seguro de realizar el desembolso del crédito? Esta acción será irreversible. Si la respuesta es correcta, ingrese el código de la transacción, sino de clic en el botón "Cancelar".                 
                  <br/>
                </div>
            </Modal>
            <Modal 
              title="Rechazar crédito"
              visible={this.state.reject_modal}
              okText={"Rechazar"}
              cancelText={"Atrás"}
              width={450}
              onOk={() => this.onRejectRequest(item.idRequest)}
              onCancel={() => this.setState({reject_modal: false})}>
                <div>
                  ¿Está seguro de realizar el rechazo del crédito? Esta acción será irreversible.                  
                </div>
            </Modal>
        </div>
      </Badge>
    );
  };
}

RequestOutLayState.propTypes = {
  customerList: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    customerList: state.admin.customerList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //getAllRequestToApprove: () => dispatch(getAllRequestToApprove( )),
    approveorRejectRequest: (data, userId) => dispatch(approveorRejectRequest(data, userId)),    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestOutLayState);

