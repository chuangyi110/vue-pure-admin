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
    showLink: true,
    rank: 6
  },
  children: [
    {
      path: "/system/user",
      name: "user",
      meta: {
        title: "message.hsBaseinfo",
        showLink: true
      }
    },
    {
      path: "/system/dict",
      name: "dict",
      meta: {
        title: "message.hsDict",
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
    showLink: true,
    rank: 3
  },
  children: [
    {
      path: "/permission/page",
      name: "permissionPage",
      meta: {
        title: "message.permissionPage",
        showLink: true
      }
    },
    {
      path: "/permission/button",
      name: "permissionButton",
      meta: {
        title: "message.permissionButton",
        showLink: true,
        authority: []
      }
    }
  ]
};
const goodsRoutes = {
  path: "/basic/goods",
  name: "goods",
  redirect: "/goods/dial",
  node: "2",
  meta: {
    title: "message.basic.goods.library",
    icon: "Goods",
    showLink: true
  },
  children: [
    {
      path: "/basic/goods/dial",
      name: "goodsDial",
      meta: {
        title: "message.basic.goods.dial",
        icon: "Goods",
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
        showLink: true,
        keepAlive: true
      }
    },
    {
      path: "/basic/goods/details",
      name: "goodsDetails",
      meta: {
        title: "message.basic.goods.goodsDetails",
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
    showLink: true
  },
  children: [
    {
      path: "/express/list",
      name: "expressList",
      meta: {
        title: "message.basic.express.expressCompanyList",
        showLink: true
      }
    },
    {
      path: "/express/route",
      name: "expressRoute",
      meta: {
        title: "message.basic.express.expressRouter",
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
    showLink: true,
    rank: 1
  },
  children: [
    {
      path: "/basic/dial",
      name: "basicDial",
      meta: {
        title: "message.basic.dial",
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
