import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
//import Moment from 'react-moment';
import '../styles/costSheets.css';

import AddCostSheetMaterial from './AddCostSheetMaterialForm';
import AddCostSheetManPower from './AddCostSheetManPowerForm';
import AddCostSheetToolEquipment from './AddCostSheetToolsEquipmentForm';

import {
    Form,
    Button,
    //Modal,
    Tooltip,
    Input,
    //InputNumber,
    Icon,
    Table,
    Col,
    Select,
    Row,
    Tabs,
    Popconfirm,
    message
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

Number.prototype.padZero= function(len, c){
    let s= this.toString()
    c= c || '0';
    while(s.length< len) s= c+ s;
    return s;
}

Array.prototype.FirstOrDefault = function(def){
    if(this.length==0) return def;

    return this[0];
}

class addCostSheetForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            AddMaterialToCostSheetFormIsVisible:false,
            AddManPowerToCostSheetFormIsVisible:false,
            AddToolsToCostSheetFormIsVisible:false
        };
        this.materialColumns = [
            {
                title: 'Código',
                key: 'code',
                render: (text, item) => {
                    return (<span>{item.code.padZero(10)}</span>);
                }
            }, {
                title: 'Descripción',
                dataIndex: 'description',
                key: 'description'
            }, {
                title: 'Unidad Medida',
                dataIndex: 'unitsofmeasurement',
                key: 'unitsofmeasurement',
                render: (text, item) => {
                    if (!item.unitsofmeasurement) {
                        return;
                    }
                    return (
                        <Tooltip title={item.unitsofmeasurement}>
                            <span>{item.abbreviation}</span>
                        </Tooltip>
                    );
                }
            }, 
            {
                title: 'Rendimiento',
                dataIndex: 'performance',
                render: (text, record) => (
                    <NumberFormat
                        value={record.performance} 
                        displayType={'text'}
                        thousandSeparator={true} 
                        decimalPrecision={4}
                    />
                ),
                key: 'performance'
            },
            {
                title: 'Desperdicio',
                dataIndex: 'waste',
                render: (text, record) => (
                    <NumberFormat
                        value={record.waste} 
                        displayType={'text'}
                        thousandSeparator={true} 
                        decimalPrecision={4}
                    />
                ),
                key: 'waste'
            }, {
                title: 'Costo',
                key: 'cost',
                render: (text, item) => {
                    if (!item || !item.cost) {
                        return;
                    }
                    return (
                        <NumberFormat
                            value={item.cost}
                            displayType={'text'}
                            thousandSeparator={true} 
                            prefix={'L.'} 
                            decimalPrecision={2}
                        />
                    );
                }
            },
            {
                title: 'Total',
                key: 'total',
                render: (text, item) => {
                    //let total = 0;

                    //total = item.performance * item.waste * item.material.materialCostHistories.FirstOrDefault({cost:0}).cost;
                    return (
                        <NumberFormat
                            value={item.Total}
                            displayType={'text'}
                            thousandSeparator={true} 
                            prefix={'L.'} 
                            decimalPrecision={2}
                        />
                    );
                }
            }, {
                title: 'Acción',
                key: 'action',
                width: 120,
                render: (text, material) => (
                    <span>
                        <a href="#" onClick={() => this.onEditMaterial(material)}>
                            <Icon type="edit"/>
                            Editar</a>
                        <span className="ant-divider"/>
                        <Popconfirm
                            title="¿Esta seguro de borrar este material de la ficha?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.onDeleteMaterial(material)}>
                            <a href="#">
                                <Icon type="delete"/>
                                Borrar</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
        this.manpowerColumns = [
            {
                title: 'Código',
                key: 'code',
                render: (text, item) => {
                    return (<span>{item.code.padZero(10)}</span>);
                }
            }, {
                title: 'Descripción',
                dataIndex: 'description',
                key: 'description'
            }, {
                title: 'Puesto de Trabajo',
                dataIndex: 'job',
                key: 'job'
            }, {
                title: 'Rendimiento',
                dataIndex: 'performance',
                render: (text, record) => (
                    <NumberFormat
                        value={record.performance} 
                        displayType={'text'}
                        thousandSeparator={true} 
                        decimalPrecision={4}
                    />
                ),
                key: 'performance'
            }, {
                title: 'Costo',
                key: 'cost',
                render: (text, item) => {
                    return (
                        <NumberFormat
                            value={item.cost}
                            displayType={'text'}
                            thousandSeparator={true} 
                            prefix={'L.'} 
                            decimalPrecision={2}
                        />
                    );
                }
            },
            {
                title: 'Total',
                key: 'total',
                render: (text, item) => {
                    return (
                        <NumberFormat
                            value={item.Total}
                            displayType={'text'}
                            thousandSeparator={true} 
                            prefix={'L.'} 
                            decimalPrecision={2}
                        />
                    );
                }
            }, {
                title: 'Acción',
                key: 'action',
                width: 120,
                render: (text, material) => (
                    <span>
                        <a href="#" onClick={() => this.onEdit(material)}>
                            <Icon type="edit"/>
                            Editar</a>
                        <span className="ant-divider"/>
                        <Popconfirm
                            title="¿Esta seguro de borrar esta mano de obra de la ficha?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.onDeleteManPower(material)}>
                            <a href="#">
                                <Icon type="delete"/>
                                Borrar</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
        this.toolAndEquipmentColumns = [
            {
                title: 'Código',
                key: 'code',
                render: (text, item) => {
                    return (<span>{item.code.padZero(10)}</span>);
                }
            }, {
                title: 'Descripción',
                dataIndex: 'description',
                key: 'description'
            }, 
            {
                title: 'Rendimiento',
                dataIndex: 'performance',
                render: (text, record) => (
                    <NumberFormat
                        value={record.performance} 
                        displayType={'text'}
                        thousandSeparator={true} 
                        decimalPrecision={4}
                    />
                ),
                key: 'performance'
            }, {
                title: 'Costo',
                key: 'cost',
                render: (text, item) => {
                    return (
                        <NumberFormat
                            value={item.cost}
                            displayType={'text'}
                            thousandSeparator={true} 
                            prefix={'L.'} 
                            decimalPrecision={2}
                        />
                        
                    );
                }
            },
            {
                title: 'Total',
                key: 'total',
                render: (text, item) => {
                    //let total = 0;
                    //total = item.performance * item.manpower.manpowerCostHistories.FirstOrDefault({cost:0}).cost;
                    //total = item.performance  * item.toolsAndEquipment.toolsAndEquipmentCostHistories.FirstOrDefault({cost:0}).cost;
                    return (
                        <NumberFormat
                            value={item.Total}
                            displayType={'text'}
                            thousandSeparator={true} 
                            prefix={'L.'} 
                            decimalPrecision={2}
                        />
                    );
                }
            }, {
                title: 'Acción',
                key: 'action',
                width: 120,
                render: (text, material) => (
                    <span>
                        <a href="#" onClick={() => this.onEdit(material)}>
                            <Icon type="edit"/>
                            Editar</a>
                        <span className="ant-divider"/>
                        <Popconfirm
                            title="¿Esta seguro de borrar esta herramienta y equipo de la ficha?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.onDeleteToolEquipment(material)}>
                            <a href="#">
                                <Icon type="delete"/>
                                Borrar</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
    }
   
    componentWillMount() {
        let {FetchCostSheet
             ,FetchCostSheetMaterials
             ,FetchCostSheetManpower
             ,FetchCostSheetToolsAndEquipment
             ,FetchSumSheetMaterials
             ,FetchSumSheetManpower
             ,FetchSumSheetToolsAndEquipment
        } = this.props;
        let {id} = this.props.params;
        //console.log("id",id);
        FetchCostSheet(id);
        FetchCostSheetMaterials(id);
        FetchCostSheetManpower(id);
        FetchCostSheetToolsAndEquipment(id);

        FetchSumSheetMaterials(id);
        FetchSumSheetManpower(id);
        FetchSumSheetToolsAndEquipment(id);
    }
    onDeleteMaterial(detail){
        let { DeleteDetailMaterial } = this.props;
        let {id} = this.props.params;
        if(detail){
            DeleteDetailMaterial(id, detail.Id);
            message.success('Detalle de material borrado');
        }
        else
            message.warning('Error al momento de borrar el detalle');
    }
    onDeleteManPower(detail){
        let { DeleteDetailManPower } = this.props;
        let {id} = this.props.params;
        if(detail){
            DeleteDetailManPower(id, detail.Id);
            message.success('Detalle de mano de obra borrado');
        }
        else
            message.warning('Error al momento de borrar el detalle');
    }
    onDeleteToolEquipment(detail){
        let { DeleteDetailToolEquipment } = this.props;
        let {id} = this.props.params;
        if(detail){
            DeleteDetailToolEquipment(id, detail.Id);
            message.success('Detalle de herramienta y equipo de obra borrado');
        }
        else
            message.warning('Error al momento de borrar el detalle');
    }
    saveAddMaterialToCostSheetFormRef = (form) => {
        this.AddMaterialToCostSheetForm = form;
    }
    saveAdManPowerToCostSheetFormRef = (form) => {
        this.AddManPowerToCostSheetForm = form;
    }
    saveAddToolToCostSheetFormRef = (form) => {
        this.AddToolToCostSheetForm = form;
    }
    CancelAddMaterial = () => {
        this.setState({AddMaterialToCostSheetFormIsVisible: false});
    }
    CancelAddManPower = () => {
        this.setState({AddManPowerToCostSheetFormIsVisible: false});
    }
    CancelAddTool = () => {
        this.setState({AddToolsToCostSheetFormIsVisible: false});
    }
    AddMaterialToCostSheet = () => {
        const form = this.AddMaterialToCostSheetForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {AddMaterial,csmaterials} = this.props;

            if( (csmaterials) && (csmaterials.length > 0) ) {
                let material = csmaterials.filter((item) => item.materialId == values.materialId);
                if((material) && (material.length > 0)){
                    message.warning('Este material ya habia sido agregado anteriormente');
                    return;
                }
            }

            let {id} = this.props.params;
            AddMaterial(id, values);
            form.resetFields();
            this.setState({AddMaterialToCostSheetFormIsVisible: false});
            message.success('Material agregado exitosamente');
        });
    }
    AddManPowerToCostSheet = () => {
        const form = this.AddManPowerToCostSheetForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {AddManPower,csmanpower} = this.props;

            if( (csmanpower) && (csmanpower.length > 0) ) {
                let manPower = csmanpower.filter((item) => item.manpowerId == values.manpowerId);
                if((manPower) && (manPower.length > 0)){
                    message.warning('Esta mano de obra ya habia sido agregada anteriormente');
                    return;
                }
            }

            let {id} = this.props.params;
            AddManPower(id, values);
            form.resetFields();
            this.setState({AddManPowerToCostSheetFormIsVisible: false});
            message.success('Mano de obra agregada exitosamente');
            
        });
    }
    AddToolsToCostSheet = () => {
        const form = this.AddToolToCostSheetForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {AddToolsAndEquipment, cstoolsAndEquipment} = this.props;

            if( (cstoolsAndEquipment) && (cstoolsAndEquipment.length > 0) ) {
                let manPower = cstoolsAndEquipment.filter((item) => item.toolsAndEquipmentId == values.toolsAndEquipmentId);
                if((manPower) && (manPower.length > 0)){
                    message.warning('Esta herramienta y equipo ya habia sido agregada anteriormente');
                    return;
                }
            }

            let {id} = this.props.params;
            AddToolsAndEquipment(id, values);
            form.resetFields();
            this.setState({AddToolsToCostSheetFormIsVisible: false});
            message.success('Herramienta y equipo agregada exitosamente');
        });
    }
    onAddMaterial(){
        this.setState({AddMaterialToCostSheetFormIsVisible: true});
    }
    onAddManpower(){
        this.setState({AddManPowerToCostSheetFormIsVisible: true});
    }
    onAddToolAndEquipment(){
        this.setState({AddToolsToCostSheetFormIsVisible: true});
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        let {id} = this.props.params;
        let {costSheet
             ,materialToBeAddToCostSheet
             ,csmaterials
             ,csmanpower
             ,cstoolsAndEquipment
             ,Regions
             ,materials
             ,SelectMaterialToBeAddToCostSheet
             ,manpowers
             ,toolsAndEquipments
             ,totalMaterials
             ,totalManPowers
             ,totalTools
        } = this.props;
        return (
            <Row>
                <AddCostSheetMaterial
                    ref={this.saveAddMaterialToCostSheetFormRef}
                    visible={this.state.AddMaterialToCostSheetFormIsVisible}
                    onCancel={this.CancelAddMaterial}
                    onCreate={this.AddMaterialToCostSheet}
                    materials={materials}
                    costSheetId = {id}
                    SelectMaterialToBeAddToCostSheet={SelectMaterialToBeAddToCostSheet}
                    materialToBeAddToCostSheet={materialToBeAddToCostSheet}
                />
                <AddCostSheetManPower
                    ref={this.saveAdManPowerToCostSheetFormRef}
                    visible={this.state.AddManPowerToCostSheetFormIsVisible}
                    onCancel={this.CancelAddManPower}
                    onCreate={this.AddManPowerToCostSheet}
                    manpowers={manpowers}
                    costSheetId = {id}
                />
                <AddCostSheetToolEquipment
                    ref={this.saveAddToolToCostSheetFormRef}
                    visible={this.state.AddToolsToCostSheetFormIsVisible}
                    onCancel={this.CancelAddTool}
                    onCreate={this.AddToolsToCostSheet}
                    toolsAndEquipments={toolsAndEquipments}
                    costSheetId = {id}
                />
                {/*<EditCostSheetMaterial />*/}
                <Form>
                    <Row gutter={8}>
                        <Col span={12} >
                            <FormItem  label="Descripción">
                            {getFieldDecorator('description', {
                                rules: [
                                    { required: true, message: '¡Por favor ingrese la descripción de la ficha de costo!' }, 
                                    ],
                                    initialValue: costSheet.description?costSheet.description:""
                            })(
                                <Input placeholder="Descripción de ficha de costo" />
                            )}
                            </FormItem>
                        </Col>
                        <Col span={4}> 
                            <FormItem  label="Costo Mínimo" >
                            {getFieldDecorator('minimunCost', {
                                    initialValue: 0
                            })(
                                <span className="totales" >
                                    { 'L. ' + ((totalMaterials ? totalMaterials.FirstOrDefault({TotalMaterial:0}).TotalMaterial : 0) +
                                                    (totalManPowers ? totalManPowers.FirstOrDefault({Total:0}).Total : 0) +
                                                    (totalTools ? totalTools.FirstOrDefault({Total:0}).Total : 0)).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }
                                </span>
                            )}
                            </FormItem>
                        </Col>
                        <Col span={4} >
                            <FormItem label="Región">
                                    {getFieldDecorator('regionId', {
                                        rules: [
                                            { required: true, message: '¡Por favor selecciona una región' }, 
                                            ],
                                            initialValue: costSheet.regionId?costSheet.regionId.toString():undefined
                                    })(
                                        <Select
                                        showSearch
                                        placeholder="Selecciona una región"
                                        optionFilterProp="children"
                                        //onChange={handleChange}
                                        filterOption={(input, option) => {
                                            //console.log(input,option);
                                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    >
                                        {Regions.map(o => <Option key={o.id} >{`${o.name}`}</Option>)}
                                    </Select>
                                    )}
                            </FormItem>

                        </Col>
                        <Col span={3} >
                        <FormItem style={{paddingTop:"30px"}}>
                                <Button type="primary" icon="save">Guardar</Button>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Materiales" key="1">
                                <Row>
                                    <Col span={8}> 
                                       <Row>
                                           <span className="totales" >
                                               Costo Materiales: { 'L. ' + ((totalMaterials ? totalMaterials.FirstOrDefault({TotalMaterial:0}).TotalMaterial : 0)).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }
                                           </span>
                                       </Row>
                                    </Col>
                                    <Col>
                                        <Row  type="flex" justify="end">
                                            <Button type="primary" icon="plus" className="add-material-button" onClick={() => this.onAddMaterial()}>Agregar</Button>
                                        </Row>
                                    </Col>
                                </Row>
                                
                                <Table rowKey={item => item.code} size="small" bordered={true} dataSource={csmaterials} columns={this.materialColumns} pagination={{pageSize:10}} />
                            </TabPane>
                            <TabPane tab="Mano de Obra" key="2">
                                <Row>
                                    <Col span={8}> 
                                       <Row>
                                           <span className="totales" >
                                               Costo Mano de Obra: { 'L. ' + ((totalManPowers ? totalManPowers.FirstOrDefault({Total:0}).Total : 0)).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }
                                           </span>
                                       </Row>
                                    </Col>
                                    <Col>
                                        <Row type="flex" justify="end"><Button type="primary" icon="plus" className="add-manpower-button" onClick={() => this.onAddManpower()}>Agregar</Button></Row>
                                    </Col>
                                </Row>
                                <Table rowKey={item => item.code} size="small" bordered={true}  dataSource={csmanpower} columns={this.manpowerColumns} pagination={{pageSize:10}} />
                            </TabPane>
                            <TabPane tab="Herramientas y Equipo" key="3">
                                <Row>
                                    <Col span={8}> 
                                       <Row>
                                           <span className="totales" >
                                               Costo Herramientas y Equipo: { 'L. ' + ((totalTools ? totalTools.FirstOrDefault({Total:0}).Total : 0)).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }
                                           </span>
                                       </Row>
                                    </Col>
                                    <Col>
                                        <Row type="flex" justify="end"><Button type="primary" icon="plus" className="add-toolAndEquipment-button" onClick={() => this.onAddToolAndEquipment()}>Agregar</Button></Row>
                                    </Col>
                                </Row>
                                <Table rowKey={item => item.code} size="small" bordered={true} dataSource={cstoolsAndEquipment} columns={this.toolAndEquipmentColumns} pagination={{pageSize:10}} />
                            </TabPane>
                        </Tabs>                    
                    </Row>
                </Form>
            </Row>            
        );
    }
}

addCostSheetForm.propTypes = {
    costSheet: PropTypes.object.isRequired,
    materialToBeAddToCostSheet: PropTypes.object,

    totalMaterials: PropTypes.array,
    totalManPowers: PropTypes.array,
    totalTools: PropTypes.array,

    FetchCostSheet: PropTypes.func.isRequired,
    Regions: PropTypes.array.isRequired,
    materials: PropTypes.array.isRequired,
    manpowers: PropTypes.array.isRequired,
    toolsAndEquipments: PropTypes.array.isRequired,

    csmaterials: PropTypes.array,
    csmanpower: PropTypes.array,
    cstoolsAndEquipment: PropTypes.array,

    SelectMaterialToBeAddToCostSheet: PropTypes.func.isRequired,
    AddMaterial: PropTypes.func.isRequired,
    AddManPower: PropTypes.func.isRequired,
    AddToolsAndEquipment: PropTypes.func.isRequired,

    FetchCostSheetMaterials: PropTypes.func.isRequired,
    FetchCostSheetManpower: PropTypes.func.isRequired,
    FetchCostSheetToolsAndEquipment: PropTypes.func.isRequired,

    FetchSumSheetMaterials: PropTypes.func.isRequired,
    FetchSumSheetManpower: PropTypes.func.isRequired,
    FetchSumSheetToolsAndEquipment: PropTypes.func.isRequired,

    DeleteDetailMaterial: PropTypes.func.isRequired,
    DeleteDetailManPower: PropTypes.func.isRequired,
    DeleteDetailToolEquipment: PropTypes.func.isRequired
};

const addCostSheet = Form.create()(addCostSheetForm);

export default addCostSheet;