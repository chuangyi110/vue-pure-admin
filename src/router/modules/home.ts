import Layout from "/@/layout/index.vue";

const homeRouter = {
  path: "/",
  name: "home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: "HomeFilled",
    showLink: true,
    i18n: true,
    rank: 0,
    keepAlive: true
  },
  children: [
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("/@/views/welcome.vue"),
      meta: {
        title: "message.hshome",
        i18n: true,
        showLink: true,
        keepAlive: true
      }
    }
  ]
};

export default homeRouter;
