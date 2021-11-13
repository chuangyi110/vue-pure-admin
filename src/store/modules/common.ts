import { defineStore } from "pinia";
import { store } from "/@/store";
import { getAsyncBrandList, getAsyncCategoryList } from "/@/api/common";
import XEUtils from "xe-utils";
//timestamp
interface CommonState {
  brandArr: {
    timestamp: Number;
    data: Array<any>;
  };
  categoryArr: {
    timestamp: Number;
    data: Array<any>;
  };
  shopArr: {
    timestamp: Number;
    data: Array<any>;
  };
  warehouseArr: {
    timestamp: Number;
    data: Array<any>;
  };
}
export const useCommonStore = defineStore({
  id: "common",
  state: (): CommonState => ({
    brandArr: {
      timestamp: 0,
      data: []
    },
    categoryArr: {
      timestamp: 0,
      data: []
    },
    shopArr: {
      timestamp: 0,
      data: []
    },
    warehouseArr: {
      timestamp: 0,
      data: []
    }
  }),
  getters: {
    getBrandArr() {
      if (!this.brandArr.timestamp) {
        this.initBrandList();
      }
      return this.brandArr.data;
    },
    getCategoryArr() {
      if (!this.categoryArr.timestamp) {
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
          this.brandArr = {
            timestamp: XEUtils.timestamp(new Date()),
            data: res.data
          };
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
          this.categoryArr = {
            timestamp: XEUtils.timestamp(new Date()),
            data: res.data
          };
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
