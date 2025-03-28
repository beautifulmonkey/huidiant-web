import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '@/views/Home'
import { getIFramePath, getIFrameUrl } from '@/utils/iframe'
import de from "element-ui/src/locale/lang/de";
import menu_list from "./menu_map.js";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      // component: resolve => require([`@/views/Home`], resolve),
      component: Home,
      children: [
        {
          path: '/guide',
          name: '系统导航',
          component: resolve => require([`@/views/Intro/Intro`], resolve),
          meta: {
            icon: 'el-icon-question',
            index: 0
          }
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: resolve => require([`@/views/Login`], resolve)
    },
    {
      path: '/cashier',
      name: '收银',
      component: resolve => require([`@/views/Cashier`], resolve)
    },
    {
      path: '/404',
      name: 'notFound',
      component: resolve => require([`@/views/Error/404`], resolve)
    },
    {
      path: '/receipts',
      name: '收据处理',
      component: resolve => require([`@/components/Receipts/Receipts`], resolve)
    },
    {
      path: '/bind/:openId',
      name: '客户绑定',
      component: resolve => require([`@/views/Customer/BindPublic`], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let token = localStorage.access_token;
  let userName = sessionStorage.getItem('user')
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(token) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!token && to.path.slice(0,5) !== '/bind') {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({ path: '/login' })
    } else {
      if(to.path === "/"){
        next({ path: '/analysis/today' });
        to.path = '/analysis/today'
      }

      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(userName, to, from);
      // todo: 艹 OBServer如何获取数据????????
      const menuindex = ["/goods", "/customer", "/orders", "/analysis", "/settings"];
      const hidden_map = {
        "/goods/service/add": "/goods/service",
        "/goods/product/add": "/goods/product",
        "/goods/card/add/numbers": "/goods/card",
        "/goods/card/add/prepaid": "/goods/card",
      };
      if (menuindex.indexOf(to.path) === -1 ){
        if (hidden_map[to.path]){
          store.commit('setSelectActive', hidden_map[to.path]);  // todo: 不管用
        }else {
          store.commit('setSelectActive', to.path);
        }
        next()
      }
    }
  }
})

/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes(userName, to, from) {
  const menuIndex = "/" + to.path.split("/")[1];

  // 处理IFrame嵌套页面
  handleIFrameUrl(to.path)
  if(store.state.app.menuRouteLoaded) {
    store.commit('switchNavTree', menuIndex);
    return
  }
  let dynamicRoutes = addDynamicRoutes(menu_list);
  // 处理静态组件绑定路由
  handleStaticComponent(router, dynamicRoutes);

  // api.menu.findNavTree()
  // .then(res => {
  //   router.addRoutes(router.options.routes);
  // })
  //

    setTimeout(() => {
      // todo: 待优化: 加定时器是为了防止异步导致router还没加载完成
      router.addRoutes(router.options.routes);
    }, 10);

    // 保存加载状态
    store.commit('menuRouteLoaded', true);
    // 保存菜单树
    store.commit('setBaseNavTree', baseNavTree(menu_list));
    store.commit('switchNavTree', menuIndex);
}

/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
function handleStaticComponent(router, dynamicRoutes) {
  // for(let j=0;j<dynamicRoutes.length; j++) {
  //   if(dynamicRoutes[j].name == '代码生成') {
  //     dynamicRoutes[j].component = Generator
  //     break
  //   }
  // }
  router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
}

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for(let i=0; i<length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if(path != null && path.endsWith(iframe.path)) {
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
}


/**
 * 递归把hidden数据剔除
 */

function baseNavTree(btree) {
  var children_list = [];
  btree.forEach((item,index,array)=>{
    if(!item.hidden) {
      if(item.children && item.children.length >= 1){
        item.children = baseNavTree(item.children)
      }
      children_list.push(item)
    }
  });

  return children_list
}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function addDynamicRoutes (menuList = [], routes = []) {
 var temp = []
 for (var i = 0; i < menuList.length; i++) {
   if (menuList[i].children && menuList[i].children.length >= 1) {
     temp = temp.concat(menuList[i].children)
   } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      }
      let path = getIFramePath(menuList[i].url)
      if (path) {
        // 如果是嵌套页面, 通过iframe展示
        route['path'] = path
        route['component'] = resolve => require([`@/views/IFrame/IFrame`], resolve)
        // 存储嵌套页面路由路径和访问URL
        let url = getIFrameUrl(menuList[i].url)
        let iFrameUrl = {'path':path, 'url':url}
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
       try {
         // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
         // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
         if (menuList[i].component){
           var array = menuList[i].component.split('/').slice(1)
         }else {
           var array = menuList[i].url.split('/')
         }
         let url = ''
         for(let i=0; i<array.length; i++) {
            url += array[i].substring(0,1).toUpperCase() + array[i].substring(1) + '/'
         }
         url = url.substring(0, url.length - 1)
         route['component'] = resolve => require([`@/views/${url}`], resolve)
       } catch (e) {}
     }
     routes.push(route)
   }
 }
 if (temp.length >= 1) {
   addDynamicRoutes(temp, routes)
 } else {
   console.log('动态路由加载...')
   console.log(routes)
   console.log('动态路由加载完成.')
 }
 return routes
}

export default router
