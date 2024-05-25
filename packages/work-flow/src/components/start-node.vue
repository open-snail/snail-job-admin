<script lang="ts" setup>
import { ref, watch } from 'vue';
import { $t } from '../locales';
import { useFlowStore } from '../stores';
import { blockStrategyRecord, taskBatchStatusEnum } from '../constants/business';
import StartDetail from '../detail/start-detail.vue';
import StartDrawer from '../drawer/start-drawer.vue';
import AddNode from './add-node.vue';

defineOptions({
  name: 'StartNode'
});

interface Props {
  modelValue?: Flow.NodeDataType;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  modelValue: () => ({})
});

interface Emits {
  (e: 'update:modelValue', modelValue: Flow.NodeDataType): void;
}

const emit = defineEmits<Emits>();

const store = useFlowStore();
const form = ref<Flow.NodeDataType>({});
const nodeData = ref<Flow.NodeDataType>({});

watch(
  () => props.modelValue,
  val => {
    nodeData.value = val;
  },
  { immediate: true, deep: true }
);

watch(
  () => nodeData.value,
  val => {
    emit('update:modelValue', val);
  }
);

watch(
  () => nodeData.value?.groupName,
  val => {
    if (val) {
      store.setJobList(val);
    }
  },
  { immediate: true }
);

const drawer = ref<boolean>(false);
const detailDrawer = ref<boolean>(false);

const save = (val: Flow.NodeDataType) => {
  nodeData.value = val;
};

const show = () => {
  if (store.type === 0) {
    form.value = JSON.parse(JSON.stringify(nodeData.value));
    drawer.value = true;
  } else {
    detailDrawer.value = true;
  }
};
</script>

<template>
  <div class="node-wrap">
    <div
      :class="disabled ? 'start-node-disabled' : 'node-wrap-box-hover'"
      class="node-wrap-box node-error-success start-node"
      @click="show"
    >
      <div class="title">
        <span class="text text-#ff943e">
          <NBadge dot :color="nodeData.workflowStatus === 1 ? '#52c41a' : '#ff000d'" />
          &nbsp;{{ nodeData.workflowName ? nodeData.workflowName : $t('snail.form.groupName') }}
        </span>
      </div>
      <div v-if="nodeData.groupName" class="content">
        <div>
          <span class="content_label">{{ $t('snail.groupName') }}:&nbsp;</span>
          <NEllipsis class="max-w-132px">
            {{ nodeData.groupName }}
          </NEllipsis>
        </div>
        <div>
          <span class="content_label">{{ $t('snail.blockStrategy') }}:&nbsp;</span>
          {{ $t(blockStrategyRecord[nodeData.blockStrategy!]) }}
        </div>
        <div>.........</div>
      </div>
      <div v-else class="content min-h-85px">
        <span class="placeholder">{{ $t('snail.form.workflowTip') }}</span>
      </div>
      <NTooltip v-if="store.type === 2" trigger="hover">
        <template #trigger>{{ taskBatchStatusEnum[3].title }}</template>
        <SvgIcon
          class="error-tip"
          :color="taskBatchStatusEnum[3].color"
          size="24px"
          :icon="taskBatchStatusEnum[3].icon"
          @click.stop="() => {}"
        />
      </NTooltip>
    </div>
    <AddNode v-model="nodeData.nodeConfig!" :disabled="disabled"></AddNode>
    <StartDetail v-if="store.type !== 0" v-model:open="detailDrawer" v-model="nodeData" />
    <StartDrawer v-model:open="drawer" v-model="form" @save="save" />
  </div>
</template>

<style scoped>
.content {
  line-height: 136%;
}
</style>
