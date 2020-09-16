import React, { Component } from 'react'
import moment from 'moment'
import { Input,message } from 'antd'
import request from '../../service/request';

export class SearchPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchValue: '',
            searchDataList: [],
        }
    }

    render() {
        const { searchDataList, searchValue } = this.state;
        return (
            <div className="container">
                <div className="center_top_s">
                    <div className="row">
                        <Input
                            onChange={(e) => {
                                this.setState({
                                    searchValue: e.target.value
                                })
                            }}
                            placeholder="请输入搜索关键词"
                            value={searchValue}
                            className="input_sty"
                        />

                        <div className="search_btn" onClick={this.search}>
                            <img style={{ width: '27px', height: '27px' }} src={require('../../img/search_white.png')} alt="img" />
                        </div>
                    </div>

                    <span style={{ fontSize: '12px', marginTop: '10px' }}>为您找到相关结果{searchDataList.length}个</span>
                </div>

                {searchDataList.map((item, index) => {
                    if (!item || item === 0 || (item instanceof Array && !item.length)) {
                        return (
                            <div key={index}></div>
                        )
                    }
                    let score = 0;
                    if (item.score) {
                        score = item.score
                    }
                    return (
                        <div key={index} className="center_item">
                            <div className="row" style={{ justifyContent: "space-between", width: '1039px' }}>
                                <div className="row">
                                    <span style={{ fontSize: '12px', color: '#333333', marginLeft: '8px' }}>{moment(item.caseTime).format('YYYY-MM-DD')}</span>
                                    <span style={{ fontSize: '12px', color: '#858585', marginLeft: '20px' }}>受理机构：</span>
                                    <span style={{ fontSize: '12px', color: '#333333', minWidth: '100px' }}>{item.caseDepartment}</span>
                                    <span style={{ fontSize: '12px', color: '#858585', marginLeft: '20px' }}>相似度：</span>
                                    <span style={{ fontSize: '20px', color: '#333333', fontWeight: '600' }}>{score + '%'}</span>
                                </div>
                                <div className="row">
                                    <span style={{ fontSize: '12px', color: '#858585', marginLeft: '40px' }}>电话：</span>
                                    <span style={{ fontSize: '12px', color: '#333333' }}>{item.caseNumber === 'None' ? '暂无' : item.caseNumber}</span>
                                </div>
                            </div>
                            <div className="row" style={{ justifyContent: "space-between", alignItems: 'flex-start', width: '100%', marginTop: '12px' }}>
                                {/* <div className="textarea_show">
                                    {item.text}
                                </div> */}
                                {this.replaceFunc(item.text)}

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{
                                        width: '115px',
                                        height: '53px',
                                        borderRadius: '6px',
                                        lineHeight: '53px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        color: '#B9B9B9',
                                        border: '1px solid #b9b9b9',
                                        backgroundColor: '#f9f9f9'
                                    }}>已完成派单</div>
                                    <div className="row" style={{ cursor: 'pointer', marginTop: '15px' }} onClick={() => {
                                        this.setState({
                                            visibleModal: true
                                        })
                                    }}>
                                        <img style={{ width: '15px', height: '15px' }} src={require('../../img/icon_paidan_gray.png')} alt="img" />
                                        <span style={{ fontSize: '12px', color: '#b9b9b9', marginLeft: '8px' }}>人工派单</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }

    replaceFunc(arg) {
        if (this.state.searchValue) {
            let reg = new RegExp("(" + this.state.searchValue + ")", "g");
            arg = arg.replace(reg, `<span class='query_span'>${this.state.searchValue}</span>`);
        }
        return (
            <div className="textarea_show" dangerouslySetInnerHTML={{ __html: arg }}>
            </div>
        )
    }

    search = () => {
        const { searchValue } = this.state;
        if (!searchValue) {
            message.warning('请输入搜索关键词')
            return;
        }
        let obj = {
            query: searchValue,
            search_type: "ES",
            search_id: "jiesu2020-08-28",
            dicturl: "http://172.16.77.106:6209/keyword_0710.dict",
            sn: "nlp_ai_capacity.1583286523951",
            user_semantics: {
                client_id: 'orion.ovs.client.1514259512471',
                enterprise_id: 'orion.ovs.entprise.2291039705',
                deviceid: 'nlp_ai_capacity_device'
            },
            query_semantics: {
                lang: '',
                entity: {},
                domain: '',
                intent: '',
                slots: '',
                english_domain: ''
            },
            agent_semantics: {
                sys_lang: ''
            }
        }

        request({
            url: 'http://192.168.51.109:6221/search',
            method: 'post',
            data: obj
        }).then((reponse) => {
            if (reponse.nlp && reponse.nlp[0] && reponse.nlp[0].feed.relate) {
                this.setState({
                    searchDataList: reponse.nlp[0].feed.relate
                })
            }
        }).catch((err) => {
            console.log('error', err);
        })
    }
}

export default SearchPage
