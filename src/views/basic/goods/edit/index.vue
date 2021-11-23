<script setup lang="ts">
import { reactive, ref } from "vue";
const title = ref("");
const goods = reactive({});
</script>

<template>
  <div>{{ title }}</div>
  {{ goods }}
</template>
