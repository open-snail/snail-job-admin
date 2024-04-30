<script setup lang="ts">
import { watch } from 'vue';
import { $t } from '@/locales';
import { tagColor } from '@/utils/common';
import { retryTaskTypeRecord } from '@/constants/business';

defineOptions({
  name: 'RetryDeadLetterDetailDrawer'
});

interface Props {
  /** row data */
  rowData?: Api.RetryDeadLetter.DeadLetter | null;
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
  <OperateDrawer v-model="visible" :title="$t('page.retryDeadLetter.detail')">
    <NDescriptions label-placement="top" bordered :column="3">
      <NDescriptionsItem :label="$t('page.retryTask.uniqueId')" :span="3">
        {{ rowData?.uniqueId }}
      </NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryTask.groupName')" :span="3">{{ rowData?.groupName }}</NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryTask.sceneName')" :span="3">{{ rowData?.sceneName }}</NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryTask.taskType')" :span="1">
        <NTag :type="tagColor(rowData?.taskType!)">{{ $t(retryTaskTypeRecord[rowData?.taskType!]) }}</NTag>
      </NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryTask.bizNo')" :span="2">{{ rowData?.bizNo }}</NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryTask.idempotentId')" :span="3">
        {{ rowData?.idempotentId }}
      </NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryTask.executorName')" :span="3">
        {{ rowData?.executorName }}
      </NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.retryTask.argsStr')" :span="3">{{ rowData?.argsStr }}</NDescriptionsItem>
      <NDescriptionsItem :label="$t('common.createDt')" :span="3">{{ rowData?.createDt }}</NDescriptionsItem>
    </NDescriptions>
  </OperateDrawer>
</template>

<style scoped></style>
