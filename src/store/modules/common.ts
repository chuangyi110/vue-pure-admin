import { defineStore } from "pinia";
import { store } from "/@/store";
import { getAsyncBrandList, getAsyncCategoryList } from "/@/api/common";
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
      if (!this.brandArr.version) {
        this.initBrandList();
      }
      return this.brandArr.data;
    },
    getCategoryArr() {
      if (!this.categoryArr.version) {
        this.initCategoryList();
      }
      return this.categoryArr.data;
    }
  },
  actions: {
    asyncGetBrand() {
      return getAsyncBrandList();
    },
    initBrandList() {
      this.asyncGetBrand().then(
        res => {
          // console.log(res);
          this.brandArr = { ...res.info };
        },
        err => {
          console.log(err);
        }
      );
    },
    asyncGetCategory() {
      return getAsyncCategoryList();
    },
    initCategoryList() {
      this.asyncGetCategory().then(
        res => {
          // console.log(res);
          this.categoryArr = { ...res.info };
        },
        err => {
          console.log(err);
        }
      );
    }
  }
});
export function useCommonStoreHook() {
  return useCommonStore(store);
}
