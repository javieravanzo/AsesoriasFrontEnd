//Libraries
import React, {Component} from 'react';
import {Row, Col, Card, Button, Modal, Select, Spin} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Components
import TableButtons from './ServiceTableButtons';

//Components
import FieldTitle from '../../subcomponents/FieldTitle';

//Actions
import {getCompanies} from "../../../../store/redux/actions/general/loginActions";
import {getAllCompanies, loadCompanyScoringFile} from "../../../../store/redux/actions/admin/adminActions";


class ManageCompany extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      socialReason: null,
      nit: null,
      quantity: null,
      split: null,
      date: null,
      particular_modal: null,
      idCompany: null,
      bankFile: null,
      nextData: null,
      openFirstTime: null,
    };

    this.setData = this.setData.bind(this);
    this.filterData = this.filterData.bind(this);
    this.inputLinkName = this.inputLinkName.bind(this);

    this.props.getAllCompanies();
    this.props.getCompanies();

  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.loadScoringFile !== null && prevState.openFirstTime === null){
      return {
        particular_modal: null,
        idCompany: null,
        bankFile: null,
        openFirstTime: true,
      };
    }else{
      return {
        nextData: true,
      }
    }
  };

  loadScoringFile

  setData(linkList){
    
    let rows = [];
    if(linkList){
      for (let i = 0; i < linkList.length; i++) {
      
        let item = linkList[i];
        let row = {
          key: i,
          socialReason: item.socialReason,
          nit: item.nit,
          createdAt: item.createdAt,
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

  changeCompanyParticularId = (e) => {
    this.setState({
      idCompany: e
    });
  };

    onChangeBankFile = (e) =>{

    let fileType = e.target.files;

    this.setState({
      bankFile: fileType[0]
    });

  };

  loadParticularFile = () => {

    let data = {
      file: this.state.bankFile,
      idCompany: this.state.idCompany
    };

    this.props.loadCompanyScoringFile(data);
  };

  render() {

    let { registerInfo } = this.props;
    //let tableData = this.setData(this.props.companyList);
  
    if(this.props.companyList === null || JSON.stringify(registerInfo) === '{}' ){
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
                <Row gutter={2}>
                  <Col xs={24} sm={12} md={8} lg={5}>
                    <p className="field-title-visible">Administrar EMTELCO</p>
                    <Button icon="upload" 
                            onClick={() => this.setState({particular_modal: true})}>
                            Cargar SCORE de Emtelco
                    </Button> 
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={17}/>
                  
                  <Modal 
                    title="Cargar SCORE de Emtelco"
                    visible={this.state.particular_modal}
                    okText={"Cargar"}
                    cancelText={"Cancelar"}
                    width={450}
                    onOk={() => this.loadParticularFile()}
                    onCancel={() => this.setState({particular_modal: false})}>
                      <div>
                        <div>
                          Por favor selecciona la empresa (EMTELCO):
                          <br/>
                          <Select className={"select-report-rrhh"} onChange={(e) => this.changeCompanyParticularId(e)} 
                                  placeholder="Selecciona la empresa (EMTELCO)" allowClear={true}
                                  showSearch={true} notFoundContent={"No hay empresas disponibles"}>
                              {registerInfo.companyRow.map((type, i) => (
                                <Select.Option key={i} value={type.idCompany}>
                                  {type.socialReason}
                                </Select.Option>))
                              }
                          </Select>
                          <br/>
                          <br/>
                          Por favor, carga el archivo de scoring de EMTELCO.
                          <br/>
                          <br/>
                          <Row>
                            <Col xs={24} sm={24} md={24} lg={24}>
                              <FieldTitle title={"Cargar archivo de scoring de EMTELCO"}/>
                              <input key={this.state.kBK} type="file" onChange={this.onChangeBankFile}/>
                            </Col>
                          </Row>
                        </div>
                        <br/>                           
                      </div>
                  </Modal>
                  <br/>
                </Row>
              
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
  };

}

ManageCompany.propTypes = {
  companyList: PropTypes.array,
  registerInfo: PropTypes.object,
  loadScoringFile: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    companyList: state.admin.companyList,
    registerInfo: state.login.registerInfo,
    loadScoringFile: state.admin.loadScoringFile,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCompanies: ( ) => dispatch(getAllCompanies( )),
    getCompanies: ( ) => dispatch(getCompanies( )),
    loadCompanyScoringFile: (data) => dispatch(loadCompanyScoringFile(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCompany);