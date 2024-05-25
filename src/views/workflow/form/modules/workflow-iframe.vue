<script setup lang="ts">
import { onActivated, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { $t } from '@/locales';

defineOptions({
  name: 'WorkFlowIframe'
});

interface Props {
  value: string;
}

defineProps<Props>();

const iframeRef = ref();
const route = useRoute();
const router = useRouter();

const id = route.query.id as string;
const spinning = ref(true);
const mode = import.meta.env.MODE;
const baseUrl = import.meta.env.BASE_URL;

function save() {
  window.removeEventListener('message', handleMessage);
  window.$message?.info($t('common.addSuccess'));
  router.push({ path: '/workflow/task' });
}

function cancel() {
  window.removeEventListener('message', handleMessage);
  router.push({ path: '/workflow/task' });
}

function update() {
  window.$message?.info($t('common.updateSuccess'));
  router.push({ path: '/workflow/task' });
}

function handleMessage(e: MessageEvent) {
  if (typeof e.data === 'object') {
    if (e.data.code === 'SV5ucvLBhvFkOftb') {
      save();
    } else if (e.data.code === 'kb4DO9h6WIiqFhbp') {
      cancel();
    } else if (e.data.code === '8Rr3XPtVVAHfduQg') {
      update();
    }
  }
}

function iframeLoad() {
  // 处理兼容行问题 兼容IE
  if (iframeRef.value.attachEvent) {
    iframeRef.value.attachEvent('onload', () => {
      // iframe加载完毕以后执行操作
      spinning.value = false;
    });
  } else {
    iframeRef.value.onload = () => {
      // iframe加载完毕以后执行操作
      spinning.value = false;
    };
  }
}

window.addEventListener('message', handleMessage, false);

onMounted(() => {
  iframeLoad();
});

onActivated(() => {
  window.removeEventListener('message', handleMessage);
});
</script>

<template>
  <NSpin :show="spinning" size="large" description="工作流加载中" class="h-full" content-class="h-full">
    <iframe
      ref="iframeRef"
      class="size-full"
      :src="`${mode === 'prod' ? baseUrl + '/' : '/'}lib/index.html?id=${id}&mode=${mode}&x1c2Hdd6=${value}`"
    />
  </NSpin>
</template>

<style scoped lang="scss"></style>
