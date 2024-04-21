<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { fetchGetRetryScenePageList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { backOffRecord, enableStatusNumberRecord, routeKeyRecord } from '@/constants/business';
import SceneOperateDrawer from './modules/scene-operate-drawer.vue';
import SceneSearch from './modules/scene-search.vue';

const appStore = useAppStore();

const { columns, columnChecks, data, getData, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetRetryScenePageList,
  apiParams: {
    page: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    groupName: null,
    sceneName: null,
    sceneStatus: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'groupName',
      title: $t('page.retryScene.groupName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'sceneName',
      title: $t('page.retryScene.sceneName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'sceneStatus',
      title: $t('page.retryScene.sceneStatus'),
      align: 'left',
      minWidth: 120,
      render: row => {
        const label = $t(enableStatusNumberRecord[row.sceneStatus!]);
        return <NTag type="primary">{label}</NTag>;
      }
    },
    {
      key: 'backOff',
      title: $t('page.retryScene.backOff'),
      align: 'left',
      minWidth: 120,
      render: row => {
        const label = $t(backOffRecord[row.backOff!]);
        return <NTag type="primary">{label}</NTag>;
      }
    },
    {
      key: 'routeKey',
      title: $t('page.retryScene.routeKey'),
      align: 'left',
      minWidth: 120,
      render: row => {
        const label = $t(routeKeyRecord[row.routeKey!]);
        return <NTag type="primary">{label}</NTag>;
      }
    },
    {
      key: 'maxRetryCount',
      title: $t('page.retryScene.maxRetryCount'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'triggerInterval',
      title: $t('page.retryScene.triggerInterval'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'deadlineRequest',
      title: $t('page.retryScene.deadlineRequest'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'executorTimeout',
      title: $t('page.retryScene.executorTimeout'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'createDt',
      title: $t('page.retryScene.createDt'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'updateDt',
      title: $t('page.retryScene.updateDt'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'description',
      title: $t('page.retryScene.description'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id!)}>
            {$t('common.edit')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id!)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);

  onBatchDeleted();
}

function handleDelete(id: string) {
  // request
  console.log(id);

  onDeleted();
}

function edit(id: string) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <SceneSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard
      :title="$t('page.retryScene.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
      header-class="view-card-header"
    >
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <SceneOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getData"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
