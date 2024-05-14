<script setup lang="ts">
import { ref } from 'vue';
import { $t } from '@/locales';
import SelectGroup from '@/components/common/select-group.vue';
import TaskBatchStatus from '@/components/common/task-batch-status.vue';

import { fetchGetWorkflowNameList } from '@/service/api';

defineOptions({
  name: 'WorkflowBatchSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();
/** 组列表 */
const workflowList = ref<Api.Workflow.Workflow[]>([]);

const model = defineModel<Api.WorkflowBatch.WorkflowBatchSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}

async function groupNameUpdate(groupName: string) {
  const res = await fetchGetWorkflowNameList({ groupName });
  workflowList.value = res.data as Api.Workflow.Workflow[];
}

groupNameUpdate('');
</script>

<template>
  <SearchForm :model="model" @search="search" @reset="reset">
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.workflowBatch.groupName')" path="groupName" class="pr-24px">
      <SelectGroup v-model:value="model.groupName" @update:value="groupNameUpdate" />
    </NFormItemGi>
    <NFormItemGi
      span="24 s:12 m:6"
      :label="$t('page.workflowBatch.workflowName')"
      :label-width="100"
      path="workflowName"
      class="pr-24px"
    >
      <NSelect
        v-model:value="model.workflowId"
        :placeholder="$t('page.workflowBatch.form.workflowName')"
        value-field="id"
        label-field="workflowName"
        :options="workflowList"
        clearable
        filterable
      />
    </NFormItemGi>
    <NFormItemGi
      span="24 s:12 m:6"
      :label="$t('page.workflowBatch.taskBatchStatus')"
      path="taskBatchStatus"
      class="pr-24px"
    >
      <TaskBatchStatus v-model:value="model.taskBatchStatus" />
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
