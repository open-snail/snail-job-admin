<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import {
  fetchAddNotify,
  fetchEditNotify,
  fetchGetJobList,
  fetchGetNotifyRecipientList,
  fetchGetRetrySceneList,
  fetchGetWorkflowNameList
} from '@/service/api';
import {
  enableStatusNumberOptions,
  jobNotifySceneOptions,
  retryNotifySceneOptions,
  systemTaskTypeOptions,
  workflowNotifySceneOptions
} from '@/constants/business';
import { translateOptions } from '@/utils/common';
import SelectGroup from '@/components/common/select-group.vue';

defineOptions({
  name: 'NotifyConfigOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.NotifyConfig.NotifyConfig | null;
}

const notifyRecipientList = ref<CommonType.Option<number>[]>([]);
const retryScenes = ref<Api.RetryScene.Scene[]>([]);
const jobs = ref<Api.Job.Job[]>([]);
const workflows = ref<Api.Workflow.Workflow[]>([]);

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const notifySceneOptions = ref<CommonType.Option<string | number>[]>(translateOptions(retryNotifySceneOptions));

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
    getNotifyRecipientList();
  });
});

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
    notifyScene: 1,
    notifyThreshold: 16,
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

async function systemTaskTypeChange(value: number) {
  if (value === 1) {
    const res = await fetchGetRetrySceneList({ groupName: model.groupName });
    retryScenes.value = res.data as Api.RetryScene.Scene[];
    notifySceneOptions.value = translateOptions(retryNotifySceneOptions);
  } else if (value === 3) {
    const res = await fetchGetJobList({ groupName: model.groupName });
    jobs.value = res.data as Api.Job.Job[];
    notifySceneOptions.value = translateOptions(jobNotifySceneOptions);
  } else if (value === 4) {
    const res = await fetchGetWorkflowNameList({ groupName: model.groupName });
    workflows.value = res.data as Api.Workflow.Workflow[];
    notifySceneOptions.value = translateOptions(workflowNotifySceneOptions);
  }

  model.businessId = '';
  model.notifyScene = null;
}

function groupNameUpdate(groupName: string) {
  handleUpdateModelWhenEdit();
  model.groupName = groupName;
  systemTaskTypeChange(1);
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
        <SelectGroup v-model:modelValue="model.groupName" @update:model-value="groupNameUpdate" />
      </NFormItem>
      <NFormItem :label="$t('page.notifyConfig.notifyStatus')" path="notifyStatus">
        <NRadioGroup v-model:value="model.notifyStatus" name="notifyStatus">
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
      <NFormItem :label="$t('page.notifyConfig.systemTaskType')" path="systemTaskType">
        <NSelect
          v-model:value="model.systemTaskType"
          :placeholder="$t('page.notifyConfig.form.systemTaskType')"
          :options="translateOptions(systemTaskTypeOptions)"
          clearable
          @update:value="systemTaskTypeChange"
        />
      </NFormItem>
      <NFormItem v-if="model.systemTaskType === 1" :label="$t('page.notifyConfig.retryScene')" path="businessId">
        <NSelect
          v-model:value="model.businessId"
          :placeholder="$t('page.notifyConfig.form.sceneName')"
          :options="retryScenes"
          label-field="sceneName"
          value-field="sceneName"
          clearable
        />
      </NFormItem>
      <NFormItem v-if="model.systemTaskType === 3" :label="$t('page.notifyConfig.job')" path="businessId">
        <NSelect
          v-model:value="model.businessId"
          :placeholder="$t('page.notifyConfig.form.jobName')"
          :options="jobs"
          label-field="jobName"
          value-field="id"
          clearable
        />
      </NFormItem>
      <NFormItem v-if="model.systemTaskType === 4" :label="$t('page.notifyConfig.workflow')" path="businessId">
        <NSelect
          v-model:value="model.businessId"
          :placeholder="$t('page.notifyConfig.form.workflowName')"
          :options="workflows"
          label-field="workflowName"
          value-field="id"
          clearable
        />
      </NFormItem>
      <NFormItem :label="$t('page.notifyConfig.notifyScene')" path="notifyScene">
        <NSelect
          v-model:value="model.notifyScene"
          :placeholder="$t('page.notifyConfig.form.notifyScene')"
          :options="notifySceneOptions"
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
              v-for="item in enableStatusNumberOptions"
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
          :min="1"
          :placeholder="$t('page.notifyConfig.form.rateLimiterThreshold')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.notifyConfig.notifyThreshold')" path="notifyThreshold">
        <NInputNumber
          v-model:value="model.notifyThreshold"
          :min="1"
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
