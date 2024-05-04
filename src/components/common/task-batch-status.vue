<script setup lang="ts">
import { ref } from 'vue';
import { $t } from '@/locales';
import { translateOptions } from '@/utils/common';
import { taskBatchStatusRecordOptions } from '@/constants/business';

interface Emits {
  (e: 'update:value', value: Api.Common.TaskBatchStatus): void;
}
const emit = defineEmits<Emits>();

const taskBatchStatusRef = ref<Api.Common.TaskBatchStatus>();

const handleUpdate = (taskBatchStatus: Api.Common.TaskBatchStatus) => {
  emit('update:value', taskBatchStatus);
};
</script>

<template>
  <NSelect
    v-model:value="taskBatchStatusRef"
    :placeholder="$t('common.taskBatchStatus.form')"
    :options="translateOptions(taskBatchStatusRecordOptions)"
    clearable
    @update:value="handleUpdate"
  />
</template>

<style scoped></style>
