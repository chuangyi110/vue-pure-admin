import { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/erp/v1/ggbi/selGoodsDetailsByPage",
    method: "post",
    response: () => {
      return {
        code: 0,
        data: {}
      };
    }
  },
  {
    url: "",
    method: "get",
    response: () => {
      return {
        code: 0,
        data: {}
      };
    }
  }
] as MockMethod[];
