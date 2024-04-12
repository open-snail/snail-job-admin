<script setup lang="ts">
import { watch } from 'vue';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useEcharts } from '@/hooks/common/echarts';

defineOptions({
  name: 'PieRetryChart'
});

interface Props {
  type?: number;
  modelValue: Api.Dashboard.CardCount;
}

const props = withDefaults(defineProps<Props>(), {
  type: 0
});

const appStore = useAppStore();

const { domRef, updateOptions } = useEcharts(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '1%',
    left: 'center',
    itemStyle: {
      borderWidth: 0
    }
  },
  series: [
    {
      color: ['#5da8ff', '#8e9dff', '#fedc69', '#26deca'],
      name: $t('page.home.retryTab.pie.title'),
      type: 'pie',
      radius: ['45%', '75%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12'
        }
      },
      labelLine: {
        show: false
      },
      data: [] as { name: string; value: number }[]
    }
  ]
}));

const getData = () => {
  updateOptions(opts => {
    const retryTask = props.modelValue.retryTask;
    const jobTask = props.modelValue.jobTask;
    const totalNum = props.type === 0 ? retryTask.totalNum : jobTask.totalNum;
    opts.series[0].data = [
      { name: $t('common.success'), value: props.type === 0 ? retryTask.finishNum : jobTask.successNum / totalNum },
      { name: $t('common.running'), value: props.type === 0 ? retryTask.runningNum : jobTask.failNum / totalNum },
      {
        name: $t('page.manage.retryTask.status.maxRetryTimes'),
        value: props.type === 0 ? retryTask.maxCountNum : jobTask.stopNum / totalNum
      },
      {
        name: $t('page.manage.retryTask.status.pauseRetry'),
        value: props.type === 0 ? retryTask.suspendNum : jobTask.cancelNum / totalNum
      }
    ];
    return opts;
  });
};

watch(
  () => appStore.locale,
  () => {
    getData();
  }
);

watch(
  () => props.modelValue,
  () => {
    getData();
  }
);

watch(
  () => props.type,
  () => {
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
