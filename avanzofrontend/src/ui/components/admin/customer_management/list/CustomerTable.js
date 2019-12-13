//Libraries
import React, {Component} from 'react';
import {Row, Col, Divider, Card, Input, Table, Spin} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Components
import TableButtons from './ServiceTableButtons';

//Actions
import {getAllCustomers} from "../../../../../store/redux/actions/admin/adminActions";

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
    width: "80px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.identificationId.toString().localeCompare(b.identificationId.toString())},
  },
  {
    title: <div className={"table-p"}>Correo Electrónico</div>,
    dataIndex: 'email',
    width: "100px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.email.localeCompare(b.email)},
  },
  {
    title: <div className={"table-p"}>Fecha Creación</div>,
    dataIndex: 'createdDate',
    width: "80px",
    align: "center",
    render: text => <div className={"table-p"}>{text.split("T")[0]}</div>,
    sorter: (a, b) =>{ return a.createdDate.localeCompare(b.createdDate)},
  },
  {
    title: <div className={"table-p"}>Estado</div>,
    dataIndex: 'platformState',
    width: "50px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.platformState.localeCompare(b.platformState)},
  },
  {
    title: <div className={"table-p"}>Empresa</div>,
    dataIndex: 'socialReason',
    width: "80px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.socialReason.localeCompare(b.socialReason)},
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
      name: null, 
      identificationId: null,
      email: null, 
      createdDate: null,
      totalRemainder: null,
      socialReason: null
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
          platformState: parseInt(item.platformState, 10) === 1 ? "Activo" : "Inactivo",
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
    let {name, identificationId, email, totalRemainder, socialReason} = this.state;

    if(name === null && identificationId === null && email === null && totalRemainder === null && socialReason === null){
      return true;
    }

    if(socialReason !== null && !toCompare.socialReason.toString().toUpperCase().includes(socialReason.toUpperCase())) {
      return false;
    }

    if(name !== null && !toCompare.name.toString().toUpperCase().includes(name.toUpperCase())) {
      return false;
    }
    
    if(identificationId !== null && !toCompare.identificationId.toString().toUpperCase().includes(identificationId.toUpperCase())) {
      return false;
    }
    
    if(email !== null && !toCompare.email.toString().toUpperCase().includes(email.toUpperCase())) {
      return false;
    }

    if(totalRemainder !== null && !toCompare.totalRemainder.toString().toUpperCase().includes(totalRemainder.toUpperCase())) {
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

    let {name, identificationId, email, socialReason} = this.state;
    let tableData = this.setData(this.props.customerList);
  
    if(this.props.customerList === null){
      return (<div style={{marginTop: '50px', color: "#1c77ff", fontSize:"20px", textAlign: "center"}}>
                  Cargando ...
                  <br/>
                  <br/>
                  <Spin size="large" />
                </div>);
    }else{
      return (
        <div >
          <Row className={"social-row-content"}>
            <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
              <Card className={"transactions-card"}>
                <Row gutter={6}>
                  <Col className="filter"  xs={12} sm={12} md={8} lg={7}>
                    <p className="field-title-visible">Nombres: </p>
                    <Input placeholder={"Nombres"} value={name} onChange={(e) => this.setState({name: e.target.value})}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={5}>
                    <p className="field-title-visible">No. Identificación</p>
                    <Input placeholder={"No. Identificación"} value={identificationId} onChange={(e) => this.setState({identificationId: e.target.value})}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                    <p className="field-title-visible">Correo electrónico</p>
                    <Input placeholder={"Correo electrónico"} value={email} onChange={(e) => this.setState({email: e.target.value})}/>
                  </Col>

                  <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                    <p className="field-title-visible">Empresa</p>
                    <Input placeholder={"Empresa"} value={socialReason} onChange={(e) => this.setState({socialReason: e.target.value})}/>
                  </Col>

                </Row>
                <Divider className={"second-divider"}/>
                  <Table className={"new-table"} dataSource={tableData} columns={table} rowKey={'key'}
                    locale={{ emptyText: 'No hay clientes todavía' }} pagination={{ itemRender: itemRender, showSizeChanger: true,
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