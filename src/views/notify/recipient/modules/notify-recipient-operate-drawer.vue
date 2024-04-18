<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import { fetchAddNotifyRecipient, fetchEditNotifyRecipient } from '@/service/api';
import DingDingForm from './dingding-form.vue';
import LarkForm from './lark-form.vue';
import EmailForm from './email-form.vue';
import QiyeWechtForm from './qiye-wecht-form.vue';

defineOptions({
  name: 'NotifyRecipientOperateDrawer'
});

const CommonRef = ref();

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

const defaultTabPane = defineModel<string>('defaultTabPane', {
  default: '1'
});

const { restoreValidation } = useNaiveForm();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.notifyRecipient.addNotifyRecipient'),
    edit: $t('page.notifyRecipient.editNotifyRecipient')
  };
  return titles[props.operateType];
});

function handleUpdateModelWhenEdit() {
  if (props.operateType === 'add') {
    CommonRef.value?.createDefaultModel();
    return;
  }

  if (props.operateType === 'edit' && props.rowData) {
    defaultTabPane.value = props.rowData.notifyType.toString();
    CommonRef.value?.showData(props.rowData);
  }
}

async function handleSubmit() {
  // request
  if (props.operateType === 'add') {
    CommonRef.value?.save();
  }

  if (props.operateType === 'edit') {
    CommonRef.value?.update();
  }

  emit('submitted');
}

const commonFetchAdd = (dingDingModel: Api.NotifyRecipient.NotifyRecipient) => {
  const { recipientName, notifyAttribute, notifyType, description } = dingDingModel;
  fetchAddNotifyRecipient({ recipientName, notifyAttribute, notifyType, description });
  window.$message?.success($t('common.addSuccess'));
};

const commonFetchUpdate = (dingDingModel: Api.NotifyRecipient.NotifyRecipient) => {
  const { id, recipientName, notifyAttribute, notifyType, description } = dingDingModel;
  fetchEditNotifyRecipient({ id, recipientName, notifyAttribute, notifyType, description });
  window.$message?.success($t('common.updateSuccess'));
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
    <NTabs v-model:value="defaultTabPane" type="segment" animated>
      <NTabPane name="1" tab="钉钉">
        <DingDingForm ref="CommonRef" @fetch-add="commonFetchAdd" @fetch-update="commonFetchUpdate" />
      </NTabPane>
      <NTabPane name="2" tab="邮箱">
        <EmailForm ref="CommonRef" @fetch-add="commonFetchAdd" @fetch-update="commonFetchUpdate" />
      </NTabPane>
      <NTabPane name="3" tab="企业微信">
        <QiyeWechtForm ref="CommonRef" @fetch-add="commonFetchAdd" @fetch-update="commonFetchUpdate" />
      </NTabPane>
      <NTabPane name="4" tab="飞书">
        <LarkForm ref="CommonRef" @fetch-add="commonFetchAdd" @fetch-update="commonFetchUpdate" />
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
