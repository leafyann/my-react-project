import React, { Component, createRef } from 'react'
import {
    Card,
    Button,
    Form,
    Input,
    DatePicker, 
    Spin,
    message
} from 'antd'

import moment from 'moment'

import E from 'wangeditor'

import { getArticleById, saveArticle } from '../../requests'

import './edit.less'

class Edit extends Component {

    formRef  = React.createRef()

    constructor() {
        super()
        this.editorRef = createRef()
        this.state = {
            isLoading: false
        }
    }
    

    initEditor = () => {
        this.editor = new E(this.editorRef.current)

        this.editor.customConfig.onchange = (html) => {
        //    this.props.form.setFieldsValue({
        //         content: html
        //       })
            this.formRef.current.setFieldsValue({'content': html})
        }
        this.editor.create()
    }

    componentDidMount(){
        this.initEditor()
        this.setState({
            isLoading: true
        })

        if (this.props.match.params.id != '0'){
            getArticleById(this.props.match.params.id)
            .then(resp => {
                resp.data.createAt = moment(resp.data.createAt)
                this.formRef.current.setFieldsValue(resp.data)
                this.editor.txt.html(resp.data.content)
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        } else {
            this.setState({
                isLoading: false
            })
        }

    }

    render(...state) {
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },

          }
        const tailLayout = {
            wrapperCol: { offset: 4, span: 20 },
            
          }
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
          };
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
          };
        const onFinish = values => {
            const saveArticleData = Object.assign({}, values, {
                createAt: values.createAt.valueOf()
            }) 
            this.setState({
                isLoading: true
            })
              saveArticle(this.props.match.params.id, saveArticleData)
                .then(resp => {
                    message.success(resp.data.msg)
                    // trun to article list page if needed
                   
                })
                .finally(() => {
                    this.setState({
                        isLoading: false
                    })
                    this.props.history.push('/admin/article')
                })
            }
          
        const onFinishFailed = errorInfo => {
              console.log('Failed:', errorInfo)
            }
        
        return (
            <Card
            // title={this.props.history.location.state.articleTitle}
            bordered={false}
            extra={<Button onClick={this.props.history.goBack}>cancle</Button>}
            >
                <Spin spinning={this.state.isLoading}>
                    <Form
                        {...layout}
                        ref={this.formRef}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input title!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Author"
                            name="author"
                            rules={[{ required: true, message: 'Please input author!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Amount"
                            name="amount"
                            rules={[{ required: true, message: 'Please input amount!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="createAt" label="Create time" {...config}>
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Select date and time" />
                        </Form.Item>
                        <Form.Item 
                            name="content"  
                            label="Content"
                            rules={[{ required: true, message: 'Please input content!' }]}
                        >
                            <div className="article-editor" ref={this.editorRef} ></div>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        )
    }
}



export default Edit