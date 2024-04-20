<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { translateOptions, translateOptions2 } from '@/utils/common';
import { groupConfigIdModeOptions, groupConfigStatusOptions, groupConfigYesOrNoOptions } from '@/constants/business';
import { fetchAddGroupConfig, fetchEditGroupConfig, fetchGetPartitionTableList } from '@/service/api/group-config';

defineOptions({
  name: 'GroupConfigOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.GroupConfig.GroupConfig | null;
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
    add: $t('page.groupConfig.addGroupConfig'),
    edit: $t('page.groupConfig.editGroupConfig')
  };
  return titles[props.operateType];
});

const partitionList = ref<string[]>([]);

type Model = Pick<
  Api.GroupConfig.GroupConfig,
  'id' | 'groupName' | 'token' | 'groupStatus' | 'description' | 'idGeneratorMode' | 'initScene' | 'groupPartition'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    groupName: '',
    token: generateToken(32),
    groupStatus: 1,
    description: '',
    idGeneratorMode: 1,
    initScene: 1,
    groupPartition: 0
  };
}

type RuleKey = Extract<
  keyof Model,
  'groupName' | 'token' | 'groupStatus' | 'idGeneratorMode' | 'initScene' | 'groupPartition'
>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  groupName: defaultRequiredRule,
  token: defaultRequiredRule,
  groupStatus: defaultRequiredRule,
  idGeneratorMode: defaultRequiredRule,
  initScene: defaultRequiredRule,
  groupPartition: defaultRequiredRule
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
    const { groupName, token, groupStatus, description, idGeneratorMode, initScene, groupPartition } = model;
    const { error } = await fetchAddGroupConfig({
      groupName,
      token,
      groupStatus,
      description,
      idGeneratorMode,
      initScene,
      groupPartition
    });
    if (error) return;
    window.$message?.success($t('common.addSuccess'));
  } else {
    const { id, groupName, token, groupStatus, description, idGeneratorMode, initScene, groupPartition } = model;
    const { error } = await fetchEditGroupConfig({
      id,
      groupName,
      token,
      groupStatus,
      description,
      idGeneratorMode,
      initScene,
      groupPartition
    });
    if (error) return;
    window.$message?.success($t('common.updateSuccess'));
  }

  closeDrawer();
  emit('submitted');
}

/** 设置 token */
function setToken() {
  model.token = generateToken(32);
}

/** 生成 token */
function generateToken(length: number) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let token = 'SJ_';
  for (let i = 0; i < length; i += 1) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    token += chars.substring(randomNumber, randomNumber + 1);
  }
  return token;
}

const getAllPartitions = async () => {
  const { data } = await fetchGetPartitionTableList();
  partitionList.value = data!.map(p => String(p));
};

watch(visible, () => {
  if (visible.value) {
    handleUpdateModelWhenEdit();
    restoreValidation();
  }
});

onMounted(async () => {
  await getAllPartitions();
});
</script>

<template>
  <OperateDrawer v-model="visible" :title="title" @submitted="handleSubmit">
    <NForm ref="formRef" :model="model" :rules="rules">
      <NFormItem :label="$t('page.groupConfig.groupName')" path="groupName">
        <NInput
          v-model:value="model.groupName"
          :placeholder="$t('page.groupConfig.form.groupName')"
          :disabled="props.operateType === 'edit'"
        />
      </NFormItem>
      <NFormItem :label="$t('page.groupConfig.groupStatus')" path="groupStatus">
        <NRadioGroup v-model:value="model.groupStatus" name="groupStatus">
          <NSpace>
            <NRadio
              v-for="item in groupConfigStatusOptions"
              :key="item.value"
              :value="item.value"
              :label="$t(item.label)"
            />
          </NSpace>
        </NRadioGroup>
      </NFormItem>
      <NFormItem :label="$t('page.groupConfig.token')" path="token">
        <NInputGroup>
          <NInput
            v-model:value="model.token"
            :placeholder="$t('page.groupConfig.form.token')"
            :disabled="props.operateType === 'edit'"
          />
          <NButton type="primary" ghost :disabled="props.operateType === 'edit'" @click="setToken">
            <icon-ic-round-refresh class="text-icon" />
          </NButton>
        </NInputGroup>
      </NFormItem>
      <NFormItem :label="$t('page.groupConfig.description')" path="description">
        <NInput
          v-model:value="model.description"
          type="textarea"
          :placeholder="$t('page.groupConfig.form.description')"
          clearable
          round
        />
      </NFormItem>
      <NFormItem :label="$t('page.groupConfig.idGeneratorMode')" path="idGeneratorMode">
        <NSelect
          v-model:value="model.idGeneratorMode"
          :placeholder="$t('page.groupConfig.form.idGeneratorMode')"
          :options="translateOptions(groupConfigIdModeOptions)"
        />
      </NFormItem>
      <NFormItem :label="$t('page.groupConfig.initScene')" path="initScene">
        <NRadioGroup v-model:value="model.initScene" name="initScene">
          <NSpace>
            <NRadio
              v-for="item in groupConfigYesOrNoOptions"
              :key="item.value"
              :value="item.value"
              :label="$t(item.label)"
            />
          </NSpace>
        </NRadioGroup>
      </NFormItem>

      <NFormItem :label="$t('page.groupConfig.groupPartition')" path="groupPartition">
        <NSelect
          v-model:value="model.groupPartition"
          :placeholder="$t('page.groupConfig.form.groupPartition')"
          :options="translateOptions2(partitionList)"
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
