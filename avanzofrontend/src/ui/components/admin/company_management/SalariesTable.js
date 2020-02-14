//Libraries
import React, {Component} from 'react';
import {Row, Col, Icon, Tooltip, Modal, Input, InputNumber, Select, Table, Button } from 'antd';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

//Actions
import {updateCompany, getCompanyWithSalary} from "../../../../store/redux/actions/admin/adminActions";

//Columns
const columns = [
  {
    title: 'Tipo de ciclo',
    dataIndex: 'companyRate',
  },
  {
    title: 'Fecha de reporte',
    dataIndex: 'companyReportDate',
  },
  {
    title: 'Fecha de pago 1',
    dataIndex: 'companyFirstDate',
  },
  {
    title: 'Fecha de pago 2',
    dataIndex: 'companySecondDate',
  },
  {
    title: 'Acciones',
    dataIndex: 'actions'
  }
];

//Styles
class SalariesTable extends Component {
  
  constructor(props){
    
    super(props);
    
    this.state = {
      nit: null,
      address: null, 
      socialReason: null, 
      economyActivity: null,
      maximumSplit: null,
      defaultAmount: null, 
      approveHumanResources: null,
      email: null,
      loading: false,
      companySalaries: []
    };

    //this.props.getCompanyWithSalary(this.props.item.idCompany);
    
  };

  setData(linkList){
    
    let rows = [];
    if(linkList){
      for (let i = 0; i < linkList.length; i++) {
      
        let item = linkList[i];
        let row = {
          key: i,
          companyFirstDate: item.companyFirstDate,
          companyPaymentNumber: item.companyPaymentNumber,
          companyRate: item.companyRate,
          companyRateName: item.companyRateName,
          companyReportDate: item.companyReportDate,
          companySecondDate: item.companySecondDate,
          idCompanySalaries: item.idCompanySalaries,  
          actions:  <Row gutter={16}>
                      <Col span={3}/>
                      <Col span={3}>
                        <Tooltip title={"Eliminar ciclo"}>
                          <Icon className={{style: {color:"#ff0000"}}} onClick={() => this.setState({visible: true})}
                            type={"close-circle"} style={{ fontSize: '16px'}}/>
                        </Tooltip>
                      </Col>
                    </Row>
        };
        rows.push(row); 
      }
    }
    return rows;
  };

  render() {

    let tableData = this.setData(this.props.companySalaries);

    return (
      <div>
        <Row>
          <Table columns={columns} dataSource={tableData} size="small" bordered={false} locale={{emptyText: 'No hay registros'}}/>
        </Row>
      </div>
    );
  };
};

export default (SalariesTable);