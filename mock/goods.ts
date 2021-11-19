import { MockMethod } from "vite-plugin-mock";
import { PageBody } from "/@/utils/http/types";

const goodsListPage = (): PageBody<object> => {
  return {
    totalCount: 1,
    pageNo: 1,
    pageSize: 10,
    records: [
      {
        commonId: "1",
        commonNameZh: "测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1",
        commonNameEn: "test1",
        commonImgs: ["img1", "img2"],
        mainSpec: "",
        mainSpecProp: [],
        subsidiarySpec: "",
        subsidiarySpecProp: [],
        defaultGoods: {
          goodsId: "123",
          goodsSn: "914565822",
          goodsMainSpecProp: "1",
          goodsMainSpecPropImgs: "imgdf",
          currency: "AUD",
          price: 16,
          onSale: "0",
          advance: "0",
          gst: "1",
          expirationDate: "36月",
          packageType: "奶粉",
          goodsStandard: "1",
          postTypes: ["本地", "到店自提"]
        },
        sku: []
      }
    ]
  };
};

export default [
  {
    url: "/api/v1/erp/getGoodsList",
    method: "post",
    response: () => {
      return {
        code: 0,
        data: goodsListPage()
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
