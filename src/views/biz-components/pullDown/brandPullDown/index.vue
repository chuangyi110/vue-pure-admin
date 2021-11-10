<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { VxePulldownInstance } from "vxe-table";
import { ItemVO } from "../../type";

const result: ItemVO[] = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" },
  { label: "选项5", value: "5" },
  { label: "选项6", value: "6" },
  { label: "选项7", value: "7" },
  { label: "选项8", value: "8" },
  { label: "选项9", value: "9" },
  { label: "选项10", value: "10" },
  { label: "选项11", value: "11" },
  { label: "选项12", value: "12" }
];
// const props = defineProps({
//   brandId: {
//     type: String,
//     default: ""
//   }
// });
const props = defineProps<{
  checkedItem: ItemVO;
}>();
const data = reactive({
  value: props.checkedItem?.label,
  list: result
});

const xDown = ref({} as VxePulldownInstance);

const focusEvent = () => {
  const $pulldown = xDown.value;
  $pulldown.showPanel();
};

const keyupEvent = () => {
  data.list = data.value
    ? result.filter(item => item.label.indexOf(data.value) > -1)
    : result;
};

const selectEvent = item => {
  const $pulldown = xDown.value;
  data.value = item.label;
  $pulldown.hidePanel().then(() => {
    data.list = result;
  });
};
const emit = defineEmits<{
  (e: "watchBrand", checkedItem): void;
}>();

watch(
  () => data.value,
  newValue => {
    let filterReq = data.list.filter(e => e.label === newValue) || [];
    if (filterReq.length > 0) {
      emit("watchBrand", filterReq[0]);
    }
  }
);

onMounted(() => {});
</script>

<template>
  <vxe-pulldown ref="xDown" multiple>
    <template #default>
      <vxe-input
        span="24"
        v-model="data.value"
        placeholder="输入搜索品牌"
        @focus="focusEvent"
        @keyup="keyupEvent"
      ></vxe-input>
    </template>
    <template #dropdown>
      <vxe-list height="200" class="my-dropdown" :data="data.list" auto-resize>
        <template #default="{ items }">
          <div
            class="list-item"
            v-for="item in items"
            :key="item.value"
            @click="selectEvent(item)"
          >
            <i class="fa fa-envelope-o"></i>
            <span>{{ item.label }}</span>
          </div>
        </template>
      </vxe-list>
    </template>
  </vxe-pulldown>
</template>
<style scoped>
.my-dropdown {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
}

.list-item:hover {
  background-color: #f5f7fa;
}
</style>
