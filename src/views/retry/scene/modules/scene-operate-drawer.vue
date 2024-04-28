<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import CronInput from '@sa/cron-input';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import RouteKey from '@/components/common/route-key.vue';
import { $t } from '@/locales';
import { fetchAddRetryScene, fetchEditRetryScene, fetchGetAllGroupNameList } from '@/service/api';
import { DelayLevel, backOffRecordOptions, enableStatusNumberOptions } from '@/constants/business';
import { translateOptions, translateOptions2 } from '@/utils/common';
import { useAppStore } from '@/store/modules/app';

defineOptions({
  name: 'SceneOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.RetryScene.Scene | null;
}

const app = useAppStore();
const groupNameList = ref<string[]>([]);
const delayLevelDesc = ref<string>('10s');

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
  Api.RetryScene.Scene,
  | 'id'
  | 'groupName'
  | 'sceneName'
  | 'sceneStatus'
  | 'backOff'
  | 'maxRetryCount'
  | 'triggerInterval'
  | 'deadlineRequest'
  | 'executorTimeout'
  | 'description'
  | 'routeKey'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    groupName: '',
    sceneName: '',
    sceneStatus: 1,
    backOff: 2,
    maxRetryCount: 1,
    triggerInterval: 60,
    deadlineRequest: 60000,
    executorTimeout: 60,
    description: '',
    routeKey: 4
  };
}

onMounted(() => {
  nextTick(() => {
    getGroupNameList();
  });
});

async function getGroupNameList() {
  const res = await fetchGetAllGroupNameList();
  groupNameList.value = res.data as string[];
}

type RuleKey = Extract<
  keyof Model,
  | 'groupName'
  | 'sceneName'
  | 'sceneStatus'
  | 'backOff'
  | 'maxRetryCount'
  | 'triggerInterval'
  | 'deadlineRequest'
  | 'executorTimeout'
  | 'routeKey'
>;

const rules = {
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
  sceneStatus: [defaultRequiredRule],
  backOff: [defaultRequiredRule],
  maxRetryCount: [defaultRequiredRule],
  triggerInterval: [defaultRequiredRule],
  deadlineRequest: [defaultRequiredRule],
  executorTimeout: [defaultRequiredRule],
  routeKey: [defaultRequiredRule]
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
  if (props.operateType === 'add') {
    const {
      groupName,
      sceneName,
      sceneStatus,
      backOff,
      maxRetryCount,
      triggerInterval,
      deadlineRequest,
      executorTimeout,
      routeKey,
      description
    } = model;
    fetchAddRetryScene({
      groupName,
      sceneName,
      sceneStatus,
      backOff,
      maxRetryCount,
      triggerInterval,
      deadlineRequest,
      executorTimeout,
      routeKey,
      description
    });
  }

  if (props.operateType === 'edit') {
    const {
      id,
      groupName,
      sceneName,
      sceneStatus,
      backOff,
      maxRetryCount,
      triggerInterval,
      deadlineRequest,
      executorTimeout,
      routeKey,
      description
    } = model;
    fetchEditRetryScene({
      id,
      groupName,
      sceneName,
      sceneStatus,
      backOff,
      maxRetryCount,
      triggerInterval,
      deadlineRequest,
      executorTimeout,
      routeKey,
      description
    });
  }
  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

function maxRetryCountUpdate(maxRetryCount: number) {
  if (model.backOff !== 1) {
    return;
  }
  let desc = '';
  for (let i = 1; i <= maxRetryCount; i += 1) {
    desc += `,${DelayLevel[i as keyof typeof DelayLevel]}`;
  }
  delayLevelDesc.value = desc.substring(1, desc.length);
}

watch(visible, () => {
  if (visible.value) {
    handleUpdateModelWhenEdit();
    restoreValidation();
  }
});

watch(
  () => model.maxRetryCount,
  () => {
    maxRetryCountUpdate(model.maxRetryCount);
  }
);
</script>

<template>
  <OperateDrawer v-model="visible" :title="title" @handle-submit="handleSubmit">
    <NForm ref="formRef" :model="model" :rules="rules">
      <NFormItem :label="$t('page.retryScene.sceneName')" path="sceneName">
        <NInput
          v-model:value="model.sceneName"
          :disabled="props.operateType === 'edit'"
          :maxlength="64"
          show-count
          :placeholder="$t('page.retryScene.form.sceneName')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.retryScene.groupName')" path="groupName">
        <NSelect
          v-model:value="model.groupName"
          :disabled="props.operateType === 'edit'"
          :placeholder="$t('page.retryScene.form.groupName')"
          :options="translateOptions2(groupNameList)"
          clearable
        />
      </NFormItem>
      <NFormItem :label="$t('common.routeKey.routeLabel')" path="routeKey">
        <RouteKey v-model:value="model.routeKey" />
      </NFormItem>
      <NFormItem :label="$t('page.retryScene.maxRetryCount')" path="maxRetryCount">
        <NInputNumber
          v-model:value="model.maxRetryCount"
          :min="1"
          :max="model.backOff === 1 ? 26 : 9999999"
          :placeholder="$t('page.retryScene.form.maxRetryCount')"
          clearable
        />
      </NFormItem>
      <NFormItem :label="$t('page.retryScene.executorTimeout')" path="executorTimeout">
        <NInputNumber
          v-model:value="model.executorTimeout"
          :min="1"
          :max="60"
          :placeholder="$t('page.retryScene.form.executorTimeout')"
          clearable
        />
      </NFormItem>
      <NFormItem :label="$t('page.retryScene.deadlineRequest')" path="deadlineRequest">
        <NInputNumber
          v-model:value="model.deadlineRequest"
          :min="100"
          :max="60000"
          :placeholder="$t('page.retryScene.form.deadlineRequest')"
          clearable
        />
      </NFormItem>
      <NFormItem :label="$t('page.retryScene.backOff')" path="backOff">
        <NSelect
          v-model:value="model.backOff"
          :placeholder="$t('page.retryScene.form.backOff')"
          :options="translateOptions(backOffRecordOptions)"
          clearable
        />
      </NFormItem>
      <NFormItem path="triggerInterval">
        <CronInput v-if="model.backOff === 3" v-model:value="model.triggerInterval as any" :lang="app.locale" />
        <NInputNumber
          v-else-if="model.backOff === 2 || model.backOff === 4"
          v-model:value="model.triggerInterval as any"
          :placeholder="$t('page.retryScene.form.triggerInterval')"
          clearable
        />
        <NInput v-else v-model:value="delayLevelDesc" type="textarea" :autosize="{ minRows: 1, maxRows: 3 }" readonly />
        <template #label>
          <div class="flex-center">
            {{ $t('page.retryScene.triggerInterval') }}
            <NTooltip v-if="model.backOff === 1" trigger="hover">
              <template #trigger>
                <NButton text class="ml-6px">
                  <SvgIcon icon="ant-design:info-circle-outlined" class="mb-1px text-16px" />
                </NButton>
              </template>
              10s,15s,30s,35s,40s,50s,1m,2m,4m,6m,8m,10m,20m,40m,1h,2h,3h,4h,5h,6h,7h,8h,9h,10h,11h,12h
            </NTooltip>
          </div>
        </template>
      </NFormItem>
      <NFormItem :label="$t('page.retryScene.sceneStatus')" path="sceneStatus">
        <NRadioGroup v-model:value="model.sceneStatus" name="sceneStatus">
          <NSpace>
            <NRadio
              v-for="item in enableStatusNumberOptions"
              :key="item.value"
              :value="item.value"
              :label="$t(item.label)"
            />
          </NSpace>
        </NRadioGroup>
      </NFormItem>
      <NFormItem :label="$t('page.retryScene.description')" path="description">
        <NInput
          v-model:value="model.description"
          type="textarea"
          :maxlength="256"
          :placeholder="$t('page.retryScene.form.description')"
          show-count
          clearable
        />
      </NFormItem>
    </NForm>
    <template #footer>
      <NSpace :size="16">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.save') }}</NButton>
      </NSpace>
    </template>
  </OperateDrawer>
</template>

<style scoped></style>
