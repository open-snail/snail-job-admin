<script setup lang="ts">
import { ref, watch } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
import CodeMirror from 'vue-codemirror6';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import EditableInput from '@/components/common/editable-input.vue';
import { fetchCheckNodeExpression } from '@/service/api';
import { expressionOptions } from '@/constants/business';

defineOptions({
  name: 'BranchDrawer'
});

interface Props {
  open?: boolean;
  len?: number;
  modelValue?: Workflow.ConditionNodeType;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  len: 0,
  modelValue: () => ({})
});

interface Emits {
  (e: 'update:open', open: boolean): void;
  (e: 'save', form: Workflow.NodeDataType): void;
}

const emit = defineEmits<Emits>();

const drawer = ref<boolean>(false);
const form = ref<Workflow.ConditionNodeType>({
  decision: {
    logicalCondition: 1,
    expressionType: 1
  }
});

const theme = ref({
  '.cm-line': {
    fontSize: '18px'
  },
  '.cm-scroller': {
    height: '500px',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
});

watch(
  () => props.open,
  val => {
    drawer.value = val;
  },
  { immediate: true }
);

watch(
  () => props.modelValue,
  val => {
    form.value = val;
  },
  { immediate: true, deep: true }
);

const formRef = ref<FormInst>();

const close = () => {
  emit('update:open', false);
  drawer.value = false;
};

const save = () => {
  formRef.value
    ?.validate(errors => {
      if (!errors) {
        close();
        emit('save', form.value);
      }
    })
    .catch(() => window.$message?.warning('请检查表单信息'));
};

const checkNodeExpression = async () => {
  if (!form.value.decision?.nodeExpression) {
    return Promise.reject(new Error('请填写条件表达式'));
  }
  const { error, data } = await fetchCheckNodeExpression(form.value.decision!);
  if (!error) {
    if (data.key !== 1) {
      return Promise.reject(data.value ?? '请检查条件表达式');
    }
  }
  return Promise.resolve();
};

const rules: FormRules = {
  decision: {
    logicalCondition: [{ required: true, message: '请选择判定逻辑', trigger: 'change', type: 'number' }],
    expressionType: [{ required: true, message: '请选择表达式类型', trigger: 'change', type: 'number' }],
    nodeExpression: [{ required: true, validator: checkNodeExpression, trigger: 'blur' }]
  }
};
</script>

<template>
  <NDrawer v-model:show="drawer" display-directive="if" :width="500" @after-leave="close">
    <NDrawerContent>
      <template #header>
        <div class="w-460px flex-center">
          <EditableInput v-model="form.nodeName" class="mr-16px max-w-320px min-w-320px" />

          <NSelect
            v-model:value="form.priorityLevel"
            class="max-w-110px"
            :options="
              Array(len)
                .fill(0)
                .map((_, index) => {
                  return {
                    label: '优先级 ' + (index + 1),
                    value: index + 1
                  };
                })
            "
          />
        </div>
      </template>

      <NForm ref="formRef" :rules="rules" :model="form" label-align="left" label-width="100px">
        <NFormItem path="decision.expressionType" label="表达式类型">
          <NRadioGroup v-model:value="form.decision!.expressionType">
            <NSpace>
              <NRadio
                v-for="strategy in expressionOptions"
                :key="strategy.value"
                :label="strategy.label"
                :value="strategy.value"
              />
            </NSpace>
          </NRadioGroup>
        </NFormItem>
        <NFormItem path="decision.nodeExpression" label="条件表达式">
          <CodeMirror
            v-model="form.decision!.nodeExpression"
            class="sj-code-mirror"
            :theme="theme"
            basic
            :lang="javascript()"
            :extensions="[oneDark]"
          />
        </NFormItem>
      </NForm>

      <template #footer>
        <NButton type="primary" @click="save">保存</NButton>
        <NButton class="ml-12px" @click="close">取消</NButton>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped lang="scss">
.drawer-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<style>
.sj-code-mirror {
  width: 100%;

  .cm-scroller::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .cm-scroller::-webkit-scrollbar-thumb {
    background: #9c9c9c9c;
    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  }

  .cm-scroller::-webkit-scrollbar-track {
    background: #282c34;
  }
}
</style>
