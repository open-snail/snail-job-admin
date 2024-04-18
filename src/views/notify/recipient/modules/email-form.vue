<script setup lang="ts">
import { reactive } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'LarkForm'
});

interface Emits {
  (e: 'fetchAdd', model: Api.NotifyRecipient.NotifyRecipient): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

type Model = Pick<Api.NotifyRecipient.EmailNotify, 'id' | 'recipientName' | 'notifyType' | 'tos' | 'description'>;
const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: '',
    recipientName: '',
    notifyType: 2,
    tos: [],
    description: ''
  };
}

type RuleKey = Extract<keyof Model, 'recipientName' | 'notifyType' | 'tos' | 'description'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  recipientName: defaultRequiredRule,
  notifyType: defaultRequiredRule,
  description: defaultRequiredRule,
  tos: defaultRequiredRule
};

const buildNotifyAttribute = (tos: string[]) => {
  return JSON.stringify({ tos });
};

async function save() {
  await validate();
  const { id, recipientName, notifyType, tos, description } = model;
  const notifyAttribute = buildNotifyAttribute(tos);
  emit('fetchAdd', { id, recipientName, notifyType, notifyAttribute, description });
}

defineExpose({
  save
});
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules">
    <NFormItem :label="$t('page.notifyRecipient.recipientName')" path="recipientName">
      <NInput v-model:value="model.recipientName" :placeholder="$t('page.notifyRecipient.form.recipientName')" />
    </NFormItem>
    <NFormItem :label="$t('page.notifyRecipient.tos')" path="tos">
      <NDynamicTags v-model:value="model.tos" />
    </NFormItem>
    <NFormItem :label="$t('page.notifyRecipient.description')" path="description">
      <NInput
        v-model:value="model.description"
        type="textarea"
        :placeholder="$t('page.notifyRecipient.form.description')"
        round
        clearable
      />
    </NFormItem>
  </NForm>
</template>

<style scoped></style>
