<script setup lang="ts">
import { groupConfigIdModeRecord, groupConfigStatusRecord, yesOrNoRecord } from '@/constants/business';
import { $t } from '@/locales';
import { tagColor } from '@/utils/common';

defineOptions({
  name: 'GroupDetailDrawer'
});

interface Props {
  /** row data */
  rowData?: Api.GroupConfig.GroupConfig | null;
}

defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});
</script>

<template>
  <OperateDrawer v-model="visible" :title="$t('page.groupConfig.detail')">
    <NDescriptions label-placement="top" bordered :column="2">
      <NDescriptionsItem :label="$t('page.groupConfig.groupName')" :span="2">
        {{ rowData?.groupName }}
      </NDescriptionsItem>

      <NDescriptionsItem :label="$t('page.groupConfig.token')" :span="2">{{ rowData?.token }}</NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.groupConfig.groupStatus')" :span="1">
        <NTag :type="tagColor(rowData?.groupStatus!)">{{ $t(groupConfigStatusRecord[rowData?.groupStatus!]) }}</NTag>
      </NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.groupConfig.idGeneratorMode')" :span="1">
        <NTag :type="tagColor(rowData?.idGeneratorMode!)">
          {{ $t(groupConfigIdModeRecord[rowData?.idGeneratorMode!]) }}
        </NTag>
      </NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.groupConfig.groupPartition')" :span="1">
        {{ rowData?.groupPartition }}
      </NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.groupConfig.initScene')" :span="1">
        <NTag :type="tagColor(rowData?.initScene!)">{{ $t(yesOrNoRecord[rowData?.initScene!]) }}</NTag>
      </NDescriptionsItem>
      <NDescriptionsItem :label="$t('page.groupConfig.description')" :span="2">
        {{ rowData?.description }}
      </NDescriptionsItem>
    </NDescriptions>
  </OperateDrawer>
</template>

<style scoped></style>
