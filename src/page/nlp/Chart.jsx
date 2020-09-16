import React, { Component } from 'react'
import * as d3 from 'd3'
import './chart.css'

import { List, message, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

export class Chart extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nodes: [],
            links: []
        }
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nodes.length && nextProps.nodes != this.props.nodes) {
            this.setState({
                nodes: nextProps.nodes,
                links: nextProps.links
            }, function () {
                this.drawChart()
            })
        }
    }

    componentDidMount() {
        if (this.props.nodes.length) {
            this.drawChart();
        }
    }

    _force = null;
    _svg = null;
    drawChart = () => {
        // 获取数据
        var graph = this.state;
        // 移除旧元素
        d3.select(".d3").selectAll('*').remove();

        var width = 880,
            height = 700;
        // 设置颜色
        var color = d3.scale.category20();
        // 设置布局
        this._force = d3.layout.force()
            .charge(-1500)//排斥力
            .linkDistance(50)//距离
            .size([width, height])
            .nodes(graph.nodes)
            .links(graph.links)
            .start();

        // 设置平移和缩放
        var zoom = d3.behavior.zoom()//缩放配置，
            .scaleExtent([0.4, 2])//缩放比例
            .on("zoom", zoomed);

        function zoomed() {//缩放函数
            d3.selectAll("g").attr("transform",//svg下的g标签移动大小
                "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }

        // 设置画布
        this._svg = d3.select(".d3").append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(zoom);

        // 设置连线
        var link = this._svg.append("g").selectAll(".link")
            .data(graph.links)
            .enter()
            .append("line")
            .attr("class", "link");
        // .style("stroke", "#000")
        // .style("stroke-width", function (d) {
        //     return Math.sqrt(d.value);
        // });

        //边上的文字（人物之间的关系）            
        // var edges_text = this._svg.selectAll(".linetext")
        //     .data(graph.links)
        //     .enter()
        //     .append("text")
        //     .attr("class", "linetext")
        //     .text(function (d) {
        //         return d.type;
        //     })
        //     .style("fill-opacity", 1.0);

        // 设置节点
        var node = this._svg.selectAll(".node")
            .data(graph.nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(this._force.drag)
        // 节点圆
        node.append("circle")
            .attr("r", 10)//圆的大小
            .style("fill", function (d) {
                return color(d.group);
            })
        // 节点文字
        node.append("text")
            .attr("dx", 15)
            .attr("dy", ".25em")
            .attr("y", function (d) {
                // 多行文字显示
                if (d.name.length <= 17) {
                    d3.select(this).append('tspan').attr("ix", 0)
                        .text(function () { return d.name; });
                } else {//大于16个字符时，
                    var top = d.name.substring(0, 17) + "...";
                    d3.select(this).append('tspan').attr("ix", 0).text(top);
                    // var sum = d.name.length / 17
                    // console.log(d.name,sum);
                    // for (let i = 0; i < sum+1; i++) {
                    //     // const element = array[i];
                    //     var top = d.name.substring(i * 17, (i + 1) * 17);
                    //     d3.select(this).append('tspan').attr("ix", i).text(top);
                    // }
                }
            })

        // 添加箭头
        this._svg.append("g").append("defs").selectAll("marker")
            .data(["suit", "licensing", "resolved"])
            .enter().append("marker")
            .attr("id", function (d) { return d; })
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 25)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
            .style("stroke", "#4679BD")
            .style("opacity", "0.6");

        //坐标计算
        this._force.on("tick", function () {

            link.attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });
            d3.selectAll("circle")
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });

            d3.selectAll("text")
                .attr("x", function (d) {
                    return d.x;
                })
                .attr("y", function (d) {
                    return d.y;
                });

            d3.selectAll("tspan")
                .attr("x", function (d) {
                    return d.x;
                })
                .attr("y", function (d) {
                    return d.y + (this.getAttribute('ix') * 20);
                });

            //更新连接线上文字的位置
            // edges_text.attr("x", function (d) { return (d.source.x + d.target.x) / 2; });
            // edges_text.attr("y", function (d) { return (d.source.y + d.target.y) / 2; });
            //End Changed11
        });

    }
    render() {
        return <div>
            <div className="d3" id='d33' style={{ background: '#ccc', width: '880px' }} />
            <div className="infinite-container">
                <List
                    dataSource={this.state.nodes}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <h3 style={{ width: '200px' }}>{item.type}</h3>
                            <h5 style={{ width: '1800px' }}>{item.name}</h5>
                        </List.Item>
                    )}
                >
                </List>

            </div>
        </div >

    }
}

export default Chart
