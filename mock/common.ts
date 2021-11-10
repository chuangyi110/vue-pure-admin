import { MockMethod } from "vite-plugin-mock";
const brandList = () => {
  return [
    { label: "品牌1", value: "1" },
    { label: "品牌2", value: "2" },
    { label: "品牌3", value: "3" }
  ];
};

export default [
  {
    url: "/api/v1/erp/getBrandList",
    method: "get",
    response: () => {
      return {
        code: 0,
        info: brandList()
      };
    }
  }
] as MockMethod[];
