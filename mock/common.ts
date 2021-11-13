import { MockMethod } from "vite-plugin-mock";
const brandList = () => {
  return [
    { label: "品牌1", value: "1" },
    { label: "品牌2", value: "2" },
    { label: "品牌3", value: "3" }
  ];
};
// const categoryList = () => {
//   return [
//     {
//       value: "1",
//       label: "Guide",
//       children: [
//         {
//           value: "1-1",
//           label: "Disciplines"
//         },
//         {
//           value: "1-2",
//           label: "Navigation"
//         }
//       ]
//     }
//   ];
// };

const categoryList = () => {
  return [
    {
      label: "奶粉",
      value: "1",
      children: [
        { label: "一段", value: "11" },
        { label: "二段", value: "12" }
      ]
    },
    { label: "补剂", value: "2" }
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
