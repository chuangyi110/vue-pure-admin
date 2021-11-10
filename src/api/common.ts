import { http } from "../utils/http";

export const getAsyncBrandList = (data?: object) => {
  return http.get("/api/v1/erp/getBrandList", data);
};
export const getAsyncCategoryList = (data?: object) => {
  return http.get("/getCategoryList", data);
};
export const getAsyncShopList = (data?: object) => {
  return http.get("/getShopList", data);
};
export const getAsyncWarehouseList = (data?: object) => {
  return http.get("/getWarehouseList", data);
};
