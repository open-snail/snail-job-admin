<script setup lang="ts">
import { ref, watch } from 'vue';
import type { SelectOption } from 'naive-ui';
import SelectGroup from '@/components/common/select-group.vue';
import TaskBatchStatus from '@/components/common/task-batch-status.vue';
import DatetimeRange from '@/components/common/datetime-range.vue';
import { $t } from '@/locales';
import { fetchGetJobNameList } from '@/service/api';

defineOptions({
  name: 'JobBatchSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const noSearchFlag = ref(false);

const emit = defineEmits<Emits>();

/** 定时任务列表 */
const jobList = ref<Api.Job.Job[]>([]);

const model = defineModel<Api.JobBatch.JobBatchSearchParams>('model', { required: true });
const keywords = ref<string>(model.value.jobName as string);

function reset() {
  keywords.value = '';
  emit('reset');
}

function search() {
  emit('search');
}

async function keywordsUpdate() {
  const res = await fetchGetJobNameList({ keywords: keywords.value, groupName: model.value.groupName });
  jobList.value = res.data as Api.Job.Job[];
}

function handleSelect(value: string) {
  model.value.jobId = value;
}

watch(
  () => keywords.value,
  (value: string) => {
    if (value.length !== 0) {
      keywordsUpdate();
    } else {
      noSearchFlag.value = false;
    }
  }
);

function translateOptions(options: Api.Job.Job[]) {
  return options.map(option => ({
    value: option.id,
    label: option.jobName
  }));
}

function renderLabel(option: SelectOption) {
  return [option.label as string, `(${option.value})`];
}
</script>

<template>
  <SearchForm btn-span="24 s:24 m:9 l:12 xl:15" :model="model" @search="search" @reset="reset">
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.jobBatch.groupName')" path="groupName" class="pr-24px">
      <SelectGroup v-model:value="model.groupName" clearable />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.jobBatch.jobName')" path="jobName" class="pr-24px">
      <NAutoComplete
        v-model:value="keywords"
        :placeholder="$t('page.jobBatch.form.jobName')"
        :options="translateOptions(jobList)"
        :empty-visible="noSearchFlag"
        clearable
        filterable
        :render-label="renderLabel"
        @select="handleSelect"
      />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.jobBatch.taskBatchStatus')" path="taskBatchStatus" class="pr-24px">
      <TaskBatchStatus v-model:value="model.taskBatchStatus" clearable />
    </NFormItemGi>
    <NFormItemGi
      span="24 s:24 m:15 l:12 xl:9"
      :label="$t('page.common.createTime')"
      path="datetimeRange"
      class="pr-24px"
    >
      <DatetimeRange v-model:value="model.datetimeRange!" />
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
