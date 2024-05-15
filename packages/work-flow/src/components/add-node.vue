<script setup lang="ts">
import { $t } from '../locales';

defineOptions({
  name: 'AddNode'
});

interface Props {
  modelValue: Flow.NodeModelType;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
});

interface Emits {
  (e: 'update:modelValue', modelValue: Flow.NodeModelType): void;
}

const emit = defineEmits<Emits>();

const addType = (type: number) => {
  let node: Flow.NodeModelType = {};
  if (type === 1) {
    node = {
      nodeName: $t('node.task.nodeName'),
      nodeType: 1,
      conditionNodes: [
        {
          nodeName: $t('node.task.conditionNodes.nodeName'),
          failStrategy: 1,
          priorityLevel: 1,
          workflowNodeStatus: 1,
          jobTask: {
            jobId: undefined
          }
        }
      ],
      childNode: props.modelValue
    };
  } else if (type === 2) {
    node = {
      nodeName: $t('node.condition.nodeName'),
      nodeType: 2,
      conditionNodes: [
        {
          nodeName: `${$t('node.condition.conditionNodes.nodeName')}1`,
          priorityLevel: 1,
          decision: {
            expressionType: 1,
            nodeExpression: undefined,
            logicalCondition: 1,
            defaultDecision: 0
          }
        },
        {
          nodeName: $t('node.condition.conditionNodes.otherNodeName'),
          priorityLevel: 2,
          decision: {
            expressionType: 1,
            nodeExpression: '#true',
            logicalCondition: 1,
            defaultDecision: 1
          }
        }
      ],
      childNode: props.modelValue
    };
  } else if (type === 3) {
    node = {
      nodeName: $t('node.callback.nodeName'),
      nodeType: 3,
      conditionNodes: [
        {
          nodeName: $t('node.callback.conditionNodes.nodeName'),
          workflowNodeStatus: 1,
          callback: {
            webhook: undefined,
            contentType: undefined,
            secret: undefined
          }
        }
      ],
      childNode: props.modelValue
    };
  }
  emit('update:modelValue', node);
};
</script>

<template>
  <div class="add-node-btn-box">
    <div class="add-node-btn">
      <NPopover v-if="!disabled" placement="right-end" trigger="click" :overlay-style="{ width: '296px' }">
        <template #trigger>
          <NButton type="primary" circle strong>
            <icon-ant-design:plus-outlined />
          </NButton>
        </template>
        <div class="add-node-popover-body">
          <ul class="icon">
            <li>
              <NButton circle size="large" @click="addType(1)">
                <icon-ant-design:unordered-list-outlined class="text-20px color-#3296fa" />
              </NButton>
              <p>{{ $t('node.task.nodeName') }}</p>
            </li>
            <li>
              <NButton circle size="large" @click="addType(2)">
                <icon-ant-design:share-alt-outlined class="text-20px color-#15bc83" />
              </NButton>
              <p>{{ $t('node.condition.nodeName') }}</p>
            </li>
            <li>
              <NButton circle size="large" @click="addType(3)">
                <icon-ant-design:swap-outlined class="text-20px color-#935af6" />
              </NButton>
              <p>{{ $t('node.callback.nodeName') }}</p>
            </li>
          </ul>
        </div>
      </NPopover>
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;

  .anticon {
    font-size: 22px;
    justify-content: center;
    align-items: center;
  }

  p {
    margin-bottom: 0;
  }
}
</style>
