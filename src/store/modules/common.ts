import { defineStore } from "pinia";
import { store } from "/@/store";
import { getAsyncBrandList } from "/@/api/common";

interface CommonState {
  brandArr: Array<any>;
  categoryArr: Array<any>;
  shopArr: Array<any>;
  warehouseArr: Array<any>;
}
export const useCommonStore = defineStore({
  id: "common",
  state: (): CommonState => ({
    brandArr: [],
    categoryArr: [],
    shopArr: [],
    warehouseArr: []
  }),
  getters: {
    getBrandArr() {
      return this.brandArr;
    },
    getCategoryArr() {
      return this.categoryArr;
    }
  },
  actions: {
    asyncGetBrand() {
      return getAsyncBrandList();
    },
    async initBrandList() {
      this.brandArr = await this.asyncGetBrand();
    }
  }
});
export function useCommonStoreHook() {
  return useCommonStore(store);
}
