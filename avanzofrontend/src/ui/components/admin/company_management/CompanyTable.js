//Libraries
import React, {Component} from 'react';
import {Row, Col, Divider, Card, Input, Table} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
import MiniLoading from '../../subcomponents/MiniLoading';

//Actions
import {getAllCompanies} from "../../../../store/redux/actions/admin/adminActions";

//Styles
//import '../../styles/customer/transactions.css'

//Constants
const table = [
  {
    title: <div>Razón Social</div>,
    dataIndex: 'socialReason',
    width: "120px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.socialReason.localeCompare(b.socialReason)},
  },
  {
    title: <div className={"table-p"}>NIT</div>,
    dataIndex: 'nit',
    width: "90px",
    align: "right",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.nit.toString().localeCompare(b.nit.toString())},
  },
  {
    title: <div className={"table-p"}>Cantidad Préstamo</div>,
    dataIndex: 'defaultAmount',
    width: "80px",
    align: "center",
    render: text => <div className={"table-p"}>{"$"+text}</div>,
    sorter: (a, b) =>{ return a.defaultAmount.toString().localeCompare(b.defaultAmount.toString())},
  },
  {
    title: <div className={"table-p"}>Cantidad Cuotas</div>,
    dataIndex: 'maximumSplit',
    width: "80px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.maximumSplit.toString().localeCompare(b.maximumSplit.toString())},
  },
  
  {
    title: <div className={"table-p"}>Fecha Creación</div>,
    dataIndex: 'registeredDate',
    width: "110px",
    align: "center",
    render: text => <div className={"table-p"}>{text.split("T")[0]}</div>,
    sorter: (a, b) =>{ return a.registeredDate.localeCompare(b.registeredDate)},
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

class CompanyTable extends Component {

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

    this.props.getAllCompanies();

  };

  setData(linkList){
    
    let rows = [];
    if(linkList){
      for (let i = 0; i < linkList.length; i++) {
      
        let item = linkList[i];
        let row = {
          key: i,
          socialReason: item.socialReason,
          nit: item.nit,
          registeredDate: item.registeredDate,
          maximumSplit: item.maximumSplit,
          defaultAmount: item.defaultAmount,
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

    
    let tableData = this.props.companyList;
  
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
                    <p className="field-title-visible">Razón Social: </p>
                    <Input placeholder={"Razón Social"}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={4}>
                    <p className="field-title-visible">NIT</p>
                    <Input placeholder={"NIT"}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={5}>
                    <p className="field-title-visible">Cantidad Préstamo</p>
                    <Input placeholder={"Cantidad Préstamo"}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={5}>
                    <p className="field-title-visible">Cantidad Cuotas</p>
                    <Input placeholder={"Cantidad Cuotas"}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={4}>
                    <p className="field-title-visible">Fecha Creación</p>
                    <Input placeholder={"Fecha Creación"}/>
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

CompanyTable.propTypes = {
  companyList: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    companyList: state.admin.companyList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCompanies: ( ) => dispatch(getAllCompanies( )),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyTable);