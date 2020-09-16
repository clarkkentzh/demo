import React, { Component } from 'react'
import { Input, Button, Modal, Icon, message, Select, Table } from 'antd'

export class OrderModalPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleModal: false,
            list1: [
                { title: '区政府办' },
                { title: '区发展改革委' },
                { title: '区教委' },
                { title: '区民族宗教办' },
                { title: '区民政局' },
                { title: '区政府办' },
                { title: '区发展改革委' },
                { title: '区人力资源社会保障局' },
                { title: '区民族宗教办' },
                { title: '区民政局' },
            ],
            list2: [
                { title: '万寿路街道' },
                { title: '羊坊店街道' },
                { title: '甘家口街道' },
                { title: '八里庄街道' },
                { title: '紫竹院街道' },
                { title: '万寿路街道' },
                { title: '羊坊店街道' },
                { title: '甘家口街道' },
                { title: '八里庄街道' },
                { title: '紫竹院街道' },
            ],
            list3: [
                { title: '四季青镇' },
                { title: '东升镇' },
                { title: '苏家坨镇' },
                { title: '西北旺镇' },
                { title: '温泉镇' },
                { title: '上庄镇' },
                { title: '海淀镇' },
            ],
            list4: [
                { title: '中关村科学城管委会' },
                { title: '城市服务管理指挥中心' },
                { title: '区城管执法局' },
                { title: '区北部开发办' },
                { title: '区环卫服务中心' },
                { title: '圆明园管理处' },
            ],
            departList: [
                { title: '区人力资源社会保障局' },
                { title: '区北部开发办' },
            ]
        }
    }

    componentWillMount() {
        this.setState({
            visibleModal: this.props.visibleModal
        })
    }

    update(state) {
        this.setState({
            visibleModal: state
        })
        this.props.update(state)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visibleModal: nextProps.visibleModal
        })
    }


    render() {
        return (
            <Modal
                width={'717px'}
                style={{ padding: 0 }}
                closable={false}
                visible={this.state.visibleModal}
                title={<div className="modal_title">
                    <span>人工派单</span>
                    <Icon type="close" style={{ cursor: 'pointer' }} onClick={() => {
                        this.update(false)
                    }} />
                </div>}
                footer={false}
            >
                <div className="row" style={{ justifyContent: 'space-between', marginTop: '20px', marginRight: '20px', marginLeft: '20px' }}>
                    <div className="column">
                        <div className="column_header">委办局</div>
                        <div className="column_center">
                            {this.state.list1.map((item, index) => {
                                return (
                                    <span key={index} onClick={() => {
                                        let list = [...this.state.departList];
                                        list.push(item)
                                        this.setState({
                                            departList: list
                                        })
                                    }}>{item.title}</span>
                                )
                            })}
                        </div>
                    </div>

                    <div className="column">
                        <div className="column_header">街道办事处</div>
                        <div className="column_center">
                            {this.state.list2.map((item, index) => {
                                return (
                                    <span key={index} onClick={() => {
                                        let list = [...this.state.departList];
                                        list.push(item)
                                        this.setState({
                                            departList: list
                                        })
                                    }}>{item.title}</span>
                                )
                            })}
                        </div>
                    </div>

                    <div className="column">
                        <div className="column_header">镇政府</div>
                        <div className="column_center">
                            {this.state.list3.map((item, index) => {
                                return (
                                    <span key={index} onClick={() => {
                                        let list = [...this.state.departList];
                                        list.push(item)
                                        this.setState({
                                            departList: list
                                        })
                                    }}>{item.title}</span>
                                )
                            })}
                        </div>
                    </div>

                    <div className="column">
                        <div className="column_header">委办局</div>
                        <div className="column_center">
                            {this.state.list4.map((item, index) => {
                                return (
                                    <span key={index} onClick={() => {
                                        let list = [...this.state.departList];
                                        list.push(item)
                                        this.setState({
                                            departList: list
                                        })
                                    }}>{item.title}</span>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div style={{ marginLeft: '20px' }}>
                    <div style={{ fontSize: "12px", color: '#000000', marginTop: '15px', marginBottom: '8px' }}>选取单位</div>
                    <div className="row" style={{ flexWrap: 'wrap' }}>
                        {this.state.departList.map((item, index) => {
                            return (
                                <div key={index} className="modal_titbtn">
                                    <span style={{ fonts: '14px', color: '#23A490', marginRight: '10px' }}>{item.title}</span>
                                    <Icon type="close" style={{ color: '#dadada', cursor: 'pointer' }} onClick={() => {
                                        let list = [...this.state.departList];
                                        list.splice(index, 1);
                                        this.setState({
                                            departList: list
                                        })
                                    }} />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="row" style={{
                    justifyContent: 'flex-end', paddingBottom: '13px',
                    paddingTop: '13px', marginTop: '20px', borderTop: '1px solid #c7c7c7'
                }}>
                    <div className="modalcancle_btn" onClick={() => {
                        this.update(false)
                    }}>取消</div>
                    <div className="modalcancle_confirm" onClick={() => {
                        this.update(false)
                    }}>确定并完成派单</div>
                </div>
            </Modal>
        )
    }
}

export default OrderModalPage
