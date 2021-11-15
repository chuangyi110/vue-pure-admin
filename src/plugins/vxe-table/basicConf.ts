import { VxeTableProps, VxeTablePropTypes } from "vxe-table";
import { useAppStoreHook } from "/@/store/modules/app";
/**
 * 基础配置信息
 */
export const basicConf = <VxeTableProps>{
  border: true, //边框
  resizable: true,
  showHeaderOverflow: true,
  showOverflow: false, //设置所有内容过长时显示为省略号（如果是固定列建议设置该值，提升渲染速度）
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
      {
        code: "delete",
        name: "批量删除",
        icon: "fa fa-trash-o",
        status: "warning"
      }
      // { code: "mark_cancel", name: "删除/取消", icon: "fa fa-trash-o" },
      // {
      //   code: "save",
      //   name: "保存",
      //   icon: "fa fa-save",
      //   status: "success"
      // }
    ],
    refresh: true,
    import: true,
    export: true,
    print: true,
    zoom: true,
    custom: true
  },
  checkboxConfig: {
    labelField: "id",
    reserve: true,
    highlight: true,
    range: true
  },
  editConfig: {
    // activeMethod: () => false,
    trigger: "dblclick",
    mode: "row",
    showStatus: true
  },
  proxyConfig: {
    seq: true, // 启用动态序号代理，每一页的序号会根据当前页数变化
    sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
    filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
    form: true, // 启用表单代理，当点击表单提交按钮时会自动触发 reload 行为
    // 对应响应结果 { result: [], page: { total: 100 } }
    props: {
      result: "result", // 配置响应结果列表字段
      total: "page.total" // 配置响应结果总页数字段
    }
  },
  scrollY: {
    enabled: false
  }
};
export const inputSpan = (): number => {
  switch (useAppStoreHook().getDevice) {
    case "mobile":
      return 24;
    case "desktop":
      return 6;
    case "pad":
      return 12;
  }
};

export const printConfig = (
  arr: Array<string>
): VxeTablePropTypes.PrintConfig => {
  const columns: VxeTablePropTypes.ExportOrPrintColumnOption[] = arr.map(
    ele => {
      return { field: ele };
    }
  );
  return { columns };
};
