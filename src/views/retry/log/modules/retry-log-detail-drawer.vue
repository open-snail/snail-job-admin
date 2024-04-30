<script setup lang="ts">
import { watch } from 'vue';
import { $t } from '@/locales';
import { tagColor } from '@/utils/common';
import { retryTaskStatusTypeRecord, retryTaskTypeRecord } from '@/constants/business';

defineOptions({
  name: 'SceneDetailDrawer'
});

interface Props {
  /** row data */
  rowData?: Api.RetryLog.RetryLog | null;
}

const visible = defineModel<boolean>('visible', {
  default: false
});
const props = defineProps<Props>();

watch(
  () => props.rowData,
  () => {
    console.log(props.rowData);
  },
  { immediate: true }
);
</script>

<template>
  <OperateDrawer v-model="visible" :title="$t('page.retryLog.detail')">
    <NDescriptions label-placement="top" bordered :column="2">
      <NDescriptionsItem :label="$t('page.retryLog.UniqueId')" :span="2">
        {{ rowData?.uniqueId }}
      </NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryLog.groupName')" :span="2">{{ rowData?.groupName }}</NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryLog.sceneName')" :span="2">{{ rowData?.sceneName }}</NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryLog.retryStatus')" :span="1">
        <NTag :type="tagColor(rowData?.retryStatus!)">
          {{ $t(retryTaskStatusTypeRecord[rowData?.retryStatus!]) }}
        </NTag>
      </NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryLog.taskType')" :span="1">
        <NTag :type="tagColor(rowData?.taskType!)">{{ $t(retryTaskTypeRecord[rowData?.taskType!]) }}</NTag>
      </NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryLog.bizNo')" :span="2">{{ rowData?.bizNo }}</NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryLog.idempotentId')" :span="2">
        {{ rowData?.idempotentId }}
      </NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryTask.executorName')" :span="2">
        {{ rowData?.executorName }}
      </NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryTask.argsStr')" :span="2">{{ rowData?.argsStr }}</NDescriptionsItem>
      <NDescriptionsItem :label="$t('common.createDt')">{{ rowData?.createDt }}</NDescriptionsItem>
    </NDescriptions>
  </OperateDrawer>
</template>

<style scoped></style>
