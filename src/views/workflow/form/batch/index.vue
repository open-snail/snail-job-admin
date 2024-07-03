<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Workflow from '@/components/workflow';
import { useWorkflowStore } from '@/store/modules/workflow';
import { fetchWorkflowBatchInfo } from '@/service/api';

const store = useWorkflowStore();
const route = useRoute();

const spinning = ref(false);
const id: string = String(route.query.id);
const node = ref<Workflow.NodeDataType>({});
const syncTime = ref(0);
const interval = ref<NodeJS.Timeout>();
const controller = new AbortController();
const finished = ref<boolean>(true);

const pauseBatch = () => {
  finished.value = true;
  controller.abort();
  clearTimeout(interval.value);
  interval.value = undefined;
};

const stopBatch = () => {
  if (!finished.value) controller.abort();
  pauseBatch();
  node.value = {};
  store.clear();
};

const getBatchDetail = async () => {
  spinning.value = true;
  const { data, error } = await fetchWorkflowBatchInfo(id);
  if (!error) {
    node.value = data;
    finished.value = !(data.workflowBatchStatus && [1, 2].includes(data.workflowBatchStatus));
    if (!finished.value) {
      clearTimeout(interval.value);
      interval.value = setTimeout(getBatchDetail, syncTime.value * 1000);
    }
  } else if (error?.code !== 'ERR_CANCELED') {
    stopBatch();
  }
  spinning.value = false;
};

const handleSyncSelect = async (time: number) => {
  if (time === -1) {
    if (finished.value) {
      finished.value = false;
      await getBatchDetail();
    }
    return;
  }

  if (time === 0) {
    pauseBatch();
    return;
  }

  syncTime.value = time;
  finished.value = false;
  await getBatchDetail();
};

onMounted(() => {
  store.clear();
  store.setType(2);
  store.setId(id);
  getBatchDetail();
});

onBeforeUnmount(() => {
  stopBatch();
});

const syncOptions = ref([
  {
    label: 'Off',
    key: 0
  },
  {
    label: 'Auto(1s)',
    key: 1
  },
  {
    label: '5s',
    key: 5
  },
  {
    label: '10s',
    key: 10
  },
  {
    label: '30s',
    key: 30
  },
  {
    label: '1m',
    key: 60
  },
  {
    label: '5m',
    key: 300
  }
]);
</script>

<template>
  <Workflow v-model="node" :spinning="spinning" disabled>
    <template #buttons>
      <div class="flex-center">
        <NDropdown trigger="hover" width="trigger" :options="syncOptions" @select="handleSyncSelect">
          <NTooltip placement="left">
            <template #trigger>
              <NButton dashed class="mr-16px w-136px" @click="handleSyncSelect(-1)">
                <template #icon>
                  <div class="flex-center gap-8px">
                    <icon-solar:refresh-outline class="text-18px" />
                    {{ syncOptions.filter(item => item.key === syncTime)[0].label }}
                    <SvgIcon icon="material-symbols:expand-more-rounded" />
                  </div>
                </template>
              </NButton>
            </template>
            自动刷新频率
          </NTooltip>
        </NDropdown>
        <NTooltip v-if="finished" placement="top">
          <template #trigger>
            <icon-material-symbols:check-circle class="text-20px color-success" />
          </template>
          流程批次加载完成
        </NTooltip>
        <NTooltip v-else>
          <template #trigger>
            <NSpin size="small">
              <template #icon>
                <icon-nonicons:loading-16 />
              </template>
            </NSpin>
          </template>
          流程批次正在加载
        </NTooltip>
      </div>
    </template>
  </Workflow>
</template>

<style scoped></style>
