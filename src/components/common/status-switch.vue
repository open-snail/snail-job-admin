<script setup lang="ts">
import { ref, watch } from 'vue';

defineOptions({
  name: 'StatusSwitch'
});

interface Props {
  value: Api.Common.EnableStatusNumber;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0
});

interface Emits {
  (e: 'fetch', value: Api.Common.EnableStatusNumber, callback: () => void): void;
}

const emit = defineEmits<Emits>();

const active = ref(props.value);
const loading = ref(false);

watch(
  () => props.value,
  value => {
    active.value = value;
  }
);

const handleUpdateValue = (value: Api.Common.EnableStatusNumber) => {
  loading.value = true;
  emit('fetch', value, () => {
    loading.value = false;
  });
};
</script>

<template>
  <NSwitch
    :value="active"
    :loading="loading"
    :rubber-band="false"
    :checked-value="1"
    :unchecked-value="0"
    @update:value="handleUpdateValue"
  />
</template>

<style scoped></style>
