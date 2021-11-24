import { MockMethod } from "vite-plugin-mock";
const brandList = () => {
  return [
    { label: "品牌1", value: "1" },
    { label: "品牌2", value: "2" },
    { label: "品牌3", value: "3" }
  ];
};

const categoryList = () => {
  return [
    {
      categoryId: "1",
      categoryNameZh: "奶粉",
      categoryNameEn: "powdered Milk",
      categoryImgUrl: "",
      categoryPid: "0"
    },
    {
      categoryId: "11",
      categoryNameZh: "1段",
      categoryNameEn: "powdered Milk1",
      categoryImgUrl: "",
      categoryPid: "1"
    },
    {
      categoryId: "12",
      categoryNameZh: "2段",
      categoryNameEn: "powdered Milk2",
      categoryImgUrl: "",
      categoryPid: "1"
    },
    {
      categoryId: "2",
      categoryNameZh: "唐人",
      categoryNameEn: "唐人",
      categoryImgUrl: "",
      categoryPid: "0"
    }
  ];
};
export default [
  {
    url: "/api/v1/erp/getBrandList",
    method: "get",
    response: () => {
      return {
        code: 0,
        data: brandList()
      };
    }
  },
  {
    url: "/api/v1/erp/getCategoryList",
    method: "get",
    response: () => {
      return {
        code: 0,
        data: categoryList()
      };
    }
  },
  {
    url: "/api/v1/erp/getShop",
    method: "get",
    response: () => {
      return {
        code: 0,
        data: {
          version: 1,
          list: []
        }
      };
    }
  }
] as MockMethod[];
