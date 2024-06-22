<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';
import { $t } from '@/locales';

defineOptions({
  name: 'DatetimeRange'
});

const DATETIME_FORMAT_ISO8601 = "yyyy-MM-dd'T'HH:mm:ss";

/** 创建 `过去n个自然月` 时间区间 */
const monthRange = (months: number) =>
  [
    dayjs()
      .subtract(months - 1, 'month')
      .startOf('month')
      .valueOf(),
    dayjs().endOf('day').valueOf()
  ] as const;

const modelValue = defineModel<[string, string] | null>('value');

interface Props {
  noDefault?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  noDefault: false
});

const onUpdateFormattedValue = (formattedValue: [string, string] | null) => {
  modelValue.value = formattedValue;
};

const timestampValue = ref<[number, number] | null>(props.noDefault ? null : [...monthRange(1)]);

const createShortcuts = () => {
  const shortcuts: any = {};
  shortcuts[$t('common.currentMonth')] = monthRange(1);
  shortcuts[$t('common.lastMonth')] = monthRange(2);
  shortcuts[$t('common.lastTwoMonth')] = monthRange(3);
  return shortcuts;
};
</script>

<template>
  <NDatePicker
    v-model:value="timestampValue"
    type="datetimerange"
    :value-format="DATETIME_FORMAT_ISO8601"
    class="w-400px"
    clearable
    :default-time="['00:00:00', '23:56:56']"
    :shortcuts="createShortcuts()"
    :actions="['clear', 'confirm']"
    @update:formatted-value="onUpdateFormattedValue"
  />
</template>

<style scoped lang="scss"></style>
