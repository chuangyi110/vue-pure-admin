import { http } from "../utils/http";

export const getAsyncGoodsList = (data?: object) => {
  return http.get("/api/v1/erp/getGoodsList", data);
};
