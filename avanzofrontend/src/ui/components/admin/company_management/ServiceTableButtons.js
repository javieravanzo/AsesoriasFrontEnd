//Libraries
import React, {Component} from 'react';
import {Row, Col, Icon, Tooltip} from 'antd';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import EditModal from "./EditModal";

//Actions
import {updateCompany, getCompanyWithSalary, activateCompany} from "../../../../store/redux/actions/admin/adminActions";

//Columns
/*const columns = [
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
  }
];*/

//Styles
class TableButtons extends Component {
  
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
      companySalaries: [],
      visible: false,
    };

    //this.inputServiceName = this.inputServiceName.bind(this);
    //this.inputServiceTime = this.inputServiceTime.bind(this);
    //this.inputServiceNumber = this.inputServiceNumber.bind(this);
    //this.handleEdit = this.handleEdit.bind(this);

    
    
  };

  /*static getDerivedStateFromProps(nextProps, prevState) {
    if(JSON.stringify(nextProps.companySalaryResponse) !== '{}'){
      if(prevState.companySalaries.length === 0){
        return {
          companySalaries: nextProps.companySalaryResponse
        };
      }else{
        return{
          flagState: true
        }
      }
    }
   }*/

   inputServiceTime = (e) => {
    let item = e;
    this.props.activateCompany(item.idCompany, parseInt(item.status) === 1 ? false : true);    
  }; 

  render() {

    //let tableData = this.setData(this.props.companySalaryResponse);

    return (
      <div>
        <Row gutter={10}>
          <Col span={3}  className={"delete-col"}>
            <Tooltip title={"Editar empresa"}>
              <Icon className={"icon-button delete-icon"} onClick={() => this.setState({visible: !this.state.visible})}
                type={"edit"} style={{ fontSize: '16px'}}/>
            </Tooltip>
          </Col>
          <Col span={3}/>
          <Col span={3}  className={"delete-col"}>
            <Tooltip title={"Activar/Desactivar empresa"}>
              <Icon className={"icon-button delete-icon"} onClick={() => this.inputServiceTime(this.props.item)}
                type={"poweroff"} style={{ fontSize: '16px'}}/>
            </Tooltip>
          </Col>   
        </Row>
        {
          this.state.visible && 
          <EditModal item={this.props.item} visible={this.state.visible}/>  
        }     
      </div>
    );
  };
}

TableButtons.propTypes = {
  updateServices: PropTypes.func,
  companySalaryResponse: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    companySalaryResponse: state.admin.companySalaryResponse,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCompany: (data) => dispatch(updateCompany(data)),
    getCompanyWithSalary: (data) => dispatch(getCompanyWithSalary(data)),
    activateCompany: (company, status) => dispatch(activateCompany(company, status)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableButtons);