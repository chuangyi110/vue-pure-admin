<template>
  <el-descriptions :column="2" :size="'mini'" border>
    <el-descriptions-item
      :align="'center'"
      v-for="item in statusColumns"
      :key="item.l"
    >
      <template #label> {{ item.l }}</template>
      <vxe-switch
        v-model="data[item.m]"
        :open-label="item.o.l"
        :open-value="item.o.v"
        :close-label="item.c.l"
        :close-value="item.c.v"
        @change="statusHandler($event, item)"
      />
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import { ElNotification } from "element-plus";
import { computed, defineProps, reactive, h, onMounted } from "vue";
type column = "onSale" | "advance" | "gst" | "common";
type columnParams = {
  m: column;
  l: string;
  o: { l: string; v: string };
  c: { l: string; v: string };
};
const props = defineProps<{
  status: column[];
  modelValue: any;
}>();
const data = reactive(props.modelValue);
const emit = defineEmits<{
  (e: "update:modelValue", data): void;
}>();
const statusHandler = ({ value }, item) => {
  // let goods = props.modelValue;
  let { goodsName, goodsId } = data;
  let lab = item.o.v === value ? item.o.l : item.c.l;
  ElNotification({
    title: "Success",
    message: h(
      "i",
      { style: "color: teal" },
      (goodsName || "") + goodsId + " {" + item.l + "} 状态成功更新为" + lab
    ),
    duration: 5000,
    type: "success"
  });
  // goods[item.m] = value;
  // console.log(goods);

  emit("update:modelValue", data);
};
onMounted(() => {});
const defaultColumns: columnParams[] = reactive([
  {
    m: "onSale",
    l: "在售",
    o: { l: "上架", v: "1" },
    c: { l: "下架", v: "0" }
  },
  {
    m: "advance",
    l: "预售",
    o: { l: "开启", v: "1" },
    c: { l: "关闭", v: "0" }
  },
  {
    m: "common",
    l: "代售",
    o: { l: "可以", v: "1" },
    c: { l: "禁止", v: "0" }
  },
  { m: "gst", l: "GST", o: { l: "含税", v: "1" }, c: { l: "不含", v: "0" } }
]);
const statusColumns = computed(() => {
  return defaultColumns.filter(column => props.status.includes(column.m));
});
</script>

<style></style>
