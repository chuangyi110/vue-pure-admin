<script lang="ts">
import { ref, getCurrentInstance, defineComponent } from "vue";
import { usePermissionStoreHook } from "/@/store/modules/permission";
export default defineComponent({
  name: "goods"
});
</script>

<script setup lang="ts">
const keepAlive: Boolean = ref(
  getCurrentInstance().appContext.config.globalProperties.$config?.KeepAlive
);
</script>
<template id="goodsLog">
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
