//Libraries
import React, {Component} from 'react';
import {Row, Col, Tabs, Button, Divider, Table, Modal, Select} from 'antd';

//Components

//Styles
import '../../../styles/admin/index.css';
import { SUCCESS_MODAL } from '../../subcomponents/modalMessages';

//Assets

//Functions
function itemRender(current, type, originalElement) {
  if (type === 'prev' || type === 'Previous Page') {
    return <span title={'Anterior'} className={"item-renderer"}>{"<"}</span>;
  } if (type === 'next') {
    return <span title={'Siguiente'} className={"item-renderer"}>{">"}</span>;
  }
  return originalElement;
};

//Constants
const { TabPane } = Tabs;
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
      approve_modal: null
    };

    this.setData = this.setData.bind(this);

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

  render() {

    let tableData = [
      {
        key: 1,
        company: "Emtelco",
        customer: "Juan Rodríguez",
        quantity: 150000,
        date2: "21-06-19"
      },
      {
        key: 2,
        company: "Movistar",
        customer: "David Estrada",
        quantity: 250000,
        date2: "22-06-19"
      },
      {
        key: 3,
        company: "Seguros L.",
        customer: "Camilo Pinto",
        quantity: 8500,
        date2: "24-06-19"
      },
      {
        key: 4,
        company: "Emtelco",
        customer: "Duvan Vergara",
        quantity: 120000,
        date2: "26-06-19"
      },
      {
        key: 5,
        company: "Claro",
        customer: "Alvaro Martinez",
        quantity: 275000,
        date2: "27-06-19"
      },
      {
        key: 6,
        company: "Alianza Normativa",
        customer: "Carlos Vargas",
        quantity: 4870,
        date2: "28-06-19"
      },
      {
        key: 7,
        company: "Claro",
        customer: "Felipe Urrego",
        quantity: 125870,
        date2: "28-06-19"
      },
      {
        key: 8,
        company: "Seguros L.",
        customer: "Julian Osorio",
        quantity: 92870,
        date2: "28-06-19"
      }    
    ];
    let {approve_modal} = this.state;

    return (
      <div className={"company-div"}>
        <Row gutter={30}>
          <Col xs={24} sm={24} md={12} lg={16}/>
          <Col xs={24} sm={24} md={12} lg={4}> 
            <Button icon="file" style={{backgroundColor: "#005fc5", color: "white", marginLeft: "20px !important"}} 
                    onClick={() => this.setState({approve_modal: true})}>
                  Informe individual
            </Button> 
          </Col>
          <Col xs={24} sm={24} md={12} lg={4}> 
            <Button icon="file" style={{backgroundColor: "#005fc5", color: "white", marginLeft: "20px !important"}} 
                    onClick={() => this.onConfirmRequest()}>
                  Informe masivo
            </Button> 
          </Col>
        </Row>
        <Divider/>
        <Row>
          <Table className={"new-table"} dataSource={tableData} columns={table} rowKey={'key'}
            pagination={{ itemRender: itemRender, showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"] }} size={'small'} scroll={{x:'500px'|true}}/>
        </Row>
        <Modal 
          title="Generar informe"
          visible={this.state.approve_modal}
          okText={"Generar"}
          cancelText={"Cancelar"}
          width={450}
          onOk={() => this.onConfirmRequest()}
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
}


export default ReceiptManagement;