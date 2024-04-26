<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import {
  fetchAddRetryTask,
  fetchGetAllGroupNameList,
  fetchGetRetrySceneList,
  fetchIdempotentIdGenerate
} from '@/service/api';
import { translateOptions, translateOptions2 } from '@/utils/common';
import { retryTaskStatusTypeOptions } from '@/constants/business';

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

/** 组列表 */
const groupNameList = ref<string[]>([]);
/** 场景列表 */
const sceneNameList = ref<string[]>([]);

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

async function getGroupNameList() {
  const res = await fetchGetAllGroupNameList();
  groupNameList.value = res.data as string[];
}

async function handleGroupNameUpdate(groupName: string) {
  if (groupName) {
    const res = await fetchGetRetrySceneList({ groupName });
    sceneNameList.value = res.data!.map((scene: Api.RetryScene.Scene) => scene.sceneName);
  } else {
    model.sceneName = '';
    sceneNameList.value = [];
  }
}

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

onMounted(() => {
  getGroupNameList();
});
</script>

<template>
  <OperateDrawer v-model="visible" :title="title" @handle-submit="handleSubmit">
    <NForm ref="formRef" :model="model" :rules="rules">
      <NFormItem :label="$t('page.retryTask.groupName')" path="groupName">
        <NSelect
          v-model:value="model.groupName"
          :placeholder="$t('page.retryTask.form.groupName')"
          :options="translateOptions2(groupNameList)"
          :disabled="props.operateType === 'edit'"
          @update-value="handleGroupNameUpdate"
        />
      </NFormItem>
      <NFormItem :label="$t('page.retryTask.sceneName')" path="sceneName">
        <NSelect
          v-model:value="model.sceneName"
          :placeholder="$t('page.retryTask.form.sceneName')"
          :options="translateOptions2(sceneNameList)"
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
                <icon-material-symbols:cloud-sync-outline class="text-icon" />
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
        <NInput v-model:value="model.argsStr" type="textarea" :placeholder="$t('page.retryTask.form.argsStr')" />
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
