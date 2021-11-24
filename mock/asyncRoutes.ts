// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

// http://mockjs.com/examples.html#Object
const systemRouter = {
  path: "/system",
  name: "system",
  redirect: "/system/user",
  meta: {
    icon: "Setting",
    title: "message.hssysManagement",
    i18n: true,
    showLink: true,
    rank: 6
  },
  children: [
    {
      path: "/system/user",
      name: "user",
      meta: {
        title: "message.hsBaseinfo",
        i18n: true,
        showLink: true
      }
    },
    {
      path: "/system/dict",
      name: "dict",
      meta: {
        title: "message.hsDict",
        i18n: true,
        showLink: true
      }
    }
  ]
};

const permissionRouter = {
  path: "/permission",
  name: "permission",
  redirect: "/permission/page",
  meta: {
    title: "message.permission",
    icon: "Lollipop",
    i18n: true,
    showLink: true,
    rank: 3
  },
  children: [
    {
      path: "/permission/page",
      name: "permissionPage",
      meta: {
        title: "message.permissionPage",
        i18n: true,
        showLink: true
      }
    },
    {
      path: "/permission/button",
      name: "permissionButton",
      meta: {
        title: "message.permissionButton",
        i18n: true,
        showLink: true,
        authority: []
      }
    }
  ]
};
const goodsRoutes = {
  path: "/basic/goods",
  name: "goods",
  redirect: "/basic/goods/dial",
  node: "2",
  meta: {
    title: "message.basic.goods.library",
    icon: "Goods",
    i18n: true,
    showLink: true,
    keepAlive: true
  },
  children: [
    {
      path: "/basic/goods/dial",
      name: "goodsDial",
      meta: {
        title: "message.basic.goods.dial",
        icon: "Goods",
        i18n: true,
        showLink: true,
        keepAlive: true
      }
    },
    {
      path: "/basic/goods/list",
      name: "goodsList",
      meta: {
        title: "message.basic.goods.goodsLibList",
        icon: "List",
        i18n: true,
        showLink: true,
        keepAlive: true
      }
    },
    {
      path: "/basic/goods/edit",
      name: "goodsEdit",
      meta: {
        title: "message.basic.goods.goodsEdit",
        i18n: true,
        showLink: false,
        keepAlive: true
      }
    },
    {
      path: "/basic/goods/details",
      name: "goodsDetails",
      meta: {
        title: "message.basic.goods.goodsDetails",
        i18n: true,

        showLink: false,
        keepAlive: true,
        authority: []
      }
    },
    {
      path: "/basic/goods/log",
      name: "/basic/goods/log",
      meta: {
        title: "message.basic.goods.goodsLog",
        i18n: true,
        showLink: true,
        keepAlive: true,
        icon: "List",
        authority: []
      }
    },
    {
      path: "/basic/goods/category",
      name: "category",
      meta: {
        title: "message.basic.goods.goodsCategory",
        i18n: true,
        showLink: true,
        keepAlive: true,
        icon: "List",
        authority: []
      }
    },
    {
      path: "/basic/goods/brand",
      name: "brand",
      meta: {
        title: "message.basic.goods.goodsBrand",
        i18n: true,
        showLink: true,
        keepAlive: true,
        icon: "List",
        authority: []
      }
    }
  ]
};
const expressRoutes = {
  path: "/express",
  name: "express",
  redirect: "/express/list",
  meta: {
    title: "message.basic.express.expressCompanyList",
    i18n: true,
    icon: "ri-truck-line",
    showLink: true
  },
  children: [
    {
      path: "/express/list",
      name: "expressList",
      meta: {
        title: "message.basic.express.expressCompanyList",
        i18n: true,
        icon: "ri-truck-line",
        showLink: true
      }
    },
    {
      path: "/express/route",
      name: "expressRoute",
      meta: {
        title: "message.basic.express.expressRouter",
        i18n: true,
        // icon: "ri-truck-line",
        showLink: true
      }
    }
  ]
};
const basicsRoutes = {
  path: "/basic",
  name: "basic",
  redirect: "/basic/dial",
  meta: {
    title: "message.basic.dial",
    icon: "Coin",
    i18n: true,
    showLink: true,
    rank: 1
  },
  children: [
    {
      path: "/basic/dial",
      name: "basicDial",
      meta: {
        title: "message.basic.dial",
        i18n: true,
        icon: "Coin",
        showLink: true
      }
    },
    goodsRoutes,
    expressRoutes
  ]
};

// 添加不同按钮权限到/permission/button页面中
function setDifAuthority(authority, routes) {
  routes.children[1].meta.authority = [authority];
  return routes;
}

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: ({ query }) => {
      if (query.name === "admin") {
        return {
          code: 0,
          info: [
            systemRouter,
            setDifAuthority("v-admin", permissionRouter),
            basicsRoutes
          ]
        };
      } else {
        return {
          code: 0,
          info: [setDifAuthority("v-test", permissionRouter)]
        };
      }
    }
  }
] as MockMethod[];
