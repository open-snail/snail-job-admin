<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import Vcode from 'vue3-puzzle-vcode';
import { useRoute } from 'vue-router';
import { md5 } from '@/utils/common';
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
  userName: 'developer',
  password: '123456'
});

type RuleKey = Extract<keyof FormModel, 'userName' | 'password'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  userName: defaultRequiredRule,
  password: defaultRequiredRule
};

async function handleSubmit() {
  const password = md5(model.password);
  await authStore.login(model.userName, password);
}

const codeShow = ref(false);

const validateCode = async () => {
  const { VITE_LOGIN_CODE } = import.meta.env;
  await validate();
  if (VITE_LOGIN_CODE === 'Y') {
    codeShow.value = true;
    return;
  }
  handleSubmit();
};

const onClose = () => {
  codeShow.value = false;
};

const onSuccess = () => {
  handleSubmit();
};

const route = useRoute();
const starred = ref<boolean>(false);

async function userStarred() {
  const accessToken = localStorage.getItem('gitee_access_token');
  if (!accessToken) {
    authorize();
    return;
  }
  const response = await fetch(`https://gitee.com/api/v5/user/starred/aizuda/snail-job?access_token=${accessToken}`);

  if (response.status === 401) {
    refreshTokenFn();
  }

  starred.value = response.status === 204;
}

function authorize() {
  const clientId = 'aae2edfddf290269fe0a756bc1c1ec1614e41dfabdb71c19322293e2b5179377';
  const redirectUri = 'https://preview.snailjob.opensnail.com/login';
  // const redirectUri = 'http://localhost:9527/login';
  location.href = `https://gitee.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=user_info`;
}

async function refreshTokenFn() {
  const refreshToken = localStorage.getItem('gitee_refresh_token');
  if (!refreshToken) {
    authorize();
    return;
  }

  const response = await fetch('https://gitee.com/oauth/token', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });

  if (response.status === 401) {
    localStorage.removeItem('gitee_access_token');
    localStorage.removeItem('gitee_refresh_token');
    authorize();
    return;
  }

  const res = await response.json();

  localStorage.setItem('gitee_access_token', res.access_token);
  localStorage.setItem('gitee_refresh_token', res.refresh_token);
  userStarred();
}

async function oauth2() {
  const code = route.query.code;
  if (!code) {
    return;
  }
  const response = await fetch('/api/oauth2/login', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ code })
  });

  const res = await response.json();

  if (res.code !== 200) {
    authorize();
    return;
  }

  const accessToken = res.data.access_token;
  const refreshToken = res.data.refresh_token;
  localStorage.setItem('gitee_access_token', accessToken);
  localStorage.setItem('gitee_refresh_token', refreshToken);
}

function handleVisibilitychange() {
  const state = document.visibilityState;
  if (state === 'visible') {
    userStarred();
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilitychange);
});

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilitychange);
});

async function init() {
  await oauth2();
  await userStarred();
}

init();
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false" @keydown.enter="handleSubmit">
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
      <div v-if="!starred" class="flex-col-center justify-between">
        <div>
          💖 如果您喜欢 Snail Job，请给它一个
          <NA href="https://gitee.com/aizuda/snail-job" target="_blank" rel="noopener noreferrer">&ensp;Star&ensp;</NA>
          ，
        </div>
        <div>您的支持将是我们前行的动力。 👨‍💻👨‍💻👨‍💻</div>
      </div>
      <NPopover :show="codeShow" row>
        <template #trigger>
          <NButton
            :disabled="!starred"
            type="primary"
            size="large"
            round
            block
            :loading="authStore.loginLoading"
            @click="validateCode"
          >
            {{ $t('page.login.common.login') }}
          </NButton>
        </template>
        <NCard :title="$t('page.login.common.codeTip')" :header-style="{ padding: '10px 24px' }">
          <template #header-extra>
            <NButton text @click="onClose">
              <template #icon>
                <SvgIcon local-icon="close" />
              </template>
            </NButton>
          </template>
          <Vcode type="inside" show @success="onSuccess" @close="onClose" />
        </NCard>
      </NPopover>
    </NSpace>
  </NForm>
</template>

<style scoped>
:deep(.n-popover) {
  padding: 0 !important;
}
</style>
