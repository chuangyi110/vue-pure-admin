import { defineStore } from "pinia";
import { store } from "/@/store";
import {
  getAsyncBrandList,
  addBrand,
  getAsyncCategoryList
} from "/@/api/common";
import XEUtils from "xe-utils";
import { OptType } from "/@/api/type";
import { ResBody } from "/@/utils/http/types";
//timestamp
interface CommonState {
  brandArr: {
    timestamp: Number;
    data: Array<OptType>;
  };
  categoryArr: {
    timestamp: Number;
    data: Array<OptType>;
  };
  shopArr: {
    timestamp: Number;
    data: Array<OptType>;
  };
  warehouseArr: {
    timestamp: Number;
    data: Array<OptType>;
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
        (res: ResBody<OptType>) => {
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
    addBrand(data) {
      addBrand(data).then((res: ResBody) => {
        if (res.code) {
          this.initBrandList();
        }
      });
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
