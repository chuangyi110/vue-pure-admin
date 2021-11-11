<!--改用vxe-table-plugin-element-->
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
const props = defineProps<{
  brandIds: String[];
}>();
const emit = defineEmits<{
  (e: "change", brandIds): void;
}>();

const options = reactive([
  {
    value: "1",
    label: "HTML"
  },
  {
    value: "2",
    label: "CSS"
  },
  {
    value: "3",
    label: "JavaScript"
  }
]);
let data = ref([...props.brandIds]);
//     };
//   }
// };

const change = () => {
  emit("change", data);
};
onMounted(() => {});
</script>
<template>
  <el-select
    v-model="data"
    multiple
    multiple-limit:2
    filterable
    default-first-option
    placeholder="请选择品牌"
    size="small"
    @change="change"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
