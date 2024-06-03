<script setup lang="ts">
import SelectGroup from '@/components/common/select-group.vue';
import TaskBatchStatus from '@/components/common/task-batch-status.vue';
import { $t } from '@/locales';

defineOptions({
  name: 'JobBatchSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.JobBatch.JobBatchSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}

const taskBatchStatus = history.state.taskBatchStatus;

if (taskBatchStatus) {
  model.value.taskBatchStatus = Number(taskBatchStatus) as Api.Common.TaskBatchStatus;
}
</script>

<template>
  <SearchForm :model="model" @search="search" @reset="reset">
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.jobBatch.groupName')" path="groupName" class="pr-24px">
      <SelectGroup v-model:value="model.groupName" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.jobBatch.jobName')" path="jobName" class="pr-24px">
      <NInput v-model:value="model.jobName" :placeholder="$t('page.jobBatch.form.jobName')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.jobBatch.taskBatchStatus')" path="taskBatchStatus" class="pr-24px">
      <TaskBatchStatus v-model:value="model.taskBatchStatus" />
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
