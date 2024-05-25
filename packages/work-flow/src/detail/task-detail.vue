<script setup lang="ts">
import { ref, watch } from 'vue';
import { $t } from '../locales';
import { useFlowStore } from '../stores';
import { failStrategyRecord, workFlowNodeStatusRecord } from '../constants/business';

defineOptions({
  name: 'TaskDetail'
});

interface Props {
  modelValue?: Flow.ConditionNodeType;
  open?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  modelValue: () => ({})
});

interface Emits {
  (e: 'update:open', open: boolean): void;
}

const emit = defineEmits<Emits>();

const store = useFlowStore();
const visible = ref(false);

watch(
  () => props.open,
  val => {
    visible.value = val;
  },
  { immediate: true }
);

const onClose = () => {
  emit('update:open', false);
};

const getTaskName = (id: string) => {
  const jobList: { id?: string; jobName?: string }[] = store.jobList;
  return jobList.find(item => item.id === id)?.jobName;
};
</script>

<template>
  <NDrawer v-model:show="visible" placement="right" :width="500" display-directive="if" @after-leave="onClose">
    <NDrawerContent title="工作流详情">
      <NDescriptions :column="1" bordered :label-style="{ width: '120px' }">
        <NDescriptionsItem label="节点名称">{{ modelValue.nodeName }}</NDescriptionsItem>
        <NDescriptionsItem label="任务 ID">{{ modelValue.jobTask?.jobId }}</NDescriptionsItem>
        <NDescriptionsItem label="任务名称">{{ getTaskName(modelValue.jobTask?.jobId!) }}</NDescriptionsItem>
        <NDescriptionsItem label="失败策略">
          {{ $t(failStrategyRecord[modelValue.failStrategy!]) }}
        </NDescriptionsItem>
        <NDescriptionsItem label="工作流状态">
          {{ $t(workFlowNodeStatusRecord[modelValue.workflowNodeStatus!]) }} 秒
        </NDescriptionsItem>
      </NDescriptions>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped lang="scss"></style>
