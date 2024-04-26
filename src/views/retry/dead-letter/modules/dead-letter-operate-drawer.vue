<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import { fetchDeleteRetryDeadLetter, fetchRollbackRetryDeadLetter } from '@/service/api';

defineOptions({
  name: 'RetryDeadLetterOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.RetryDeadLetter.DeadLetter | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.retryScene.addScene'),
    edit: $t('page.retryScene.editScene')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.RetryDeadLetter.RetryDeadLetterSearchParams,
  'id' | 'uniqueId' | 'groupName' | 'sceneName' | 'idempotentId' | 'bizNo' | 'taskType' | 'createDt'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: '',
    uniqueId: '',
    groupName: '',
    sceneName: '',
    idempotentId: '',
    bizNo: '',
    taskType: 1,
    createDt: ''
  };
}

type RuleKey = Extract<
  keyof Model,
  'id' | 'groupName' | 'sceneName' | 'idempotentId' | 'bizNo' | 'taskType' | 'createDt'
>;

const rules = {
  id: [defaultRequiredRule],
  groupName: [defaultRequiredRule],
  sceneName: [
    defaultRequiredRule,
    {
      required: true,
      pattern: /^[A-Za-z0-9_]{1,64}$/,
      trigger: 'change',
      message: $t('page.retryScene.form.sceneName2')
    }
  ],
  idempotentId: [defaultRequiredRule],
  bizNo: [defaultRequiredRule],
  taskType: [defaultRequiredRule],
  createDt: [defaultRequiredRule]
} satisfies Record<RuleKey, App.Global.FormRule[]>;

function handleUpdateModelWhenEdit() {
  if (props.operateType === 'add') {
    Object.assign(model, createDefaultModel());
    return;
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  if (props.operateType === 'edit') {
    const { id } = model;
    const { error } = await fetchRollbackRetryDeadLetter({ id });
    if (error) return;
  }

  if (props.operateType === 'add') {
    const { id } = model;
    const { error } = await fetchDeleteRetryDeadLetter({ id });
    if (error) return;
  }

  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleUpdateModelWhenEdit();
    restoreValidation();
  }
});
</script>

<template>
  <OperateDrawer v-model="visible" :title="title" @handle-submit="handleSubmit">
    <NForm ref="formRef" :model="model" :rules="rules"></NForm>
    <template #footer>
      <NSpace :size="16">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.save') }}</NButton>
      </NSpace>
    </template>
  </OperateDrawer>
</template>

<style scoped></style>
