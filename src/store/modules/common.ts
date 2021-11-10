import { defineStore } from "pinia";
import { store } from "/@/store";
import { getAsyncBrandList } from "/@/api/common";

interface CommonState {
  brandArr: {
    version: Number;
    data: Array<any>;
  };
  categoryArr: {
    version: Number;
    data: Array<any>;
  };
  shopArr: {
    version: Number;
    data: Array<any>;
  };
  warehouseArr: {
    version: Number;
    data: Array<any>;
  };
}
export const useCommonStore = defineStore({
  id: "common",
  state: (): CommonState => ({
    brandArr: {
      version: 0,
      data: []
    },
    categoryArr: {
      version: 0,
      data: []
    },
    shopArr: {
      version: 0,
      data: []
    },
    warehouseArr: {
      version: 0,
      data: []
    }
  }),
  getters: {
    getBrandArr() {
      return this.brandArr.data;
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
