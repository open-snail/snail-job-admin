<script setup lang="tsx">
import { NButton, NTag } from 'naive-ui';
import { ref } from 'vue';
import { useBoolean } from '@sa/hooks';
import { fetchGetRetryScenePageList, fetchUpdateSceneStatus } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { DelayLevel, backOffRecord, routeKeyRecord } from '@/constants/business';
import StatusSwitch from '@/components/common/status-switch.vue';
import SceneOperateDrawer from './modules/scene-operate-drawer.vue';
import SceneSearch from './modules/scene-search.vue';
import SceneDetailDrawer from './modules/scene-detail-drawer.vue';

const appStore = useAppStore();

/** 详情页属性数据 */
const detailData = ref<Api.RetryScene.Scene | null>();
/** 详情页可见状态 */
const { bool: detailVisible, setTrue: openDetail } = useBoolean(false);

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
      key: 'sceneName',
      title: $t('page.retryScene.sceneName'),
      align: 'left',
      minWidth: 120,
      render: row => {
        function showDetailDrawer() {
          detailData.value = row || null;
          openDetail();
        }

        return (
          <n-button text tag="a" type="primary" onClick={showDetailDrawer} class="ws-normal">
            {row.sceneName}
          </n-button>
        );
      }
    },
    {
      key: 'groupName',
      title: $t('page.retryScene.groupName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'sceneStatus',
      title: $t('page.retryScene.sceneStatus'),
      align: 'left',
      minWidth: 120,
      render: row => {
        const fetchFn = async (sceneStatus: Api.Common.EnableStatusNumber, callback: () => void) => {
          const { error } = await fetchUpdateSceneStatus(row.id!, sceneStatus);
          if (!error) {
            row.sceneStatus = sceneStatus;
            window.$message?.success($t('common.updateSuccess'));
          }
          callback();
        };

        return <StatusSwitch v-model:value={row.sceneStatus} onFetch={fetchFn} />;
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
      minWidth: 120,
      render: row => {
        if (row.backOff === 1) {
          return triggerInterval(row.backOff!, row.maxRetryCount!);
        }

        return row.triggerInterval;
      }
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
        </div>
      )
    }
  ]
});

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, checkedRowKeys } = useTableOperate(
  data,
  getData
);

function edit(id: string) {
  handleEdit(id);
}

function triggerInterval(backOff: number, maxRetryCount: number) {
  if (backOff !== 1) {
    return '';
  }

  let desc = '';
  for (let i = 1; i <= maxRetryCount; i += 1) {
    desc += `,${DelayLevel[i as keyof typeof DelayLevel]}`;
  }
  return desc.substring(1, desc.length);
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
          :show-delete="false"
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
      <SceneOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getData"
      />
      <SceneDetailDrawer v-model:visible="detailVisible" :row-data="detailData" />
    </NCard>
  </div>
</template>

<style scoped></style>
