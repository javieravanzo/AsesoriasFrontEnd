//Libraries
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Card, Row, Col, Table, Divider, Statistic, Typography, Icon, Button, Skeleton} from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import routes from '../../../configuration/routing/Routes';
//import MiniLoading from '../subcomponents/MiniLoading';

//Actions
import {getHomeData} from "../../../store/redux/actions/customer/customerActions";

//Styles
import '../../styles/customer/index.css'


const table = [
  {
    title: <div>Tipo Transacción</div>,
    dataIndex: 'transactionType',
    width: "150px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.name.localeCompare(b.name)},
  },
  {
    title: <div className={"table-p"}>Cantidad</div>,
    dataIndex: 'quantity',
    width: "100px",
    align: "right",
    render: text => <div className={"table-p"}>{"$"+text}</div>,
    sorter: (a, b) =>{ return a.quantity.toString().localeCompare(b.quantity.toString())},
  },
  {
    title: <div className={"table-p"}>Fecha de Transacción</div>,
    dataIndex: 'createdAt',
    width: "150px",
    align: "center",
    render: text => <div className={"table-p"}>{text.split("T")[0]}</div>,
    sorter: (a, b) =>{ return a.createdAt.localeCompare(b.createdAt)},
  }
];

//Functions
/*function itemRender(current, type, originalElement) {
  if (type === 'prev' || type === 'Previous Page') {
    return <span title={'Anterior'} className={"item-renderer"}>{"<"}</span>;
  } if (type === 'next') {
    return <span title={'Siguiente'} className={"item-renderer"}>{">"}</span>;
  }
  return originalElement;
};*/

class Customer extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      loan: false,
      request: false,
    };
    
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();

    this.props.getHomeData(parseInt(localStorage.user_id, 10));

  };

  next() {
    this.carousel.next();
  };

  previous() {
    this.carousel.prev();
  };

  render() {

    let {homeDataResponse} = this.props;
    //console.log("HDR", homeDataResponse);
    let {loan, request} = this.state;
    let maximumAmount = homeDataResponse.maximumAmount;
    let partialQuantity = homeDataResponse.partialCapacity;
    let tableData = homeDataResponse.transactions;
    let pendingRequests = homeDataResponse.request;

    if(JSON.stringify(homeDataResponse) === '{}' || tableData === undefined){
      return (
        <Skeleton active paragraph={{ rows: 15 }} className={"main-skeleton"}/>        
      );
    }else{
      return (
        <div className={"customer-div"}>
          <Row>
            <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
              <Card className={"customer-card"}>
                <Row className={"customer-row-card"}>
                  <Col xxl={12} lg={12} md={13} sm={24} xs={24}>
                    <Typography>
                      <Typography.Title level={3} className={"customer-title"}>
                        ¡Bienvenido, {localStorage.getItem('user_name') +"!"}
                      </Typography.Title>       
                    </Typography>
                  </Col>      
                  <Col xxl={12} lg={12} md={11} sm={24} xs={24} className={"data-align"}>
                    <Card className={"customer-credit-card-index"}>
                      <Row gutter={4}>
                        <Col span={8} lg={8} md={12} sm={24} xs={24}>
                          <Statistic title={<h3 className="tag-weigth">Cupo disponible</h3>} value={(partialQuantity)} prefix={"$"}/>
                        </Col>
                        <Col span={8} lg={8} md={12} sm={24} xs={24}>
                          <Statistic title={<h3 className="tag-weigth">Cupo usado</h3>} value={(maximumAmount-partialQuantity)} prefix={"$"}/>
                        </Col>
                        <Col span={8} lg={8} md={12} sm={24} xs={24}>
                          <Statistic title={<h3 className="tag-weigth">Cupo total</h3>} value={maximumAmount} prefix={"$"}/>
                        </Col>
                      </Row>    
                    </Card>
                  </Col>
                </Row>
                <Row className={"row-table"}>
                  <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
                    <h3>Recientes transacciones...</h3>
                  </Col>
                  <Col>
                    <Divider className={"second-divider"}/>
                    <Table className={"new-table"} dataSource={tableData} columns={table} rowKey={'idTransaction'} 
                          size={'small'} scroll={{x:'500px'|true}} locale={{emptyText: 'No se han realizado transacciones hasta ahora.'}}
                          />
                  </Col>
                </Row>
                <Row className={"row-request"}>
                  <Col xxl={14} lg={14} md={14} sm={12} xs={24}>
                    <Button className={"request-button-none"} onClick={() => this.setState({loan: true})}>
                      <h3><Icon type={"plus-circle"} className={"request-button"}/> 
                        <span className={"request-title"}> Solicitar préstamo</span>
                      </h3>
                    </Button>
                  </Col>
                  <Col xxl={9} lg={9} md={9} sm={10} xs={24} className={"request-pending-col"}>
                    <Button className={"request-pending-button"} onClick={() => this.setState({request: true})}>
                      <h3>
                        {
                          pendingRequests !== 0 && 
                          <span className={"request-pendings"}>Tienes {pendingRequests} solicitud(es) pendientes...</span>
                        }
                        {
                          pendingRequests === 0 && 
                          <span className={"request-pendings"}>No tienes solicitudes pendientes...</span>
                        }
                      </h3>
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {
            loan &&
            <Redirect to={routes.customer_form_request}/>
          }
          {
            request &&
            <Redirect to={routes.customer_review_requests}/> 
          }
        </div>
      );
    }
  }
}

Customer.propTypes = {
  homeDataResponse: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    homeDataResponse: state.customer.homeDataResponse
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHomeData: (customerId) => dispatch(getHomeData(customerId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
