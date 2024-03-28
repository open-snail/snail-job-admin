<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { fetchJobLine, fetchRetryLine } from '@/service/api';
import LineRetryChart from './line-retry-chart.vue';

defineOptions({
  name: 'RetryTab'
});

interface Props {
  type?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: 0
});

const appStore = useAppStore();

const gap = computed(() => (appStore.isMobile ? 0 : 16));

const data = ref<Api.Dashboard.DashboardLine>();

const getData = async () => {
  const { data: lineData, error } = props.type === 1 ? await fetchJobLine() : await fetchRetryLine();

  if (!error) {
    data.value = lineData;
  }
};

getData();
</script>

<template>
  <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
    <NGi span="24 s:24 m:16">
      <LineRetryChart :type="type" :model-value="data!"></LineRetryChart>
    </NGi>
    <NGi span="24 s:24 m:8">
      <div>任务量排名</div>
    </NGi>
  </NGrid>
</template>

<style scoped></style>
