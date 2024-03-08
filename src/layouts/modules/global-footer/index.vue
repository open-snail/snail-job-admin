<script setup lang="ts">
defineOptions({
  name: 'GlobalFooter'
});

const { VITE_APP_VERSION } = import.meta.env;
</script>

<template>
  <DarkModeContainer class="flex-center h-full">
    <a href="https://gitee.com/aizuda/easy-retry" target="_blank" rel="noopener noreferrer">
      Copyright MIT © 2024 {{ $t('system.title') }} {{ VITE_APP_VERSION }}
    </a>
  </DarkModeContainer>
</template>

<style scoped></style>
