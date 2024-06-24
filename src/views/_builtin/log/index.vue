<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { useLogStore } from '@/store/modules/log';
import { useRouterPush } from '@/hooks/common/router';
import { localStg } from '@/utils/storage';

const store = useLogStore();

const data = ref();
const { routerPushByKey } = useRouterPush();

function init() {
  const logData = localStg.get('log');
  if (!logData?.data) {
    data.value = logData;
    routerPushByKey('404');
  }
}

init();

onUnmounted(() => {
  store.clear();
});
</script>

<template>
  <NCard :bordered="false" size="small" class="h-full sm:flex-1-hidden card-wrapper" header-class="view-card-header">
    <template #header>
      <span v-if="data?.taskName">
        {{
          `${$t('page.log.title')} ------ ${$t('page.jobBatch.jobName')}: ${data?.taskName}, ${$t('common.batchList')} ID: ${data?.taskBatchId}`
        }}
      </span>
    </template>
    <LogDrawer :model-value="data?.data" :drawer="false" />
  </NCard>
</template>

<style scoped></style>
