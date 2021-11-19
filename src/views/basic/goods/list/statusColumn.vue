<template>
  <el-descriptions :column="2" :size="'mini'" border>
    <el-descriptions-item
      :align="'center'"
      v-for="item in statusColumns"
      :key="item.l"
    >
      <template #label> {{ item.l }}</template>
      <vxe-switch
        :value="modelValue[item.m]"
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
type column = "onSale" | "advance" | "gst";
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
const emit = defineEmits<{
  (e: "update:modelValue", data): void;
}>();
onMounted(() => {});
const defualtColumns: columnParams[] = reactive([
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
  { m: "gst", l: "GST", o: { l: "含税", v: "1" }, c: { l: "不含", v: "0" } }
]);
const statusColumns = computed(() => {
  return defualtColumns.filter(column => props.status.includes(column.m));
});
const statusHandler = ({ value }, item) => {
  let goods = props.modelValue;
  let { goodsName, goodsId } = goods;
  ElNotification({
    title: "Success",
    message: h(
      "i",
      { style: "color: teal" },
      goodsName + goodsId + " {" + item.l + "} 状态成功更新为" + value
    ),
    duration: 5000
  });
  goods[item.m] = value;
  console.log(goods);
  emit("update:modelValue", goods);
};
</script>

<style></style>
