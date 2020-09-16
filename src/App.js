import React from 'react';
import logo from './logo.svg';
import { Input, Button, Modal, Icon, message, Select, Table } from 'antd'
import request from './service/request';

import './App.css';

import StatisticsPage from './page/statistics/StatisticsPage.jsx'//数据指数
import CasePage from './page/case/CasePage'//案件管理
import OrderPage from './page/order/OrderPage';//智能派单
import NlpPage from './page/nlp/NlpPage';//知识图谱
import SearchPage from './page/search/SearchPage';//搜索


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabList: [
                { id: '1', title: '数据指数' },
                { id: '2', title: '案件管理' },
                { id: '3', title: '智能派单' },
                { id: '4', title: '知识图谱' },
                { id: '5', title: '搜索' },
            ],
            selectTab: '3',
        }
    }


    render() {
        const { tabList, selectTab } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <div className="header_container">
                        {/* <img style={{width: '251px',height: '60px', marginLeft: '16px'}} src={require('./img/icon_head.png')} alt="img"/> */}
                        <div style={{ width: '251px', height: '60px', lineHeight: '60px', fontSize: '30px', fontWeight: '600' }}>演示DEMO</div>
                        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'flex-end' }}>
                            {tabList.map((item, index) => {
                                return (
                                    <div className={selectTab == item.id ? "tab_item_select" : "tab_item"} key={index} onClick={() => {
                                        this.setState({
                                            selectTab: item.id,
                                        })
                                    }}>{item.title}</div>
                                )
                            })}
                            {/* <div className="right_input" onClick={()=>{
                                this.setState({
                                    selectTab: '5'
                                })
                            }}>
                                <span>请输入您要查找的关键词</span>
                                <img style={{width: '18px', height: '18px'}} src={require('./img/search_white.png')} alt="img"/>
                            </div> */}
                        </div>
                    </div>
                </header>


                {selectTab == '1' ? this.echartRender() : selectTab == '2' ? this.caseRender() : selectTab == '3' ? this.inputRender() : selectTab == '4' ? this.knowMap() : selectTab == '5' ? this.inputSearch() : null}
            </div>
        );
    }


    caseRender() {
        return (<CasePage ></CasePage>)
    }

    echartRender() {
        return (<StatisticsPage ></StatisticsPage>)
    }

    inputRender() {
        return <OrderPage ></OrderPage>
    }

    inputSearch() {
        return <SearchPage></SearchPage>
    }

    knowMap() {
        // return <Chart></Chart>
        return <NlpPage ></NlpPage>
        // return <Chart1></Chart1>
    }
}

export default App;
