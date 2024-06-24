<script setup lang="tsx">
import { onBeforeUnmount, ref } from 'vue';
import { executorTypeRecord, operationReasonRecord, taskBatchStatusRecord } from '@/constants/business';
import { $t } from '@/locales';
import { tagColor } from '@/utils/common';
import { fetchJobLogList } from '@/service/api/log';
import JobTaskListTable from './job-task-list-table.vue';

defineOptions({
  name: 'JobBatchDetailDrawer'
});

interface Props {
  /** row data */
  rowData?: Api.JobBatch.JobBatch | null;
}

defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const taskData = ref<Api.Job.JobTask>();
const logShow = defineModel<boolean>('logShow', {
  default: false
});

async function openLog(row: Api.Job.JobTask) {
  logShow.value = true;
  taskData.value = row;
  await getLogList();
}

const logList = ref<Api.JobLog.JobMessage[]>([]);
const interval = ref<NodeJS.Timeout>();
const controller = new AbortController();
const finished = ref<boolean>(false);
let startId = '0';
let fromIndex: number = 0;

async function getLogList() {
  const { data: logData, error } = await fetchJobLogList({
    taskBatchId: taskData.value!.taskBatchId,
    jobId: taskData.value!.jobId,
    taskId: taskData.value!.id,
    startId,
    fromIndex,
    size: 50
  });
  if (!error) {
    finished.value = logData.finished;
    startId = logData.nextStartId;
    fromIndex = logData.fromIndex;
    if (logData.message) {
      logList.value.push(...logData.message);
      logList.value.sort((a, b) => Number.parseInt(a.time_stamp, 10) - Number.parseInt(b.time_stamp, 10));
    }
    if (!finished.value) {
      clearTimeout(interval.value);
      interval.value = setTimeout(getLogList, 1000);
    }
  }
}

const stopLog = () => {
  finished.value = true;
  controller.abort();
  clearTimeout(interval.value);
  interval.value = undefined;
};

onBeforeUnmount(() => {
  stopLog();
});
</script>

<template>
  <DetailDrawer v-model="visible" :title="$t('page.jobBatch.detail')" :width="['50%', '90%']">
    <NTabs type="segment" animated>
      <NTabPane :name="0" :tab="$t('page.log.info')">
        <NDescriptions label-placement="top" bordered :column="2">
          <NDescriptionsItem :label="$t('page.jobBatch.groupName')">{{ rowData?.groupName }}</NDescriptionsItem>
          <NDescriptionsItem :label="$t('page.jobBatch.jobName')">{{ rowData?.jobName }}</NDescriptionsItem>
          <NDescriptionsItem :label="$t('page.jobBatch.taskBatchStatus')">
            <NTag :type="tagColor(rowData?.taskBatchStatus!)">
              {{ $t(taskBatchStatusRecord[rowData?.taskBatchStatus!]) }}
            </NTag>
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('page.jobBatch.executionAt')">{{ rowData?.executionAt }}</NDescriptionsItem>
          <NDescriptionsItem :label="$t('page.jobBatch.operationReason')">
            <NTag :type="tagColor(rowData?.operationReason!)">
              {{ $t(operationReasonRecord[rowData?.operationReason!]) }}
            </NTag>
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('page.jobBatch.executorType')">
            <NTag :type="tagColor(rowData?.executorType!)">
              {{ $t(executorTypeRecord[rowData?.executorType!]) }}
            </NTag>
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('page.jobBatch.executorInfo')" :span="2">
            {{ rowData?.executorInfo }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('common.createDt')" :span="2">{{ rowData?.createDt }}</NDescriptionsItem>
        </NDescriptions>
      </NTabPane>
      <NTabPane :name="1" :tab="$t('page.log.title')" display-directive="if">
        <JobTaskListTable :row-data="rowData" @show-log="openLog" />
      </NTabPane>
    </NTabs>
  </DetailDrawer>
  <LogDrawer v-model="logList" v-model:show="logShow" :title="$t('page.log.title')" />
</template>

<style scoped></style>
