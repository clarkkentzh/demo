import React, { Component } from 'react'
import { Input, Select } from 'antd'

import request from '../../service/request';
import orderData from '../../mock/order_type.json'
import '../order/orderPage.css'
import OrderModalPage from './OrderModalPage';

const { Option } = Select;
const { TextArea } = Input;
const objNum = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十',
};

export class OrderPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            info: "",
            first_name: "全部",
            second_name: "全部",
            third_name: "全部",
            visibleModal: false,
            dataList: {

            },
        }
    }

    // 获取下拉选择框数据
    handleChange = (tag, value) => {
        switch (tag) {
            case 1:
                this.setState({
                    first_name: value
                })
                break;
            case 2:
                this.setState({
                    second_name: value
                })
                break;
            case 3:
                this.setState({
                    third_name: value
                })
                break;
            default:
                break;
        }
    }


    render() {
        const { dataList } = this.state;

        return (
            <div>
                <div className="container">
                    <div className="center_top">
                        <div className="row">
                            <div className="btb_pai">
                                <span style={{ fontSize: '18px', color: '#59D7C4', fontWeight: '600' }}>一键派单</span>
                                <img style={{ width: '14px', height: '18px', marginLeft: '9px' }} src={require('../../img/icon_left.png')} alt="img" />
                            </div>
                            <span style={{ fontSize: '14px', color: '#727272', marginLeft: '16px' }}>
                                有
                            <span style={{ fontSize: '24px', color: '#FF830A' }}>1</span>
                            个案件等待您处理
                        </span>

                        </div>

                        <div className="row">
                            <img style={{ width: '12px', height: '12px' }} src={require('../../img/icon_history.png')} alt="img" />
                            <span style={{ fontSize: '12px', color: '#23A490', marginLeft: '9px' }}>查看历史派单</span>
                        </div>
                    </div>


                    <div style={{ justifyContent: "space-between", alignItems: 'flex-start', width: '100%', marginTop: '12px' }}>
                        <span className="fl">大类：</span>
                        <Select defaultValue="全部" style={{ width: 200 }} onChange={(value) => { this.handleChange(1, value) }}>
                            {Object.keys(orderData.class1).map((key, i) => {
                                return <Option value={key}>{key}</Option>
                            })}
                        </Select>
                        <span className="fl">中类：</span>
                        <Select defaultValue="全部" style={{ width: 200 }} onChange={(value) => { this.handleChange(2, value) }} >
                            {Object.keys(orderData.class2).map((key, i) => {
                                return <Option value={key}>{key}</Option>
                            })}
                        </Select>
                        <span className="fl">小类：</span>
                        <Select defaultValue="全部" style={{ width: 200 }} onChange={(value) => { this.handleChange(3, value) }}>
                            {Object.keys(orderData.class3).map((key, i) => {
                                return <Option value={key}>{key}</Option>
                            })}
                        </Select>
                    </div>
                    <div className="center_item">


                        {/* <div className="row" style={{justifyContent:"space-between", width: '1039px'}}>
                        <div className="row">
                            <Checkbox />
                            <span style={{fontSize:'12px',color:'#333333', marginLeft: '8px'}}>2020-07-25</span>
                            <span style={{fontSize:'12px',color:'#858585', marginLeft: '46px'}}>来源：</span>
                            <span style={{fontSize:'12px',color:'#333333'}}>12345转区中心</span>
                        </div>
                        <div className="row">
                            <span style={{fontSize:'12px',color:'#858585'}}>投诉人：</span>
                            <span style={{fontSize:'12px',color:'#333333'}}>李琳琳</span>
                            <span style={{fontSize:'12px',color:'#858585', marginLeft: '40px'}}>电话：</span>
                            <span style={{fontSize:'12px',color:'#333333'}}>12542548525</span>
                        </div>
                    </div> */}
                        <div className="row" style={{ justifyContent: "space-between", alignItems: 'flex-start', width: '100%', marginTop: '12px' }}>
                            <TextArea className="input"
                                style={{ width: '1039px', height: '89px' }}
                                onChange={this.inputChange}
                            />

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{
                                    width: '115px',
                                    height: '53px',
                                    borderRadius: '6px',
                                    lineHeight: '53px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    color: '#ffffff',
                                    backgroundColor: '#4ACBB7'
                                }} onClick={this.submitData}>直接派单</div>
                                <div className="row" style={{ cursor: 'pointer', marginTop: '15px' }} onClick={() => {
                                    this.setState({
                                        visibleModal: true
                                    })
                                }}>
                                    <img style={{ width: '15px', height: '15px' }} src={require('../../img/icon_paidan.png')} alt="img" />
                                    <span style={{ fontSize: '12px', color: '#23A490', marginLeft: '8px' }}>人工派单</span>
                                </div>
                            </div>
                        </div>
                        {dataList.keyword && dataList.keyword[0] && dataList.keyword[0].add.length ?
                            <div className="keyword_row">
                                <div style={{ height: '30px', lineHeight: '30px', fontSize: '12px', width: '70px', textAlign: 'left', color: '#858585' }}>实体关键词</div>
                                <div className="keyword_wrap">
                                    {dataList.keyword[0].add.map((item, index) => {
                                        return (
                                            <div key={index} className="keyword_item">{item}</div>
                                        )
                                    })}
                                </div>
                            </div> : null}

                        {dataList.keyword && dataList.keyword[0] && dataList.keyword[0].com.length ?
                            <div className="keyword_row">
                                <div style={{ height: '30px', lineHeight: '30px', fontSize: '12px', width: '70px', textAlign: 'left', color: '#858585' }}>地址关键词</div>
                                <div className="keyword_wrap">
                                    {dataList.keyword[0].com.map((item, index) => {
                                        return (
                                            <div key={index} className="keyword_item">{item}</div>
                                        )
                                    })}
                                </div>
                            </div> : null}

                        {dataList.keyword && dataList.keyword[0] && dataList.keyword[0].key.length ?
                            <div className="keyword_row">
                                <div style={{ height: '30px', lineHeight: '30px', fontSize: '12px', width: '70px', textAlign: 'left', color: '#858585' }}>事件关键词</div>
                                <div className="keyword_wrap">
                                    {dataList.keyword[0].key.map((item, index) => {
                                        return (
                                            <div key={index} className="keyword_item">{item}</div>
                                        )
                                    })}
                                </div>
                            </div> : null}

                        {dataList.pred_label && dataList.pred_label.length ?
                            <div className="row" style={{ marginTop: '10px' }}>
                                {dataList.pred_label.map((item, index) => {
                                    let score = 0;
                                    if (dataList.score && dataList.score[index]) {
                                        score = dataList.score[index]
                                    }
                                    return (
                                        <div key={index} className="recom_item">
                                            <div className="left_tag">{`推荐${objNum[index + 1]}`}</div>
                                            <div className="recom_center">{item}</div>
                                            <div className="recom_num">
                                                <div style={{ fontSize: '24px', lineHeight: '24px', color: '#ffffff' }}>{score}
                                                    <span style={{ fontSize: "12px" }}>%</span>
                                                </div>
                                                <div style={{ fontSize: '12px', lineHeight: '12px', color: '#ffffff' }}>匹配度</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div> : null}
                            {Object.keys(dataList).length ?
                            <div style={{
                                marginTop: '20px',
                                fontSize: '16px',
                                fontWeight:'bold',
                                color: dataList.indcate == 1 ? 'green' : 'red'
                            }}>{dataList.indcate == 1 ? '大于阈值':'小于阈值'}</div>:null}
                    </div>
                </div>
                {this.modalRender()}
            </div>
        )
    }

    submitData = () => {

        request({
            url: '/classify',
            method: 'post',
            data: {
                query: this.state.info,
                first_name: orderData.class1[this.state.first_name],
                second_name: orderData.class2[this.state.second_name],
                third_name: orderData.class3[this.state.third_name]

            }
        }).then((reponse) => {
            if (reponse && reponse.length) {
                console.log(reponse[0]);
                this.setState({
                    dataList: reponse[0]
                })
            }
        }).catch((err) => {
            console.log('error', err);
        })
    }

    inputChange = (e) => {
        this.setState({
            info: e.target.value
        })
    }

    modalRender() {
        return <OrderModalPage visibleModal={this.state.visibleModal} update={this.updateModalState}></OrderModalPage>
    }

    updateModalState = (state) => {
        this.setState({
            visibleModal: state
        })
    }
}


export default OrderPage
