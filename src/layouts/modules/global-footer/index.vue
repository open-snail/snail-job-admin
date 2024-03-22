<script setup lang="ts">
defineOptions({
  name: 'GlobalFooter'
});

const { VITE_APP_VERSION } = import.meta.env;
</script>

<template>
  <DarkModeContainer class="h-full flex-center">
    <a href="https://www.easyretry.com/" target="_blank" rel="noopener noreferrer">
      Copyright © 2024 Easy Retry {{ VITE_APP_VERSION }}
    </a>
  </DarkModeContainer>
</template>

<style scoped></style>
