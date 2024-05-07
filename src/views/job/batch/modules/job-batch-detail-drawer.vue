<script setup lang="tsx">
import { NButton } from 'naive-ui';
import { onBeforeUnmount, ref } from 'vue';
import { executorTypeRecord, operationReasonRecord, taskBatchStatusRecord } from '@/constants/business';
import { $t } from '@/locales';
// import { fetchGetJobBatchDetail } from '@/service/api';
import { tagColor } from '@/utils/common';
import { useTable } from '@/hooks/common/table';
import { fetchGetJobTaskList } from '@/service/api';
import { fetchJobLogList } from '@/service/api/log';

defineOptions({
  name: 'JobBatchDetailDrawer'
});

interface Props {
  /** row data */
  rowData?: Api.JobBatch.JobBatch | null;
}

const props = defineProps<Props>();

const taskData = ref<Api.Job.JobTask>();
const visible = defineModel<boolean>('visible', {
  default: false
});
const logShow = defineModel<boolean>('logShow', {
  default: false
});

const { columns, data, loading, mobilePagination } = useTable({
  apiFn: fetchGetJobTaskList,
  apiParams: {
    page: 1,
    size: 10,
    groupName: props.rowData?.groupName,
    taskBatchId: props.rowData?.id,
    startId: 0,
    fromIndex: 0
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64,
      render: row => {
        async function openLog() {
          logShow.value = true;
          taskData.value = row;
          await getLogList();
        }
        return (
          <NButton type="info" text onClick={openLog}>
            <span class="w-28px ws-break-spaces">{$t('page.log.view')}</span>
          </NButton>
        );
      }
    },
    {
      key: 'id',
      title: $t('page.jobBatch.jobTask.id'),
      align: 'left',
      minWidth: 64
    },
    {
      key: 'groupName',
      title: $t('page.jobBatch.jobTask.groupName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'clientInfo',
      title: $t('page.jobBatch.jobTask.clientInfo'),
      align: 'left',
      minWidth: 120,
      render: row => {
        if (row.clientInfo) {
          const parts = row.clientInfo?.split('@');
          const result = parts.length > 1 ? parts[1] : '';
          return <div>{result}</div>;
        }
        return <div>{row.clientInfo}</div>;
      }
    },
    {
      key: 'argsStr',
      title: $t('page.jobBatch.jobTask.argsStr'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'resultMessage',
      title: $t('page.jobBatch.jobTask.resultMessage'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'retryCount',
      title: $t('page.jobBatch.jobTask.retryCount'),
      align: 'left',
      minWidth: 64
    },
    {
      key: 'createDt',
      title: $t('page.jobBatch.jobTask.createDt'),
      align: 'left',
      minWidth: 120
    }
  ]
});

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
        <NDataTable
          :columns="columns"
          :data="data"
          :loading="loading"
          remote
          :row-key="row => row.id"
          :pagination="mobilePagination"
          class="sm:h-full"
        />
      </NTabPane>
    </NTabs>
    <LogDrawer v-model="logList" v-model:show="logShow" title="日志" />
  </DetailDrawer>
</template>

<style scoped></style>
