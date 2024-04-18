<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'GroupConfigOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.GroupConfig.GroupConfig | null;
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
    add: $t('page.groupConfig.addGroupConfig'),
    edit: $t('page.groupConfig.editGroupConfig')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.GroupConfig.GroupConfig, 'namespaceId'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    namespaceId: ''
  };
}

type RuleKey = Extract<keyof Model, 'namespaceId' | 'groupName'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  namespaceId: defaultRequiredRule
};

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
    <NForm ref="formRef" :model="model" :rules="rules">
      <NFormItem :label="$t('page.groupConfig.namespaceId')" path="namespaceId">
        <NInput v-model:value="model.namespaceId" :placeholder="$t('page.groupConfig.form.namespaceId')" />
      </NFormItem>
    </NForm>
  </OperateDrawer>
</template>

<style scoped></style>
