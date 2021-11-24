<script lang="ts">
import { computed, onMounted, reactive, ref, defineComponent } from "vue";
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
import { selGoodsList } from "/@/api/goods";
// import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
//@ts-ignore
import statusColumn from "./statusColumn.vue";
export default defineComponent({
  name: "goodsList"
});
</script>

<script setup lang="ts">
const router = useRouter();

const title = ref("goods_list");
//缓存
const defaultForm = reactive({
  categories: [],
  brandIds: [],
  goodsName: "",
  onSale: "",
  defaultSku: 1
});
const categories = computed(
  (): any[] => useCommonStoreHook().getCategorySelect
);
const brands = computed((): any[] => useCommonStoreHook().getBrandArr);
const printParams = reactive(["name", "email"]);
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
  return selGoodsList(queryParams, page);
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
    toolbarConfig: {
      slots: { buttons: "toolbar_buttons" },
      refresh: true,
      import: false
    },
    proxyConfig: {
      ajax: {
        // 接收 Promise
        // queryAll: params => () => {
        //   console.log(params);
        // },
        query: params => tableQuery(params),
        delete: params => tableDelete(params),
        save: params => tableSave(params)
      }
    },
    checkboxConfig: {
      labelField: "commonId"
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
      return !["nickname", "role"].includes(column.property);
    }
  },
  printConfig: printConfig(printParams),
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
            size: "small",
            props: {
              label: "categoryNameEn",
              value: "categoryId",
              children: "children"
            }
          },
          defaultValue: defaultForm.categories
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
          optionProps: { value: "value", label: "label" },
          defaultValue: defaultForm.brandIds
        }
      },

      {
        field: "Onsale",
        title: "销售状态",
        span: inputSpan(),
        itemRender: {
          name: "ElSelect",
          props: {
            "default-first-option": true,
            placeholder: "请选择品牌",
            size: "small"
          },
          options: [
            { value: "", label: "全部" },
            { value: "0", label: "下架" },
            { value: "1", label: "上架" }
          ],
          optionProps: { value: "value", label: "label" },
          defaultValue: defaultForm.onSale
        }
      },
      {
        field: "goodsName",
        title: "商品名称",
        span: inputSpan(),
        itemRender: {
          name: "$input",
          props: {
            placeholder: "请输入名称"
          },
          defaultValue: defaultForm.goodsName
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
          defaultValue: defaultForm.defaultSku
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
    { type: "expand", width: 40, slots: { content: "content" } },
    { type: "checkbox", title: "ID", width: 120 },
    {
      field: "commonImgs",
      title: "图片",
      width: 120,
      slots: { default: "commonImgs" }
    },
    {
      field: "commonNameZh",
      title: "商品名称",
      // sortable: true,
      width: 200
      // titleHelp: { message: "商品名称必须填写！" }
    },
    {
      field: "defaultGoods.goodsSn",
      title: "SN",
      width: 150
    },
    { field: "spec", title: "规格", width: 200, slots: { default: "spec" } },
    {
      field: "defaultGoods.price",
      title: "价格",
      width: 150,
      slots: { default: "prices" }
    },
    // {
    //   title: "状态",
    //   width: 400,
    //   slots: { default: "goodsStatus" }
    // },
    {
      title: "状态",
      width: 400,
      slots: { default: "goodsStatus" }
    },
    {
      field: "defaultGoods.expirationDate",
      title: "保质期",
      width: 100
    },
    {
      field: "defaultGoods.packageType",
      title: "物流标签",
      width: 100
    },
    {
      field: "defaultGoods.goodsStandard",
      title: "标准件",
      width: 100
    },
    {
      field: "defaultGoods.postTypes",
      title: "发货方式",
      width: 100
    },
    {
      title: "操作",
      width: 100,
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
  }

  // editRules: {
  //   name: [
  //     { required: true, message: "app.body.valid.rName" },
  //     { min: 3, max: 50, message: "名称长度在 3 到 50 个字符" }
  //   ],
  //   email: [{ required: true, message: "邮件必须填写" }],
  //   role: [{ required: true, message: "角色必须填写" }]
  // }

  // treeConfig: {
  //   transform: true,
  //   rowField: "id",
  //   parentField: "parentId"
  // }
});
const currencySymbol = currency => (currency === "AUD" ? "$" : "￥");
const column = reactive(["onSale", "advance", "gst", "common"]);
onMounted(() => {
  const sexList = [
    { label: "女", value: "0" },
    { label: "男", value: "1" }
  ];
  const { columns } = gridOptions;
  //列
  if (columns) {
    const sexColumn = columns[5];
    if (sexColumn && sexColumn.editRender) {
      sexColumn.editRender.options = sexList;
    }
  }
  //查询字段
  // if (formConfig && formConfig.items) {
  //   const sexItem = formConfig.items[3];
  //   if (sexItem && sexItem.itemRender) {
  //     sexItem.itemRender.options = sexList;
  //   }
  // }
});

const addGoods = () => {
  console.log("addGoodsButtonAcitive");
  console.log(router);
  column.push("gst");
  console.log(xGrid.value.getCheckboxRecords()[0].commonId);
  // router.push("/basic/goods/edit");
};
</script>
<template>
  <div class="app-container">
    <h1>{{ title }}</h1>
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <template #commonImgs="{ row: { commonImgs } }">
        <el-image
          style="width: 100px; height: 100px"
          :src="commonImgs[0]"
          :fit="'contain'"
        />
      </template>
      <!--多规格模板 start-->
      <template
        #spec="{
          row: { mainSpec, mainSpecProp, subsidiarySpec, subsidiarySpecProp }
        }"
      >
        {{ mainSpec }}:
        <div class="spec_child">
          <el-tag
            v-for="mainSpecPropChild in mainSpecProp"
            :key="mainSpecPropChild"
          >
            {{ mainSpecPropChild }}
          </el-tag>
        </div>
        {{ subsidiarySpec }}:
        <div class="spec_child">
          <el-tag
            v-for="subsidiarySpecPropChild in subsidiarySpecProp"
            :key="subsidiarySpecPropChild"
            type="success"
          >
            {{ subsidiarySpecPropChild }}
          </el-tag>
        </div>
      </template>
      <!--多规格模板 end-->

      <template
        #prices="{
          row: {
            defaultGoods: { currency, price }
          }
        }"
      >
        {{ currencySymbol(currency) + price }}
      </template>

      <template #goodsStatus="{ row }">
        <status-column v-model="row.defaultGoods" :status="column" />
      </template>
      <template #operate="{ row }">
        <div>
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
        </div>
        <div>
          <vxe-button icon="fa fa-eye" title="查看" circle></vxe-button>
          <vxe-button icon="fa fa-gear" title="设置" circle></vxe-button>
        </div>
      </template>

      <template #content="{ row }">
        <ul class="expand-wrapper" style="padding: 20px">
          <li>
            <span>ID：</span>
            <span>{{ row.id }}</span>
          </li>
          <li>
            <span>Name：</span>
            <span>{{ row.name }}</span>
          </li>
          <li>
            <span>Date</span>
            <span>{{ row.date }}</span>
          </li>
        </ul>
      </template>

      <template #toolbar_buttons>
        <vxe-button v-auth="'v-admin'" @click="addGoods()">新增</vxe-button>
        <vxe-button v-auth="'v-admin'"> 选中上架 </vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>
<style lang="scss" scoped>
.spec_child {
  margin: 5px;

  .el-tag {
    margin: 5px;
  }
}
</style>
