<script setup lang="ts">
import { watch } from 'vue';

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
  <OperateDrawer v-model="visible" title="组详情">
    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem label="组名称">{{ rowData?.groupName }}</NDescriptionsItem>
    </NDescriptions>
  </OperateDrawer>
</template>

<style scoped></style>
