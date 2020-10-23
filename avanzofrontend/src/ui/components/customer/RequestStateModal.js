//Libraries
import React, {Component} from 'react';
import {Col, Row, Tooltip, Icon, Divider, Steps, Badge, Popover, Select, InputNumber, Switch, Button, Modal} from 'antd';
import CurrencyFormat from "react-currency-format";
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
import { WARNING_MODAL, allowEmergingWindows } from '../subcomponents/modalMessages';
import {bankTypeAccountInfo} from '../../../configuration/constants';

//Styles
import '../../styles/customer/request-state.css';

//Actions
import { getOutlayData, updateRequestDocument, updateRequestInformation } from "../../../store/redux/actions/customer/customerActions";

//Constants
import {requestState, defineBadgeName, defineButtonClass} from '../../../configuration/constants';
import BaseURL from '../../../services/BaseURL';

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
      approve_modal: null,
      money_wallet: false,
      bank_account: true,
      update_modal: null,
      working_support: null,
      payment_support: null,
      account: null,
      accountNumber: null,
      accountType: null
    };

    //this.props.getOutlayData(parseInt(localStorage.user_id, 10), undefined);
    
  };

  setContent(idRequestState, approveHumanResources){

    let array = [];

    if(idRequestState < 5){
      
      for(let i = 0; i < 5; i++){
        array.push(steps[i]);
        if (i === 1 && approveHumanResources === 0 ){
          array.pop(steps[i]);
        }
      }

      return (
        <Steps current={approveHumanResources ? idRequestState-1 : idRequestState-2} initial={0} size="small" >
          {array}
        </Steps>
      );

    }else if(idRequestState === 5){

      for(let i = 0; i < 5; i++){
        array.push(steps[i]);
        if (i === 1 && approveHumanResources === 0 ){
          array.pop(steps[i]);
        }
      }

      return (
        <Steps current={6} initial={0} size="small" >
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

  handleWallet = (e) => {
    this.setState({
      money_wallet: e,
      bank_account: !e,
    });
  };

  changeBankName = (e) => {
    this.setState({
      account: e
    });
  };

  changeWalletType = (e) => {
    this.setState({
      account: e
    });
  };

  changeBankType = (e) => {
    this.setState({
      accountType: e
    });
  };

  changeAccountNumber = (e) => {
    this.setState({
      accountNumber: e
    });
  };

  onChangePaymentSupport  = (e) => {

    let fileType = e.target.files;
    this.setState({
      payment_support : fileType[0]
    });

  };

  onChangeWorking = (e) => {

    let fileType = e.target.files;
    this.setState({
      working_support: fileType[0]
    });

  };

  sendNewDocuments = (idRequest,  idCompany, identificationId) => {

    let {payment_support, working_support} = this.state;

    if (payment_support === null && working_support === null){
      WARNING_MODAL("Advertencia", "No se han cargado los archivos correspondientes para actualizar la solicitud.");
    }else{
      let newData = {
        payment_support: payment_support, 
        working_support: working_support,
        idRequest: idRequest,
        customerId: parseInt(localStorage.user_id, 10),
        idCompany: idCompany,
        identificationId: identificationId,
      };
      this.props.updateRequestDocument(newData);
    }

  };

  updateRequestInfo = (idRequest, idCompany, identificationId) => {

    let {account, accountNumber, accountType} = this.state;

    if (account === null && accountNumber === null){
      WARNING_MODAL("Advertencia", "No se han modificado los datos necesarios para actualizar la solicitud.");
    }else{
      let newData = {
        account: account, 
        accountNumber: accountNumber,
        accountType: accountType,
        idRequest: idRequest,
        customerId: parseInt(localStorage.user_id, 10),
        idCompany: idCompany,
        identificationId: identificationId,
      };
      this.props.updateRequestInformation(newData);
    }

  };

  render(){

    let item = this.props.item;
    //console.log("ITEM", item);
    
    let { bankInfo, walletInfo } = this.props.outlayDataResponse;
    
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
              { 
                (item.idRequestState !== requestState.REJECTED && item.idRequestState !== 11) &&
                <Row>
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
                </Row>
              }
              
              <br/><br/>
              <Row>
                <Col xs={24} sm={12} md={8} lg={6} >
                  <b>Información adicional</b>
                </Col>  
              </Row>
              <br/><br/>
              <Row>
                
                <Col xs={12} sm={12} md={8} lg={8} className="request-item-initial-col">
                    <b>Cuenta</b><br/><br/>
                    {
                      ((item.idRequestState === requestState.REJECTED || item.idRequestState === 11) && this.state.bank_account) &&
                      <Select className={"account-customer-input"} onChange={this.changeBankName} defaultValue={item.account} placeholder={"Cuenta o Banco"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                        {bankInfo.map((bank, i) =>(
                          <Select.Option value={bank.bankName} key={i}>
                            {bank.bankName}
                          </Select.Option>
                        ))
                        }
                      </Select>                    
                    }
                    {
                      ((item.idRequestState === requestState.REJECTED || item.idRequestState === 11) && this.state.money_wallet) &&
                      <Select className={"account-customer-input"} onChange={this.changeWalletType} defaultValue={item.account} placeholder={"Tipo de billetera"} showSearch={true}>
                        {walletInfo.map((wallet, i) =>(
                          <Select.Option value={wallet.bankName} key={i}>
                            {wallet.bankName}
                          </Select.Option>
                        ))
                        }
                      </Select>                    
                    }
                    {
                      (item.idRequestState !== requestState.REJECTED && item.idRequestState !== 11 ) &&
                        
                        item.account
                    }
                </Col>
                <Col xs={12} sm={12} md={8} lg={8} className="request-item-initial-col">
                    <b>Tipo de Cuenta</b><br/><br/>
                    {
                      ((item.idRequestState === requestState.REJECTED || item.idRequestState === 11) && this.state.bank_account) &&
                        
                      <Select className={"account-customer-input"} onChange={this.changeBankType} defaultValue={item.accountType} placeholder={"Tipo de cuenta"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                        {bankTypeAccountInfo.map((accountType, i) =>(
                          <Select.Option value={accountType.name} key={i}>
                            {accountType.name}
                          </Select.Option>
                          ))
                        }
                      </Select>
                    
                    }
                    {
                      ((item.idRequestState === requestState.REJECTED || item.idRequestState === 11) && this.state.money_wallet) &&
                        "-"
                    } 
                      
                    {
                      (item.idRequestState !== requestState.REJECTED && item.idRequestState !== 11) &&
                        
                      item.accountType
                    }
                </Col>
                <Col xs={12} sm={12} md={8} lg={8} className="request-item-initial-col">
                    <b>Número de cuenta</b><br/><br/>
                    {
                      ((item.idRequestState === requestState.REJECTED || item.idRequestState === 11)) &&
                        
                        <InputNumber onChange={(e) => this.changeAccountNumber(e)} className={"account-customer-input"} defaultValue={item.accountNumber} placeholder="Número de cuenta"/>
                    
                    }
                    {
                      (item.idRequestState !== requestState.REJECTED && item.idRequestState !== 11 ) &&
                        
                      item.accountNumber
                    }
                </Col>
              </Row>
              <br/><br/>
              <Row>
                <Col xs={12} sm={12} md={8} lg={5} className="request-item-initial-col">
                  <b>Valor total</b><br/><br/>
                  <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                      value={item.totalValue} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}/> 
                </Col>
                <Col xs={12} sm={12} md={8} lg={5} className="request-item-initial-col" >
                    <b>Cuotas</b><br/><br/>
                    {item.split}
                </Col>
                <Col xs={12} sm={12} md={8} lg={5} className="request-item-initial-col">
                  <b>Pre-cupo calculado</b><br/><br/>
                  <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                      value={item.computedCapacity} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}/> 
                </Col>
                <Col xs={12} sm={12} md={8} lg={8} className="request-item-initial-col">
                  <b>Observaciones</b><br/><br/>
                      {item.observation === "" ? "-" : item.observation}  
                </Col>
              </Row>
              <br/>
              {
                item.idRequestState === 32 &&
                <div className={"request-item-requested-alert"}>
                  <Row >
                    <h3> 
                      <Icon type="exclamation-circle" className={"request-item-alert-icon"}/> 
                      {" "}Ayudanos para que el área de recursos humanos de tu empresa realice la aprobación del crédito.
                    </h3>
                  </Row>
                </div>
              }
              {
                item.idRequestState === requestState.FINALIZED &&
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
                (item.idRequestState === 23) &&             
                <div className={"request-item-requested-reject"}>
                  <Row className={"rejected-row"}>
                    <span>  
                      {" "}Tu solicitud fue rechazada por este motivo: {item.observation}.
                    </span>
                  </Row>
                </div>
              }
              {
                (item.idRequestState === requestState.REJECTED || item.idRequestState === 11) &&
                <Row>
                  <Row>
                    <br/>
                    <Col xs={24} sm={24} md={8} lg={7}>
                      <span className={"type-account"}>{"Banco "}<Switch onChange={this.handleWallet}/>{" Billetera virtual"}</span>  
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={10}/>
                  </Row>
                  <Row gutter={4}>
                    <Col xs={0} sm={0} md={7} lg={14}/>
                    <Col xs={24} sm={12} md={8} lg={9}>
                      <Button className={"request-confirm-button"} icon="check-circle" 
                              onClick={() => this.setState({update_modal: true})}>
                            Actualizar datos de la solicitud
                      </Button> 
                    </Col>
                  </Row>
                  <Modal 
                    title="Actualizar solicitud"
                    visible={this.state.update_modal}
                    okText={"Aceptar"}
                    cancelText={"Cancelar"}
                    width={450}
                    onOk={() => this.updateRequestInfo(item.idRequest, item.Company_idCompany, item.identificationId)}
                    onCancel={() => this.setState({update_modal: false})}>
                      <div>
                        ¿Está seguro de actualizar la información de la solicitud y enviarla a revisión?                  
                      </div>

                  </Modal>
                </Row>
              }
              
              { 
                (item.idRequestState === requestState.INVALID_DOCUMENTS) &&
                <Row>
                  <Divider/>
                  <br/>
                  <Row className={"additional-info"}>
                    <Col xs={24} sm={12} md={8} lg={9} >
                      <b>Corregir información de la solicitud</b>
                    </Col>  
                  </Row>
                  <br/>
                  <Row>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <p>Cargar certificado laboral</p>
                      <input key={this.state.kBK} type="file" className={"input-statemodal-request"} onChange={this.onChangeWorking}
                            accept=".pdf, application/pdf"/>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <p>Cargar comprobante de pago</p>
                      <input key={this.state.kBK} type="file" className={"input-statemodal-request"} onChange={this.onChangePaymentSupport}
                            accept=".pdf, application/pdf"/>
                    </Col>
                  </Row>
                  <Row gutter={4}>
                    <Col xs={0} sm={0} md={8} lg={10}/>
                    <Col xs={24} sm={12} md={8} lg={6}/>
                    <Col xs={24} sm={12} md={8} lg={7}>
                      <Button className={"request-confirm-button"} icon="upload" 
                              onClick={() => this.setState({approve_modal: true})}>
                            Enviar documentos corregidos
                      </Button> 
                    </Col>
                  </Row>
                  <Modal 
                    title="Enviar documentos corregidos"
                    visible={this.state.approve_modal}
                    okText={"Aceptar"}
                    cancelText={"Cancelar"}
                    width={450}
                    onOk={() => this.sendNewDocuments(item.idRequest, item.Company_idCompany, item.identificationId)}
                    onCancel={() => this.setState({approve_modal: false})}>
                      <div>
                        ¿Está seguro de actualizar la información de la solicitud y 
                        enviar los documentos corregidos?                  
                      </div>

                  </Modal>
                </Row>
              }

            </div>
          }
        </div>
      </Badge>
    );
    
  };

}

RequestStateModal.propTypes = {
  outlayDataResponse: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    outlayDataResponse: state.customer.outlayDataResponse,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOutlayData: (customerId, token) => dispatch(getOutlayData(customerId, token)),
    updateRequestDocument: (data) => dispatch(updateRequestDocument(data)),
    updateRequestInformation: (data) => dispatch(updateRequestInformation(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestStateModal);
