import React, { Component } from 'react'
import {
    Card,
    Button,
    List,
    Avatar,
    Badge
}from 'antd'

export default class Notification extends Component {
    render() {

        const notiListData = [
            {
              title: 'Ant Design Title 1',
            },
            {
              title: 'Ant Design Title 2',
            },
            {
              title: 'Ant Design Title 3',
            },
            {
              title: 'Ant Design Title 4',
            },
          ];

        return (
            <div>
                <Card
                    title="Notification"
                    bordered={false}
                    extra={<Button>Mark all as read</Button>}
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={notiListData}
                        renderItem={item => (
                        <List.Item extra={<Button>Mark as read</Button>}>
                            <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<Badge dot>{item.title}</Badge>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                        )}
                    />
                </Card>
            </div>
        )
    }
}
