import { http } from "../utils/http";
import { ResBody } from "../utils/http/types";
import { OptType } from "./type";

export const getAsyncBrandList = (data?: object): Promise<ResBody<OptType>> => {
  return http.get<object>("/api/v1/erp/getBrandList", data);
};
export const addBrand = (data?: object) => {
  return http.post("/api/v1/erp/brand", data);
};
export const getAsyncCategoryList = (data?: object) => {
  return http.get("/api/v1/erp/getCategoryList", data);
};
export const getAsyncShopList = (data?: object) => {
  return http.get("/api/v1/erp/getShopList", data);
};
export const getAsyncWarehouseList = (data?: object) => {
  return http.get("/api/v1/erp/getWarehouseList", data);
};
