<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import {
  VXETable,
  VxeGridInstance,
  VxeGridProps,
  VxeGridPropTypes
} from "vxe-table";
import XEUtils from "xe-utils";
import XEAjax from "xe-ajax";
import {
  basicConf,
  inputSpan,
  printConfig
} from "/@/plugins/vxe-table/basicConf";
import { useCommonStoreHook } from "/@/store/modules/common";
const title = ref("goods_list");
const categories = computed((): any[] => useCommonStoreHook().getCategoryArr);
const brands = computed((): any[] => useCommonStoreHook().getBrandArr);

const tableQuery = (params: VxeGridPropTypes.ProxyAjaxQueryParams) => {
  console.log(params);
  let { page, sorts, filters, form } = params;
  const queryParams: any = Object.assign({}, form);
  // 处理排序条件
  const firstSort = sorts[0];
  if (firstSort) {
    queryParams.sort = firstSort.property;
    queryParams.order = firstSort.order;
  }
  // 处理筛选条件
  filters.forEach(({ property, values }) => {
    queryParams[property] = values.join(",");
  });
  return XEAjax.get(
    `https://api.xuliangzhan.com:10443/demo/api/pub/page/list/${page.pageSize}/${page.currentPage}`,
    queryParams
  );
};
const tableDelete = (params: VxeGridPropTypes.ProxyAjaxDeleteParams) => {
  let { body } = params;
  return XEAjax.post(
    "https://api.xuliangzhan.com:10443/demo/api/pub/save",
    body
  );
};
const tableSave = (params: VxeGridPropTypes.ProxyAjaxSaveParams) => {
  let { body } = params;
  return XEAjax.post(
    "https://api.xuliangzhan.com:10443/demo/api/pub/save",
    body
  );
};

const goodsConf = reactive(
  XEUtils.merge(basicConf, {
    toolbarConfig: { refresh: false },
    proxyConfig: {
      ajax: {
        // 接收 Promise
        queryAll: params => () => {
          console.log(params);
        },
        query: params => tableQuery(params),
        delete: params => tableDelete(params),
        save: params => tableSave(params)
      }
    }
  })
);

const xGrid = ref({} as VxeGridInstance);
const gridOptions = reactive<VxeGridProps>({
  ...goodsConf,
  id: "goods_list",
  height: 600,
  rowId: "id",
  customConfig: {
    storage: true,
    checkMethod({ column }) {
      if (["nickname", "role"].includes(column.property)) {
        return false;
      }
      return true;
    }
  },
  printConfig: printConfig(["name", "email"]),
  formConfig: {
    titleWidth: 100,
    titleAlign: "center",
    items: [
      {
        field: "categories",
        title: "分类",
        span: inputSpan(),
        itemRender: {
          name: "ElCascader",
          props: {
            options: categories,
            filterable: true,
            size: "small"
          }
        }
      },
      {
        field: "brandIds",
        title: "品牌",
        span: inputSpan(),
        itemRender: {
          name: "ElSelect",
          props: {
            multiple: true,
            "multiple-limit": 2,
            filterable: true,
            "default-first-option": true,
            placeholder: "请选择品牌",
            size: "small"
          },
          //@ts-ignore
          options: brands,
          optionProps: { value: "value", label: "label" }
        }
      },
      {
        field: "goodsName",
        title: "商品名称",
        span: inputSpan(),
        itemRender: {
          name: "$input",
          props: { placeholder: "请输入名称" }
        }
      },
      {
        field: "defaultSku",
        title: "默认商品",
        span: inputSpan(),
        itemRender: {
          name: "$switch",
          props: {
            "open-label": "是",
            "open-value": 1,
            "close-label": "否",
            "close-value": 0
          },
          defaultValue: 0
        }
      },
      {
        span: 24,
        align: "center",
        collapseNode: false,
        itemRender: {
          name: "$buttons",
          children: [
            {
              props: {
                type: "submit",
                content: "搜索",
                status: "primary"
              }
            },
            {
              props: {
                type: "reset",
                content: "重置"
              }
            },
            {
              props: {
                type: "button",
                content: "刷新条件",
                onclick: () => {
                  useCommonStoreHook().initBrandList();
                  useCommonStoreHook().initCategoryList();
                }
              }
            }
          ]
        }
      }
    ]
  },

  columns: [
    { type: "expand", fixed: "left", width: 40 },
    { type: "checkbox", title: "ID", width: 120 },
    {
      field: "name",
      title: "Name",
      sortable: true,
      width: 120,
      titleHelp: { message: "名称必须填写！" },
      editRender: { name: "input", attrs: { placeholder: "请输入名称" } }
    },

    {
      field: "role",
      title: "Role",
      sortable: true,
      filters: [
        { label: "前端开发", value: "前端" },
        { label: "后端开发", value: "后端" },
        { label: "测试", value: "测试" },
        { label: "程序员鼓励师", value: "程序员鼓励师" }
      ],
      filterMultiple: false,
      editRender: { name: "input", attrs: { placeholder: "请输入角色" } }
    },
    {
      field: "email",
      title: "Email",
      width: 160,
      editRender: { name: "$input", props: { placeholder: "请输入邮件" } }
    },
    {
      field: "nickname",
      title: "Nickname",
      editRender: { name: "input", attrs: { placeholder: "请输入昵称" } }
    },
    {
      field: "sex",
      title: "Sex",
      filters: [
        { label: "男", value: "1" },
        { label: "女", value: "0" }
      ],
      editRender: {
        name: "$select",
        options: [],
        props: { placeholder: "请选择性别" }
      }
    },
    {
      field: "age",
      title: "Age",
      visible: false,
      sortable: true,
      editRender: {
        name: "$input",
        props: { type: "number", min: 1, max: 120 }
      }
    },
    {
      field: "amount",
      title: "Amount",
      formatter({ cellValue }) {
        return cellValue
          ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: 2 })}`
          : "";
      },
      editRender: {
        name: "$input",
        props: { type: "float", digits: 2, placeholder: "请输入数值" }
      }
    },
    {
      field: "updateDate",
      title: "Update Date",
      width: 160,
      visible: false,
      sortable: true,
      formatter({ cellValue }) {
        return XEUtils.toDateString(cellValue, "yyyy-MM-dd HH:ss:mm");
      }
    },
    {
      field: "createDate",
      title: "Create Date",
      width: 160,
      visible: false,
      sortable: true,
      formatter({ cellValue }) {
        return XEUtils.toDateString(cellValue, "yyyy-MM-dd");
      }
    },
    {
      title: "操作",
      width: 200,
      slots: { default: "operate" },
      fixed: "right"
    }
  ],
  //导入
  importConfig: {
    remote: true,
    types: ["xlsx"],
    modes: ["insert"],
    // 自定义服务端导入
    importMethod({ file }) {
      const $grid = xGrid.value;
      const formBody = new FormData();
      formBody.append("file", file);
      return XEAjax.post(
        "https://api.xuliangzhan.com:10443/demo/api/pub/import",
        formBody
      )
        .then(data => {
          VXETable.modal.message({
            content: `成功导入 ${data.result.insertRows} 条记录！`,
            status: "success"
          });
          // 导入完成，刷新表格
          $grid.commitProxy("query");
        })
        .catch(() => {
          VXETable.modal.message({
            content: "导入失败，请检查数据是否正确！",
            status: "error"
          });
        });
    }
  },
  //导出
  exportConfig: {
    remote: true,
    types: ["xlsx"],
    modes: ["current", "selected", "all"],
    // 自定义服务端导出
    exportMethod({ options }) {
      const $grid = xGrid.value;
      const proxyInfo = $grid.getProxyInfo();
      // 传给服务端的参数
      const body = {
        filename: options.filename,
        sheetName: options.sheetName,
        isHeader: options.isHeader,
        original: options.original,
        mode: options.mode,
        pager: proxyInfo ? proxyInfo.pager : null,
        ids:
          options.mode === "selected" ? options.data.map(item => item.id) : [],
        fields: options.columns.map(column => {
          return {
            field: column.property,
            title: column.title
          };
        })
      };
      // 开始服务端导出
      return XEAjax.post(
        "https://api.xuliangzhan.com:10443/demo/api/pub/export",
        body
      )
        .then(data => {
          if (data.id) {
            VXETable.modal.message({
              content: "导出成功，开始下载",
              status: "success"
            });
            // 读取路径，请求文件
            fetch(
              `https://api.xuliangzhan.com:10443/demo/api/pub/export/download/${data.id}`
            ).then(response => {
              response.blob().then(blob => {
                // 开始下载
                VXETable.saveFile({
                  filename: "导出数据",
                  type: "xlsx",
                  content: blob
                });
              });
            });
          }
        })
        .catch(() => {
          VXETable.modal.message({ content: "导出失败！", status: "error" });
        });
    }
  },

  editRules: {
    name: [
      { required: true, message: "app.body.valid.rName" },
      { min: 3, max: 50, message: "名称长度在 3 到 50 个字符" }
    ],
    email: [{ required: true, message: "邮件必须填写" }],
    role: [{ required: true, message: "角色必须填写" }]
  },

  // treeConfig: {
  //   transform: true,
  //   rowField: "id",
  //   parentField: "parentId"
  // }
  screenY: { enabled: false }
});
onMounted(() => {
  const sexList = [
    { label: "女", value: "0" },
    { label: "男", value: "1" }
  ];
  const { formConfig, columns } = gridOptions;
  //列
  if (columns) {
    const sexColumn = columns[5];
    if (sexColumn && sexColumn.editRender) {
      sexColumn.editRender.options = sexList;
    }
  }
  //查询字段
  if (formConfig && formConfig.items) {
    const sexItem = formConfig.items[3];
    if (sexItem && sexItem.itemRender) {
      sexItem.itemRender.options = sexList;
    }
  }
});
</script>
<template>
  <div class="app-container">
    <h1>{{ title }}</h1>
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <template #operate="{ row }">
        <template v-if="$refs.xGrid.isActiveByRow(row)">
          <vxe-button
            icon="fa fa-save"
            status="primary"
            title="保存"
            circle
            @click="saveRowEvent(row)"
          ></vxe-button>
        </template>
        <template v-else>
          <vxe-button
            icon="fa fa-edit"
            title="编辑"
            circle
            @click="editRowEvent(row)"
          ></vxe-button>
        </template>
        <vxe-button
          icon="fa fa-trash"
          title="删除"
          circle
          @click="removeRowEvent(row)"
        />
        <vxe-button icon="fa fa-eye" title="查看" circle></vxe-button>
        <vxe-button icon="fa fa-gear" title="设置" circle></vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>
