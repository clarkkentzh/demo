import React from 'react';
import logo from './logo.svg';
import {Input,Button,Checkbox,Modal,Icon, message} from 'antd'
import request from './service/request';
import moment from 'moment'
import './App.css';
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
}
class App  extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            tabList: [
                {id: '1', title: '指数'},
                {id: '2', title: '案件'},
                {id: '3', title: '智能派单'},
                {id: '4', title: '知识图谱'},
            ],
            selectTab: '3',
            visibleModal:false,
            list1: [
                {title: '区政府办'},
                {title: '区发展改革委'},
                {title: '区教委'},
                {title: '区民族宗教办'},
                {title: '区民政局'},
                {title: '区政府办'},
                {title: '区发展改革委'},
                {title: '区人力资源社会保障局'},
                {title: '区民族宗教办'},
                {title: '区民政局'},
            ],
            list2: [
                {title: '万寿路街道'},
                {title: '羊坊店街道'},
                {title: '甘家口街道'},
                {title: '八里庄街道'},
                {title: '紫竹院街道'},
                {title: '万寿路街道'},
                {title: '羊坊店街道'},
                {title: '甘家口街道'},
                {title: '八里庄街道'},
                {title: '紫竹院街道'},
            ],
            list3: [
                {title: '四季青镇'},
                {title: '东升镇'},
                {title: '苏家坨镇'},
                {title: '西北旺镇'},
                {title: '温泉镇'},
                {title: '上庄镇'},
                {title: '海淀镇'},
            ],
            list4: [
                {title: '中关村科学城管委会'},
                {title: '城市服务管理指挥中心'},
                {title: '区城管执法局'},
                {title: '区北部开发办'},
                {title: '区环卫服务中心'},
                {title: '圆明园管理处'},
            ],
            dataList: {},
            searchValue: '',
            searchDataList: []
        }
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer)
    }

    inputChange = (e)=>{
        if(this.timer){
            clearTimeout(this.timer)
        }
        e.persist()
        if(e.target.value){
            this.timer = setTimeout(()=>{
                request({
                    url: '/classify',
                    method: 'post',
                    data: {
                        query: e.target.value
                    }
                }).then((reponse)=>{
                    if(reponse && reponse.length){
                        this.setState({
                            dataList: reponse[0]
                        })
                    }
                }).catch((err)=>{
                    console.log('error', err);
                })
            },2000)
        }
    }

    search = ()=>{
        const {searchValue} = this.state;
        if(!searchValue){
            message.warning('请输入搜索关键词')
            return;
        }
        let obj = {
            query: searchValue,
            search_type:"ES",
            search_id:"jiesu2020-07-16",
            dicturl:"http://172.16.77.106:6209/keyword_0710.dict",
            sn:"nlp_ai_capacity.1583286523951",
            user_semantics:{
                client_id:'orion.ovs.client.1514259512471',
                enterprise_id:'orion.ovs.entprise.2291039705',
                deviceid:'nlp_ai_capacity_device'
            },
            query_semantics:{
                lang:'',
                entity:{},
                domain:'',
                intent:'',
                slots:'',
                english_domain:''
            },
            agent_semantics:{
                sys_lang:''
            }
        }

        request({
            url: 'http://192.168.100.67:6229/schema',
            method: 'post',
            data: obj
        }).then((reponse)=>{
            console.log('fffff',reponse); 
            if(reponse.nlp && reponse.nlp[0] && reponse.nlp[0].feed.relate){
                this.setState({
                    searchDataList: reponse.nlp[0].feed.relate
                })
            }
        }).catch((err)=>{
            console.log('error', err);
        })
    }

    inputSearch(){
        const {searchDataList,searchValue} = this.state;
        return (
            <div className="container">
                <div className="center_top_s">
                    <div className="row">
                        <Input
                            onChange={(e)=>{
                                this.setState({
                                    searchValue: e.target.value
                                })
                            }}
                            placeholder="请输入搜索关键词"
                            value={searchValue}
                            className="input_sty"
                        />

                        <div className="search_btn" onClick={this.search}>
                            <img style={{width: '27px', height: '27px'}} src={require('./img/search_white.png')} alt="img"/>
                        </div>
                    </div>

                        <span style={{fontSize:'12px', marginTop: '10px'}}>为您找到相关结果{searchDataList.length}个</span>
                </div>

                {searchDataList.map((item,index)=>{
                    let score = 0;
                    if(item.score){
                        score = item.score.toFixed(2) * 100
                    }
                    return (
                        <div key={index} className="center_item">
                            <div className="row" style={{justifyContent:"space-between", width: '1039px'}}>
                                <div className="row">
                                    <span style={{fontSize:'12px',color:'#333333', marginLeft: '8px'}}>{moment(item.caseTime).format('YYYY-MM-DD')}</span>
                                    <span style={{fontSize:'12px',color:'#858585', marginLeft: '20px'}}>受理机构：</span>
                                    <span style={{fontSize:'12px',color:'#333333', minWidth: '100px'}}>{item.caseDepartment}</span>
                                    <span style={{fontSize:'12px',color:'#858585', marginLeft: '20px'}}>相似度：</span>
                                    <span style={{fontSize:'12px',color:'#333333'}}>{score + '%'}</span>
                                </div>
                                <div className="row">
                                    <span style={{fontSize:'12px',color:'#858585', marginLeft: '40px'}}>电话：</span>
                                    <span style={{fontSize:'12px',color:'#333333'}}>{item.caseNumber == 'None' ? '暂无' : item.caseNumber}</span>
                                </div>
                            </div>
                            <div className="row" style={{justifyContent:"space-between",alignItems:'flex-start', width: '100%', marginTop: '12px'}}>
                                <div className="textarea_show">
                                    {item.text}
                                </div>

                                <div style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                    <div style={{
                                        width: '115px',
                                        height: '53px',
                                        borderRadius: '6px',
                                        lineHeight:'53px',
                                        textAlign:'center',
                                        cursor:'pointer',
                                        fontSize: '16px',
                                        color: '#B9B9B9',
                                        border: '1px solid #b9b9b9',
                                        backgroundColor: '#f9f9f9'
                                    }}>已完成派单</div>
                                    <div className="row" style={{cursor:'pointer',marginTop: '15px'}} onClick={()=>{
                                        this.setState({
                                            visibleModal: true
                                        })
                                    }}>
                                        <img style={{width: '15px', height: '15px'}}  src={require('./img/icon_paidan_gray.png')} alt="img"/>
                                        <span style={{fontSize:'12px',color:'#b9b9b9', marginLeft: '8px'}}>人工派单</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                
            </div>
        )
    }

    render(){
        const {tabList,selectTab} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <div className="header_container">
                        <img style={{width: '251px',height: '60px', marginLeft: '16px'}} src={require('./img/icon_head.png')} alt="img"/>
          
                        <div style={{display:'flex', flexDirection:"row", alignItems:'center',justifyContent:'flex-end'}}>
                            {tabList.map((item,index)=>{
                                return (
                                    <div className={selectTab == item.id ? "tab_item_select":"tab_item"} key={index} onClick={()=>{
                                        this.setState({
                                            selectTab: '3',
                                            dataList: [],
                                            searchDataList: []
                                        })
                                    }}>{item.title}</div>
                                )
                            })}
                            <div className="right_input" onClick={()=>{
                                this.setState({
                                    selectTab: '5'
                                })
                            }}>
                                <span>请输入您要查找的关键词</span>
                                <img style={{width: '18px', height: '18px'}} src={require('./img/search_white.png')} alt="img"/>
                            </div>
                        </div>
                    </div>
                </header>

            
                {selectTab == '3' ? this.inputRender() : this.inputSearch()}
                
                {this.modalRender()}
            </div>
        );
    }

    inputRender(){
        const {dataList} = this.state;
        return (
            <div className="container">
                <div className="center_top">
                    <div className="row">
                        <div className="btb_pai">
                            <span style={{fontSize:'18px',color:'#59D7C4',fontWeight: '600'}}>一键派单</span>
                            <img  style={{width: '14px', height: '18px', marginLeft: '9px'}} src={require('./img/icon_left.png')} alt="img"/>
                        </div>
                        <span style={{fontSize:'14px',color:'#727272', marginLeft: '16px'}}>
                            有
                            <span style={{fontSize:'24px',color:'#FF830A'}}>1</span>
                            个案件等待您处理
                        </span>

                    </div>

                    <div className="row">
                        <img style={{width: '12px', height: '12px'}}  src={require('./img/icon_history.png')} alt="img"/>
                        <span style={{fontSize:'12px',color:'#23A490', marginLeft: '9px'}}>查看历史派单</span>
                    </div>
                </div>

                <div className="center_item">
                    
                    <div className="row" style={{justifyContent:"space-between", width: '1039px'}}>
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
                    </div>
                    <div className="row" style={{justifyContent:"space-between",alignItems:'flex-start', width: '100%', marginTop: '12px'}}>
                        <TextArea 
                            style={{width: '1039px',height: '89px'}}
                            onChange={this.inputChange}
                        />

                        <div style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                            <div style={{
                                width: '115px',
                                height: '53px',
                                borderRadius: '6px',
                                lineHeight:'53px',
                                textAlign:'center',
                                cursor:'pointer',
                                fontSize: '16px',
                                color: '#ffffff',
                                backgroundColor: '#4ACBB7'
                            }}>直接派单</div>
                            <div className="row" style={{cursor:'pointer',marginTop: '15px'}} onClick={()=>{
                                this.setState({
                                    visibleModal: true
                                })
                            }}>
                                <img style={{width: '15px', height: '15px'}}  src={require('./img/icon_paidan.png')} alt="img"/>
                                <span style={{fontSize:'12px',color:'#23A490', marginLeft: '8px'}}>人工派单</span>
                            </div>
                        </div>
                    </div>
                    {dataList.keyword && dataList.keyword.length ?
                    <div className="keyword_row">
                        <div style={{height: '30px',lineHeight:'30px',fontSize:'12px',width: '40px',textAlign:'left', color: '#858585'}}>关键词</div>
                        <div className="keyword_wrap">
                            {dataList.keyword.map((item,index)=>{
                                return (
                                <div key={index} className="keyword_item">{item}</div>
                                )
                            })}
                        </div>
                    </div> :null}

                    {dataList.pred_label && dataList.pred_label.length ?
                    <div className="row" style={{marginTop: '10px'}}>
                        {dataList.pred_label.map((item,index)=>{
                            let score = 0;
                            if(dataList.score && dataList.score[index]){
                                score = dataList.score[index].toFixed(2) * 100
                            }
                            return (
                                <div key={index} className="recom_item">
                                    <div className="left_tag">{`推荐${objNum[index +1]}`}</div>
                                    <div className="recom_center">{item}</div>
                                    <div className="recom_num">
                                        <div style={{fontSize:'24px',lineHeight:'24px', color: '#ffffff'}}>{score}
                                            <span style={{fontSize:"12px"}}>%</span>
                                        </div>
                                        <div style={{fontSize:'12px',lineHeight:'12px', color: '#ffffff'}}>匹配度</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>:null}
                </div>
            </div>
        )
    }

    modalRender(){
        return (
          <Modal
          width={'717px'}
          style={{padding: 0}}
          closable={false}
          visible={this.state.visibleModal}
          title={<div className="modal_title">
            <span>人工派单</span>
            <Icon type="close" style={{cursor:'pointer'}} onClick={()=>{
              this.setState({
                visibleModal:false
              })
            }}/>
          </div>}
          footer={false}
        >
          <div className="row" style={{justifyContent:'space-between', marginTop: '20px',marginRight: '20px', marginLeft: '20px'}}>
              <div className="column">
                  <div className="column_header">委办局</div>
                  <div className="column_center">
                    {this.state.list1.map((item,index)=>{
                      return (
                        <span key={index}>{item.title}</span>
                      )
                    })}
                  </div>
              </div>
  
              <div className="column">
                <div className="column_header">街道办事处</div>
                <div className="column_center">
                  {this.state.list2.map((item,index)=>{
                    return (
                      <span key={index}>{item.title}</span>
                    )
                  })}
                </div>
              </div>
  
              <div className="column">
                <div className="column_header">镇政府</div>
                <div className="column_center">
                  {this.state.list3.map((item,index)=>{
                    return (
                      <span key={index}>{item.title}</span>
                    )
                  })}
                </div>
              </div>
  
              <div className="column">
                  <div className="column_header">委办局</div>
                  <div className="column_center">
                    {this.state.list4.map((item,index)=>{
                      return (
                        <span key={index}>{item.title}</span>
                      )
                    })}
                  </div>
              </div>
          </div>
  
          <div style={{marginLeft: '20px'}}>
            <div style={{fontSize:"12px", color: '#000000',marginTop: '15px', marginBottom: '8px'}}>选取单位</div>
            <div className="row">
              <div className="modal_titbtn">
                    <span style={{fonts: '14px', color: '#23A490', marginRight: '10px'}}>区人力资源社会保障局</span>
                    <Icon type="close" style={{color: '#dadada'}}/>
              </div>
              <div className="modal_titbtn">
                    <span style={{fonts: '14px', color: '#23A490', marginRight: '10px'}}>区北部开发办</span>
                    <Icon type="close" style={{color: '#dadada'}}/>
              </div>
              <div className="modal_titbtn">
                    <span style={{fonts: '14px', color: '#23A490', marginRight: '10px'}}>区北部开发办</span>
                    <Icon type="close" style={{color: '#dadada'}}/>
              </div>
              <div className="modal_titbtn">
                    <span style={{fonts: '14px', color: '#23A490', marginRight: '10px'}}>区北部开发办</span>
                    <Icon type="close" style={{color: '#dadada'}}/>
              </div>
            </div>
          </div>
  
          <div className="row" style={{justifyContent:'flex-end', paddingBottom:'13px',
          paddingTop:'13px',marginTop:'20px', borderTop:'1px solid #c7c7c7'}}>
            <div className="modalcancle_btn" onClick={()=>{
              this.setState({
                visibleModal:false
              })
            }}>取消</div>
            <div className="modalcancle_confirm" onClick={()=>{
              this.setState({
                visibleModal:false
              })
            }}>确定并完成派单</div>
          </div>
        </Modal>
        )
    }
}

export default App;
