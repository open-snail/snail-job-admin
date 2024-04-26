<script setup lang="tsx">
import { computed, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import OperateDrawer from '@/components/common/operate-drawer.vue';
import { $t } from '@/locales';
import { fetchAddUser, fetchEditUser, fetchGetAllGroupConfigList } from '@/service/api';

defineOptions({
  name: 'UserCenterOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.UserManager.UserManager | null;
}

const groupConfigs = ref();

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
    add: $t('page.userManager.addUser'),
    edit: $t('page.userManager.editUser')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.UserManager.UserManager,
  'id' | 'username' | 'password' | 'checkPassword' | 'role' | 'permissions'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    username: '',
    password: '',
    checkPassword: '',
    role: '',
    permissions: []
  };
}

type RuleKey = Extract<keyof Model, 'username' | 'password' | 'checkPassword' | 'role' | 'permissions'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  username: defaultRequiredRule,
  password: defaultRequiredRule,
  checkPassword: defaultRequiredRule,
  role: defaultRequiredRule,
  permissions: defaultRequiredRule
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
    const { username, password, checkPassword, role, permissions } = model;
    const { error } = await fetchAddUser({ username, password, checkPassword, role, permissions });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { id, username, password, checkPassword, role, permissions } = model;
    const { error } = await fetchEditUser({ id, username, password, checkPassword, role, permissions });
    if (error) return;
  }
  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

const getAllGroupConfigList = async () => {
  const res = await fetchGetAllGroupConfigList([]);
  groupConfigs.value = res.data?.map(option => ({
    value: {
      groupName: option.groupName,
      namespaceId: option.groupName
    },
    label: () => {
      return (
        <div>
          <span>{option.groupName}</span>
          <br />
          <span>{option.namespaceId}</span>
        </div>
      );
    }
  }));
};

// 加载组列表数据
getAllGroupConfigList();

const valueRef = ref<Array<string | number>>([]);

// const renderSourceList: TransferRenderSourceList = function ({ onCheck, pattern }) {
//   return h(NCheckbox, {
//     style: 'margin: 0 4px;',
//     keyField: 'value',
//     checkable: true,
//     selectable: false,
//     blockLine: true,
//     checkOnClick: true,
//     data: groupConfigs.value,
//     pattern,
//     checkedKeys: valueRef.value,
//     onUpdateCheckedKeys: (checkedKeys: Array<string | number>) => {
//       // console.log(checkedKeys)
//       model.permissions = checkedKeys as string[];
//       onCheck(checkedKeys);
//     }
//   });
// };

watch(visible, () => {
  if (visible.value) {
    handleUpdateModelWhenEdit();
    restoreValidation();
  }
});

watch(valueRef.value, () => {
  // console.log(valueRef.value)
  model.permissions = valueRef.value as string[];
});
</script>

<template>
  <OperateDrawer v-model="visible" :title="title">
    <NForm ref="formRef" :model="model" :rules="rules">
      <NFormItem :label="$t('page.userManager.username')" path="username">
        <NInput v-model:value="model.username" :placeholder="$t('page.userManager.form.username')" />
      </NFormItem>
      <NFormItem :label="$t('page.userManager.password')" path="password">
        <NInput v-model:value="model.password" :placeholder="$t('page.userManager.form.password')" />
      </NFormItem>
      <NFormItem :label="$t('page.userManager.checkPassword')" path="checkPassword">
        <NInput v-model:value="model.checkPassword" :placeholder="$t('page.userManager.form.checkPassword')" />
      </NFormItem>
      <NFormItem :label="$t('page.userManager.role')" path="role">
        <NInput v-model:value="model.role" :placeholder="$t('page.userManager.form.role')" />
      </NFormItem>
      <NFormItem :label="$t('page.userManager.permissions')" path="permissions">
        <!--        <NTransfer-->
        <!--          v-model:value="model.permissions"-->
        <!--          :render-source-list="renderSourceList"-->
        <!--          virtual-scroll-->
        <!--          :options="groupConfigs"-->
        <!--          target-filterable-->
        <!--          source-filterable-->
        <!--        />-->
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
