<script setup lang="ts">
import { onMounted, ref } from "vue";
//不可跨域页面引用
const props = defineProps({
  url: {
    type: String,
    default: ""
  }
});
//@ts-ignore
const u = ref(props.url);
onMounted(() => {
  const iframe = document.querySelector("#ifra");
  //@ts-ignore
  if (iframe.attachEvent) {
    //@ts-ignore
    iframe.attachEvent("onload", function () {
      console.log("加载完毕");
    });
  } else {
    //@ts-ignore
    iframe.onload = function () {
      console.log("加载完毕");
    };
  }
});
</script>

<template>
  <div>
    <!-- <html-panel v-model:url="url"></html-panel> -->
    <iframe
      id="ifra"
      :src="u"
      frameborder="0"
      class="pc iframe"
      scrolling="auto"
    ></iframe>
  </div>
</template>

<style>
h1 {
  color: black;
}

.iframe {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-y: hidden;
}
</style>
