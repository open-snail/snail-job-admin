<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { useThemeStore } from '@/store/modules/theme';

defineOptions({
  name: 'AppWatermark'
});

const { watermark } = useThemeStore();
const { userInfo } = useAuthStore();

const watermarkContent = computed(() => {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Snail Job';
  return userInfo.userName ? `${userInfo.userName}@${appTitle}` : appTitle;
});
</script>

<template>
  <NWatermark
    v-if="watermark.visible"
    :content="watermarkContent"
    cross
    fullscreen
    :font-size="14"
    :line-height="14"
    :width="200"
    :height="300"
    :x-offset="12"
    :y-offset="60"
    :rotate="-18"
    :z-index="999"
    font-color="rgba(200, 200, 200, 0.3)"
  />
</template>

<style scoped></style>
