/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-20 21:20:37
 * @LastEditors: stride
 * @LastEditTime: 2021-04-23 14:52:40
 */
import Vue from 'vue';
import {


  Button, NavBar, Icon, Swipe, SwipeItem, Lazyload, Dialog, Tabs, Tab, Cell, Toast, CellGroup, DropdownMenu, Popup, DropdownItem, List, Collapse, CollapseItem, TreeSelect,GoodsAction, GoodsActionIcon, GoodsActionButton, ShareSheet,PullRefresh,Card,Form,Field,Overlay
} from "vant"
// use使用
Vue.use(GoodsAction);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(TreeSelect);
const vueUse = {
  Button, NavBar, Icon, Swipe, SwipeItem, Tabs, Tab, Cell, Dialog, CellGroup, Popup, Toast, List, Collapse, DropdownMenu, DropdownItem, CollapseItem, GoodsAction, GoodsActionIcon, GoodsActionButton, ShareSheet,PullRefresh,Card,Form,Field ,Overlay
}

Object.keys(vueUse).forEach(item => {
  Vue.use(vueUse[item])
})
// 图片懒加载
Vue.use(Lazyload, {
  lazyComponent: true,

});
Vue.prototype.$toast = Toast


