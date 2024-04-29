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
  rowData?: Api.RetryTask.RetryTask | null;
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
  <OperateDrawer v-model="visible" :title="$t('page.retryTask.detail')">
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryTask.uniqueId')">
        {{ rowData?.uniqueId }}
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryTask.groupName')">{{ rowData?.groupName }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryTask.sceneName')">{{ rowData?.sceneName }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryTask.nextTriggerAt')">{{ rowData?.nextTriggerAt }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryTask.retryCount')">{{ rowData?.retryCount }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryTask.retryStatus')">
        <NTag :type="tagColor(rowData?.retryStatus!)">
          {{ $t(retryTaskStatusTypeRecord[rowData?.retryStatus!]) }}
        </NTag>
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryTask.taskType')">
        <NTag :type="tagColor(rowData?.taskType!)">{{ $t(retryTaskTypeRecord[rowData?.taskType!]) }}</NTag>
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryTask.bizNo')">{{ rowData?.bizNo }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryTask.idempotentId')">
        {{ rowData?.idempotentId }}
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryTask.executorName')">{{ rowData?.executorName }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryTask.argsStr')">{{ rowData?.argsStr }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('common.createDt')">{{ rowData?.createDt }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('common.updateDt')">{{ rowData?.updateDt }}</NDescriptionsItem>
    </NDescriptions>
  </OperateDrawer>
</template>

<style scoped></style>
