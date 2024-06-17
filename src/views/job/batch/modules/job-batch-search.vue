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
</script>

<template>
  <SearchForm btn-span="24 s:24 m:9 l:12 xl:15" :model="model" @search="search" @reset="reset">
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.jobBatch.groupName')" path="groupName" class="pr-24px">
      <SelectGroup v-model:value="model.groupName" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.jobBatch.jobName')" path="jobName" class="pr-24px">
      <NInput v-model:value="model.jobName" :placeholder="$t('page.jobBatch.form.jobName')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.jobBatch.taskBatchStatus')" path="taskBatchStatus" class="pr-24px">
      <TaskBatchStatus v-model:value="model.taskBatchStatus" />
    </NFormItemGi>
    <NFormItemGi
      span="24 s:24 m:15 l:12 xl:9"
      :label="$t('page.common.createTime')"
      path="datetimeRange"
      class="pr-24px"
    >
      <NDatePicker
        v-model:formatted-value="model.datetimeRange"
        class="w-full"
        type="datetimerange"
        value-format="yyyy-MM-dd'T'HH:mm:ss"
        :default-time="['00:00:00', '23:56:56']"
        clearable
      />
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
