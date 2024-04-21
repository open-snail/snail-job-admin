<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import { fetchAddNotify, fetchEditNotify, fetchGetAllGroupNameList, fetchGetNotifyRecipientList } from '@/service/api';
import {
  enableStatus01Options,
  jobNotifySceneOptions,
  retryNotifySceneOptions,
  systemTaskTypeOptions
} from '@/constants/business';
import { translateOptions, translateOptions2 } from '@/utils/common';

defineOptions({
  name: 'NotifyConfigOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.NotifyConfig.NotifyConfig | null;
}

const groupNameList = ref<string[]>([]);
const notifyRecipientList = ref<CommonType.Option<number>[]>([]);
const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const options = defineModel<CommonType.Option<string | number>[]>('options', {
  default: translateOptions(retryNotifySceneOptions)
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.notifyConfig.addNotifyConfig'),
    edit: $t('page.notifyConfig.editNotifyConfig')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.NotifyConfig.NotifyConfig,
  | 'id'
  | 'groupName'
  | 'businessId'
  | 'notifyRecipientIds'
  | 'systemTaskType'
  | 'notifyStatus'
  | 'notifyScene'
  | 'notifyThreshold'
  | 'rateLimiterStatus'
  | 'rateLimiterThreshold'
  | 'description'
>;

onMounted(() => {
  nextTick(() => {
    getGroupNameList();
    getNotifyRecipientList();
  });
});

async function getGroupNameList() {
  const res = await fetchGetAllGroupNameList();
  groupNameList.value = res.data as string[];
}

async function getNotifyRecipientList() {
  const res = await fetchGetNotifyRecipientList();
  notifyRecipientList.value = res.data as CommonType.Option<number>[];
}

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    groupName: '',
    businessId: '',
    notifyRecipientIds: 0,
    systemTaskType: 1,
    notifyStatus: 1,
    notifyScene: '',
    notifyThreshold: 0,
    rateLimiterStatus: 0,
    rateLimiterThreshold: 0,
    description: ''
  };
}

type RuleKey = Extract<
  keyof Model,
  | 'groupName'
  | 'businessId'
  | 'notifyRecipientIds'
  | 'notifyStatus'
  | 'notifyScene'
  | 'rateLimiterStatus'
  | 'notifyThreshold'
>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  groupName: defaultRequiredRule,
  businessId: defaultRequiredRule,
  notifyStatus: defaultRequiredRule,
  notifyScene: defaultRequiredRule,
  notifyRecipientIds: defaultRequiredRule,
  rateLimiterStatus: defaultRequiredRule,
  notifyThreshold: defaultRequiredRule
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
      businessId,
      notifyRecipientIds,
      systemTaskType,
      notifyStatus,
      notifyScene,
      notifyThreshold,
      rateLimiterStatus,
      rateLimiterThreshold,
      description
    } = model;
    const { error } = await fetchAddNotify({
      groupName,
      businessId,
      notifyRecipientIds,
      systemTaskType,
      notifyStatus,
      notifyScene,
      notifyThreshold,
      rateLimiterStatus,
      rateLimiterThreshold,
      description
    });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const {
      id,
      groupName,
      businessId,
      notifyRecipientIds,
      notifyStatus,
      systemTaskType,
      notifyScene,
      notifyThreshold,
      rateLimiterStatus,
      rateLimiterThreshold,
      description
    } = model;
    const { error } = await fetchEditNotify({
      id,
      groupName,
      businessId,
      notifyRecipientIds,
      systemTaskType,
      notifyStatus,
      notifyScene,
      notifyThreshold,
      rateLimiterStatus,
      rateLimiterThreshold,
      description
    });
    if (error) return;
  }
  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

function systemTaskTypeChange(value: string) {
  if (value === '1') {
    options.value = translateOptions(retryNotifySceneOptions);
  } else if (value === '3') {
    options.value = translateOptions(jobNotifySceneOptions);
  }

  model.notifyScene = '';
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
      <NFormItem :label="$t('page.notifyConfig.groupName')" path="groupName">
        <NSelect
          v-model:value="model.groupName"
          :placeholder="$t('page.notifyConfig.form.groupName')"
          :options="translateOptions2(groupNameList)"
          clearable
        />
      </NFormItem>
      <NFormItem :label="$t('page.notifyConfig.notifyStatus')" path="notifyStatus">
        <NRadioGroup v-model:value="model.notifyStatus" name="notifyStatus">
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
      <NFormItem :label="$t('page.notifyConfig.systemTaskType')" path="systemTaskType">
        <NSelect
          v-model:value="model.systemTaskType"
          :placeholder="$t('page.notifyConfig.form.systemTaskType')"
          :options="translateOptions(systemTaskTypeOptions)"
          clearable
          @update:value="systemTaskTypeChange"
        />
      </NFormItem>
      <NFormItem :label="$t('page.notifyConfig.notifyScene')" path="notifyScene">
        <NSelect
          v-model:value="model.notifyScene"
          :placeholder="$t('page.notifyConfig.form.notifyScene')"
          :options="options"
          clearable
        />
      </NFormItem>
      <NFormItem :label="$t('page.notifyConfig.notifyRecipient')" path="notifyRecipientIds">
        <NSelect
          v-model:value="model.notifyRecipientIds"
          :placeholder="$t('page.notifyConfig.form.notifyRecipient')"
          :options="notifyRecipientList"
          clearable
          multiple
        />
      </NFormItem>
      <NFormItem :label="$t('page.notifyConfig.rateLimiterStatus')" path="rateLimiterStatus">
        <NRadioGroup v-model:value="model.rateLimiterStatus" name="rateLimiterStatus">
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
      <NFormItem :label="$t('page.notifyConfig.rateLimiterThreshold')" path="rateLimiterThreshold">
        <NInputNumber
          v-model:value="model.rateLimiterThreshold"
          :placeholder="$t('page.notifyConfig.form.rateLimiterThreshold')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.notifyConfig.notifyThreshold')" path="notifyThreshold">
        <NInputNumber
          v-model:value="model.notifyThreshold"
          :placeholder="$t('page.notifyConfig.form.notifyThreshold')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.notifyConfig.description')" path="description">
        <NInput
          v-model:value="model.description"
          type="textarea"
          :placeholder="$t('page.notifyConfig.form.description')"
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
