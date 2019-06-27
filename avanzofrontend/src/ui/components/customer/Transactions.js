//Libraries
import React, {Component} from 'react';
import {Row, Col, Divider, Button, Card, Input, Table} from 'antd';
//import connect from 'react-redux/es/connect/connect';
//import PropTypes from 'prop-types';

//Actions
//import {getSocialData, addSocialData} from "../../../../store/redux/actions/admin/parameterization/parameterizationActions";

//Styles
import '../../styles/customer/transactions.css'

//Subcomponents
//import TableButtons from './subcomponents/SocialTableButtons';
//import { WARNING_MODAL } from '../../subComponents/modals/responseModals';
//import LoadingComponent from "../../general/LoadingComponent";

//Constants
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

class Transactions extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      text: null,
      firstText: null,
      firstTextLength: 0,
      linkName: null,
      linkUrl: null,
    };

    this.setData = this.setData.bind(this);
    this.inputLinkName = this.inputLinkName.bind(this);


  };

  setData(linkList){
    
    let rows = [];
    if(linkList){
      for (let i = 0; i < linkList.length; i++) {
      
        let item = linkList[i];
        let row = {
          key: i,
          name: item.name,
          link: item.url,
        };
        rows.push(row);
      }
    }
    
    return rows;
  };

  inputLinkName(e){
    this.setState({
      linkName: e.target.value,
    });    
  };


  render() {

    let {getLinksResponse} = this.props;
    //let tableData = this.setData(getLinksResponse);
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
      },
      {
        key: 4,
        transaction: "Pago",
        quantity: 120000,
        date: "25-06-19",
        date2: "26-06-19"
      },
      {
        key: 5,
        transaction: "Retiro",
        quantity: 275000,
        date: "26-06-19",
        date2: "27-06-19"
      },
      {
        key: 6,
        transaction: "Retiro",
        quantity: 13900,
        date: "27-06-19",
        date2: "28-06-19"
      }     
    ];

      return (
        <div className={"transactions-div"}>
          <Row>
            <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
              <h2 className={'header-terms-title'}>Histórico de transacciones</h2>
            </Col>
          </Row>
          <Row className={"social-row-content"}>
            <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
              <Card className={"transactions-card"}>
                <h3>Filtros</h3>
                <Row gutter={8}>
                  <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                    <p className="field-title-visible">Tipo Transacción: </p>
                    <Input placeholder={"Tipo Transacción"}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                    <p className="field-title-visible">Cantidad</p>
                    <Input placeholder={"Cantidad"}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                    <p className="field-title-visible">Fecha Solicitud</p>
                    <Input placeholder={"Fecha Solicitud"}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                    <p className="field-title-visible">Fecha Transacción</p>
                    <Input placeholder={"Fecha Transacción"}/>
                  </Col>
                </Row>
                <Divider className={"second-divider"}/>
                  <Table className={"new-table"} dataSource={tableData} columns={table} rowKey={'key'}
                    pagination={{ itemRender: itemRender, showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "15", "20"] }} size={'small'} scroll={{x:'500px'|true}}/>
              </Card>
            </Col>
          </Row>
        </div>
      );
  };

}

export default Transactions;