import Loadable from 'react-loadable'
import { Loading } from '../components'
// import Dashboard from './Dashboard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Setting from './Setting'
// import ArticleList from './Article'
// import ArticleEdit from './Article/Edit'

//lazy load below
const Dashboard = Loadable({
    loader: () => import('./Dashboard'),
    loading: Loading
})
const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading
})
const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading
})
const Setting = Loadable({
    loader: () => import('./Setting'),
    loading: Loading
})
const ArticleList = Loadable({
    loader: () => import('./Article'),
    loading: Loading
})
const ArticleEdit = Loadable({
    loader: () => import('./Article/Edit'),
    loading: Loading
})

export {
    Dashboard,
    Login,
    NotFound,
    Setting,
    ArticleList,
    ArticleEdit
}