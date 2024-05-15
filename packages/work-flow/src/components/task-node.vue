<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useMessage } from 'naive-ui';
import { fetchNodeRetry, fetchNodeStop } from '../api';
import { useFlowStore } from '../stores';
import { $t } from '../locales';
import { failStrategyRecord, taskBatchStatusEnum } from '../constants/business';
import AddNode from './add-node.vue';

defineOptions({
  name: 'TaskNode'
});

interface Props {
  modelValue?: Flow.NodeModelType;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  modelValue: () => ({})
});

interface Emits {
  (e: 'update:modelValue', modelValue: Flow.NodeModelType): void;
}

const emit = defineEmits<Emits>();

const store = useFlowStore();
const message = useMessage();
const nodeConfig = ref<Flow.NodeModelType>({});
const popoverVisible = ref<Record<number, boolean>>({});

watch(
  () => props.modelValue,
  val => {
    nodeConfig.value = val;
  },
  { immediate: true, deep: true }
);

const addTerm = () => {
  const len = nodeConfig.value.conditionNodes!.length + 1;
  nodeConfig.value.conditionNodes?.push({
    nodeName: `${$t('node.task.name')}${len}`,
    priorityLevel: len,
    failStrategy: 1,
    workflowNodeStatus: 1,
    jobTask: {
      jobId: undefined
    }
  });
  emit('update:modelValue', nodeConfig.value);
};

const reData = (data: Flow.NodeModelType, addData: Flow.NodeModelType) => {
  if (!data.childNode) {
    data.childNode = addData;
  } else {
    reData(data.childNode, addData);
  }
};

const delTerm = (currentIndex: number) => {
  if (nodeConfig.value.conditionNodes!.length === 1) {
    if (nodeConfig.value.childNode) {
      if (nodeConfig.value.conditionNodes![0].childNode) {
        reData(nodeConfig.value.conditionNodes![0].childNode, nodeConfig.value.childNode);
      } else {
        nodeConfig.value.conditionNodes![0].childNode = nodeConfig.value.childNode;
      }
    }
    nextTick(() => {
      emit('update:modelValue', nodeConfig.value.conditionNodes![0].childNode!);
    });
  } else {
    nodeConfig.value.conditionNodes?.splice(currentIndex, 1);
  }
};

const arrTransfer = (index: number, type: number = 1) => {
  nodeConfig.value.conditionNodes![index] = nodeConfig.value.conditionNodes!.splice(
    index + type,
    1,
    nodeConfig.value.conditionNodes![index]
  )[0];
  nodeConfig.value.conditionNodes?.map((item, i) => (item.priorityLevel = i + 1));
  emit('update:modelValue', nodeConfig.value);
};

const index = ref<number>(0);
const drawer = ref<boolean>(false);
const form = ref<Flow.ConditionNodeType>({});

// const save = (val: Flow.ConditionNodeType) => {
//   const oldLevel = nodeConfig.value.conditionNodes![index.value].priorityLevel;
//   const newLevel = val.priorityLevel;
//   nodeConfig.value.conditionNodes![index.value] = val;
//   if (oldLevel !== newLevel) {
//     arrTransfer(index.value, newLevel! - oldLevel!);
//   }
//   emit('update:modelValue', nodeConfig.value);
// };

const show = (currentIndex: number) => {
  if (!props.disabled) {
    index.value = currentIndex;
    form.value = JSON.parse(JSON.stringify(nodeConfig.value.conditionNodes![currentIndex]));
    drawer.value = true;
  }
};

const getClass = (item: Flow.ConditionNodeType) => {
  if (props.disabled) {
    if (store.type === 2) {
      return `node-error node-error-${
        item.taskBatchStatus && taskBatchStatusEnum[item.taskBatchStatus]
          ? taskBatchStatusEnum[item.taskBatchStatus].name
          : 'default'
      }`;
    }
    return 'node-error';
  }
  return 'auto-judge-def auto-judge-hover';
};

const detailId = ref<string>();
const detailIds = ref<string[]>();
const cardDrawer = ref(false);
const detailDrawer = ref<boolean[]>([]);

const showDetail = (node: Flow.ConditionNodeType, detailIndex: number) => {
  detailIds.value = [];
  if (store.type === 2) {
    node.jobBatchList
      ?.sort((a, b) => a.taskBatchStatus - b.taskBatchStatus)
      .forEach(item => {
        if (item.id) {
          detailIds.value?.push(item.id);
        } else if (item.jobId) {
          detailId.value = item.jobId.toString();
        }
      });
    if (node.jobTask?.jobId) {
      detailId.value = node.jobTask?.jobId.toString();
    }
    cardDrawer.value = true;
  } else if (store.type === 1) {
    detailDrawer.value[detailIndex] = true;
  } else {
    show(detailIndex);
  }
};

const retry = async (node: Flow.ConditionNodeType) => {
  const { error } = await fetchNodeRetry(node.id!, store.id!);
  if (!error) {
    message.success($t('snail.form.executeMessage'));
  }
};

const stop = async (node: Flow.ConditionNodeType) => {
  const { error } = await fetchNodeStop(node.id!, store.id!);
  if (!error) {
    message.success($t('snail.form.stopMessage'));
  }
};

const isRetry = (taskBatchStatus: number) => {
  return taskBatchStatus === 4 || taskBatchStatus === 5 || taskBatchStatus === 6;
};

const isStop = (taskBatchStatus: number) => {
  return taskBatchStatus === 1 || taskBatchStatus === 2;
};
</script>

<template>
  <div class="node-wrap">
    <div class="branch-box">
      <NButton v-if="!disabled" class="add-branch" type="success" @click="addTerm">{{ $t('node.task.add') }}</NButton>
      <div v-for="(item, i) in nodeConfig.conditionNodes" :key="i" class="col-box">
        <div class="condition-node">
          <div class="condition-node-box">
            <NPopover
              :show="popoverVisible[i] && store.type === 2"
              @update:show="(visible: boolean) => (popoverVisible[i] = visible)"
            >
              <div class="popover">
                <NDivider v-if="isRetry(item.taskBatchStatus!)" vertical />
                <NButton v-if="isRetry(item.taskBatchStatus!)" text class="popover-item" @click="retry(item!)">
                  <icon-ant-design:redo-outlined />
                  <span>{{ $t('snail.retry') }}</span>
                </NButton>
                <NDivider v-if="isStop(item.taskBatchStatus!)" vertical />
                <NButton v-if="isStop(item.taskBatchStatus!)" text class="popover-item" @click="stop(item!)">
                  <icon-ant-design:stop-outlined />
                  <span>{{ $t('snail.stop') }}</span>
                </NButton>
              </div>
              <template #trigger>
                <div class="auto-judge cursor-pointer" :class="getClass(item)" @click="showDetail(item!, i)">
                  <div v-if="i != 0" class="sort-left" @click.stop="arrTransfer(i, -1)">
                    <icon-ant-design:left-outlined />
                  </div>
                  <div class="title">
                    <span class="text color-#3296fa">
                      <NBadge processing dot :color="item.workflowNodeStatus === 1 ? '#52c41a' : '#ff4d4f'" />
                      {{ item.nodeName }}
                    </span>
                    <span class="priority-title">{{ $t('node.priority') }}{{ item.priorityLevel }}</span>
                    <icon-ant-design:close-outlined v-if="!disabled" class="close" @click.stop="delTerm(i)" />
                  </div>
                  <div class="content min-h-81px">
                    <div v-if="!item.jobTask?.jobId" class="placeholder">{{ $t('snail.form.taskTip') }}</div>
                    <template v-if="item.jobTask?.jobId">
                      <div>
                        <span class="content_label">{{ $t('snail.taskName') }}:</span>
                        <NEllipsis class="w-126px">{{ `${item.jobTask?.jobName}(${item.jobTask?.jobId})` }}</NEllipsis>
                      </div>
                      <div>
                        <span class="content_label">{{ $t('snail.failStrategy') }} :</span>
                        {{ failStrategyRecord[item.failStrategy!] }}
                      </div>
                      <div>.........</div>
                    </template>
                  </div>
                  <div
                    v-if="i != nodeConfig.conditionNodes!.length - 1"
                    class="sort-right"
                    @click.stop="arrTransfer(i)"
                  >
                    <icon-ant-design:right-outlined />
                  </div>
                  <NTooltip v-if="store.type === 2 && item.taskBatchStatus" trigger="hover">
                    <template #trigger>{{ taskBatchStatusEnum[item.taskBatchStatus].title }}</template>
                    <SvgIcon
                      class="error-tip"
                      :color="taskBatchStatusEnum[item.taskBatchStatus].color"
                      size="24px"
                      :icon="taskBatchStatusEnum[item.taskBatchStatus].icon"
                      @click.stop="() => {}"
                    />
                  </NTooltip>
                </div>
              </template>
            </NPopover>
            <AddNode v-model="item.childNode!" :disabled="disabled"></AddNode>
          </div>
        </div>
        <slot v-if="item.childNode" :node="item"></slot>
        <div v-if="i == 0" class="top-left-cover-line"></div>
        <div v-if="i == 0" class="bottom-left-cover-line"></div>
        <div v-if="i == nodeConfig.conditionNodes!.length - 1" class="top-right-cover-line"></div>
        <div v-if="i == nodeConfig.conditionNodes!.length - 1" class="bottom-right-cover-line"></div>
        <!--
 <TaskDetail
          v-if="store.type !== 0 && detailDrawer[i]"
          v-model:open="detailDrawer[i]"
          v-model="nodeConfig.conditionNodes![i]"
        />
-->
      </div>
    </div>
    <AddNode v-if="nodeConfig.conditionNodes!.length > 1" v-model="nodeConfig.childNode!" :disabled="disabled" />
    <!--
 <TaskDrawer
      v-if="store.type === 0 && drawer"
      v-model:open="drawer"
      v-model="form"
      v-model:len="nodeConfig.conditionNodes!.length"
      @save="save"
    />
    <DetailCard v-if="store.type !== 0 && cardDrawer" :id="detailId" v-model:open="cardDrawer" :ids="detailIds" />
-->
  </div>
</template>

<style scoped lang="scss">
.popover {
  display: flex;
  align-items: center;
  justify-content: space-around;

  .popover-item {
    height: 42px;
    display: flex;
    font-size: 13px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    span {
      margin-inline-start: 0;
    }

    .anticon {
      font-size: 22px;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
