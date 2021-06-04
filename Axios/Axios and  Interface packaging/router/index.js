import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 模块A
import moduleARouter from '@/moduleA/router/index'

// 模块B
import moduleBRouter from '@/moduleB/router/index'

// 模块C
import moduleCRouter from '@/moduleC/router/index'

export const constantRoutes = [{
	path: '/redirect',
		component: Layout,
		hidden: true,
		children: [{
			path: '/redirect/:path*',
			component: () => import('@/views/redirect/index')
		}]
	},
	// 登录
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/auth-redirect',
		component: () => import('@/views/login/auth-redirect'),
		hidden: true
	},
	// 404页
	{
		path: '/404',
		component: () => import('@/views/error-page/404'),
		hidden: true
	},
	// 401页
	{
		path: '/401',
		component: () => import('@/views/error-page/401'),
		hidden: true
	},
	{
		path: '/',
		component: Layout,
		redirect: home,
		meta: {
			title: 'Dashboard',
			icon: 'dashboard',
			affix: true
		}
	},
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [{
			path: 'dashboard/index',
			component: () => import('@/lhhc/home/index'),
			name: 'Dashboard',
			meta: {
				title: '首页',
				icon: 'dashboard',
				affix: true,
				noCache: false
			}
		}]
	},
	{
		path: "*",
		redirect: "/"
	},
	moduleARouter,
	moduleBRouter,
	moduleCRouter,
}]


const router = new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})
router.$addRoutes = (params) => {
	router.matcher = new Router({
		mode: 'history'
	}).matcher;
	router.addRoutes(params)
}
router.beforeEach((to, from, next) => {
	// console.log(to.meta.title)
	// console.log(to)
	if (to.query.pathName) {
		to.meta.title = to.query.pathName
	}
	next()
});


export default router
