import { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/erp/v1/ggbi/selGoodsDetailsByPage",
    method: "post",
    response: () => {
      return {
        code: 0,
        info: {}
      };
    }
  },
  {
    url: "",
    method: "get",
    response: () => {
      return {
        code: 0,
        info: {}
      };
    }
  }
] as MockMethod[];
