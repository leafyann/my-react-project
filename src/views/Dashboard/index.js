import React, { Component } from 'react'
import { 
    Card,
    Row,
    Col,
    Spin
} from 'antd'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  } from 'recharts'

import { getArticleAmount } from '../../requests'

import './dashboard.less'

// const getRandomColor = () => {
//     return '#'+(Math.random()*0xffffff<<0).toString(16); 
// }

const style = () => {
    return { background: '#0ef' }
}



export default class Dashboard extends Component {
    chartRef  = React.createRef()
    constructor(){
        super()
        this.state = {
            viewerAmount: [],
            isLoading: false
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        getArticleAmount()
        .then(resp => {
            const groupLength =  resp.data.amount.length        
            let tmpViewerAmount = []   
            for (let i=0; i < groupLength; i++){
                tmpViewerAmount.push({
                    name: resp.data.amount[i].month,
                    uv: resp.data.amount[i].value
                })
            }
            this.setState({
                viewerAmount: tmpViewerAmount
            })
        })
        .finally(() => {
            this.setState({
                isLoading: false
            })
        })
    }

    render() {
        return (
            <div>
                <>
                <Card 
                    title="Overview"
                    bordered={false}
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div style={style()} className="db-row-box">col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style()} className="db-row-box">col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style()} className="db-row-box">col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style()} className="db-row-box">col-6</div>
                        </Col>
                    </Row>

                </Card>
                <Card 
                    title="Visitors"
                    bordered={false}
                >
                    <Spin spinning={this.state.isLoading}>
                        <AreaChart
                            width={800}
                            height={400}
                            data={this.state.viewerAmount}
                            margin={{
                            top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke={'#f00'} fill={'#f9e'} />
                        </AreaChart>
                    </Spin>
                </Card>
                </>
            </div>
        )
    }
}

