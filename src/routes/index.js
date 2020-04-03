import {
    Dashboard,
    Login,
    NotFound,
    Setting,
    ArticleList,
    ArticleEdit
} from '../views'

export const mainRoutes = [{
    pathname: '/login',
    component: Login

},{
    pathname: '/404',
    component: NotFound

}]

export const adminRoutes = [{
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: 'Dashboard',
    isNav: true,
    icon: null
    
},{
    pathname: '/admin/article',
    component: ArticleList,
    title: 'Article List',
    isNav: true,
    exact: true,
    icon: null
},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    icon: null
},{
    pathname: '/admin/setting',
    component: Setting,
    title: 'Setting',
    isNav: true,
    icon: null

}]