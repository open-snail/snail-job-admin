<script setup lang="ts">
import { watch } from 'vue';
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

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

watch(
  () => props.rowData,
  () => {
    console.log(props.rowData);
  },
  { immediate: true }
);
</script>

<template>
  <OperateDrawer v-model="visible" :title="$t('page.groupConfig.detail')">
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.groupConfig.groupName')">{{ rowData?.groupName }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.groupConfig.groupStatus')">
        <NTag :type="tagColor(rowData?.groupStatus!)">{{ $t(groupConfigStatusRecord[rowData?.groupStatus!]) }}</NTag>
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.groupConfig.token')">{{ rowData?.token }}</NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.groupConfig.idGeneratorMode')">
        <NTag :type="tagColor(rowData?.idGeneratorMode!)">
          {{ $t(groupConfigIdModeRecord[rowData?.idGeneratorMode!]) }}
        </NTag>
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.groupConfig.groupPartition')">
        {{ rowData?.groupPartition }}
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.groupConfig.initScene')">
        <NTag :type="tagColor(rowData?.initScene!)">{{ $t(yesOrNoRecord[rowData?.initScene!]) }}</NTag>
      </NDescriptionsItem>
    </NDescriptions>
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem :label="$t('page.groupConfig.description')">{{ rowData?.description }}</NDescriptionsItem>
    </NDescriptions>
  </OperateDrawer>
</template>

<style scoped></style>
