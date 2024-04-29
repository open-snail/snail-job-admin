<script setup lang="ts">
import { watch } from 'vue';
import { DelayLevel, backOffRecord, enableStatusNumberRecord, routeKeyRecord } from '@/constants/business';
import { $t } from '@/locales';
import { tagColor } from '@/utils/common';

defineOptions({
  name: 'SceneDetailDrawer'
});

interface Props {
  /** row data */
  rowData?: Api.RetryScene.Scene | null;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

function maxRetryCountUpdate(maxRetryCount: number) {
  if (props.rowData?.backOff !== 1) {
    return '';
  }

  let desc = '';
  for (let i = 1; i <= maxRetryCount; i += 1) {
    desc += `,${DelayLevel[i as keyof typeof DelayLevel]}`;
  }
  return desc.substring(1, desc.length);
}

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
      <NDescriptionsItem :label="$t('page.retryScene.sceneName')">{{ rowData?.sceneName }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryScene.sceneStatus')">
        <NTag :type="tagColor(rowData?.sceneStatus!)">{{ $t(enableStatusNumberRecord[rowData?.sceneStatus!]) }}</NTag>
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryScene.groupName')">{{ rowData?.groupName }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('common.routeKey.routeLabel')">
        <NTag :type="tagColor(rowData?.routeKey!)">{{ $t(routeKeyRecord[rowData?.routeKey!]) }}</NTag>
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryScene.maxRetryCount')">{{ rowData?.maxRetryCount }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryScene.executorTimeout')">
        {{ rowData?.executorTimeout }}
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryScene.deadlineRequest')">
        {{ rowData?.deadlineRequest }}
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryScene.backOff')">
        <NTag :type="tagColor(rowData?.backOff!)">
          {{ $t(backOffRecord[rowData?.backOff!]) }}
        </NTag>
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryScene.triggerInterval')">
        {{ rowData?.backOff === 1 ? maxRetryCountUpdate(rowData?.maxRetryCount) : rowData?.triggerInterval }}
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.retryScene.description')">{{ rowData?.description }}</NDescriptionsItem>
    </NDescriptions>
  </OperateDrawer>
</template>

<style scoped></style>
