import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { withRouter } from 'react-router-dom'

// import { adminRoutes } from '../../routes'

const { Header, Content, Sider } = Layout

// const menus = adminRoutes.filter(route => route.isNav === true)

@withRouter
class Frame extends Component {
    onMenuClick = ({ key }) => {
        this.props.history.push(key)
    }
    render() {
        const selectedKeysArr = this.props.location.pathname.split('/')
        selectedKeysArr.length = 3
        return (
            <Layout>
                <Header className="header" style={{backgroundColor: "#fff"}}>
                <div className="logo" />
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                        mode="inline"
                        selectedKeys={[selectedKeysArr.join('/')]}
                        onClick={this.onMenuClick}
                        style={{ height: '100%', borderRight: 0 }}
                        >
                            {
                                this.props.menus.map(item => {
                                    return (
                                        <Menu.Item key={item.pathname}>
                                            {/* 这里还有icon没有做 */}
                                            <span>{item.title}</span>
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        
                        <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default Frame
