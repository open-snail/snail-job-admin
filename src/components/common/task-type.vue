<script setup lang="ts">
import { ref } from 'vue';
import { $t } from '@/locales';
import { translateOptions } from '@/utils/common';
import { taskTypeRecordRecordOptions } from '@/constants/business';

defineOptions({
  name: 'TaskType'
});

const valueRef = ref<Api.Common.BlockStrategy>();
const emit = defineEmits<Emits>();

interface Emits {
  (e: 'update:value', value: Api.Common.BlockStrategy): void;
}

const handleUpdate = (value: Api.Common.BlockStrategy) => {
  emit('update:value', value);
};
</script>

<template>
  <NSelect
    v-model:value="valueRef"
    :placeholder="$t('common.routeKey.routeForm')"
    :options="translateOptions(taskTypeRecordRecordOptions)"
    clearable
    @update:value="handleUpdate"
  />
</template>

<style scoped></style>
