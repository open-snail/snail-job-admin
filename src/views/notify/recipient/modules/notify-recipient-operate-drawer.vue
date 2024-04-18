<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import { fetchAddNotifyRecipient } from '@/service/api';
import DingDingForm from './dingding-form.vue';

defineOptions({
  name: 'NotifyRecipientOperateDrawer'
});

const DingDingRef = ref();

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.NotifyRecipient.NotifyRecipient | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { restoreValidation } = useNaiveForm();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.notifyRecipient.addNotifyRecipient'),
    edit: $t('page.notifyRecipient.editNotifyRecipient')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.NotifyRecipient.NotifyRecipient,
  'id' | 'recipientName' | 'notifyType' | 'notifyAttribute' | 'description'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    recipientName: '',
    notifyType: 1,
    notifyAttribute: '',
    description: ''
  };
}

// const rules: Record<RuleKey, App.Global.FormRule> = {
//   recipientName: defaultRequiredRule,
//   notifyType: defaultRequiredRule,
//   notifyAttribute: defaultRequiredRule,
//   description: defaultRequiredRule
// };

function handleUpdateModelWhenEdit() {
  if (props.operateType === 'add') {
    Object.assign(model, createDefaultModel());
    return;
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

async function handleSubmit() {
  // request
  if (props.operateType === 'add') {
    DingDingRef.value?.save();
  }

  if (props.operateType === 'edit') {
    console.log('更新');
  }
  window.$message?.success($t('common.updateSuccess'));
  emit('submitted');
}

const dingDingFetchAdd = (dingDingModel: Api.NotifyRecipient.NotifyRecipient) => {
  const { recipientName, notifyAttribute, notifyType, description } = dingDingModel;
  fetchAddNotifyRecipient({ recipientName, notifyAttribute, notifyType, description });
};

function closeDrawer() {
  visible.value = false;
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
    <NTabs type="segment" animated>
      <NTabPane name="dingding" tab="钉钉">
        <DingDingForm ref="DingDingRef" @fetch-add="dingDingFetchAdd" />
      </NTabPane>
      <NTabPane name="feishu" tab="飞书"></NTabPane>
      <NTabPane name="email" tab="企业微信">
        <NFormItem :label="$t('page.notifyRecipient.recipientName')" path="recipientName">
          <NInput v-model:value="model.recipientName" :placeholder="$t('page.notifyRecipient.form.recipientName')" />
        </NFormItem>
      </NTabPane>
      <NTabPane name="email" tab="邮箱">
        <NFormItem :label="$t('page.notifyRecipient.recipientName')" path="recipientName">
          <NInput v-model:value="model.recipientName" :placeholder="$t('page.notifyRecipient.form.recipientName')" />
        </NFormItem>
      </NTabPane>
    </NTabs>
    <template #footer>
      <NSpace :size="16">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.save') }}</NButton>
      </NSpace>
    </template>
  </OperateDrawer>
</template>

<style scoped></style>
