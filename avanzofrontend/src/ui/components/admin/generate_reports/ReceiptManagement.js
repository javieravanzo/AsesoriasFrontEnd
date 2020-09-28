//Libraries
import React, {Component} from 'react';
import {Row, Col, Button, Divider, Table, Modal, Select} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Components
import FieldTitle from '../../subcomponents/FieldTitle';

//Styles
import '../../../styles/admin/index.css';

import BaseURL from '../../../../services/BaseURL';
import { SUCCESS_MODAL, WARNING_MODAL, allowEmergingWindows } from '../../subcomponents/modalMessages';

//Actions
import {generateReport, receiveBankFile} from "../../../../store/redux/actions/admin/adminActions";

//Functions
function itemRender(current, type, originalElement) {
  if (type === 'prev' || type === 'Previous Page') {
    return <span title={'Anterior'} className={"item-renderer"}>{"<"}</span>;
  } if (type === 'next') {
    return <span title={'Siguiente'} className={"item-renderer"}>{">"}</span>;
  }
  return originalElement;
};

function seeDocument(file, BaseURL){

  let newFile = BaseURL + file;
  console.log("B", file);

  if (file !== null && file !== "") {
    let newWindow = window.open(newFile, "_blank");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      allowEmergingWindows();
    }
  } else {
    WARNING_MODAL('Advertencia', 'El reporte no está disponible');
  }

  return true;

};

//Constants
const table = [
  {
    title: <div>Empresa</div>,
    dataIndex: 'company',
    width: "150px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.company.localeCompare(b.company)},
  },
  {
    title: <div>Cliente</div>,
    dataIndex: 'customer',
    width: "150px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.customer.localeCompare(b.customer)},
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
    title: <div className={"table-p"}>Fecha Transacción</div>,
    dataIndex: 'date2',
    width: "150px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.date.toString().localeCompare(b.date.toString())},
  }
];

class ReceiptManagement extends Component {

  constructor(props){
    
    super(props);
    
    this.state = {
      approve_modal: null,
      reportData: null,
      nextState: null,
      particular_modal: null,
      bankFile: null,
      outlayFile: null,
    };

    this.setData = this.setData.bind(this);

  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.generateReportData !== null){
      console.log("GRD", nextProps.generateReportData);
      return {
        reportData: seeDocument(nextProps.generateReportData, BaseURL),
      };
    }else if(nextProps.receiveBankFileCode !== null){
      return {
        particular_modal: false,
      };
    }
    else{
      return {
        nextState: true,
      }
    }
  };

  onConfirmRequest = () => {
    SUCCESS_MODAL("Acción realizada exitosamente", "El informe ha sido descargado correctamente.");
    this.setState({
      approve_modal: false,
    });
  };

  setData(linkList){
    
    let rows = [];
    if(linkList){
      for (let i = 0; i < linkList.length; i++) {
      
        let item = linkList[i];
        let row = {
          key: i,
          company: item.company,
          customer: item.customer,
          quantity: item.quantity,
          date: item.date2,
        };
        rows.push(row);
      }
    }
    
    return rows;
  };

  sendReport = () => {
    this.props.generateReport();
  };

  onChangeBankFile = (e) =>{

    let fileType = e.target.files;

    this.setState({
      bankFile: fileType[0]
    });

  };

  onChangeOutlayFile = (e) =>{

    let fileType = e.target.files;

    this.setState({
      outlayFile: fileType[0]
    });

  };

  onConfirmFiles = () => {
    let data = {
      write: this.state.outlayFile,
      read: this.state.bankFile,
    };

    this.props.receiveBankFile(data);
  };

  render() {

    console.log("RD", this.props.generateReportData);
    let tableData = [];
    //let {approve_modal} = this.state;

    return (
      <div className={"company-div"}>
        <Row gutter={12}>
          <Col xs={0} sm={0} md={0} lg={6}/>
          <Col xs={24} sm={12} md={6} lg={5}>
            <Button icon="file-excel"  className={"create-customer-button"} onClick={() => this.setState({particular_modal: true})}>
                Recepción Archivo Banco
            </Button> 
          </Col>
          <Col xs={24} sm={12} md={6} lg={5}> 
            <Button icon="file" style={{backgroundColor: "#005fc5", color: "white", marginLeft: "20px !important"}} 
                    onClick={() => this.sendReport()}>
                  Archivo de desembolsos
            </Button> 
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}> 
            <Button icon="file" style={{backgroundColor: "#005fc5", color: "white", marginLeft: "20px !important"}} 
                    onClick={() => this.setState({approve_modal: true})}>
                  Informe individual
            </Button> 
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}> 
            <Button icon="file" style={{backgroundColor: "#005fc5", color: "white", marginLeft: "20px !important"}} 
                    onClick={() => this.onConfirmRequest()}>
                  Informe masivo
            </Button> 
          </Col>
        </Row>
        <Modal 
          title="Cargar archivo generado por el banco"
          visible={this.state.particular_modal}
          okText={"Cargar archivos"}
          cancelText={"Cancelar"}
          width={650}
          onOk={() => this.onConfirmFiles()}
          okButtonProps={{disabled: (this.state.outlayFile === null && this.state.bankFile === null) ? true : false}}
          onCancel={() => this.setState({particular_modal: false})}>
            <div>
              <div>
                Suba los archivos de Excel con los formato correspondientes.
                <b> Recuerde que el archivo debe tener unas condiciones y especificaciones obligatorias.</b>
              </div>
                
              <br/>           
              
              <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <FieldTitle title={"Cargar archivo generado por el banco"}/>
                  <input key={this.state.kBK} type="file" onChange={this.onChangeBankFile}/>
                </Col>
              </Row>
              <br/>
              <Row>
                
                <Col xs={24} sm={24} md={24} lg={24}>
                  <FieldTitle title={"Cargar archivo de desembolsos generado por la plataforma"}/>
                  <input key={this.state.kBK} type="file" onChange={this.onChangeOutlayFile}/>
                </Col>
              </Row>

              <br/>
            
            </div>

        </Modal>
        <Divider/>
        <Row>
          <Table className={"new-table"} dataSource={tableData} columns={table} rowKey={'key'}
            locale={{ emptyText: 'No hay reportes disponibles' }}
            pagination={{ itemRender: itemRender, showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"] }} size={'small'} scroll={{x:'500px'|true}}/>
        </Row>
        <Modal 
          title="Generar informe"
          visible={this.state.approve_modal}
          okText={"Generar"}
          cancelText={"Cancelar"}
          width={450}
          onOk={() => this.onConfirmFiles()}
          onCancel={() => this.setState({approve_modal: false})}>
            <div>
              Seleccionar el cliente para descargar el informe particular.   
              <br/>
              <br/>
              <Select style={{width: "70%"}} placeholder={'Cliente'} onChange={this.inputAdviserName}>
                {tableData.map((customer, i) =>(
                  <Select.Option value={customer.key} key={i}>
                    {customer.customer}
                  </Select.Option>
                ))
                }
              </Select>             
            </div>

        </Modal>
        </div>
      );
  };
};

ReceiptManagement.propTypes = {
  generateReportData: PropTypes.string,
  receiveBankFileCode: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    generateReportData: state.admin.generateReportData,
    receiveBankFileCode: state.admin.receiveBankFileCode,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateReport: ( ) => dispatch(generateReport( )),
    receiveBankFile: (data) => dispatch(receiveBankFile(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptManagement);

