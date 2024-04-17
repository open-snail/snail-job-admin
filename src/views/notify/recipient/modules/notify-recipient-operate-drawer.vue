<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import { fetchAddNotifyRecipient, fetchEditNotifyRecipient } from '@/service/api';

defineOptions({
  name: 'NotifyRecipientOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.NotifyRecipient.NotifyRecipient | null;
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
    add: $t('page.notifyRecipient.addNotifyRecipient'),
    edit: $t('page.notifyRecipient.editNotifyRecipient')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.NotifyRecipient.NotifyRecipient,
  'id' | 'recipientName' | 'notifyType' | 'notifyAttribute' | 'description'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    recipientName: '',
    notifyType: '',
    notifyAttribute: '',
    description: ''
  };
}

type RuleKey = Extract<keyof Model, 'recipientName' | 'notifyType' | 'notifyAttribute' | 'description'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  recipientName: defaultRequiredRule,
  notifyType: defaultRequiredRule,
  notifyAttribute: defaultRequiredRule,
  description: defaultRequiredRule
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
  if (props.operateType === 'add') {
    const { recipientName, notifyAttribute, notifyType, description } = model;
    fetchAddNotifyRecipient({ recipientName, notifyAttribute, notifyType, description });
  }

  if (props.operateType === 'edit') {
    const { id, recipientName, notifyAttribute, notifyType, description } = model;
    fetchEditNotifyRecipient({ id, recipientName, notifyAttribute, notifyType, description });
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
    <NForm ref="formRef" :model="model" :rules="rules">
      <NFormItem :label="$t('page.notifyRecipient.recipientName')" path="recipientName">
        <NInput v-model:value="model.recipientName" :placeholder="$t('page.notifyRecipient.form.recipientName')" />
      </NFormItem>
      <NFormItem :label="$t('page.notifyRecipient.notifyType')" path="recipientName">
        <NSelect v-model:value="model.notifyType" :placeholder="$t('page.notifyRecipient.form.notifyType')" clearable />
      </NFormItem>
    </NForm>
  </OperateDrawer>
</template>

<style scoped></style>
