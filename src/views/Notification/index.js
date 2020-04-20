import React, { Component } from 'react'
import {
    Card,
    Button,
    List,
    Avatar,
    Badge,
    Spin
}from 'antd'
import { connect } from 'react-redux'

import { markNotificaitonAsReadById, markAllNotificaitonAsRead } from '../../actions/notification'

const mapState = state => {
  const {
    list,
    isLoading
  } = state.notification
  return {
    list,
    isLoading
  }
  
}

@connect(mapState, { markNotificaitonAsReadById, markAllNotificaitonAsRead })
class Notification extends Component {
    render() {
        return (
            <div>
                <Card
                    title="Notifications"
                    bordered={false}
                    extra={
                      <Button 
                        disabled={this.props.list.every(item => item.hasRead === true)}
                        onClick={this.props.markAllNotificaitonAsRead}
                      >
                          Mark all as read
                      </Button>
                      }
                >
                  <Spin spinning={this.props.isLoading}>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.list}
                        renderItem={item => (
                          
                        <List.Item extra={
                          item.hasRead 
                          ? null 
                          : <Button onClick={this.props.markNotificaitonAsReadById.bind(this, item.id)}>Mark as read</Button>}>
                            <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                            description={item.desc}
                            />
                        </List.Item>
                        )}
                    />
                    </Spin>
                </Card>
            </div>
        )
    }
}

export default Notification
