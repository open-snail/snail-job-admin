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

type Model = Pick<
  Api.NotifyRecipient.DingDingNotify,
  'id' | 'recipientName' | 'notifyType' | 'webhookUrl' | 'ats' | 'description'
>;
const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: '',
    recipientName: '',
    notifyType: 4,
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
      <NInput
        v-model:value="model.recipientName"
        :placeholder="$t('page.notifyRecipient.form.recipientName')"
        clearable
      />
    </NFormItem>
    <NFormItem :label="$t('page.notifyRecipient.webhookUrl')" path="webhookUrl">
      <NInput v-model:value="model.webhookUrl" :placeholder="$t('page.notifyRecipient.form.webhookUrl')" clearable />
    </NFormItem>
    <NFormItem path="ats">
      <template #label>
        <a href="#">
          <NTooltip trigger="hover">
            <template #trigger>
              {{ $t('page.notifyRecipient.ats') }}
            </template>
            {{ $t('page.notifyRecipient.form.larkAts') }}
          </NTooltip>
        </a>
      </template>
      <NDynamicTags v-model:value="model.ats" />
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
