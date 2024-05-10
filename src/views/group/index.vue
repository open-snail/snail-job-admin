<script setup lang="tsx">
import { NButton, NTag } from 'naive-ui';
import { ref } from 'vue';
import { useBoolean } from '@sa/hooks';
import { fetchGetGroupConfigList, fetchUpdateGroupStatus } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { groupConfigIdModeRecord, yesOrNoRecord } from '@/constants/business';
import { tagColor } from '@/utils/common';
import StatusSwitch from '@/components/common/status-switch.vue';
import { useAuth } from '@/hooks/business/auth';
import GroupOperateDrawer from './modules/group-operate-drawer.vue';
import GroupDetailDrawer from './modules/group-detail-drawer.vue';
import GroupSearch from './modules/group-search.vue';
const { hasAuth } = useAuth();
const appStore = useAppStore();

/** 详情页属性数据 */
const detailData = ref<Api.GroupConfig.GroupConfig | null>();
/** 详情页可见状态 */
const { bool: detailVisible, setTrue: openDetail } = useBoolean(false);

const { columns, columnChecks, data, getData, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetGroupConfigList,
  apiParams: {
    page: 1,
    size: 10,
    groupName: null
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
      minWidth: 260,
      render: row => {
        function showDetailDrawer() {
          detailData.value = row || null;
          openDetail();
        }

        return (
          <n-button text tag="a" type="primary" onClick={showDetailDrawer} class="ws-normal">
            {row.groupName}
          </n-button>
        );
      }
    },
    {
      key: 'groupStatus',
      title: $t('page.groupConfig.groupStatus'),
      align: 'center',
      width: 80,
      render: row => {
        const fetchFn = async (groupStatus: Api.Common.EnableStatusNumber, callback: () => void) => {
          const status = row.groupStatus === 1 ? 0 : 1;
          const { error } = await fetchUpdateGroupStatus({ groupName: row.groupName, groupStatus: status });
          if (!error) {
            row.groupStatus = groupStatus;
            window.$message?.success($t('common.updateSuccess'));
          }
          callback();
        };

        return <StatusSwitch v-model:value={row.groupStatus} onFetch={fetchFn} />;
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

        const label = $t(groupConfigIdModeRecord[row.idGeneratorMode!]);

        return <NTag type="primary">{label}</NTag>;
      }
    },
    {
      key: 'groupPartition',
      title: $t('page.groupConfig.groupPartition'),
      align: 'center',
      minWidth: 60
    },
    {
      key: 'initScene',
      title: $t('page.groupConfig.initScene'),
      align: 'center',
      minWidth: 80,
      render: row => {
        if (row.groupStatus === null) {
          return null;
        }

        const label = $t(yesOrNoRecord[row.initScene!]);

        return <NTag type={tagColor(row.initScene!)}>{label}</NTag>;
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
    <GroupSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard
      :title="$t('page.groupConfig.title')"
      :bordered="false"
      size="small"
      header-class="view-card-header"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-delete="false"
          :show-add="hasAuth('R_ADMIN')"
          @add="handleAdd"
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
      <GroupOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getData"
      />
      <GroupDetailDrawer v-model:visible="detailVisible" :row-data="detailData" />
    </NCard>
  </div>
</template>

<style scoped></style>
