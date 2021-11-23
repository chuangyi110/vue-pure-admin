<script setup lang="ts">
import { ref } from "vue";
const title = ref("Basic Dial");
const name = ref("");
</script>

<template>
  <div class="app-container">
    <h1>{{ title }}</h1>
    <el-input v-model="name" placeholder=""></el-input>
  </div>
</template>
