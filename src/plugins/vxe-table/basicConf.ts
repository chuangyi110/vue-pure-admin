import { VxeTableProps } from "vxe-table";
/**
 * 基础配置信息
 */
export const basicConf = <VxeTableProps>{
  border: true,
  resizable: true,
  showHeaderOverflow: true,
  showOverflow: true,
  highlightHoverRow: true,
  keepSource: true,
  stripe: true,
  sortConfig: {
    trigger: "cell",
    remote: true
  },
  filterConfig: {
    remote: true
  },
  pagerConfig: {
    pageSize: 10,
    pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000]
  },
  toolbarConfig: {
    buttons: [
      { code: "insert_actived", name: "新增", icon: "fa fa-plus" },
      { code: "delete", name: "直接删除", icon: "fa fa-trash-o" },
      { code: "mark_cancel", name: "删除/取消", icon: "fa fa-trash-o" },
      {
        code: "save",
        name: "保存",
        icon: "fa fa-save",
        status: "success"
      }
    ],
    refresh: true,
    import: true,
    export: true,
    print: true,
    zoom: true,
    custom: true
  }
};
//unused
export const printConfig = (arr: Array<String>) => {
  const columns = arr.forEach(ele => {
    return { field: ele };
  });
  return columns;
};
