//Libraries
import React, {Component} from 'react';
import {Row, Col, Divider, Card, Input, Table, Spin} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Components
import TableButtons from './ServiceTableButtons';

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
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.nit.toString().localeCompare(b.nit.toString())},
  },
  {
    title: <div className={"table-p"}>Cantidad</div>,
    dataIndex: 'quantity',
    width: "60px",
    align: "center",
    render: text => <div className={"table-p"}>{"$"+text}</div>,
    sorter: (a, b) =>{ return a.quantity.toString().localeCompare(b.quantity.toString())},
  },
  {
    title: <div className={"table-p"}>Cuotas</div>,
    dataIndex: 'split',
    width: "50px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.split.toString().localeCompare(b.split.toString())},
  },
  {
    title: <div className={"table-p"}>Estado</div>,
    dataIndex: 'status',
    width: "50px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.split.toString().localeCompare(b.split.toString())},
  },  
  {
    title: <div className={"table-p"}>Fecha Creación</div>,
    dataIndex: 'registeredDate',
    width: "100px",
    align: "center",
    render: text => <div className={"table-p"}>{text.split("T")[0]}</div>,
    sorter: (a, b) =>{ return a.registeredDate.localeCompare(b.registeredDate)},
  },
  {
    title: " ",
    dataIndex: 'actions',
    width: "50px",
    align: "center",
    render: text => <div className={"table-div"}>{text}</div>,
  }
];

//Functions
function itemRender(current, type, originalElement) {
  if (type === 'prev' || type === 'Previous Page') {
    //Send preview page
    return <span title={'Anterior'} className={"item-renderer"}>{"<"}</span>;
  } if (type === 'next') {
    //Send next
    return <span title={'Siguiente'} className={"item-renderer"}>{">"}</span>;
  }
  return originalElement;
};

class CompanyTable extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      socialReason: null,
      nit: null,
      quantity: null,
      split: null,
      date: null

    };

    this.setData = this.setData.bind(this);
    this.filterData = this.filterData.bind(this);
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
          split: item.maximumSplit,
          quantity: item.defaultAmount,
          approveHumanResources: item.approveHumanResources,
          email: item.email,
          status: item.status === 1 ? "Activo" : "Inactivo",
          actions: <TableButtons item={item}/>
        };

        if(this.filterData(row)) {
          rows.push(row);
        };
      }
    }
    
    return rows;
  };

  filterData(toCompare){
    let {socialReason, nit, quantity, split} = this.state;

    if(socialReason === null && nit === null && quantity === null && split === null){
      return true;
    }

    if(socialReason !== null && !toCompare.socialReason.toString().toUpperCase().includes(socialReason.toUpperCase())) {
      return false;
    }

    if(nit !== null && !toCompare.nit.toString().toUpperCase().includes(nit.toUpperCase())) {
      return false;
    }
    
    if(quantity !== null && !toCompare.quantity.toString().toUpperCase().includes(quantity.toUpperCase())) {
      return false;
    }
    
    if(split !== null && !toCompare.split.toString().toUpperCase().includes(split.toUpperCase())) {
      return false;
    }

    return true;
  };

  inputLinkName(e){
    this.setState({
      linkName: e.target.value,
    });    
  };

  render() {

    let {socialReason, nit, quantity, split} = this.state;
    let tableData = this.setData(this.props.companyList);
  
    if(this.props.companyList === null){
      return (<div style={{marginTop: '50px', color: "#1c77ff", fontSize:"20px", textAlign: "center"}}>
                  Cargando ...
                  <br/>
                  <br/>
                  <Spin size="large" />
                </div>);
    }else{
      return (
        <div >
          <Row>
            <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
              <Card className={"transactions-card"}>
                <Row gutter={6}>
                  <Col className="filter"  xs={12} sm={12} md={8} lg={7}>
                    <p className="field-title-visible">Razón Social: </p>
                    <Input placeholder={"Razón Social"} value={socialReason} onChange={(e) => this.setState({socialReason: e.target.value})}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                    <p className="field-title-visible" >NIT</p>
                    <Input placeholder={"NIT"} value={nit} onChange={(e) => this.setState({nit: e.target.value})}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                    <p className="field-title-visible" >Cantidad Préstamo</p>
                    <Input placeholder={"Cantidad Préstamo"} value={quantity} onChange={(e) => this.setState({quantity: e.target.value})}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={5}>
                    <p className="field-title-visible" >Cantidad Cuotas</p>
                    <Input placeholder={"Cantidad Cuotas"} value={split} onChange={(e) => this.setState({split: e.target.value})}/>
                  </Col>

                </Row>
                <Divider/>
                  <Table className={"new-table"} dataSource={tableData} columns={table} rowKey={'key'}
                    locale={{ emptyText: 'No hay coincidencias' }} pagination={{ itemRender: itemRender, showSizeChanger: true,
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