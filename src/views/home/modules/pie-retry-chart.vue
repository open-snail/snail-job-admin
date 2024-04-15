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
    trigger: 'item',
    formatter: '{a} <br/>{b}: {d}%'
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

const getData = async () => {
  await new Promise(resolve => {
    setTimeout(resolve, 1);
  });

  if (!props.modelValue) {
    await getData();
    return;
  }

  updateOptions((opts, factory) => {
    const originOpts = factory();
    opts.series[0].name = originOpts.series[0].name;
    if (props.type === 0) {
      const retryTask = props.modelValue.retryTask;
      opts.series[0].data = [
        { name: $t('common.success'), value: retryTask.finishNum / retryTask.totalNum },
        { name: $t('common.running'), value: retryTask.runningNum / retryTask.totalNum },
        { name: $t('page.manage.retryTask.status.maxRetryTimes'), value: retryTask.maxCountNum / retryTask.totalNum },
        { name: $t('page.manage.retryTask.status.pauseRetry'), value: retryTask.suspendNum / retryTask.totalNum }
      ];
    }
    if (props.type === 1) {
      const jobTask = props.modelValue.jobTask;
      opts.series[0].data = [
        { name: $t('common.success'), value: jobTask.successNum / jobTask.totalNum },
        { name: $t('common.fail'), value: jobTask.failNum / jobTask.totalNum },
        { name: $t('common.stop'), value: jobTask.stopNum / jobTask.totalNum },
        { name: $t('common.cancel'), value: jobTask.cancelNum / jobTask.totalNum }
      ];
    }
    if (props.type === 2) {
      const workFlowTask = props.modelValue.workFlowTask;
      opts.series[0].data = [
        { name: $t('common.success'), value: workFlowTask.successNum / workFlowTask.totalNum },
        { name: $t('common.fail'), value: workFlowTask.failNum / workFlowTask.totalNum },
        { name: $t('common.stop'), value: workFlowTask.stopNum / workFlowTask.totalNum },
        { name: $t('common.cancel'), value: workFlowTask.cancelNum / workFlowTask.totalNum }
      ];
    }
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
