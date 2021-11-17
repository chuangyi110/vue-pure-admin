import { http } from "../utils/http";
import { Spu } from "./type";

export const getAsyncGoodsList = (data?: object) => {
  return http.get<object, Spu>("/api/v1/erp/getGoodsList", data);
};
