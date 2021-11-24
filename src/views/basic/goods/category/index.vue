<script lang="ts">
import XEUtils from "xe-utils";
import { defineComponent, reactive, ref } from "vue";
import { VxeGridInstance, VxeGridProps, VxeGridPropTypes } from "vxe-table";
import { basicConf, inputSpan } from "/@/plugins/vxe-table/basicConf";
import { getAsyncCategoryList } from "/@/api/common";
export default defineComponent({
  name: "CategoryList"
});
</script>

<script setup lang="ts">
const title = ref("category");

const categoryConf = reactive<VxeGridProps>(
  XEUtils.merge(basicConf, {
    stripe: false,
    toolbarConfig: {
      slots: { buttons: "toolbar_buttons" },
      refresh: true,
      import: false
    },
    checkboxConfig: {
      range: false
    },
    proxyConfig: {
      proxyConfig: {
        seq: false, // 启用动态序号代理，每一页的序号会根据当前页数变化
        sort: false, // 启用排序代理，当点击排序时会自动触发 query 行为
        filter: false, // 启用筛选代理，当点击筛选时会自动触发 query 行为
        form: true, // 启用表单代理，当点击表单提交按钮时会自动触发 reload 行为
        // 对应响应结果 { result: [], page: { total: 100 } }
        props: {
          result: "data" // 配置响应结果列表字段
          // total: "data.length" // 配置响应结果总页数字段
        }
      },
      ajax: {
        // 接收 Promise
        queryAll: (params): Promise<any> => {
          console.log(params);
          return getAsyncCategoryList();
        },
        query: (params): Promise<any> => tableQuery(params),
        delete: (params): Promise<any> => tableDelete(params),
        save: (params): Promise<any> => tableSave(params)
      }
    }
  })
);
const tableQuery = (params: VxeGridPropTypes.ProxyAjaxQueryParams) => {
  return getAsyncCategoryList();
};
const tableDelete = (params: VxeGridPropTypes.ProxyAjaxDeleteParams) => {
  let { body } = params;
  return {} as Promise<any>;
};
const tableSave = (params: VxeGridPropTypes.ProxyAjaxSaveParams) => {
  let { body } = params;
  return {} as Promise<any>;
};
const xGrid = ref({} as VxeGridInstance);
const gridOptions = reactive<VxeGridProps>({
  ...categoryConf,
  id: "",
  height: 600,
  rowId: "categoryId",
  formConfig: {
    titleWidth: 100,
    titleAlign: "center",
    items: [
      {
        field: "categoryName",
        title: "分类名称",
        span: inputSpan(),
        itemRender: {
          name: "$input",
          props: {
            placeholder: "请输入分类名称"
          }
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
            }
          ]
        }
      }
    ]
  },
  columns: [
    {
      field: "categoryNameZh",
      title: "名称"
    }
  ],
  treeConfig: {
    transform: true,
    rowField: "categoryId",
    parentField: "categoryPid"
  }
});
</script>
<template>
  <div class="app-container">
    <h1>{{ title }}</h1>
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-button v-auth="'v-admin'">新增</vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>
