<script setup lang="ts">
import { ref, watch } from 'vue';

defineOptions({
  name: 'DatetimeRange'
});

interface Props {
  beginDate?: number | null;
  endDate?: number | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'update:beginDate', beginDate: number): void;
  (e: 'update:endDate', endDate: number): void;
}
const emit = defineEmits<Emits>();

const dateRange = ref<[number, number]>(getDefaultDate());

watch(
  () => props.beginDate,
  beginDate => {
    if (typeof beginDate === 'number' && beginDate) {
      dateRange.value[0] = beginDate;
    }
  },
  { immediate: true }
);

watch(
  () => props.endDate,
  endDate => {
    if (typeof endDate === 'number' && endDate) {
      dateRange.value[1] = endDate;
    }
  },
  { immediate: true }
);

function getDefaultDate(): [number, number] {
  const currentDate = new Date();
  const currentTime = currentDate.getTime();
  currentDate.setMonth(currentDate.getMonth() - 1);
  return [currentDate.getTime(), currentTime];
}

function onChange(value: [number, number]) {
  emit('update:beginDate', value[0]);
  emit('update:endDate', value[1]);
}
</script>

<template>
  <NDatePicker v-model:value="dateRange" class="w-full" type="datetimerange" clearable @update:value="onChange" />
</template>

<style scoped lang="scss"></style>
