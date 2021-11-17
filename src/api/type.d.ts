/**
 * select cascader Options Type
 */
export type OptType = {
  //名称
  label: string;
  //id
  value: string | number;
  //子类
  children: optionType[];
};
export type Spu = {
  commonId: string;
  commonNameZh: string;
  commonNameEn: string;
  commonImgs: string[];
};
