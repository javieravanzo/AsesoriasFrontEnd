//Libraries
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Card, Row, Col, Table, Divider, Statistic, Typography, Icon, Button} from 'antd';

//Subcomponents
import routes from '../../../configuration/routing/Routes';

//Styles
import '../../styles/customer/index.css'

const table = [
  {
    title: <div>Tipo Transacción</div>,
    dataIndex: 'transaction',
    width: "150px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.transaction.localeCompare(b.transaction)},
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
    title: <div className={"table-p"}>Fecha Solicitud</div>,
    dataIndex: 'date',
    width: "150px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.date.localeCompare(b.date)},
  },
  {
    title: <div className={"table-p"}>Fecha Transacción</div>,
    dataIndex: 'date2',
    width: "150px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.date.localeCompare(b.date)},
  }
];

//Functions
function itemRender(current, type, originalElement) {
  if (type === 'prev' || type === 'Previous Page') {
    return <span title={'Anterior'} className={"item-renderer"}>{"<"}</span>;
  } if (type === 'next') {
    return <span title={'Siguiente'} className={"item-renderer"}>{">"}</span>;
  }
  return originalElement;
};

class Customer extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      loan: false,
    };
    
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();

  };

  next() {
    this.carousel.next();
  };

  previous() {
    this.carousel.prev();
  };

  render() {

    let {loan} = this.state;
    let tableData = [
      {
        key: 1,
        transaction: "Retiro",
        quantity: 150000,
        date: "20-06-19",
        date2: "21-06-19"
      },
      {
        key: 2,
        transaction: "Pago",
        quantity: 250000,
        date: "21-06-19",
        date2: "22-06-19"
      },
      {
        key: 3,
        transaction: "Retiro",
        quantity: 89000,
        date: "23-06-19",
        date2: "24-06-19"
      }      
    ];

    return (
      <div className={"customer-div"}>
      <Row>
        <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
          <Card className={"customer-card"}>
            <Row className={"customer-row-card"}>
              <Col xxl={16} lg={16} md={16} sm={24} xs={24}>
                <Typography >
                  <Typography.Title level={3} className={"customer-title"}>
                    ¡Bienvenido, Juan Camilo!
                  </Typography.Title>       
                </Typography>
              </Col>      
              <Col xxl={8} lg={8} md={8} sm={24} xs={24}>
                <Card className={"customer-credit-card"}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic title={<h3>Cupo actual</h3>} value={112893} prefix={"$"}/>
                    </Col>
                    <Col span={12}>
                      <Statistic title={<h3>Cupo total</h3>} value={300000} prefix={"$"}/>
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
                  <Table className={"new-table"} dataSource={tableData} columns={table} rowKey={'key'} 
                         size={'small'} scroll={{x:'500px'|true}}/>
              </Col>
            </Row>
            <Row className={"row-request"}>
              <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
                <Button className={"request-button-none"} onClick={() => this.setState({loan: true})}>
                  <h3><Icon type={"plus-circle"} className={"request-button"}/> 
                    <span className={"request-title"}> Solicitar préstamo</span>
                  </h3>
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      {
        loan &&
        <Redirect to={routes.customer_request}/>
      }
    </div>
    );
  }
}

export default Customer;