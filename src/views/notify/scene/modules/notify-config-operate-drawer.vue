<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import { fetchAddNotify, fetchEditNotify } from '@/service/api';

defineOptions({
  name: 'NotifyConfigOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.NotifyConfig.NotifyConfig | null;
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
  | 'notifyStatus'
  | 'notifyType'
  | 'notifyAttribute'
  | 'notifyScene'
  | 'notifyThreshold'
  | 'description'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    groupName: '',
    businessId: '',
    notifyStatus: '',
    notifyType: '',
    notifyScene: '',
    notifyThreshold: 0,
    notifyAttribute: '',
    description: ''
  };
}

type RuleKey = Extract<
  keyof Model,
  'groupName' | 'businessId' | 'notifyStatus' | 'notifyType' | 'notifyScene' | 'notifyThreshold' | 'description'
>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  groupName: defaultRequiredRule,
  businessId: defaultRequiredRule,
  notifyStatus: defaultRequiredRule,
  notifyType: defaultRequiredRule,
  notifyScene: defaultRequiredRule,
  notifyThreshold: defaultRequiredRule,
  description: defaultRequiredRule
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
      notifyStatus,
      notifyType,
      notifyAttribute,
      notifyScene,
      notifyThreshold,
      description
    } = model;
    const { error } = await fetchAddNotify({
      groupName,
      businessId,
      notifyStatus,
      notifyType,
      notifyAttribute,
      notifyScene,
      notifyThreshold,
      description
    });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const {
      id,
      groupName,
      businessId,
      notifyStatus,
      notifyType,
      notifyAttribute,
      notifyScene,
      notifyThreshold,
      description
    } = model;
    const { error } = await fetchEditNotify({
      id,
      groupName,
      businessId,
      notifyStatus,
      notifyType,
      notifyAttribute,
      notifyScene,
      notifyThreshold,
      description
    });
    if (error) return;
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
      <NGrid x-gap="12" :cols="6" item-responsive responsive="screen">
        <NGi span="m:6 l:4">
          <NFormItem :label="$t('page.notifyConfig.notifyScene')" path="name">
            <NSelect
              v-model:value="model.notifyScene"
              :placeholder="$t('page.notifyConfig.page.notifyScene')"
              clearable
            />
          </NFormItem>
        </NGi>
        <NGi span="m:6 l:2">
          <NFormItem :label="$t('page.notifyConfig.notifyThreshold')" path="name">
            <NInputNumber
              v-model:value="model.notifyThreshold"
              :placeholder="$t('page.notifyConfig.form.notifyThreshold')"
            />
          </NFormItem>
        </NGi>
      </NGrid>
      <NGrid x-gap="12" :cols="6" item-responsive responsive="screen">
        <NGi span="m:6 l:4">
          <NFormItem :label="$t('page.notifyConfig.groupName')" path="name">
            <NSelect v-model:value="model.groupName" :placeholder="$t('page.notifyConfig.form.groupName')" clearable />
          </NFormItem>
        </NGi>
        <NGi span="m:6 l:2">
          <NFormItem :label="$t('page.notifyConfig.notifyStatus')" path="name">
            <NSelect
              v-model:value="model.notifyStatus"
              :placeholder="$t('page.notifyConfig.form.notifyStatus')"
              clearable
            />
          </NFormItem>
        </NGi>
      </NGrid>
      <NGrid x-gap="12" :cols="6" item-responsive responsive="screen">
        <NGi span="m:6 l:4">
          <NFormItem :label="$t('page.notifyConfig.notifyType')" path="name">
            <NSelect
              v-model:value="model.notifyType"
              :placeholder="$t('page.notifyConfig.form.notifyType')"
              clearable
            />
          </NFormItem>
        </NGi>
        <NGi span="m:6 l:2">
          <NFormItem :label="$t('page.notifyConfig.notifyAttribute')" path="name">
            <NSelect
              v-model:value="model.notifyAttribute"
              :placeholder="$t('page.notifyConfig.form.notifyAttribute')"
              clearable
            />
          </NFormItem>
        </NGi>
      </NGrid>
      <NFormItem :label="$t('page.notifyConfig.description')" path="description">
        <NInput v-model:value="model.description" :placeholder="$t('page.notifyConfig.form.description')" />
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
