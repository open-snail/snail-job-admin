<script setup lang="ts">
import { ref, watch } from 'vue';
import NodeWrap from './node/node-wrap.vue';
import StartNode from './node/start-node.vue';
import { $t } from './locales';

defineOptions({
  name: 'SnailWorkflow'
});

interface Props {
  modelValue?: Flow.NodeDataType;
  spinning?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  spinning: false,
  modelValue: () => ({})
});

interface Emits {
  (e: 'update:modelValue', modelValue: Flow.NodeDataType): void;
  (e: 'save'): void;
  (e: 'cancel'): void;
}

const emit = defineEmits<Emits>();

const zoom = ref<number>(100);
const nodeData = ref<Flow.NodeDataType>({});

const save = async () => {
  emit('save');
};

const cancel = () => {
  emit('cancel');
};

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

const onZoom = (n: number) => {
  zoom.value += 10 * n;

  if (zoom.value <= 10) {
    zoom.value = 10;
  } else if (zoom.value >= 300) {
    zoom.value = 300;
  }
};
</script>

<template>
  <div class="workflow">
    <div class="workflow-affix">
      <NAffix :trigger-top="0">
        <div class="header">
          <div>
            <NTooltip title="缩小">
              <template #trigger>
                <NButton type="info" strong @click="onZoom(-1)">
                  <icon-ant-design:minus-outlined />
                </NButton>
              </template>
            </NTooltip>
            <span class="ml-8px mr-8px text-#333639 dark:text-#d6d6d6">{{ zoom }}%</span>
            <NTooltip title="放大">
              <template #trigger>
                <NButton type="info" strong @click="onZoom(1)">
                  <icon-ant-design:plus-outlined />
                </NButton>
              </template>
            </NTooltip>
          </div>
          <div v-if="!disabled" class="buttons">
            <NButton type="info" siz="large" @click="save">保存</NButton>
            <NButton siz="large" class="ml-16px" @click="cancel">取消</NButton>
          </div>
        </div>
      </NAffix>
      <div class="workflow-body">
        <NSpin :show="spinning">
          <div class="workflow-design" :style="`transform: scale(${zoom / 100})`">
            <div class="box-scale">
              <StartNode v-model="nodeData" :disabled="disabled" />
              <NodeWrap v-if="nodeData.nodeConfig" v-model="nodeData.nodeConfig" :disabled="disabled" />
              <div class="end-node">
                <div class="end-node-circle"></div>
                <div class="end-node-text">{{ $t('node.endNode') }}</div>
              </div>
            </div>
          </div>
        </NSpin>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './styles/index';

.workflow {
  padding: 0 !important;
  height: calc(100% - 50px);

  &-affix {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      background-color: #fff;
      box-sizing: border-box;
      padding: 8px 16px;
    }
  }

  &-body {
    overflow: auto;
    height: 100%;
  }

  &-design {
    margin-top: 16px;
    transform-origin: 0 0 !important;
  }
}

.dark {
  .workflow {
    &-affix {
      .header {
        box-shadow: 0 1px 4px rgba(255, 255, 255, 0.08);
        background-color: #121212;
      }
    }
  }
}
</style>
