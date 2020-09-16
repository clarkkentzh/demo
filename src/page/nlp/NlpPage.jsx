import React, { Component } from 'react'
import neo4j from 'neo4j-driver'
import { Input, Button, Modal, Icon, message, Select, Table } from 'antd'
import Chart from './Chart';


const { Option } = Select;

const dataSource = [
    { num: 12, id: '89519758-e448-3900-bc12-a680d7a1dc90', name: '张玲' },
    { num: 12, id: '7bcd24ae-0479-3826-8872-c301ff16e5cb', name: '李小冉' },
    { num: 9, id: '497e7268-2577-3563-8db3-2a11b97cd96a', name: '赵山川' },
    { num: 6, id: 'eb98423e-433c-321d-8eed-d702395b5c9f', name: '陈辰' },
    { num: 5, id: '69780052-f414-3337-9d28-a3a8c291c2a6', name: '李鹏飞' },
    { num: 5, id: '52d2bf9e-6343-3682-9ea0-44d3bf78f4ec', name: '胡伟伟' },
    { num: 5, id: 'eccc207c-5125-36c6-85a3-00d3c70399b1', name: '马飞腾' },
    { num: 5, id: 'f77e92ce-f4ad-37b1-8f31-47812d67fd2c', name: '王聪聪' },
    { num: 4, id: '99a2366c-a4b2-3779-8a66-651d9b1dfafa', name: '万鑫' },
    { num: 4, id: 'ea61dc67-3592-32a9-b38e-625f4c749e03', name: '李振' },
    { num: 4, id: '7034e3cb-d88d-396d-8dce-5993b33c706e', name: '王睿' },
    { num: 4, id: '65c31403-038c-30f1-b82a-4adcbb0bd2ac', name: '刘鹤' },
    { num: 4, id: 'f2ca8e5e-cc30-32fb-9b94-c2cb7770ca83', name: '张爱玲' },
    { num: 3, id: 'e1b64dda-aa47-399b-b89c-8ea5131df3a8', name: '张嘉莉' },
    { num: 3, id: 'f97d6aaa-5cb9-35a0-8f1e-69c8d5a6a6ec', name: '王博' },
    { num: 3, id: '0de8d62b-a520-3ff3-8ebe-768b86e0f549', name: '王子鑫' },
    { num: 3, id: 'e083b8f4-4f49-32aa-8117-b7be3731e493', name: '刘振飞' },
    { num: 2, id: 'dd5912bc-ac97-3d83-97b9-0ccf082c6822', name: '赵刚' },
    { num: 2, id: 'ace17c9c-7b5e-3401-bde0-d44cf3a3a44d', name: '李莉' },
    { num: 2, id: '14e62f6d-77ae-3c85-9908-971cc28e8018', name: '李景涛' }
];

const relaList = [
    { id: 1, title: '承办单位' },
    { id: 2, title: '案件主题' },
    { id: 3, title: '结案意见' },
    { id: 4, title: '案件类别' },
];


// 数据去重
function deteleObject(obj) {
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function (a, b) {
            return (Number(a) - Number(b));
        });
        var str = '';
        for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j]);
            str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!stringify.hasOwnProperty(str)) {
            uniques.push(obj[i]);
            stringify[str] = true;
        }
    }
    return uniques;
}

// 获取数据类型
function getNode(pro, user) {
    var label = pro.labels[0]
    var node = {};
    node.id = pro.identity.low
    node.label = label;
    if (label === "caller") {
        node.type = "投诉人"
        if (user) {
            node.name = user.name;
        } else {
            node.name = pro.properties.name;
        }
        node.group = 0;
    }
    if (label === "appeal_class") {
        node.type = "案件类别"
        node.name = pro.properties.name;
        node.group = 1;
    }
    if (label === "appeal_address_area") {
        node.type = "承办单位";
        node.name = pro.properties.name;
        node.group = 2;
    }
    if (label === "appeal_theme") {
        node.type = "案件主题";
        node.name = pro.properties.name;
        node.group = 3;
    }
    if (label === "appeal_content") {
        node.type = "案件详情";
        node.name = pro.properties.desc;
        node.group = 4;
        if (node.name == null) {
            node.name = "未知详情"
        }
    }
    if (label === "appeal_endcase_idea") {
        node.type = "结案意见";
        node.name = pro.properties.desc;
        node.group = 5;
        if (node.name == null) {
            node.name = "未知意见"
        }
    }
    return node
}


export class NlpPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            knowValue: '',
            selectRela: [
                '承办单位',
                '案件主题',
                '结案意见',
                '案件类别'
            ],
            nodes: [],
            edges: []
        }
    }

    async getKnowMap(cypher, user) {
        // console.log(cypher);
        // neo4j数据展示
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
        console.log(viz);
        // neo4j获取数据转d3js展示1
        var driver = neo4j.driver('bolt://192.168.51.109:7687', neo4j.auth.basic("neo4j", "123456"))
        var session = driver.session()
        try {
            var result = await session.writeTransaction(tx =>
                tx.run(cypher, null)
            )
            var data = JSON.stringify(result)
            var json = JSON.parse(data)
            var records = json.records
            // console.log(records);
            // 获取所有关系数据
            var list = []
            for (let i = 0; i < records.length; i++) {
                const segments = records[i]._fields[0].segments;
                for (let j = 0; j < segments.length; j++) {
                    const line = segments[j];
                    list.push(line)
                }
            }
            // console.log(list);
            // 获取所有节点数据
            var nodes = []
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                var start = element.start
                nodes.push(getNode(start, user))
                var end = element.end
                nodes.push(getNode(end, user))
            }
            // 数据去重
            var nn = deteleObject(nodes)
            // console.log(nn);
            // 获取所有连线数据
            var links = []
            for (let i = 0; i < list.length; i++) {
                const relation = list[i].relationship;
                var link = {}
                link.source = relation.start.low
                link.target = relation.end.low
                link.type = relation.type
                if (link.source != null && link.target != null)
                    links.push(link)
            }
            // 数据去重
            var ll = deteleObject(links)
            // console.log(ll);
            //关系数据index转换
            for (var i = 0; i < nn.length; i++) {
                var n = nn[i].id;
                for (let index = 0; index < ll.length; index++) {
                    var s = ll[index].source
                    var t = ll[index].target
                    if (n === s) {
                        ll[index].source = i
                    }
                    if (n === t) {
                        ll[index].target = i
                    }
                }
            }
            // console.log(ll);
            this.setState({
                nodes: nn,
                edges: ll
            })
        } finally {
            await session.close()
        }
        // on application exit:
    }

    dealArgStr(args) {
        const { selectRela } = this.state;
        let argStr = '';
        for (let i = 0; i < selectRela.length; i++) {
            argStr = argStr ? `${argStr}|\`${selectRela[i]}\`` : `${argStr}\`${selectRela[i]}\``;
        }
        let str = `MATCH data=(c:caller{name:'${args}'})-[r:案件详情]->(n:appeal_content)-[re:${argStr}]->(nn) return data`;
        return str
    }

    componentDidMount() {
        this.getKnowMap("MATCH p=()-[]->() RETURN p", null)
    }

    render() {
        const { knowValue, selectRela } = this.state;

        const columns = [
            {
                title: '排名',
                dataIndex: 'index',
                key: 'index',
                align: 'center',
                render: (text, record, index) => {
                    return <span>{index + 1}</span>
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
                display: 'flex', flexDirection: 'column',
                width: '1201px',
                height: 'calc(100vh - 62px)',
                backgroundColor: '#fff',
                overflow: 'auto'
            }}>

                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #dddddd',

                }}>
                    <div className="row" style={{
                        marginBottom: '10px'
                    }}>
                        <span style={{ marginRight: '10px', fontSize: '14px', color: '#333' }}>投诉人：</span>
                        <Input
                            placeholder="请输入投诉人"
                            allowClear
                            onChange={(e) => {
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
                        <span style={{ marginRight: '10px', fontSize: '14px', color: '#333' }}>关系：</span>
                        <Select
                            mode="multiple"
                            style={{ width: '400px' }}
                            placeholder="请选择关系"
                            onChange={(value) => {
                                this.setState({
                                    selectRela: value
                                })
                            }}
                            optionLabelProp="label"
                            value={selectRela}
                        >
                            {relaList.map((item, index) => {
                                return (
                                    <Option key={index} value={item.title} label={item.title}>{item.title}</Option>
                                )
                            })}
                        </Select>
                    </div>

                    <div className="row" style={{
                        marginBottom: '20px'
                    }}>
                        <span style={{ marginRight: '10px', fontSize: '14px', color: '#999999' }}>例如：89519758-e448-3900-bc12-a680d7a1dc90</span>
                    </div>

                    <Button
                        type="primary"
                        onClick={() => {
                            if (!knowValue) {
                                this.getKnowMap("MATCH p=()-[]->() RETURN p", null)
                            } else if (!selectRela.length) {
                                message.warning('请选择关系')
                                return;
                            } else {
                                let str = this.dealArgStr(knowValue)
                                this.getKnowMap(str, null)
                            }
                        }}
                    >搜索</Button>

                </div>
                <div className="row" style={{
                    alignItems: 'flex-start',
                    marginTop: '20px',
                }}>
                    <div style={{
                        width: '260px',
                        height: '700px',
                        marginRight: '20px',
                        marginLeft: '20px'
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
                                        if (!selectRela.length) {
                                            message.warning('请选择关系')
                                            return;
                                        } else {
                                            let str = this.dealArgStr(record.id)
                                            this.getKnowMap(str, record)
                                        }
                                    }
                                };
                            }}
                        />
                    </div>
                    {/* <div id="viz" style={{
                        width: '900px',
                        height: '700px',
                    }}>
                    </div> */}
                    <Chart nodes={this.state.nodes} links={this.state.edges}></Chart>
                </div>

            </div >
        )
    }
}

export default NlpPage
