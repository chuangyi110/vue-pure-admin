<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { usePermissionStoreHook } from "/@/store/modules/permission";
const keepAlive: Boolean = ref(
  getCurrentInstance().appContext.config.globalProperties.$config?.KeepAlive
);
</script>
<template>
  <div>
    <router-view>
      <template #default="{ Component, route }">
        <h1>商品</h1>
        <transition appear name="fade-transform" mode="out-in">
          <keep-alive
            v-if="keepAlive"
            :include="usePermissionStoreHook().cachePageList"
          >
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component v-else :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </router-view>
  </div>
</template>
