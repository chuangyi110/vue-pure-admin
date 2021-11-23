<script lang="ts">
import XEUtils from "xe-utils";
import { defineComponent, reactive, ref } from "vue";
import { VxeGridInstance, VxeGridProps, VxeGridPropTypes } from "vxe-table";
import { basicConf } from "/@/plugins/vxe-table/basicConf";
export default defineComponent({
  name: ""
});
</script>
<script setup lang="ts">
const conf = reactive<VxeGridProps>(
  XEUtils.merge(basicConf, {
    toolbarConfig: {
      slots: { buttons: "toolbar_buttons" },
      refresh: true,
      import: false
    },
    proxyConfig: {
      ajax: {
        queryAll: (params): Promise<any> => {
          console.log(params);
          return {} as Promise<any>;
        },
        query: (params): Promise<any> => tableQuery(params),
        delete: (params): Promise<any> => tableDelete(params),
        save: (params): Promise<any> => tableSave(params)
      }
    }
  })
);
const tableQuery = (params: VxeGridPropTypes.ProxyAjaxQueryParams) => {
  return {} as Promise<any>;
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
  ...conf,
  id: "",
  height: 600,
  rowId: "id",
  formConfig: {
    titleWidth: 100,
    titleAlign: "center",
    items: [
      {
        span: 24,
        align: "center",
        collapseNode: false,
        itemRender: {
          name: "buttons",
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
  columns: []
});
</script>
<template>
  <div class="app-container">
    <h1></h1>
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-button v-auth="'v-admin'">新增</vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>
<style lang="scss" scoped></style>
