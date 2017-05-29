import React, {Component, PropTypes } from 'react';
import Moment from 'react-moment';
import {
    Form,
    Button,
    Modal,
    Input,
    Icon,
    Table,
    Col,
    Select,
    Row
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class addMaterialForm extends Component {
    constructor(props){
      super(props);
      this.columns = [{
          title: 'Region',
          dataIndex: 'region.name',
          key: 'region.name'
        }, {
          title: 'Created At',
          key: 'createdAt',
           render: (text, record, index) => (
            <span>
                <Moment fromNow>{record.createdAt}</Moment>
            </span>
          ),
        }, {
          title: 'Cost',
          dataIndex: 'cost',
          key: 'cost',
        }
        ];
    }  
    render() {
        let {visible, onCancel, onCreate, material, costHistory,isSaving,title } = this.props;
        let {getFieldDecorator} = this.props.form;
        
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancel </Button>, 
                    <Button key="submit" type="primary" size="large" onClick={onCreate}> Submit </Button >
                    ]}>
                <Form>
                    {getFieldDecorator('id', {
                        initialValue: material.id?material.id:0
                    })(
                        <Input type="hidden" />
                    )}
                    <FormItem>
                    {getFieldDecorator('description', {
                        rules: [
                            { required: true, message: 'Please input material description!' }, 
                            ],
                            initialValue: material.description?material.description:""
                    })(
                        <Input  placeholder="Material description" />
                    )}
                    </FormItem>
                    <FormItem>
                    <Col span="12">
                    <FormItem>
                        {getFieldDecorator('waste', {
                            rules: [
                                { required: true, message: 'Please input material waste!' }, 
                                ],
                                initialValue: material.waste?material.waste:1
                        })(
                            <Input type="number" placeholder="Material waste" />
                        )}
                         </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem>
                        {getFieldDecorator('unitsOfMeasurementId', {
                            rules: [
                                { required: true, message: 'Please input material description!' }, 
                                ],
                                initialValue: material.unitsOfMeasurementId?material.unitsOfMeasurementId.toString():null
                        })(
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                                //onChange={handleChange}
                                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="3">Jack</Option>
                                <Option value="4">Lucy</Option>
                                <Option value="5">Tom</Option>
                            </Select>
                        )}
                         </FormItem>
                    </Col>
                    </FormItem>
                    <Row><Button type="primary" icon="plus" className="add-material-button">Add New Price</Button></Row>
                    <FormItem>
                        <Table rowKey={item => item.id} size="small" bordered={true} loading={costHistory.loading} dataSource={costHistory.list} columns={this.columns} pagination={{pageSize:5}} ></Table>
                    </FormItem>
                    
                </Form>
            </Modal>
        );
    }
}

addMaterialForm.propTypes = {
    FetchMaterialCostHistory: PropTypes.func.isRequired,
    material: PropTypes.object,
    costHistory: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};

const addMaterial = Form.create()(addMaterialForm);

export default addMaterial;