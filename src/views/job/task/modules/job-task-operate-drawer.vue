<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import CronInput from '@sa/cron-input';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import { enableStatusNumberOptions } from '@/constants/business';
import { fetchAddJob, fetchEditJob } from '@/service/api';
import RouteKey from '@/components/common/route-key.vue';
import ExecutorType from '@/components/common/executor-type.vue';
import TaskType from '@/components/common/task-type.vue';
import CodeMirror from '@/components/common/code-mirror.vue';

defineOptions({
  name: 'JobTaskOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Job.Job | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});
// const argsTags = ref<string[]>([]);
const dynamicForm = reactive({
  args: [{ arg: '' }]
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.jobTask.addJobTask'),
    edit: $t('page.jobTask.editJobTask')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.Job.Job,
  | 'id'
  | 'groupName'
  | 'jobName'
  | 'argsStr'
  | 'argsType'
  | 'jobStatus'
  | 'routeKey'
  | 'executorType'
  | 'executorInfo'
  | 'triggerType'
  | 'triggerInterval'
  | 'blockStrategy'
  | 'executorTimeout'
  | 'maxRetryTimes'
  | 'retryInterval'
  | 'taskType'
  | 'parallelNum'
  | 'description'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    groupName: '',
    jobName: '',
    argsStr: '',
    argsType: 1,
    jobStatus: 1,
    routeKey: 1,
    executorType: 1,
    triggerType: 2,
    executorInfo: '',
    triggerInterval: '60',
    blockStrategy: 1,
    executorTimeout: 60,
    maxRetryTimes: 3,
    retryInterval: 1,
    taskType: 1,
    parallelNum: 1,
    description: ''
  };
}

type RuleKey = Extract<
  keyof Model,
  | 'groupName'
  | 'jobName'
  | 'argsType'
  | 'jobStatus'
  | 'routeKey'
  | 'executorType'
  | 'triggerType'
  | 'executorInfo'
  | 'triggerInterval'
  | 'blockStrategy'
  | 'executorTimeout'
  | 'maxRetryTimes'
  | 'retryInterval'
  | 'taskType'
  | 'parallelNum'
>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  groupName: defaultRequiredRule,
  jobName: defaultRequiredRule,
  argsType: defaultRequiredRule,
  jobStatus: defaultRequiredRule,
  routeKey: defaultRequiredRule,
  executorType: defaultRequiredRule,
  executorInfo: defaultRequiredRule,
  triggerType: defaultRequiredRule,
  triggerInterval: defaultRequiredRule,
  blockStrategy: defaultRequiredRule,
  executorTimeout: defaultRequiredRule,
  maxRetryTimes: defaultRequiredRule,
  retryInterval: defaultRequiredRule,
  taskType: defaultRequiredRule,
  parallelNum: defaultRequiredRule
};

function handleUpdateModelWhenEdit() {
  if (props.operateType === 'add') {
    Object.assign(model, createDefaultModel());
    return;
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
    if (model.taskType === 3 && model.argsStr) {
      Object.assign(dynamicForm, {
        args: JSON.parse(model.argsStr).map((item: string) => {
          return { arg: item };
        })
      });
    }
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();

  if (props.operateType === 'add') {
    const {
      groupName,
      jobName,
      argsType,
      jobStatus,
      routeKey,
      executorType,
      executorInfo,
      triggerType,
      triggerInterval,
      blockStrategy,
      executorTimeout,
      maxRetryTimes,
      retryInterval,
      taskType,
      parallelNum,
      description
    } = model;
    const { error } = await fetchAddJob({
      groupName,
      jobName,
      argsStr: parseArgsStr(),
      argsType,
      jobStatus,
      routeKey,
      executorType,
      executorInfo,
      triggerType,
      triggerInterval,
      blockStrategy,
      executorTimeout,
      maxRetryTimes,
      retryInterval,
      taskType,
      parallelNum,
      description
    });
    if (error) return;
    window.$message?.success($t('common.addSuccess'));
  }

  if (props.operateType === 'edit') {
    const {
      id,
      groupName,
      jobName,
      argsType,
      jobStatus,
      routeKey,
      executorType,
      executorInfo,
      triggerType,
      triggerInterval,
      blockStrategy,
      executorTimeout,
      maxRetryTimes,
      retryInterval,
      taskType,
      parallelNum,
      description
    } = model;
    const { error } = await fetchEditJob({
      id,
      groupName,
      jobName,
      argsStr: parseArgsStr(),
      argsType,
      jobStatus,
      routeKey,
      executorType,
      executorInfo,
      triggerType,
      triggerInterval,
      blockStrategy,
      executorTimeout,
      maxRetryTimes,
      retryInterval,
      taskType,
      parallelNum,
      description
    });
    if (error) return;
    window.$message?.success($t('common.updateSuccess'));
  }

  closeDrawer();
  emit('submitted');
}

function parseArgsStr() {
  if (model.taskType === 3 && dynamicForm.args) {
    return JSON.stringify(dynamicForm.args.map(item => item.arg));
  }
  return model.argsStr;
}

const removeItem = (index: number) => {
  dynamicForm.args.splice(index, 1);
};

const addItem = () => {
  dynamicForm.args.push({ arg: '' });
};

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
      <NFormItem :label="$t('page.jobTask.jobName')" path="jobName">
        <NInput
          v-model:value="model.jobName"
          :maxlength="64"
          show-count
          :placeholder="$t('page.jobTask.form.jobName')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.jobTask.groupName')" path="groupName">
        <SelectGroup v-model:value="model.groupName" />
      </NFormItem>
      <NFormItem :label="$t('page.jobTask.jobStatus')" path="jobStatus">
        <NRadioGroup v-model:value="model.jobStatus" name="jobStatus">
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
      <NFormItem :label="$t('page.jobTask.executorType')" path="executorType">
        <ExecutorType v-model:value="model.executorType" />
      </NFormItem>
      <NFormItem :label="$t('page.jobTask.executorInfo')" path="executorInfo">
        <NInput v-model:value="model.executorInfo" :placeholder="$t('page.jobTask.form.executorInfo')" />
      </NFormItem>
      <NFormItem :label="$t('page.jobTask.taskType')" path="taskType">
        <TaskType v-model:value="model.taskType" :placeholder="$t('page.jobTask.form.taskType')" />
      </NFormItem>
      <NFormItem
        :label="$t('page.jobTask.argsStr')"
        path="argsStr"
        :rule="model.taskType === 3 ? defaultRequiredRule : undefined"
      >
        <NCard v-if="model.taskType === 3" class="flex-col">
          <NFormItem
            v-for="(item, index) in dynamicForm.args"
            :key="index"
            :label="`分片参数 ${index + 1}`"
            :path="`args[${index}].arg`"
            :show-feedback="false"
            class="m-b-12px"
            :rule="{
              required: true,
              message: `${$t('page.jobTask.form.argsStr')} ${index + 1}`,
              trigger: ['input', 'blur'],
              validator() {
                return !!item.arg;
              }
            }"
          >
            <CodeMirror v-model="item.arg" lang="json" :placeholder="$t('page.jobTask.form.argsStr')" />
            <NButton class="ml-12px" type="error" dashed @click="removeItem(index)">
              <icon-ic-round-delete class="text-icon" />
            </NButton>
          </NFormItem>
          <NButton block dashed attr-type="button" @click="addItem"><icon-ic-round-plus class="text-icon" /></NButton>
        </NCard>
        <CodeMirror v-else v-model="model.argsStr" lang="json" :placeholder="$t('page.jobTask.form.argsStr')" />
      </NFormItem>
      <NFormItem :label="$t('page.jobTask.routeKey')" path="routeKey">
        <RouteKey v-model:value="model.routeKey" :task-type="model.taskType" />
      </NFormItem>
      <NFormItem :label="$t('page.jobTask.blockStrategy')" path="blockStrategy">
        <BlockStrategy v-model:value="model.blockStrategy" />
      </NFormItem>
      <NFormItem :label="$t('page.jobTask.triggerType')" path="triggerType">
        <TriggerType
          v-model:value="model.triggerType"
          :placeholder="$t('page.jobTask.form.triggerType')"
          @update:value="model.triggerInterval = ''"
        />
      </NFormItem>
      <NFormItem :label="$t('page.jobTask.triggerInterval')" path="triggerInterval">
        <NInput
          v-if="model.triggerType === 2"
          v-model:value="model.triggerInterval"
          :placeholder="$t('page.jobTask.form.triggerInterval')"
        />
        <CronInput
          v-else-if="model.triggerType === 3"
          v-model:value="model.triggerInterval"
          :placeholder="$t('page.jobTask.form.triggerInterval_CRON')"
        />
        <NInput v-else-if="model.triggerType === 99" v-model:value="model.triggerInterval" disabled />
      </NFormItem>
      <NFormItem :label="$t('page.jobTask.executorTimeout')" path="executorTimeout">
        <NInputNumber
          v-model:value="model.executorTimeout"
          :min="1"
          :max="60"
          :placeholder="$t('page.jobTask.form.executorTimeout')"
          clearable
        />
      </NFormItem>
      <NFormItem :label="$t('page.jobTask.maxRetryTimes')" path="maxRetryTimes">
        <NInputNumber
          v-model:value="model.maxRetryTimes"
          :min="1"
          :max="60"
          :placeholder="$t('page.jobTask.form.maxRetryTimes')"
          clearable
        />
      </NFormItem>
      <NFormItem :label="$t('page.jobTask.retryInterval')" path="retryInterval">
        <NInputNumber
          v-model:value="model.retryInterval"
          :min="1"
          :max="60"
          :placeholder="$t('page.jobTask.form.retryInterval')"
          clearable
        />
      </NFormItem>
      <NFormItem :label="$t('page.jobTask.parallelNum')" path="parallelNum">
        <NInputNumber
          v-model:value="model.parallelNum"
          :min="1"
          :max="60"
          :placeholder="$t('page.jobTask.form.parallelNum')"
          clearable
        />
      </NFormItem>
      <NFormItem :label="$t('page.jobTask.description')" path="description">
        <NInput v-model:value="model.description" type="textarea" :placeholder="$t('page.jobTask.form.description')" />
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
