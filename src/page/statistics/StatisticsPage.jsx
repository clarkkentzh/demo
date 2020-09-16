import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import './statisticsPage.css'

const options = {
    title: {
        text: '来件来源'
    },
    tooltip: {
        trigger: 'axis',
        show: true,
        axisPointer: {
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


export class StatisticsPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            optionOne: options,
            optionTwo: options,
        }
    }

    componentWillMount() {
        let objOne = JSON.parse(JSON.stringify(options));
        let objTwo = JSON.parse(JSON.stringify(options));
        objOne.xAxis.data = ['登记单', '直派街镇', '电话', '人民网地', '电交件', '政务微博', '外网', '微博', '行政大厅', '行风正风', '文明办'];
        objOne.series[0].data = [116779, 7281, 3921, 1653, 1588, 760, 197, 107, 79, 25, 1];
        objTwo.title.text = '办理状态';
        objTwo.xAxis.data = ['转办结案', '直接回复', '承办中', '退回', '直办结案', '转办待结案', '结案审批不通过', '结案待审批', '待分拣'];
        objTwo.series[0].data = [121826, 4922, 2885, 992, 984, 374, 230, 164, 26];

        this.setState({
            optionOne: objOne,
            optionTwo: objTwo,
        })
    }

    render() {
        return (
            <div className='container'>
                <ReactEcharts style={{ width: '100%', height: '500px' }} option={this.state.optionOne} />
                <ReactEcharts style={{ width: '100%', height: '500px' }} option={this.state.optionTwo} />
            </div>
        )
    }
}

export default StatisticsPage
