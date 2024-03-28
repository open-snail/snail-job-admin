<script setup lang="ts">
import { watch } from 'vue';
import { useEcharts } from '@/hooks/common/echarts';

defineOptions({
  name: 'LineRetryChart'
});

interface Props {
  type?: number;
  modelValue: Api.Dashboard.DashboardLine;
}

const props = withDefaults(defineProps<Props>(), {
  type: 0
});

const { domRef, updateOptions } = useEcharts(() => ({
  tabIndex: props.type,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Success Num', 'Running Num', 'Max Count Num', 'Suspend Num']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [] as string[]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      color: '#f5b386',
      name: 'Success Num',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#f5b386'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: [] as number[]
    },
    {
      color: '#40e9c5',
      name: 'Running Num',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#40e9c5'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: []
    },
    {
      color: '#b686d4',
      name: 'Max Count Num',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#b686d4'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: [] as number[]
    },
    {
      color: '#ec6f6f',
      name: 'Suspend Num',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#ec6f6f'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: []
    }
  ]
}));

async function getData() {
  await new Promise(resolve => {
    setTimeout(resolve, 1);
  });

  if (!props.modelValue) {
    await getData();
    return;
  }

  updateOptions(opts => {
    opts.xAxis.data = props.modelValue?.dashboardLineResponseDOList.map(x => x.createDt);
    opts.series[0].data = props.modelValue?.dashboardLineResponseDOList.map(x =>
      opts.tabIndex === 1 ? x.success : x.successNum
    );
    opts.series[1].data = props.modelValue?.dashboardLineResponseDOList.map(x =>
      opts.tabIndex === 1 ? x.fail : x.runningNum
    );
    opts.series[2].data = props.modelValue?.dashboardLineResponseDOList.map(x =>
      opts.tabIndex === 1 ? x.stop : x.maxCountNum
    );
    opts.series[3].data = props.modelValue?.dashboardLineResponseDOList.map(x =>
      opts.tabIndex === 1 ? x.cancel : x.suspendNum
    );
    return opts;
  });
}

function updateLocale() {
  updateOptions(opts => {
    opts.legend.data =
      opts.tabIndex === 1
        ? ['Success', 'Fail', 'Stop', 'Cancel']
        : ['Success Num', 'Running Num', 'Max Count Num', 'Suspend Num'];

    opts.series[0].name = opts.legend.data[0];
    opts.series[1].name = opts.legend.data[1];
    opts.series[2].name = opts.legend.data[2];
    opts.series[3].name = opts.legend.data[3];
    return opts;
  });
}

watch(
  () => props.type,
  () => {
    updateLocale();
    getData();
  },
  { immediate: true }
);
</script>

<template>
  <NCard :bordered="false" class="card-wrapper">
    <div ref="domRef" class="h-360px overflow-hidden"></div>
  </NCard>
</template>

<style scoped></style>
