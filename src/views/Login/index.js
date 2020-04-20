import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Card, Spin } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/user'
import './login.less'

// const wrapperCol={
//     xs: {
//         span: 24,
//         offset: 0
//     },
//     md: {
//         span: 12,
//         offset: 6,
//     }
// }

const formStyle={
    'padding': '24px',
    'backgroundColor': '#ffffff',
}

const mapState = state => ({
    isLogin: state.user.isLogin,
    isLoading: state.user.isLoading
})

@connect(mapState, { login })
class Login extends Component {
    render() {
            const onFinish = values => {
              console.log('Received values of form: ', values)
              this.props.login(values)
            }

        return (
            this.props.isLogin
            ?
            <Redirect to='/admin' />
            :
                <div className="site-card-border-less-wrapper">
                <Card 
                    title="Admin Article Management Login"
                    bordered={false}
                    className="login-form-wrapper"
                >
                    <Form
                        align="middle"
                        // wrapperCol={wrapperCol}
                        style={formStyle}
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input disabled={this.props.isLoading} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                            disabled={this.props.isLoading}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox disabled={this.props.isLoading}>Remember me</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
                            Log in
                            </Button>
                        </Form.Item>
                    </Form>

                </Card>
                </div>
        )
    }
}

export default Login