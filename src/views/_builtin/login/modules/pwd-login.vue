<script setup lang="ts">
import { reactive } from 'vue';
import { Md5 } from 'ts-md5';
import { $t } from '@/locales';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useAuthStore } from '@/store/modules/auth';

defineOptions({
  name: 'PwdLogin'
});

const authStore = useAuthStore();
const { formRef, validate } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

interface FormModel {
  userName: string;
  password: string;
}

const model: FormModel = reactive({
  userName: 'admin',
  password: '654321'
});

type RuleKey = Extract<keyof FormModel, 'userName' | 'password'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  userName: defaultRequiredRule,
  password: defaultRequiredRule
};

async function handleSubmit() {
  await validate();
  const md5 = new Md5();
  md5.appendAsciiStr(model.password);
  const password: string = md5.end() as string;
  await authStore.login(model.userName, password);
}
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <NFormItem path="userName">
      <NInput v-model:value="model.userName" :placeholder="$t('page.login.common.userNamePlaceholder')" />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </NFormItem>
    <NSpace vertical :size="24">
      <NButton type="primary" size="large" round block :loading="authStore.loginLoading" @click="handleSubmit">
        {{ $t('page.login.common.login') }}
      </NButton>
    </NSpace>
  </NForm>
</template>

<style scoped></style>
