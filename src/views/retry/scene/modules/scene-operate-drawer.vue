<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import { fetchAddRetryScene, fetchEditRetryScene } from '@/service/api';
import { enableStatus01Options } from '@/constants/business';

defineOptions({
  name: 'SceneOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.RetryScene.Scene | null;
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
    backOff: 0,
    maxRetryCount: 0,
    triggerInterval: '',
    deadlineRequest: 0,
    executorTimeout: 0,
    description: '',
    routeKey: 0
  };
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

const rules: Record<RuleKey, App.Global.FormRule> = {
  groupName: defaultRequiredRule,
  sceneName: defaultRequiredRule,
  sceneStatus: defaultRequiredRule,
  backOff: defaultRequiredRule,
  maxRetryCount: defaultRequiredRule,
  triggerInterval: defaultRequiredRule,
  deadlineRequest: defaultRequiredRule,
  executorTimeout: defaultRequiredRule,
  routeKey: defaultRequiredRule
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
      <NFormItem :label="$t('page.retryScene.groupName')" path="groupName">
        <NInput v-model:value="model.groupName" :placeholder="$t('page.retryScene.form.groupName')" />
      </NFormItem>
      <NFormItem :label="$t('page.retryScene.sceneName')" path="sceneName">
        <NInput v-model:value="model.sceneName" :placeholder="$t('page.retryScene.form.sceneName')" />
      </NFormItem>
      <NFormItem :label="$t('page.retryScene.sceneStatus')" path="sceneStatus">
        <NRadioGroup v-model:value="model.sceneStatus" name="sceneStatus">
          <NSpace>
            <NRadio
              v-for="item in enableStatus01Options"
              :key="item.value"
              :value="item.value"
              :label="$t(item.label)"
            />
          </NSpace>
        </NRadioGroup>
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
