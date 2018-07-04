import Vue from 'vue'
import Router from 'vue-router'
import { addRouteComponent } from '../resource/util'
var path = require('./router')

Vue.use(Router)

// 路由懒加载
// 名称需要和name名称相同
const home = () =>
  import(/* webpackChunkName: "home" */ '../components/HelloWorld.vue')

export default new Router({
  routes: addRouteComponent(path.routes, 'component', [home])
})
