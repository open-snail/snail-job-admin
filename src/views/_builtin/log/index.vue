<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { useLogStore } from '@/store/modules/log';

const store = useLogStore();

const data = ref(store.getLogStg());

onUnmounted(() => {
  store.clear();
});
</script>

<template>
  <NCard
    :title="`${$t('page.log.title')} ------ ${$t('page.jobBatch.jobName')}: ${data?.taskName}, ${$t('common.batchList')} ID: ${data?.taskBatchId}`"
    :bordered="false"
    size="small"
    class="h-full sm:flex-1-hidden card-wrapper"
    header-class="view-card-header"
  >
    <LogDrawer :model-value="data?.data" :drawer="false" />
  </NCard>
</template>

<style scoped></style>
