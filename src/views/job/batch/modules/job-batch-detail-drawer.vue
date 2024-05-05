<script setup lang="ts">
import { watch } from 'vue';
import { executorTypeRecord, operationReasonRecord, taskBatchStatusRecord } from '@/constants/business';
import { $t } from '@/locales';
// import { fetchGetJobBatchDetail } from '@/service/api';
import { tagColor } from '@/utils/common';

defineOptions({
  name: 'JobBatchDetailDrawer'
});

interface Props {
  /** row data */
  rowData?: Api.JobBatch.JobBatch | null;
}
const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

watch(
  () => visible.value,
  async val => {
    if (val === true) {
      console.log(props.rowData?.id);
    }
  },
  { immediate: true }
);
</script>

<template>
  <OperateDrawer v-model="visible" :title="$t('page.jobBatch.detail')">
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
  </OperateDrawer>
</template>

<style scoped></style>
