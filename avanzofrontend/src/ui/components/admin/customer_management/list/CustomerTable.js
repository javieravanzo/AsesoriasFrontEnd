//Libraries
import React, {Component} from 'react';
import {Row, Col, Divider, Card, Input, Table} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
import MiniLoading from '../../../subcomponents/MiniLoading';

//Actions
import {getAllCustomers} from "../../../../../store/redux/actions/admin/adminActions";

//Styles
//import '../../styles/customer/transactions.css'

//Constants
const table = [
  {
    title: <div>Nombres</div>,
    dataIndex: 'name',
    width: "120px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.name.localeCompare(b.name)},
  },
  {
    title: <div className={"table-p"}>No. Identificación</div>,
    dataIndex: 'identificationId',
    width: "90px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.identificationId.toString().localeCompare(b.identificationId.toString())},
  },
  {
    title: <div className={"table-p"}>Correo Electrónico</div>,
    dataIndex: 'email',
    width: "80px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.email.localeCompare(b.email)},
  },
  {
    title: <div className={"table-p"}>Fecha Creación</div>,
    dataIndex: 'createdDate',
    width: "110px",
    align: "center",
    render: text => <div className={"table-p"}>{text.split("T")[0]}</div>,
    sorter: (a, b) =>{ return a.createdDate.localeCompare(b.createdDate)},
  },
    {
    title: <div className={"table-p"}>Empresa</div>,
    dataIndex: 'socialReason',
    width: "80px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.socialReason.localeCompare(b.socialReason)},
  },
  
  
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

class CustomerTable extends Component {

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

    this.props.getAllCustomers();

  };

  setData(linkList){
    
    let rows = [];
    if(linkList){
      for (let i = 0; i < linkList.length; i++) {
      
        let item = linkList[i];
        let row = {
          key: i,
          name: item.name + " " + item.lastName,
          identificationId: item.identificationId,
          email: item.email,
          createdDate: item.createdDate,
          totalRemainder: item.totalRemainder,
          socialReason: item.socialReason,
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

    
    let tableData = this.setData(this.props.customerList);
    console.log("CL", this.props.customerList);
  
    if(JSON.stringify(tableData) === '{}'){
      return (
        <MiniLoading visible={true}/> 
      );
    }else{
      return (
        <div >
          <Row className={"social-row-content"}>
            <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
              <Card className={"transactions-card"}>
                <Row gutter={6}>
                  <Col className="filter"  xs={12} sm={12} md={8} lg={5}>
                    <p className="field-title-visible">Nombres: </p>
                    <Input placeholder={"Nombres"}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={4}>
                    <p className="field-title-visible">No. Identificación</p>
                    <Input placeholder={"No. Identificación"}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                    <p className="field-title-visible">Correo electrónico</p>
                    <Input placeholder={"Correo electrónico"}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={4}>
                    <p className="field-title-visible">Fecha Creación</p>
                    <Input placeholder={"Fecha Creación"}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={5}>
                    <p className="field-title-visible">Empresa</p>
                    <Input placeholder={"Empresa"}/>
                  </Col>

                </Row>
                <Divider className={"second-divider"}/>
                  <Table className={"new-table"} dataSource={tableData} columns={table} rowKey={'id'}
                    locale={{ emptyText: 'No hay transacciones todavía' }} pagination={{ itemRender: itemRender, showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "15", "20"] }} size={'small'} scroll={{x:'500px'|true}}/>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
  };

}

CustomerTable.propTypes = {
  customerList: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    customerList: state.admin.customerList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCustomers: ( ) => dispatch(getAllCustomers( )),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable);