<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { VXETable, VxeGridInstance, VxeGridProps } from "vxe-table";
import XEUtils from "xe-utils";
import XEAjax from "xe-ajax";
//@ts-ignore
import brandPullDown from "/@/views/biz-components/pullDown/brandPullDown/index.vue";
import { basicConf } from "/@/plugins/vxe-table/basicConf";
import { goodsForm } from "./goodsParams";
let title = ref("Goods List");
const xGrid = ref({} as VxeGridInstance);
const gridOptions = reactive<VxeGridProps>({
  ...basicConf,
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
  printConfig: {
    columns: [
      { field: "name" },
      { field: "role" },
      { field: "email" },
      { field: "nickname" },
      { field: "age" },
      { field: "amount" }
    ]
  },

  formConfig: {
    titleWidth: 100,
    titleAlign: "center",
    items: goodsForm
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
    },
    ajax: {
      // 接收 Promise
      query: ({ page, sorts, filters, form }) => {
        const queryParams: any = Object.assign({}, form);
        console.log(form);
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
      },
      delete: ({ body }) =>
        XEAjax.post(
          "https://api.xuliangzhan.com:10443/demo/api/pub/save",
          body
        ),
      save: ({ body }) =>
        XEAjax.post("https://api.xuliangzhan.com:10443/demo/api/pub/save", body)
    }
  },
  columns: [
    { type: "checkbox", title: "ID", width: 120 },
    {
      field: "name",
      title: "Name",
      sortable: true,
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
    { title: "操作", width: 200, slots: { default: "operate" }, fixed: "right" }
  ],
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
  checkboxConfig: {
    labelField: "id",
    reserve: true,
    highlight: true,
    range: true
  },
  editRules: {
    name: [
      { required: true, message: "app.body.valid.rName" },
      { min: 3, max: 50, message: "名称长度在 3 到 50 个字符" }
    ],
    email: [{ required: true, message: "邮件必须填写" }],
    role: [{ required: true, message: "角色必须填写" }]
  },
  editConfig: {
    trigger: "click",
    mode: "row",
    showStatus: true
  }
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
    const sexItem = formConfig.items[4];
    if (sexItem && sexItem.itemRender) {
      sexItem.itemRender.options = sexList;
    }
  }
});
//品牌搜索选择
const brand = ref({ label: "选项12", value: "12" });
const watchBrand = event => {
  brand.value = event;
  console.log(event);
};
//分类选择
const category = ref("");
const options = ref([
  {
    value: "guide",
    label: "Guide",
    children: [
      {
        value: "disciplines",
        label: "Disciplines",
        children: [
          {
            value: "consistency",
            label: "Consistency"
          },
          {
            value: "feedback",
            label: "Feedback"
          },
          {
            value: "efficiency",
            label: "Efficiency"
          },
          {
            value: "controllability",
            label: "Controllability"
          }
        ]
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "side nav",
            label: "Side Navigation"
          },
          {
            value: "top nav",
            label: "Top Navigation"
          }
        ]
      }
    ]
  },
  {
    value: "component",
    label: "Component",
    children: [
      {
        value: "basic",
        label: "Basic",
        children: [
          {
            value: "layout",
            label: "Layout"
          },
          {
            value: "color",
            label: "Color"
          },
          {
            value: "typography",
            label: "Typography"
          },
          {
            value: "icon",
            label: "Icon"
          },
          {
            value: "button",
            label: "Button"
          }
        ]
      },
      {
        value: "form",
        label: "Form",
        children: [
          {
            value: "radio",
            label: "Radio"
          },
          {
            value: "checkbox",
            label: "Checkbox"
          },
          {
            value: "input",
            label: "Input"
          },
          {
            value: "input-number",
            label: "InputNumber"
          },
          {
            value: "select",
            label: "Select"
          },
          {
            value: "cascader",
            label: "Cascader"
          },
          {
            value: "switch",
            label: "Switch"
          },
          {
            value: "slider",
            label: "Slider"
          },
          {
            value: "time-picker",
            label: "TimePicker"
          },
          {
            value: "date-picker",
            label: "DatePicker"
          },
          {
            value: "datetime-picker",
            label: "DateTimePicker"
          },
          {
            value: "upload",
            label: "Upload"
          },
          {
            value: "rate",
            label: "Rate"
          },
          {
            value: "form",
            label: "Form"
          }
        ]
      },
      {
        value: "data",
        label: "Data",
        children: [
          {
            value: "table",
            label: "Table"
          },
          {
            value: "tag",
            label: "Tag"
          },
          {
            value: "progress",
            label: "Progress"
          },
          {
            value: "tree",
            label: "Tree"
          },
          {
            value: "pagination",
            label: "Pagination"
          },
          {
            value: "badge",
            label: "Badge"
          }
        ]
      },
      {
        value: "notice",
        label: "Notice",
        children: [
          {
            value: "alert",
            label: "Alert"
          },
          {
            value: "loading",
            label: "Loading"
          },
          {
            value: "message",
            label: "Message"
          },
          {
            value: "message-box",
            label: "MessageBox"
          },
          {
            value: "notification",
            label: "Notification"
          }
        ]
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "menu",
            label: "Menu"
          },
          {
            value: "tabs",
            label: "Tabs"
          },
          {
            value: "breadcrumb",
            label: "Breadcrumb"
          },
          {
            value: "dropdown",
            label: "Dropdown"
          },
          {
            value: "steps",
            label: "Steps"
          }
        ]
      },
      {
        value: "others",
        label: "Others",
        children: [
          {
            value: "dialog",
            label: "Dialog"
          },
          {
            value: "tooltip",
            label: "Tooltip"
          },
          {
            value: "popover",
            label: "Popover"
          },
          {
            value: "card",
            label: "Card"
          },
          {
            value: "carousel",
            label: "Carousel"
          },
          {
            value: "collapse",
            label: "Collapse"
          }
        ]
      }
    ]
  },
  {
    value: "resource",
    label: "Resource",
    children: [
      {
        value: "axure",
        label: "Axure Components"
      },
      {
        value: "sketch",
        label: "Sketch Templates"
      },
      {
        value: "docs",
        label: "Design Documentation"
      }
    ]
  }
]);
const handleChange = value => {
  console.log(value, category.value);
};
</script>
<template>
  <div class="app-container">
    <h1>{{ title }}</h1>
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <template #pulldown2>
        <brand-pull-down @watchBrand="watchBrand" :checkedItem="brand" />
      </template>

      <template #cascader>
        <el-cascader
          v-model="category"
          :options="options"
          @change="handleChange"
          size="small"
        />
      </template>

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
    <!-- <vxe-grid
      border
      highlight-hover-row
      :columns="goodsColumns"
      :proxy-config="proxyConfig"
      :pager-config="tablePage"
      :toolbar-config="toolbar"
      :form-config="formConfig"
      :edit-config="{
        key: 'id',
        trigger: 'click',
        mode: 'row',
        showStatus: true
      }"
    >
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
    </vxe-grid> -->
  </div>
</template>
