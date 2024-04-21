<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import CronInput from '@sa/cron-input';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import { fetchAddRetryScene, fetchEditRetryScene, fetchGetAllGroupNameList } from '@/service/api';
import {
  DelayLevel,
  backOffRecordOptions,
  enableStatusNumberOptions,
  routeKeyRecordOptions
} from '@/constants/business';
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
      <NFormItem :label="$t('page.retryScene.sceneName')" path="sceneName">
        <NInput
          v-model:value="model.sceneName"
          :disabled="props.operateType === 'edit'"
          :maxlength="64"
          show-count
          :placeholder="$t('page.retryScene.form.sceneName')"
        />
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
      <NFormItem :label="$t('page.retryScene.groupName')" path="groupName">
        <NSelect
          v-model:value="model.groupName"
          :disabled="props.operateType === 'edit'"
          :placeholder="$t('page.retryScene.form.groupName')"
          :options="translateOptions2(groupNameList)"
          clearable
        />
      </NFormItem>
      <NFormItem :label="$t('page.retryScene.routeKey')" path="routeKey">
        <NSelect
          v-model:value="model.routeKey"
          :placeholder="$t('page.retryScene.form.routeKey')"
          :options="translateOptions(routeKeyRecordOptions)"
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
      <NFormItem :label="$t('page.retryScene.triggerInterval')" path="triggerInterval">
        <CronInput v-if="model.backOff === 3" v-model:value="model.triggerInterval as any" :lang="app.locale" />
        <NInputNumber
          v-else-if="model.backOff === 2 || model.backOff === 4"
          v-model:value="model.triggerInterval as any"
          :placeholder="$t('page.retryScene.form.triggerInterval')"
          clearable
        />
        <div v-else>
          <NCollapse>
            <NCollapseItem title="间隔时间详情" name="1">
              <p v-for="(item, index) in model.maxRetryCount" :key="index">
                第{{ item }}次: {{ DelayLevel[item as keyof typeof DelayLevel] }}
              </p>
            </NCollapseItem>
          </NCollapse>
        </div>
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
          :max="3600"
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
