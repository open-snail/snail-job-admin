<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';
import { translateOptions } from '@/utils/common';
import { routeKeyRecordOptions } from '@/constants/business';

defineOptions({
  name: 'RouterKey'
});

interface Props {
  taskType?: Api.Common.TaskType;
}

const props = withDefaults(defineProps<Props>(), {
  // HACK: 默认值为`集群`, 选项不受限制
  taskType: 2
});

interface Emits {
  (e: 'update:value', value: Api.Common.RouteKey): void;
}
const emit = defineEmits<Emits>();

const modelValue = defineModel<Api.Common.RouteKey>('value');

/** select 下拉选项 */
const selectOptions = computed(() => {
  // 默认选中轮询
  emit('update:value', 4);

  // 2:集群, 3:切片
  if (props.taskType === 2 || props.taskType === 3) {
    return translateOptions(routeKeyRecordOptions.filter(o => o.value === 4));
  }
  // 2:广播
  return translateOptions(routeKeyRecordOptions);
});
</script>

<template>
  <NSelect
    v-model:value="modelValue"
    :placeholder="$t('common.routeKey.routeForm')"
    :options="selectOptions"
    clearable
  />
</template>

<style scoped></style>
