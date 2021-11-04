<script setup lang="ts">
import { ref } from "vue";

//@ts-ignore
import HtmlIframe from "/@/components/HtmlIframe/index.vue";
const url = ref("https://x-extends.github.io/xe-utils/#/");
</script>

<template>
  <HtmlIframe :url="url" />
</template>
