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
  (e: 'update:beginDate', beginDate: number | null): void;
  (e: 'update:endDate', endDate: number | null): void;
}
const emit = defineEmits<Emits>();

const dateRange = ref<[number, number] | undefined>(getDefaultDate());

watch(
  () => [props.beginDate, props.endDate],
  val => {
    if (!val[0] && !val[1]) {
      dateRange.value = undefined;
    }
  }
);

watch(
  () => dateRange.value,
  val => {
    emit('update:beginDate', val ? val[0] : null);
    emit('update:endDate', val ? val[1] : null);
  },
  { immediate: true }
);

function getDefaultDate(): [number, number] {
  const today = new Date();
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const startOfDayOneMonthAgo = new Date(
    oneMonthAgo.getFullYear(),
    oneMonthAgo.getMonth(),
    oneMonthAgo.getDate(),
    0,
    0,
    0
  );
  return [startOfDayOneMonthAgo.getTime(), endOfDay.getTime()];
}

function initDefaultDate() {
  const beginDate = props.beginDate;
  if (typeof beginDate === 'number' && beginDate) {
    dateRange.value![0] = beginDate;
  }

  const endDate = props.endDate;
  if (typeof endDate === 'number' && endDate) {
    dateRange.value![1] = endDate;
  }
}

initDefaultDate();
</script>

<template>
  <NDatePicker v-model:value="dateRange" class="w-full" type="datetimerange" clearable />
</template>

<style scoped lang="scss"></style>
