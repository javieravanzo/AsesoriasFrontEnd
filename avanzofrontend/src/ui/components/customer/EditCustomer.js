//Libraries
import React, {Component} from 'react';
import { Form, Select, Button, Col, Row, Collapse, InputNumber,
  Input, DatePicker, Modal, Upload, message, Icon} from 'antd';
//import connect from 'react-redux/es/connect/connect';
//import PropTypes from 'prop-types';

//Actions
//import {getSocialData, addSocialData} from "../../../../store/redux/actions/admin/parameterization/parameterizationActions";

//Styles
import { SUCCESS_MODAL } from '../subcomponents/modalMessages';

//Subcomponents
import FieldTitle from '../subcomponents/FieldTitle';

//Constants
const FormItem = Form.Item;
const { Panel } = Collapse;

class EditCustomer extends Component {

  constructor (props) {


    super(props);
    
    this.state = {
      name: null,
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

  onConfirmRequest = () => {

    SUCCESS_MODAL("Acción realizada exitosamente", "El perfil ha sido editado correctamente.");
    console.log(this.state.name)
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
     <div className={"transactions-div"}>
          <Row>
            <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
              <h2 className={'header-terms-title'}>Editar información</h2>
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
                              <Input className={"form-input-number"}/>
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
                              <Select placeholder={"Tipo de documento"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                                <Select.Option value={"Cédula"}>Cédula</Select.Option>
                                <Select.Option value={"Pasaporte"}>Pasaporte</Select.Option>
                                <Select.Option value={"Otro"}>Otro</Select.Option>
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
                              <Input className={"form-input-number"} />
                            )
                          }
                        </FormItem>
                      </Col> 
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Teléfono celular"}/>
                        <FormItem>
                          {getFieldDecorator('customer_cellphone',
                            {initialValue: [user.mobile],rules: [
                              {required: false, message: 'Por favor ingresa un teléfono celular'}
                            ]})(
                              <Input className={"form-input-number"}  />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Correo electrónico"}/>
                        <FormItem>
                          {getFieldDecorator('customer_email',
                            {initialValue: [user.mail],rules: [
                              {required: false, message: 'Por favor ingresa un correo electrónico'}
                            ]})(
                              <Input className={"form-input-number"}/>
                            )
                          }
                        </FormItem>
                      </Col>
                    </Row>
                  </Panel>  
              
                </Collapse>
                <Col xs={24} sm={12} md={18} lg={20}/>
                <Col xs={24} sm={12} md={6} lg={4}>
                  <Button className={"request-confirm-button"} icon="edit" 
                          onClick={() => this.onConfirmRequest()} disabled={!isEdit}>
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

let EditCustomerForm = Form.create()(EditCustomer);
export default EditCustomerForm;
