import React, { Component } from 'react'
import moment from 'moment'
import { Card, Table, Tag, Button, Modal, Typography, message } from 'antd'

import { getArticles, deleteArticleById } from '../../requests'

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
      isLoading: false,
      offset: 0,
      limited: 10,
      deleteArticleTitle: '',
      isShowArticleModal: false,
      deleteArticleConfirmLoading: false,
      deleteArticleID: null
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
      render: (text,record) => {
        return (
          <ButtonGroup title={this.title}>
            <Button size="small" type="primary" title={this.title} onClick={this.toEdit.bind(this,record.id)}>Edit</Button>
            <Button size="small" type="ghost" onClick={this.showDeleteArticleMOdal.bind(this,record)}>Delete</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }

  toEdit = (id) => {
    this.props.history.push(`/admin/article/edit/${id}`)
  }

  showDeleteArticleMOdal = (record) => {
    // Modal.confirm({
    //   title: <Typography>Please confirm to delet <span style={{color: '#f00'}}>{record.title}</span></Typography>,
    //   content: 'Note: this is a one-way operation. Once you delete, you can’t go back!',
    //   onOk(){
    //     deleteArticle(record.id)
    //       .then(resp => {
    //         console.log(resp.data)
    //       })
    //   }
    // })
    this.setState({
      isShowArticleModal: true,
      deleteArticleTitle: record.title,
      deleteArticleID: record.id
    })
  }

deleteArticle = () => {
  console.log(this.state.deleteArticleID)
  this.setState({
    deleteArticleConfirmLoading: true
  })
  deleteArticleById(this.state.deleteArticleID)
    .then(resp => {
      message.success(resp.data.msg)
      this.setState({
        offset: 0
      }, ()=>{
        this.getData()
      })
    })
    .finally(()=> {
      this.setState({
        deleteArticleConfirmLoading: false,
        isShowArticleModal: false
      })
    })
}

  hideDeleteModal = () => {
    this.setState({
      isShowArticleModal: false,
      deleteArticleTitle: '',
      deleteArticleConfirmLoading: false
    })
  }

  getData = () => {
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset, this.state.limited)
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

      })
      .finally(()=>{
        this.setState({
          isLoading:false
        })
      })
  }

  onPageChange = (page,pageSize) => {
    this.setState({
      offset: pageSize * (page - 1),
      limited: pageSize
    }, () => {
      this.getData()
    })
  }

  onShowSizeChange = (current, size) => {
    this.setState({
      offset: 0,
      limited: size
    }, () => {
      this.getData()
    })
  }

  componentDidMount(){
    this.getData()
  }
    render() {
        return (
            <Card title="Article list" bordered={false} extra={<Button onClick={this.toEdit.bind(this,undefined)}>Add</Button>} style={{ width: 600 }}>
                <Table 
                    rowKey={record => record.id}
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns}
                    loading={this.state.isLoading}
                    pagination={{
                      current: this.state.offset / this.state.limited + 1,
                      total: this.state.total,
                      hideOnSinglePage: true, 
                      showQuickJumper: true,
                      showSizeChanger: true,
                      onChange: this.onPageChange,
                      onShowSizeChange: this.onShowSizeChange
                    }}
                />
                <Modal 
                  title={<Typography>Delete confirmation</Typography>}
                  content={this.state.deleteArticleModalContent}
                  visible={this.state.isShowArticleModal}
                  onCancel={this.hideDeleteModal}
                  confirmLoading={this.state.deleteArticleConfirmLoading}
                  onOk={this.deleteArticle}
                >
                  <Typography> Are you sure you want to delete <span style={{color: '#f00', width: ''}}>{this.state.deleteArticleTitle}</span>？</Typography>
                *This is a one-way operation. Once you delete, you can’t go back!*
                </Modal>
            </Card>
            
        )
    }
}
