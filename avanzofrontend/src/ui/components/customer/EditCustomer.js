//Libraries
import React, {Component} from 'react';
import { Form, Select, Button, Col, Row, Collapse, InputNumber,
  Input, DatePicker, Modal, Upload, message, Icon} from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
//import connect from 'react-redux/es/connect/connect';
//import PropTypes from 'prop-types';

//Actions
//import {getSocialData, addSocialData} from "../../../../store/redux/actions/admin/parameterization/parameterizationActions";
//import {getDocumentsTypes, register,registerImage} from "../../../../store/redux/actions/customer/customerActions";
import {editCustomer} from "../../../store/redux/actions/customer/customerActions";

//Styles
import "../../styles/customer/editProfile.css"; 

//Subcomponents
import { SUCCESS_MODAL,ERROR_MODAL } from '../subcomponents/modalMessages';
import routes from '../../../../src/configuration/routing/Routes';
import FieldTitle from '../subcomponents/FieldTitle';

//Constants
const FormItem = Form.Item;
const { Panel } = Collapse;

class EditCustomer extends Component {

  constructor (props) {


    super(props);
    
    this.state = {
      isLoading: false,
      name: null,
      surname:null,
      idType:null,
      idNumber:null,
      cell:null,
      mail:null,
      isEdit: false,
      

    };


  };

  onChange = () => {
    this.setState({
      upload: !this.state.upload,
      isEdit: true
    });
  };

  changeName = (e) => {
    this.setState({
      name: e.target.value,
      isEdit: true
    });
  };

  changeSurnames = (e) => {
    this.setState({
      surname: e.target.value,
      isEdit: true
    });
  };


  changeidType = (e) => {
    this.setState({
      idType: this.setState({ idType: e.target.value}),
      isEdit: true
    });
  };

  changeidNumber = (e) => {
    this.setState({
      idNumber: e.target.value,
      isEdit: true
    });
  };

  changecell = (e) => {
    this.setState({
      cell: e.target.value,
      isEdit: true
    });
  };

  changemail = (e) => {
    this.setState({
      mail: e.target.value,
      isEdit: true
    });
  };

  onConfirmRequest = () => {

    SUCCESS_MODAL("Acción realizada exitosamente", "El perfil ha sido editado correctamente.");
    console.log(this.state.name)
  };

  onSignInClickedImage(){
    this.setState({
      isLoading: true,
    });
    this.props.form.validateFields((err, values) => {
      if (err){
        this.setState({
          isLoading: false,
        });
        ERROR_MODAL("Error al modificar el perfil", "Por favor modifique el campo deseado.");
      }else{
        this.props.editCustomer(values);
        this.setState({
          isLogged: true,
        });
      }     
    });
  };
  render(){
    let { isEdit} = this.state;
    let {getFieldDecorator} = this.props.form;

     const user = {
      names: "Juan",
      surnames:"Camilo",
      idType:"Cedula",
      idNumber:"222333444",
      mail:"mmm@hotmail.com",
      mobile:"111222333"
    };

    return (
     <div className={"editProfile-div"}>
          <Row>
            <Col xxl={24} lg={24} md={24} sm={2} xs={24}>
              <h2 >Editar información</h2>
            </Col>
          </Row>
          <Row className={"request-row-content"}>
            <div>  
              <Form>
                <Collapse defaultActiveKey={['1']} bordered={false}>
                  <Panel header="Información personal" key="1">
                    <Row gutter={20} className={"form-request-rows"} >
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Nombres completos"}/>
                        <FormItem>
                          {getFieldDecorator('customer_name',
                            {initialValue: [user.names],rules: [
                              {required: true, message: 'Por favor ingresa un nombre'}
                            ]})(
                              <Input className={"form-input-number"} onChange={this.changeName} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Apellidos completos"}/>
                        <FormItem>
                          {getFieldDecorator('customer_lastname',
                            {initialValue: [user.surnames],rules: [
                              {required: true, message: 'Por favor ingresa un apellido'}
                            ]})(
                              <Input className={"form-input-number"} onChange={this.changeSurnames} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Tipo de Identificación"}/>
                        <FormItem>
                          {getFieldDecorator('customer_identificationtype',
                            {initialValue: [user.idType],rules: [
                              {required: true, message: 'Por favor ingresa un tipo de identificación'}
                            ]})(
                              <Select placeholder={"Tipo de documento"} showSearch={true} allowClear={true} autoClearSearchValue={true}   >
                                <Select.Option value={"Cédula"} >Cédula</Select.Option>
                                <Select.Option value={"Pasaporte"}  >Pasaporte</Select.Option>
                                <Select.Option value={"Otro"} >Otro</Select.Option>
                              </Select>
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"No. de Identificación"}/>
                        <FormItem>
                          {getFieldDecorator('customer_identification',
                            {initialValue: [user.idNumber],rules: [
                              {required: true, message: 'Por favor ingresa un número de identificación'}
                            ]})(
                              <Input className={"form-input-number"} onChange={this.changeidNumber} />
                            )
                          }
                        </FormItem>
                      </Col> 
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Teléfono celular"}/>
                        <FormItem>
                          {getFieldDecorator('customer_cellphone',
                            {initialValue: [user.mobile],rules: [
                              {required: true, message: 'Por favor ingresa un teléfono celular'}
                            ]})(
                              <Input className={"form-input-number"} onChange={this.changecell}  />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Correo electrónico"}/>
                        <FormItem>
                          {getFieldDecorator('customer_email',
                            {initialValue: [user.mail],rules: [
                              {required: true, message: 'Por favor ingresa un correo electrónico'}
                            ]})(
                              <Input className={"form-input-number"} onChange={this.changemail} />
                            )
                          }
                        </FormItem>
                      </Col>
                    </Row>
                  </Panel>  
              
                </Collapse>
                <Col xs={5} sm={12} md={18} lg={20}/>
                <Col xs={12} sm={12} md={6} lg={4}>
                  <Button className={"request-confirm-button"} icon="edit" 
                           onClick={() => this.onSignInClickedImage()} disabled={!isEdit}>
                        Editar perfil
                  </Button> 
                </Col>
              </Form>
            </div>
        </Row>
        </div>
    );
  
  };
  
}

editCustomer.propTypes = {
  isLogin: PropTypes.bool,
  login: PropTypes.func,
  editCustomerResponse: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.login.isLogin,
    editCustomerResponse: state.customer. editCustomerResponse
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    /*login: (email, password) => dispatch(login(email, password))*/
    editCustomer: (data) => dispatch(editCustomer(data)),
  }
};

let EditCustomerForm = Form.create()(EditCustomer);



export default connect(mapStateToProps, mapDispatchToProps)(EditCustomerForm);

