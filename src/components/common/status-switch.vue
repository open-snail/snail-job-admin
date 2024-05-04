<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'StatusSwitch'
});

const model = defineModel<Api.Common.EnableStatusNumber>({ default: 0 });

interface Emits {
  (e: 'fetch', value: Api.Common.EnableStatusNumber, callback: () => void): void;
}

const emit = defineEmits<Emits>();

/** 状态切换过程的 loading 状态 */
const loading = ref(false);

const handleUpdateValue = (value: Api.Common.EnableStatusNumber) => {
  loading.value = true;
  emit('fetch', value, () => {
    loading.value = false;
  });
};
</script>

<template>
  <NSwitch
    :value="model"
    :loading="loading"
    :rubber-band="false"
    :checked-value="1"
    :unchecked-value="0"
    @update:value="handleUpdateValue"
  />
</template>

<style scoped></style>
