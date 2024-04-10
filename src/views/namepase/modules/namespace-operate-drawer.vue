<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import { fetchAddNamespace, fetchEditNamespace } from '@/service/api';

defineOptions({
  name: 'NamespaceOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Namespace.Namespace | null;
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
    add: $t('page.namespace.addNamespace'),
    edit: $t('page.namespace.editNamespace')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.Namespace.Namespace, 'id' | 'name' | 'uniqueId'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    name: '',
    uniqueId: ''
  };
}

type RuleKey = Extract<keyof Model, 'name'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule
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

async function handleSubmit() {
  await validate();
  // request
  if (props.operateType === 'add') {
    const { name, uniqueId } = model;
    fetchAddNamespace({ name, uniqueId });
  }

  if (props.operateType === 'edit') {
    const { id, name, uniqueId } = model;
    fetchEditNamespace({ id, name, uniqueId });
  }
  window.$message?.success($t('common.updateSuccess'));
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
      <NFormItem :label="$t('page.namespace.uniqueId')" path="uniqueId">
        <NInput
          v-model:value="model.uniqueId"
          :disabled="props.operateType === 'edit'"
          :placeholder="$t('page.namespace.form.uniqueId')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.namespace.name')" path="name">
        <NInput v-model:value="model.name" :placeholder="$t('page.namespace.form.name')" />
      </NFormItem>
    </NForm>
  </OperateDrawer>
</template>

<style scoped></style>
