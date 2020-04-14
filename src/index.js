import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import enGB from 'antd/es/locale/en_GB';
import { ConfigProvider  } from 'antd'

import App from './App'

import { mainRoutes } from './routes'

import './index.less'

render(
    <ConfigProvider  locale={enGB}>
        <Router>
            <Switch>
                <Route path="/admin" render={(routerProps) => {
                    // TODO: admin permission 
                    return <App {...routerProps} />
                }} />
                {
                    mainRoutes.map(route => {
                        return <Route key={route.pathname} path={route.pathname} component={route.component} exact />
                    })
                }
                <Redirect to="/admin" from="/" exact />
                <Redirect to="/404" exact />
            </Switch>
        </Router>
    </ConfigProvider >,
    document.querySelector('#root')
)