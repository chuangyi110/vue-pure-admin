export type SPUBasic = {
  commonId: string;
  commonNameZh: string;
  commonNameEn: string;
  commonImgs: string[];
};
export type SKUBasic = {
  goodsId: string;
  goodsNameZh: string;
  goodsNameEn: string;
  goodsSn: string;
  currency: "AUD" | "RMB";
  goodsUnit: string;
  expirationDate: string;
  brandId: string;
  brandName: string;
  categoryFId: string;
  categorySId: string;
};
type BasicPriceKeys = "integral" | "joinPrice" | "lowPrice" | "costPrice";
export type BasicPrice = {
  [key in BasicPriceKeys]?: Number;
};
type SalePriceKeys =
  | "shopPrice"
  | "goldPrice"
  | "platinumPrice"
  | "diamondsPrice";
export type SalePrice = {
  [key in SalePriceKeys]?: Number;
};
export type BasicSpec = {
  mainSpec?: string;
  mainSpecProp?: string[];
  subsidiarySpec?: string;
  subsidiarySpecProp?: string[];
};
export type GoodsSpec = {
  goodsMainSpecProp: string;
  goods_subsidiary_spec_prop: string;
  goodsMainSpecPropImgs: string;
};
type GoodsStatusKeys =
  | "onSale"
  | "gst"
  | "defaultGoods"
  | "groupGoods"
  | "self"
  | "advance"
  | "activity"
  | "common";
export type GoodsStatus = {
  [key in GoodsStatusKeys]?: "0" | "1";
};
export type Express = {
  goodsWeight?: Number;
  goodsStandard?: Number;
  packageType?: string;
  postTypes?: string[];
};
export type Desc = {
  descZh?: string;
  descEn?: string;
};
export type SKU = {
  basic?: SPUBasic & SKUBasic;
  spec?: BasicSpec & GoodsSpec;
  price?: BasicPrice & SalePrice;
  express?: Express;
  status?: GoodsStatus;
  desc?: Desc;
};
