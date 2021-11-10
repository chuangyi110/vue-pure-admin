import { VxeFormItemProps } from "vxe-table";

export const goodsForm: VxeFormItemProps[] = [
  {
    field: "name",
    title: "名称",
    span: 6,
    titlePrefix: {
      message: "app.body.valid.rName",
      icon: "fa fa-exclamation-circle"
    },
    itemRender: { name: "$input", props: { placeholder: "请输入名称" } }
  },
  {
    field: "email",
    title: "邮件",
    span: 6,
    itemRender: { name: "$input", props: { placeholder: "请输入邮件" } }
  },
  {
    field: "nickname",
    title: "昵称",
    span: 6,
    itemRender: { name: "$input", props: { placeholder: "请输入昵称" } }
  },
  {
    field: "role",
    title: "角色",
    span: 6,
    itemRender: { name: "$input", props: { placeholder: "请输入角色" } }
  },
  {
    field: "sex",
    title: "性别",
    span: 6,
    folding: true,
    titleSuffix: { message: "注意，必填信息！", icon: "fa fa-info-circle" },
    itemRender: { name: "$select", options: [] }
  },
  {
    field: "brand",
    title: "品牌",
    span: 6,
    folding: true,
    slots: { default: "pulldown2" }
  },
  {
    field: "category",
    title: "分类",
    span: 6,
    folding: true,
    slots: { default: "cascader" }
  },
  {
    field: "age",
    title: "年龄",
    span: 6,
    folding: true,
    itemRender: {
      name: "$input",
      props: { type: "number", min: 1, max: 120, placeholder: "请输入年龄" }
    }
  },

  {
    span: 24,
    align: "center",
    collapseNode: true,
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
];
