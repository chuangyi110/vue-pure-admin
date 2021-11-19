import { http } from "../utils/http";
import { ResBody } from "../utils/http/types";
import { SKU } from "./goodsType";

export const selGoodsList = (
  data?: object,
  config?: object
): Promise<ResBody<SKU>> => {
  return http.post<object>("/api/v1/erp/getGoodsList", data, config);
};
