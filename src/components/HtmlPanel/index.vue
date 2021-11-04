<template>
  <div>
    <div v-html="html"></div>
  </div>
</template>
<style></style>
<script setup lang="ts">
//可跨域页面引用
import { onMounted, ref, watch } from "vue";
import { http } from "/@/utils/http";

const props = defineProps({
  url: {
    type: String,
    required: true
  }
});
const loading = ref<Boolean>(false);
const html = ref<any>("");
const load = url => {
  if (url && url.length > 0) {
    // 加载中
    loading.value = true;
    let param = {
      accept: "text/html, text/plain"
    };
    http
      .get(url, param)
      .then(response => {
        loading.value = false;
        // 处理HTML显示
        //@ts-ignore
        html.value = response.data;
      })
      .catch(() => {
        loading.value = false;
        html.value = "加载失败";
      });
  }
};
watch(
  () => props.url,
  nValue => {
    load(nValue);
  }
);
onMounted(() => {
  load(props.url);
});

// export default {
//   // 使用时请使用 :url.sync=""传值
//   props: {
//     url: {
//       required: true
//     }
//   },
//   data() {
//     return {
//       loading: false,
//       html: ""
//     };
//   },
//   watch: {
//     url(value) {
//       this.load(value);
//     }
//   },
//   mounted() {
//     this.load(this.url);
//   },
//   methods: {
//     load(url) {
//       if (url && url.length > 0) {
//         // 加载中
//         this.loading = true;
//         let param = {
//           accept: "text/html, text/plain"
//         };
//         this.$http
//           .get(url, param)
//           .then(response => {
//             this.loading = false;
//             // 处理HTML显示
//             this.html = response.data;
//           })
//           .catch(() => {
//             this.loading = false;
//             this.html = "加载失败";
//           });
//       }
//     }
//   }
// };
</script>
