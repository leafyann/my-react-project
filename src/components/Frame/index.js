import React, { Component } from 'react'
import { 
    Layout, 
    Menu, 
    Dropdown, 
    Avatar,
    Badge 
} from 'antd'
import { 
    UserOutlined,NotificationOutlined, 
    SettingOutlined, 
    LogoutOutlined 
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getNotification } from '../../actions/notification'
import './frame.less'
import logo from './pipi_logo.png'

// import { adminRoutes } from '../../routes'

const { Header, Content, Sider } = Layout

// const menus = adminRoutes.filter(route => route.isNav === true)

const mapState = state => {
    return {
        notificationCount: state.notification.list.filter(item => item.hasRead === false).length
    }
}


@withRouter
@connect(mapState, { getNotification })
class Frame extends Component {
    componentDidMount(){
        this.props.getNotification()
    }
    onMenuClick = ({ key }) => {
        this.props.history.push(key)
    }
      
      handleMenuClick = ({ key }) => {
        this.props.history.push(key)
      }


    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="/admin/notification">
                <NotificationOutlined />
                <Badge dot={Boolean(this.props.notificationCount)}>Notification</Badge>
              </Menu.Item>
              <Menu.Item key="/admin/setting">
                <SettingOutlined />
                Settings
              </Menu.Item>
              <Menu.Item key="/login">
                <LogoutOutlined />
                Log out
              </Menu.Item>
            </Menu>
          )

        const selectedKeysArr = this.props.location.pathname.split('/')
        selectedKeysArr.length = 3
        return (
            <Layout>
                <Header className="header" style={{backgroundColor: "#fff"}}>
                <div className="logo">
                    <img src={logo} alt='logo' />
                </div>
                <Dropdown overlay={menu}>
                    
                        <div onClick={this.onMenuClick} >
                        <Badge count={this.props.notificationCount}>
                            <Avatar shape="square" icon={<UserOutlined />} />
                        </Badge>
                        </div>
                    
                </Dropdown>
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
