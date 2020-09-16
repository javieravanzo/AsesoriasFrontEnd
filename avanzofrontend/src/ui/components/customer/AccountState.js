//Libraries
import React, {Component} from 'react';
import {Card, Row, Col, Divider, Typography, Skeleton, Button} from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import CurrencyFormat from "react-currency-format";
import { WARNING_MODAL, SUCCESS_MODAL } from '../subcomponents/modalMessages';
//import MiniLoading from '../subcomponents/MiniLoading';

//Actions
import {getAccountDetail} from "../../../store/redux/actions/customer/customerActions";

//Styles
import '../../styles/customer/account-state.css';

//Functions
function format(d) {
  var formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

  return formatter.format(d);
};

class AccountState extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      loan: false,
      request: false,
    };
    
    //this.next = this.next.bind(this);
    //this.previous = this.previous.bind(this);
    //this.carousel = React.createRef();

    this.props.getAccountDetail();

  };

  checkAccount = () => {

    if(this.props.accountDetail.totalRemainder > 0){
      WARNING_MODAL("Advertencia", "El paz y salvo no puede ser descargado porque existe una deuda de alrededor de " + format(this.props.accountDetail.totalRemainder)
       + " con Avanzo.");
    }else{
      SUCCESS_MODAL("Acción realizada exitosamente", "El paz y salvo ha sido descargado de forma correcta.")
    }

  };

  render() {

    let {accountDetail} = this.props;

    if(this.props.accountDetail === null){
      return (
        <Skeleton active paragraph={{ rows: 15 }} className={"main-skeleton"}/>        
      );
    }else{
      return (
        <div className={"account-div"}>
          <Row className={"request-row-content"}>
            <Col xxl={19} lg={18} md={19} sm={12} xs={11}>
              <Typography >
                <Typography.Title level={4} className={"request-form-title"}>
                  Estado de cuenta
                </Typography.Title>       
              </Typography>
            </Col>
            <Col lg={5} md={6} sm={12} xs={12} className={"account-button"}>
              <Button type="primary" icon="download" onClick={() => this.checkAccount()}>
                Paz y salvo
              </Button>
            </Col>
          </Row>
          <Divider className={"account-divider"}/>
          <Row gutter={12}>
            <Col lg={12} className={"account-left-column"}>
              <Row className={"account-name-row"}>
                <Col className={"account-main-column"}>
                  <Card className={"account-card"}>
                    <Row gutter={8} className={"information-col"}>
                      <Col xs={12} sm={24} md={10} lg={10} style={{textAlign: "left"}}>
                        <b>Nombres: </b>
                      </Col>
                      <Col xs={12} sm={12} md={14} lg={14} style={{textAlign: "left"}}>
                        <b style={{color: "#000"}}>
                          {accountDetail.name + " " + accountDetail.lastName}
                        </b>
                      </Col>
                    </Row>
                    <Row gutter={8} className={"information-col"}>
                      <Col xs={12} sm={24} md={10} lg={10} style={{textAlign: "left"}}>
                        <b>No. Identificación: </b>
                      </Col>
                      <Col xs={12} sm={12} md={14} lg={14} style={{textAlign: "left"}}>
                        <b style={{color: "#000"}}>
                          {accountDetail.identificationId}
                        </b>
                      </Col>
                    </Row>
                    <Row gutter={8} className={"information-col"}>
                      <Col xs={12} sm={24} md={10} lg={10} style={{textAlign: "left"}}>
                        <b>Correo electrónico:</b>
                      </Col>
                      <Col xs={12} sm={12} md={14} lg={14} style={{textAlign: "left"}}>
                        <b style={{color: "#000"}}>
                          {accountDetail.email}
                        </b>
                      </Col>
                    </Row>
                    <Row gutter={8} className={"information-col"}>
                      <Col xs={12} sm={24} md={10} lg={10} style={{textAlign: "left"}}>
                        <b>Número telefónico:</b>
                      </Col>
                      <Col xs={12} sm={12} md={14} lg={14} style={{textAlign: "left"}}>
                        <b style={{color: "#000"}}>
                          {accountDetail.phoneNumber}  
                        </b>
                      </Col>
                    </Row>
                    <Row gutter={8} className={"information-col"}>
                      <Col xs={12} sm={24} md={10} lg={10} style={{textAlign: "left"}}>
                        <b>Fecha de registro:</b>
                      </Col>
                      <Col xs={12} sm={12} md={14} lg={14} style={{textAlign: "left"}}>
                        <b style={{color: "#000"}}>
                          {accountDetail.createdDate.split("T")[0]}  
                        </b>
                      </Col>
                    </Row>
                    <Divider/>
                    <Row gutter={8} className={"information-col"}>
                      <Col xs={12} sm={24} md={10} lg={10} style={{textAlign: "left"}}>
                        <b>Empresa:</b>
                      </Col>
                      <Col xs={12} sm={12} md={14} lg={14} style={{textAlign: "left"}}>
                        <b style={{color: "#000"}}>
                          {accountDetail.socialReason}
                        </b>
                      </Col>
                    </Row>
                    <Row gutter={8} className={"information-col"}>
                      <Col xs={12} sm={24} md={10} lg={10} style={{textAlign: "left"}}>
                        <b>Cantidad de cuotas:</b>
                      </Col>
                      <Col xs={12} sm={12} md={14} lg={14} style={{textAlign: "left"}}>
                        <b style={{color: "#000"}}>
                          {accountDetail.montlyFee}
                        </b>
                      </Col>
                    </Row>
                    <Row gutter={8} className={"information-col"}>
                      <Col xs={12} sm={24} md={10} lg={10} style={{textAlign: "left"}}>
                        <b>Monto Máximo</b>
                      </Col>
                      <Col xs={12} sm={12} md={14} lg={14} style={{textAlign: "left"}}>
                        <b style={{color: "#000"}}>
                          <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                            value={accountDetail.maximumAmount} thousandSeparator={'.'}
                                            decimalSeparator={','} prefix={'$'}/></b>
                      </Col>
                    </Row>
                    <Row gutter={8} className={"information-col"}>
                      <Col xs={12} sm={24} md={10} lg={10} style={{textAlign: "left"}}>
                        <b>Pre-cupo calculado</b>
                      </Col>
                      <Col xs={12} sm={12} md={14} lg={14} style={{textAlign: "left"}}>
                        <b style={{color: "#000"}}>
                          <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                            value={accountDetail.computedCapacity} thousandSeparator={'.'}
                                            decimalSeparator={','} prefix={'$'}/></b>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col lg={12}>
              <Row className={"account-main-row"}>
                <Col className={"account-column"}>
              <Card className={"account-card"}>
                <Row gutter={8} className={"information-col"}>
                  <Col xs={12} sm={24} md={12} lg={12} style={{textAlign: "right"}}>
                    <b>Cupo disponible</b>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                    <b style={{color: "#18e000a6"}}>
                      <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                        value={accountDetail.maximumAmount} thousandSeparator={'.'}
                                        decimalSeparator={','} prefix={'$'}/></b>
                  </Col>
                  </Row>
                <br/>
                <br/>
                <b>Conceptos</b>
                <br/>
                <Row gutter={8} className={"information-col"}>
                  <Col xs={12} sm={24} md={12} lg={12} style={{textAlign: "right"}}>
                    <b>Capital</b>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                    <b style={{color: "#18e000a6"}}>
                      <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                        value={accountDetail.totalCapital} thousandSeparator={'.'}
                                        decimalSeparator={','} prefix={'$'}/></b>
                  </Col>
                </Row>
                <Row gutter={8} className={"information-col"}>
                  <Col xs={12} sm={24} md={12} lg={12} style={{textAlign: "right"}}>
                    <b>Intereses corrientes</b>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                    <b style={{color: "#18e000a6"}}>
                      <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                        value={accountDetail.totalInterest} thousandSeparator={'.'}
                                        decimalSeparator={','} prefix={'$'}/></b>
                  </Col>
                </Row>
                <Row gutter={8} className={"information-col"}>
                  <Col xs={12} sm={24} md={12} lg={12} style={{textAlign: "right"}}>
                    <b>Administración</b>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                    <b style={{color: "#18e000a6"}}>
                      <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                        value={accountDetail.totalFeeAdministration} thousandSeparator={'.'}
                                        decimalSeparator={','} prefix={'$'}/></b>
                  </Col>
                </Row>
                <Row gutter={8} className={"information-col"}>
                  <Col xs={12} sm={24} md={12} lg={12} style={{textAlign: "right"}}>
                    <b>IVA</b>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                    <b style={{color: "#18e000a6"}}>
                      <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                        value={accountDetail.totalOtherCollection} thousandSeparator={'.'}
                                        decimalSeparator={','} prefix={'$'}/></b>
                  </Col>
                </Row>
                <Divider/>
                <Row gutter={8} className={"information-col"}>
                  <Col xs={12} sm={24} md={12} lg={12} style={{textAlign: "right"}}>
                    <b>TOTAL A PAGAR</b>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                    <b style={{color: "#18e000a6"}}>
                      <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                        value={accountDetail.totalRemainder} thousandSeparator={'.'}
                                        decimalSeparator={','} prefix={'$'}/></b>
                  </Col>
                </Row>
              </Card>
            </Col>
              </Row>
            </Col>
          </Row>
        </div>);
    }
  }
}

AccountState.propTypes = {
  accountDetail: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    accountDetail: state.customer.accountDetail
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountDetail: () => dispatch(getAccountDetail())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountState);
