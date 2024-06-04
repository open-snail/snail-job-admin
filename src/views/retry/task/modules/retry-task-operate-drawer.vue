<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import { fetchAddRetryTask, fetchIdempotentIdGenerate } from '@/service/api';
import { translateOptions } from '@/utils/common';
import { retryTaskStatusTypeOptions } from '@/constants/business';
import CodeMirror from '@/components/common/code-mirror.vue';
import SelectGroup from '@/components/common/select-group.vue';
import SelectScene from '@/components/common/select-scene.vue';

defineOptions({
  name: 'RetryTaskOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.RetryTask.RetryTask | null;
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
    add: $t('page.retryTask.addRetryTask'),
    edit: $t('page.retryTask.editRetryTask')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.RetryTask.RetryTask,
  'groupName' | 'sceneName' | 'idempotentId' | 'bizNo' | 'executorName' | 'argsStr' | 'retryStatus'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    groupName: '',
    sceneName: '',
    idempotentId: '',
    bizNo: '',
    executorName: '',
    argsStr: '',
    retryStatus: 0
  };
}

type RuleKey = Extract<
  keyof Model,
  'groupName' | 'sceneName' | 'idempotentId' | 'bizNo' | 'executorName' | 'argsStr' | 'retryStatus'
>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  groupName: defaultRequiredRule,
  sceneName: defaultRequiredRule,
  idempotentId: defaultRequiredRule,
  bizNo: defaultRequiredRule,
  executorName: defaultRequiredRule,
  argsStr: defaultRequiredRule,
  retryStatus: defaultRequiredRule
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

  if (props.operateType === 'add') {
    const { groupName, sceneName, idempotentId, bizNo, executorName, argsStr, retryStatus } = model;
    const { error } = await fetchAddRetryTask({
      groupName,
      sceneName,
      idempotentId,
      bizNo,
      executorName,
      argsStr,
      retryStatus
    });
    if (error) return;
    window.$message?.success($t('common.addSuccess'));
  }

  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleUpdateModelWhenEdit();
    restoreValidation();
  }
});

async function setIdempotentId() {
  const groupName = model.groupName;
  const sceneName = model.sceneName;
  const executorName = model.executorName;
  const argsStr = model.argsStr;
  const { data: idempotentId, error } = await fetchIdempotentIdGenerate({
    groupName,
    sceneName,
    executorName,
    argsStr
  });
  if (!error) {
    model.idempotentId = idempotentId;
  }
}
</script>

<template>
  <OperateDrawer v-model="visible" :title="title" @handle-submit="handleSubmit">
    <NForm ref="formRef" :model="model" :rules="rules">
      <NFormItem :label="$t('page.retryTask.groupName')" path="groupName">
        <SelectGroup v-model:value="model.groupName" :disabled="props.operateType === 'edit'" />
      </NFormItem>
      <NFormItem :label="$t('page.retryTask.sceneName')" path="sceneName">
        <SelectScene
          v-model:value="model.sceneName"
          :group-name="model.groupName as string"
          :disabled="props.operateType === 'edit'"
        />
      </NFormItem>
      <NFormItem :label="$t('page.retryTask.idempotentId')" path="idempotentId">
        <NInputGroup>
          <NInput
            v-model:value="model.idempotentId"
            :placeholder="$t('page.retryTask.form.idempotentId')"
            :disabled="props.operateType === 'edit'"
          />
          <NTooltip trigger="hover">
            <template #trigger>
              <NButton type="default" ghost :disabled="props.operateType === 'edit'" @click="setIdempotentId">
                <icon-clarity:thin-client-solid class="text-icon" />
              </NButton>
            </template>
            {{ $t('page.retryTask.generateIdempotentId') }}
          </NTooltip>
        </NInputGroup>
      </NFormItem>
      <NFormItem :label="$t('page.retryTask.bizNo')" path="bizNo">
        <NInput
          v-model:value="model.bizNo"
          :placeholder="$t('page.retryTask.form.bizNo')"
          :disabled="props.operateType === 'edit'"
        />
      </NFormItem>
      <NFormItem :label="$t('page.retryTask.executorName')" path="executorName">
        <NInput
          v-model:value="model.executorName"
          :placeholder="$t('page.retryTask.form.executorName')"
          :disabled="props.operateType === 'edit'"
        />
      </NFormItem>
      <NFormItem :label="$t('page.retryTask.argsStr')" path="argsStr">
        <CodeMirror v-model="model.argsStr" lang="json" :placeholder="$t('page.jobTask.form.argsStr')" />
      </NFormItem>
      <NFormItem :label="$t('page.retryTask.retryStatus')" path="retryStatus">
        <NSelect
          v-model:value="model.retryStatus"
          :placeholder="$t('page.retryTask.form.retryStatus')"
          :options="translateOptions(retryTaskStatusTypeOptions)"
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
