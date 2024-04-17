<script setup lang="tsx">
import { NButton, NTag } from 'naive-ui';
import { fetchGetGroupConfigList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { enableStatusRecord, idGeneratorModeRecord, yesOrNoRecord } from '@/constants/business';
import GroupConfigOperateDrawer from './modules/groupConfig-operate-drawer.vue';
import GroupConfigSearch from './modules/groupConfig-search.vue';

const appStore = useAppStore();

const { columns, columnChecks, data, getData, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetGroupConfigList,
  apiParams: {
    page: 1,
    size: 10,
    groupName: undefined
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'groupName',
      title: $t('page.groupConfig.groupName'),
      align: 'left',
      minWidth: 260
    },
    {
      key: 'namespaceId',
      title: $t('page.groupConfig.namespaceId'),
      align: 'left',
      minWidth: 260
    },
    {
      key: 'groupStatus',
      title: $t('page.groupConfig.groupStatus'),
      align: 'center',
      width: 80,
      render: row => {
        if (row.groupStatus === null) {
          return null;
        }

        const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
          1: 'success',
          2: 'warning'
        };

        const label = $t(enableStatusRecord[row.groupStatus!]);

        return <NTag type={tagMap[row.groupStatus!]}>{label}</NTag>;
      }
    },
    {
      key: 'idGeneratorMode',
      title: $t('page.groupConfig.idGeneratorMode'),
      align: 'center',
      width: 120,
      render: row => {
        if (row.idGeneratorMode === null) {
          return null;
        }

        const label = $t(idGeneratorModeRecord[row.idGeneratorMode!]);

        return <NTag type="primary">{label}</NTag>;
      }
    },
    {
      key: 'version',
      title: $t('page.groupConfig.version'),
      align: 'left',
      minWidth: 60
    },
    {
      key: 'groupPartition',
      title: $t('page.groupConfig.groupPartition'),
      align: 'left',
      minWidth: 60
    },
    {
      key: 'initScene',
      title: $t('page.groupConfig.initScene'),
      align: 'left',
      minWidth: 80,
      render: row => {
        if (row.groupStatus === null) {
          return null;
        }

        const tagMap: Record<Api.Common.YesOrNo, NaiveUI.ThemeColor> = {
          '1': 'success',
          '0': 'warning'
        };

        const label = $t(yesOrNoRecord[row.initScene!]);

        return <NTag type={tagMap[row.initScene!]}>{label}</NTag>;
      }
    },
    {
      key: 'updateDt',
      title: $t('page.groupConfig.updateDt'),
      align: 'left',
      width: 130
    },
    {
      key: 'description',
      title: $t('page.groupConfig.description'),
      align: 'left',
      width: 130
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
  checkedRowKeys
  // closeDrawer
} = useTableOperate(data, getData);

function edit(id: string) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <GroupConfigSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard :title="$t('page.groupConfig.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-delete="false"
          @add="handleAdd"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <GroupConfigOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getData"
      />
    </NCard>
  </div>
</template>

<style scoped>
:deep(.n-card-header) {
  --n-title-font-weight: 600 !important;
}
</style>
