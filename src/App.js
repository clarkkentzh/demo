import React from 'react';
import logo from './logo.svg';
import {Input,Button,Modal,Icon, message,Select,Table} from 'antd'
import request from './service/request';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment'
import './App.css';
const { TextArea } = Input;
const { Option } = Select;

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

const dataSource = [
    {num: 12, id: '89519758-e448-3900-bc12-a680d7a1dc90', name: '张玲'},
    {num: 12, id: '7bcd24ae-0479-3826-8872-c301ff16e5cb', name: '李小冉'},
    {num: 9, id: '497e7268-2577-3563-8db3-2a11b97cd96a', name: '赵山川'},
    {num: 6, id: 'eb98423e-433c-321d-8eed-d702395b5c9f', name: '陈辰'},
    {num: 5, id: '69780052-f414-3337-9d28-a3a8c291c2a6', name: '李鹏飞'},
    {num: 5, id: '52d2bf9e-6343-3682-9ea0-44d3bf78f4ec', name: '胡伟伟'},
    {num: 5, id: 'eccc207c-5125-36c6-85a3-00d3c70399b1', name: '马飞腾'},
    {num: 5, id: 'f77e92ce-f4ad-37b1-8f31-47812d67fd2c', name: '王聪聪'},
    {num: 4, id: '99a2366c-a4b2-3779-8a66-651d9b1dfafa', name: '万鑫'},
    {num: 4, id: 'ea61dc67-3592-32a9-b38e-625f4c749e03', name: '李振'},
    {num: 4, id: '7034e3cb-d88d-396d-8dce-5993b33c706e', name: '王睿'},
    {num: 4, id: '65c31403-038c-30f1-b82a-4adcbb0bd2ac', name: '刘鹤'},
    // {num: 4, id: 'f2ca8e5e-cc30-32fb-9b94-c2cb7770ca83', name: '张爱玲'},
    // {num: 3, id: 'e1b64dda-aa47-399b-b89c-8ea5131df3a8', name: '张嘉莉'},
    // {num: 3, id: 'f97d6aaa-5cb9-35a0-8f1e-69c8d5a6a6ec', name: '王博'},
    // {num: 3, id: '0de8d62b-a520-3ff3-8ebe-768b86e0f549', name: '王子鑫'},
    // {num: 3, id: 'e083b8f4-4f49-32aa-8117-b7be3731e493', name: '刘振飞'},
    // {num: 2, id: 'dd5912bc-ac97-3d83-97b9-0ccf082c6822', name: '赵刚'},
    // {num: 2, id: 'ace17c9c-7b5e-3401-bde0-d44cf3a3a44d', name: '李莉'},
    // {num: 2, id: '14e62f6d-77ae-3c85-9908-971cc28e8018', name: '李景涛'}
];

const relaList = [
    {id: 1, title: '承办单位'},
    {id: 2, title: '案件主题'},
    {id: 3, title: '结案意见'},
    {id: 4, title: '案件类别'},
];

const options = {
    title: {
        text: '来件来源'
    },
    tooltip: {
        trigger: 'axis',
        show:true,
        axisPointer:{
            type: 'none'
        }
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value'
    },
    color: '#3474E5',    
    series: [{
        data: [],
        type: 'bar'
    }]
}
class App  extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            optionOne: options,
            optionTwo: options,
            selectRela: [
                '承办单位',
                '案件主题',
                '结案意见',
                '案件类别'
            ],
            tabList: [
                {id: '1', title: '数据指数'},
                {id: '2', title: '案件管理'},
                {id: '3', title: '智能派单'},
                {id: '4', title: '知识图谱'},
                {id: '5', title: '搜索'},
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
            searchDataList: [],
            departList:[
                {title: '区人力资源社会保障局'},
                {title: '区北部开发办'},
            ]
        }
    }

    componentWillMount(){
        let objOne = JSON.parse(JSON.stringify(options));
        let objTwo = JSON.parse(JSON.stringify(options));
        objOne.xAxis.data = ['登记单', '直派街镇', '电话', '人民网地', '电交件', '政务微博', '外网', '微博','行政大厅','行风正风','文明办'];
        objOne.series[0].data = [116779, 7281, 3921, 1653, 1588, 760, 197,107,79,25,1];
        objTwo.title.text = '办理状态';
        objTwo.xAxis.data = ['转办结案', '直接回复', '承办中', '退回', '直办结案', '转办待结案', '结案审批不通过', '结案待审批','待分拣'];
        objTwo.series[0].data = [121826, 4922, 2885, 992, 984, 374, 230,164,26];
        this.setState({
            optionOne: objOne,
            optionTwo: objTwo,
        })
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
            search_id:"jiesu2020-08-28",
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
            if(reponse.nlp && reponse.nlp[0] && reponse.nlp[0].feed.relate){
                this.setState({
                    searchDataList: reponse.nlp[0].feed.relate
                })
            }
        }).catch((err)=>{
            console.log('error', err);
        })
    }

    replaceFunc(arg){
        if(this.state.searchValue){
            let reg = new RegExp("(" + this.state.searchValue + ")", "g");
            arg = arg.replace(reg, `<span class='query_span'>${this.state.searchValue}</span>`);
        }
        return (
            <div className="textarea_show"  dangerouslySetInnerHTML={{__html:arg }}>
            </div>
        )
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
                    if(!item || item == 0 || (item instanceof Array && !item.length)){
                        return(
                            <div key={index}></div>
                        )
                    }
                    let score = 0;
                    if(item.score){
                        score = item.score
                    }
                    return (
                        <div key={index} className="center_item">
                            <div className="row" style={{justifyContent:"space-between", width: '1039px'}}>
                                <div className="row">
                                    <span style={{fontSize:'12px',color:'#333333', marginLeft: '8px'}}>{moment(item.caseTime).format('YYYY-MM-DD')}</span>
                                    <span style={{fontSize:'12px',color:'#858585', marginLeft: '20px'}}>受理机构：</span>
                                    <span style={{fontSize:'12px',color:'#333333', minWidth: '100px'}}>{item.caseDepartment}</span>
                                    <span style={{fontSize:'12px',color:'#858585', marginLeft: '20px'}}>相似度：</span>
                                    <span style={{fontSize:'20px',color:'#333333', fontWeight: '600'}}>{score + '%'}</span>
                                </div>
                                <div className="row">
                                    <span style={{fontSize:'12px',color:'#858585', marginLeft: '40px'}}>电话：</span>
                                    <span style={{fontSize:'12px',color:'#333333'}}>{item.caseNumber == 'None' ? '暂无' : item.caseNumber}</span>
                                </div>
                            </div>
                            <div className="row" style={{justifyContent:"space-between",alignItems:'flex-start', width: '100%', marginTop: '12px'}}>
                                {/* <div className="textarea_show">
                                    {item.text}
                                </div> */}
                                {this.replaceFunc(item.text)}

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

    getKnowMap(cypher){
        var config = {
            container_id: "viz",
            server_url: "bolt://192.168.51.109:7687",
            server_user: "neo4j",
            server_password: "123456",
            labels: {
                "banli": {
                    caption: "user_key",
                    size: "pagerank",
                    community: "community"
                }
            },
            relationships: {
                "tail_entity": {
                    caption: false,
                    thickness: "count"
                }
            },
            initial_cypher: cypher
        }

        var viz = new window.NeoVis.default(config);
        viz.render();
    }

    render(){
        const {tabList,selectTab} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <div className="header_container">
                        {/* <img style={{width: '251px',height: '60px', marginLeft: '16px'}} src={require('./img/icon_head.png')} alt="img"/> */}
                        <div style={{width: '251px',height: '60px',lineHeight: '60px', fontSize: '30px',fontWeight: '600'}}>演示DEMO</div>
                        <div style={{display:'flex', flexDirection:"row", alignItems:'center',justifyContent:'flex-end'}}>
                            {tabList.map((item,index)=>{
                                return (
                                    <div className={selectTab == item.id ? "tab_item_select":"tab_item"} key={index} onClick={()=>{
                                        if(item.id == '3' || item.id == '5' || item.id == '1'){
                                            this.setState({
                                                selectTab: item.id,
                                                dataList: [],
                                                searchDataList: [],
                                                knowValue: ''
                                            })
                                        }else if(item.id == '4'){
                                            this.setState({
                                                selectTab: item.id,
                                                dataList: [],
                                                searchDataList: []
                                            },()=>{
                                                this.getKnowMap("MATCH p=()-[]->() RETURN p")
                                            })
                                        }
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

            
                {selectTab == '1' ? this.echartRender() : selectTab == '3' ? this.inputRender() : selectTab == '5' ? this.inputSearch() : null}
                {this.knowMap()}
                {this.modalRender()}
            </div>
        );
    }

    echartRender(){
        return (
            <div className="container" style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                padding: '20px'
            }}>
                <ReactEcharts style={{width: '100%',height: '500px'}} option={this.state.optionOne}/>
                <ReactEcharts style={{width: '100%',height: '500px'}} option={this.state.optionTwo}/>
            </div>
        )
    }

    dealArgStr(args){
        const {selectRela} = this.state;
        let argStr = '';
        for(let i = 0; i < selectRela.length; i++){
            argStr = argStr ? `${argStr}|\`${selectRela[i]}\`` : `${argStr}\`${selectRela[i]}\``;
        }
        let str = `MATCH data=(c:caller{name:'${args}'})-[r:案件详情]->(n:appeal_content)-[re:${argStr}]->(nn) return data`;
        return str
    }

    knowMap(){
        const {selectTab,knowValue,selectRela} = this.state;
          
        const columns = [
            {
                title: '排名',
                dataIndex: 'index',
                key: 'index',
                align: 'center',
                render: (text,record,index)=>{
                    return <span>{index+1}</span>
                }
            },
            {
                title: '诉求人姓名',
                dataIndex: 'name',
                key: 'name',
                align: 'center'
            },
            {
                title: '案件量',
                dataIndex: 'num',
                key: 'num',
                align: 'center'
            },
        ];
        return (
            <div style={{
                display:'flex', flexDirection: 'column',
                width: selectTab == '4' ? '1201px':'0px',
                height: selectTab == '4' ? 'calc(100vh - 62px)':'0px',
                backgroundColor:'#fff',
                overflow: 'auto'
            }}>
                {selectTab == '4' ?
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #dddddd',

                }}>
                    <div className="row" style={{
                        marginBottom: '10px'
                    }}>
                        <span style={{marginRight: '10px', fontSize:'14px', color: '#333'}}>投诉人：</span>
                        <Input
                        placeholder="请输入投诉人"
                        allowClear
                        onChange={(e)=>{
                            this.setState({
                                knowValue: e.target.value
                            })
                        }}
                        value={knowValue}
                        style={{
                            width: '300px',
                            marginRight: '20px',
                        }}
                        />
                        <span style={{marginRight: '10px', fontSize:'14px', color: '#333'}}>关系：</span>
                        <Select
                            mode="multiple"
                            style={{ width: '400px' }}
                            placeholder="请选择关系"
                            onChange={(value)=>{
                                this.setState({
                                    selectRela: value
                                })
                            }}
                            optionLabelProp="label"
                            value={selectRela}
                        >
                            {relaList.map((item,index)=>{
                                return (
                                    <Option key={index} value={item.title} label={item.title}>{item.title}</Option>
                                )
                            })}
                        </Select>
                    </div>

                    <div className="row" style={{
                        marginBottom: '20px'
                    }}>
                        <span style={{marginRight: '10px', fontSize:'14px', color: '#999999'}}>例如：89519758-e448-3900-bc12-a680d7a1dc90</span>
                    </div>
                    
                    <Button
                            type="primary"
                            onClick={()=>{
                                if(!knowValue){
                                    this.getKnowMap("MATCH p=()-[]->() RETURN p")
                                }else if(!selectRela.length){
                                    message.warning('请选择关系')
                                    return;
                                }else {
                                    let str = this.dealArgStr(knowValue)
                                    this.getKnowMap(str)
                                }
                            }}
                    >搜索</Button>

                </div>:null}
                <div className="row">
                    <div style={{
                        width: '260px',
                        height: '700px',
                        marginRight: '20px',
                        marginLeft:'20px'
                    }}>
                        <Table 
                        dataSource={dataSource} 
                        bordered 
                        columns={columns} 
                        pagination={false}
                        // scroll={{ y: 640 }}
                        onRow={record => {
                            return {
                                onClick: event => {
                                    if(!selectRela.length){
                                        message.warning('请选择关系')
                                        return;
                                    }else {
                                        let str = this.dealArgStr(record.id)
                                        this.getKnowMap(str)
                                    }
                                }
                            };
                        }}
                        />
                    </div>
                    <div id="viz" style={{
                        width: selectTab == '4' ? '900px' : '0px',
                        height: selectTab == '4' ? '700px' : '0px',
                    }}></div>

                </div>
            </div>
        )
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
                                score = dataList.score[index]
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
                        <span key={index} onClick={()=>{
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
                  {this.state.list2.map((item,index)=>{
                    return (
                      <span key={index} onClick={()=>{
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
                  {this.state.list3.map((item,index)=>{
                    return (
                      <span key={index} onClick={()=>{
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
                    {this.state.list4.map((item,index)=>{
                      return (
                        <span key={index} onClick={()=>{
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
  
          <div style={{marginLeft: '20px'}}>
            <div style={{fontSize:"12px", color: '#000000',marginTop: '15px', marginBottom: '8px'}}>选取单位</div>
            <div className="row" style={{flexWrap:'wrap'}}>
                {this.state.departList.map((item,index)=>{
                    return (
                        <div key={index} className="modal_titbtn">
                              <span style={{fonts: '14px', color: '#23A490', marginRight: '10px'}}>{item.title}</span>
                              <Icon type="close" style={{color: '#dadada',cursor:'pointer'}} onClick={()=>{
                                  let list = [...this.state.departList];
                                  list.splice(index,1);
                                  this.setState({
                                      departList: list
                                  })
                              }}/>
                        </div>
                    )
                })}
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
