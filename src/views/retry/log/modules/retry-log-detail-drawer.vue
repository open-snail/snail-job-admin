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
  <OperateDrawer v-model="visible" :title="$t('page.retryScene.detail')">
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryLog.UniqueId')">
        {{ rowData?.uniqueId }}
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryLog.groupName')">{{ rowData?.groupName }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryLog.sceneName')">{{ rowData?.sceneName }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryLog.retryStatus')">
        <NTag :type="tagColor(rowData?.retryStatus!)">
          {{ $t(retryTaskStatusTypeRecord[rowData?.retryStatus!]) }}
        </NTag>
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryLog.taskType')">
        <NTag :type="tagColor(rowData?.taskType!)">{{ $t(retryTaskTypeRecord[rowData?.taskType!]) }}</NTag>
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryLog.bizNo')">{{ rowData?.bizNo }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryLog.idempotentId')">
        {{ rowData?.idempotentId }}
      </NDescriptionsItem>
    </NDescriptions>
  </OperateDrawer>
</template>

<style scoped></style>
