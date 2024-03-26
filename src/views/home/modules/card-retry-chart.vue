<script setup lang="ts">
import { useEcharts } from '@/hooks/common/echarts';

defineOptions({
  name: 'CardRetryChart'
});

interface Props {
  modelValue: Api.Dashboard.RetryTaskBarList[];
}

const props = defineProps<Props>();

const { domRef, updateOptions } = useEcharts(() => ({
  tooltip: {
    trigger: 'axis',
    appendToBody: true,
    confine: true,
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: '21px',
    height: '40px',
    containLabel: true
  },
  xAxis: {
    // @ts-expect-error 忽略EChart
    axisLine: false,
    type: 'category',
    data: [] as string[],
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value',
    // @ts-expect-error 忽略EChart
    axisLine: false,
    scale: true,
    show: false
  },
  series: [
    {
      name: 'Task Count',
      type: 'bar',
      barWidth: '60%',
      data: [] as number[]
    }
  ]
}));

async function mockData() {
  await new Promise(resolve => {
    setTimeout(resolve, 500);
  });

  if (!props.modelValue) {
    mockData();
    return;
  }

  updateOptions(opts => {
    // @ts-expect-error 忽略EChart
    opts.xAxis.data = props.modelValue!.map(item => item.x);
    // @ts-expect-error 忽略EChart
    opts.series[0].data = props.modelValue!.map(item => item.taskTotal);
    return opts;
  });
}

async function init() {
  mockData();
}

// init
init();
</script>

<template>
  <div ref="domRef" class="h-42px overflow-hidden"></div>
</template>

<style scoped></style>
