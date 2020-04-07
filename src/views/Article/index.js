import React, { Component } from 'react'
import moment from 'moment'
import { Card, Table, Tag, Button } from 'antd'

import { getArticles } from '../../requests'

const displayTitleMap = {
  id: 'Id',
  title: 'Title',
  author: 'Author',
  createAt: 'Date of creation',
  amount: 'Reading'
}

const ButtonGroup = Button.Group
  
export default class ArticleList extends Component {
  constructor() {
    super()
    this.state={
      dataSource: [],
      columns: [],
      total: 0,
      isLoading: false
    }
  }
  createColumns = (columnKeys) => {
    const columns = columnKeys.map(item => {
      // if(item === 'id'){
      //   return{
      //     key: item,
      //   }
      // }
      if (item === 'amount') {
        return{
          title: displayTitleMap[item],
          key: item,
          render: (record) =>{
            const { amount } = record
            return <Tag color={amount > 200 ? 'red' : 'green'}>{record.amount}</Tag>
          }
        }
      }
      if(item === 'createAt'){
        return{
          title: displayTitleMap[item],
          key: item,
          render: (text, record) => {
            const { createAt } = record
            return moment(createAt).format('DD/MM/YYYY HH:mm:ss')
          }
        }
      }
      return{
        title: displayTitleMap[item],
        dataIndex: item,
        key: item,
      }
    })
    columns.push({
      title: 'Actions',
      key: 'action',
      render: () => {
        return (
          <ButtonGroup>
            <Button size="small" type="primary">Edit</Button>
            <Button size="small" type="ghost">Delete</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }
  getData = () => {
    this.setState({
      isLoading: true
    })
    getArticles()
      .then(resp => {
        const columnKeys = Object.keys(resp.data.list[0])
        const columns = this.createColumns(columnKeys)
        this.setState({
          total: resp.data.total,
          dataSource: resp.data.list,
          columns
        })
      })
      .catch(err => {
        //处理错误
      })
      .finally(()=>{
        this.setState({
          isLoading:false
        })
      })
  }
  componentDidMount(){
    this.getData()
  }
    render() {
        return (
            <Card title="Article list" bordered={false} extra={<a href="#">More</a>} style={{ width: 600 }}>
                <Table 
                    rowKey={record => record.id}
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns}
                    loading={this.state.isLoading}
                    pagination={{
                      total: this.state.total,
                      hideOnSinglePage: true
                    }}
                />
            </Card>
            
        )
    }
}
