/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-20 21:20:37
 * @LastEditors: zjjj
 * @LastEditTime: 2021-04-25 21:25:02
 */
import Vue from 'vue';
import {
    Button, NavBar, Icon, Swipe, SwipeItem, Lazyload, Dialog, Tabs, Tab, Cell, Toast, CellGroup, DropdownMenu, Popup, DropdownItem, List, Collapse, CollapseItem, GoodsAction, GoodsActionIcon, GoodsActionButton, ShareSheet, PullRefresh, Card, Form, Field,Stepper,Sidebar,SidebarItem,SwipeCell,SubmitBar,Checkbox,CheckboxGroup 
} from "vant"
// use使用
const vueUse = {
  Button, NavBar, Icon, Swipe, SwipeItem, Tabs, Tab, Cell, Dialog, CellGroup, Popup, Toast, List, Collapse, DropdownMenu, DropdownItem, CollapseItem, GoodsAction, GoodsActionIcon, GoodsActionButton, ShareSheet, PullRefresh, Card, Form, Field,Stepper,Sidebar,SidebarItem,SwipeCell,SubmitBar,Checkbox,CheckboxGroup 
}

Object.keys(vueUse).forEach(item => {
  Vue.use(vueUse[item])
})
// 图片懒加载
Vue.use(Lazyload, {
  lazyComponent: true,

});
Vue.prototype.$toast = Toast


