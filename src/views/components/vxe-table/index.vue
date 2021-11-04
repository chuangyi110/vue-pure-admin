<script setup lang="ts">
import { ref } from "vue";

//@ts-ignore
import HtmlIframe from "/@/components/HtmlIframe/index.vue";
const url = ref(
  "https://xuliangzhan_admin.gitee.io/vxe-table/#/table/start/install"
);
</script>

<template>
  <HtmlIframe :url="url" />
</template>
