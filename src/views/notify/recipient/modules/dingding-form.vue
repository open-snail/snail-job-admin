<script setup lang="ts">
import { reactive } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'DingDingForm'
});

interface Emits {
  (e: 'fetchAdd', model: Api.NotifyRecipient.NotifyRecipient): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

type Model = Pick<
  Api.NotifyRecipient.DingDingNotify,
  'id' | 'recipientName' | 'notifyType' | 'webhookUrl' | 'ats' | 'description'
>;
const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: '',
    recipientName: '',
    notifyType: 1,
    webhookUrl: '',
    ats: [],
    description: ''
  };
}

type RuleKey = Extract<keyof Model, 'recipientName' | 'notifyType' | 'webhookUrl' | 'ats' | 'description'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  recipientName: defaultRequiredRule,
  notifyType: defaultRequiredRule,
  description: defaultRequiredRule,
  webhookUrl: defaultRequiredRule,
  ats: defaultRequiredRule
};

const buildNotifyAttribute = (webhookUrl: string, ats: string[]) => {
  return JSON.stringify({ webhookUrl, ats });
};

async function save() {
  await validate();
  const { id, recipientName, notifyType, webhookUrl, ats, description } = model;
  const notifyAttribute = buildNotifyAttribute(webhookUrl, ats);
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
    <NFormItem :label="$t('page.notifyRecipient.webhookUrl')" path="webhookUrl">
      <NInput v-model:value="model.webhookUrl" :placeholder="$t('page.notifyRecipient.form.webhookUrl')" />
    </NFormItem>
    <NFormItem :label="$t('page.notifyRecipient.ats')" path="ats">
      <NDynamicTags v-model:value="model.ats" :placeholder="$t('page.notifyRecipient.form.dingdingAts')" />
    </NFormItem>
  </NForm>
</template>

<style scoped></style>
