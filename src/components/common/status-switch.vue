<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'StatusSwitch'
});

interface Emits {
  (e: 'update:value', value: Api.Common.EnableStatusNumber): void;
}

const emit = defineEmits<Emits>();

const value = defineModel<Api.Common.EnableStatusNumber>('value', {
  required: true
});

const loading = ref(false);

const setLoading = (val: boolean) => {
  loading.value = val;
};

defineExpose({
  setLoading
});
</script>

<template>
  <NSwitch
    v-model:value="value"
    :loading="loading"
    :checked-value="1"
    :unchecked-value="0"
    @update:value="emit('update:value', value)"
  ></NSwitch>
</template>

<style scoped></style>
