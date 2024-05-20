<script setup lang="tsx">
import { computed, ref, watch } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { fetchAllGroupName, fetchJobLine, fetchRetryLine } from '@/service/api';
import LineRetryChart from './line-retry-chart.vue';
import PieRetryChart from './pie-retry-chart.vue';

defineOptions({
  name: 'RetryTab'
});

interface Props {
  modelValue: Api.Dashboard.CardCount;
}

defineProps<Props>();

const type = ref(0);
const appStore = useAppStore();
const gap = computed(() => (appStore.isMobile ? 0 : 16));
const data = ref<Api.Dashboard.DashboardLine>();
const groupOptions = ref();
const tabParams = ref<Api.Dashboard.DashboardLineParams>({
  type: 'WEEK',
  page: 1,
  size: 6
});
const dateRange = ref<[number, number] | null>();
const formattedValue = ref<[string, string] | null>(
  tabParams.value.startTime && tabParams.value.endTime ? [tabParams.value.startTime, tabParams.value.endTime] : null
);

const getData = async () => {
  const { data: lineData, error } =
    type.value === 0 ? await fetchRetryLine(tabParams.value) : await fetchJobLine(tabParams.value);

  if (!error) {
    data.value = lineData;
  }
};

getData();

const getGroupNames = async () => {
  const { data: groupNames, error } = await fetchAllGroupName();

  if (!error) {
    groupOptions.value = groupNames.map(groupName => {
      return { label: groupName, value: groupName };
    });
  }
};

getGroupNames();

watch(
  () => tabParams.value,
  () => {
    getData();
  },
  { deep: true }
);

const onUpdateTab = (value: string) => {
  if (value === 'retryTask') {
    type.value = 0;
    tabParams.value.mode = undefined;
  }
  if (value === 'jobTask') {
    type.value = 1;
    tabParams.value.mode = 'JOB';
  }
  if (value === 'workflow') {
    type.value = 2;
    tabParams.value.mode = 'WORKFLOW';
  }
};

const onUpdateDate = (value: [string, string]) => {
  if (value) {
    tabParams.value.type = 'OTHERS';
    tabParams.value.startTime = value[0];
    tabParams.value.endTime = value[1];
  }
};

const onClearDate = () => {
  tabParams.value.type = 'WEEK';
  tabParams.value.startTime = undefined;
  tabParams.value.endTime = undefined;
};

const onUpdateType = (value: string) => {
  if (value !== 'OTHERS') {
    dateRange.value = null;
    formattedValue.value = null;
    tabParams.value.startTime = undefined;
    tabParams.value.endTime = undefined;
  }
};

const pagination = ref({
  page: tabParams.value.page,
  pageSize: tabParams.value.size,
  itemCount: data.value?.taskList.total
});

const createPanels = () => [
  {
    name: 'retryTask',
    tab: $t('page.home.retryTask')
  },
  {
    name: 'jobTask',
    tab: $t('page.home.jobTask')
  },
  {
    name: 'workflow',
    tab: $t('page.home.workflow')
  }
];

const panels = ref(createPanels());

const createColumns = (): DataTableColumns<Api.Dashboard.Task> => [
  {
    title: $t('page.home.retryTab.task.groupName'),
    key: 'groupName'
  },
  {
    title: $t('page.home.retryTab.task.run'),
    key: 'run',
    align: 'center',
    render: row => <span class="retry-table-number">{row.run}</span>
  },
  {
    title: $t('page.home.retryTab.task.total'),
    key: 'total',
    align: 'center',
    render: row => <span class="retry-table-number">{row.total}</span>
  }
];

const columns = ref(createColumns());

watch(
  () => appStore.locale,
  () => {
    panels.value = createPanels();
    columns.value = createColumns();
  }
);
</script>

<template>
  <div class="relative">
    <NTabs type="line" animated @update:value="onUpdateTab">
      <NTabPane v-for="panel in panels" :key="panel.name" :tab="panel.tab" :name="panel.name">
        <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
          <NGi span="24 s:24 m:16">
            <LineRetryChart v-model="data!" :type="type"></LineRetryChart>
          </NGi>
          <NGi span="24 s:24 m:8">
            <div class="retry-tab-rank">
              <h4 class="retry-tab-title">{{ $t('page.home.retryTab.rank.title') }}</h4>
              <ul class="retry-tab-rank__list">
                <li v-for="(item, index) in data?.rankList" :key="index" class="retry-tab-rank__list--item">
                  <span>
                    <span class="retry-tab-rank__list--index">
                      {{ index + 1 }}
                    </span>
                    <span>{{ item.name }}</span>
                  </span>
                  <span class="retry-tab-badge">{{ item.total }}</span>
                </li>
              </ul>
            </div>
          </NGi>
        </NGrid>
        <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive class="p-t-16px">
          <NGi span="24 s:24 m:16">
            <h4 class="retry-tab-title">{{ $t('page.home.retryTab.task.title') }}</h4>
            <NDivider />
            <NDataTable
              min-height="300px"
              max-height="300px"
              :columns="columns"
              :data="data?.taskList.data"
              :bordered="false"
              :pagination="pagination"
            />
          </NGi>
          <NGi span="24 s:24 m:8">
            <h4 class="retry-tab-title">{{ $t('page.home.retryTab.pie.title') }}</h4>
            <NDivider />
            <PieRetryChart v-model="modelValue!" :type="type" />
          </NGi>
        </NGrid>
      </NTabPane>
    </NTabs>
    <div
      class="absolute top--136px flex flex-col flex-wrap gap-16px 2xl:right-40px 2xl:top-0 lg:top--36px md:top--90px md:flex-row 2xl:flex-nowrap"
    >
      <NRadioGroup v-model:value="tabParams.type" @update:value="onUpdateType">
        <NRadioButton value="DAY" :label="$t('page.home.retryTab.params.day')" />
        <NRadioButton value="WEEK" :label="$t('page.home.retryTab.params.week')" />
        <NRadioButton value="MONTH" :label="$t('page.home.retryTab.params.month')" />
        <NRadioButton value="YEAR" :label="$t('page.home.retryTab.params.year')" />
      </NRadioGroup>
      <NDatePicker
        v-model:value="dateRange"
        v-model:formatted-value="formattedValue"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="daterange"
        class="w-300px lg:w-230px md:w-270px"
        clearable
        @update:formatted-value="onUpdateDate"
        @clear="onClearDate"
      />
      <NSelect v-model:value="tabParams.groupName" :options="groupOptions" class="w-200px lg:w-150px md:w-170px" />
    </div>
  </div>
</template>

<style>
.retry-table-number {
  padding: 3px 7px;
  background-color: #f4f4f4;
  color: #555;
  text-shadow: none !important;
  font-weight: 400;
  border-radius: 4px;
}

.dark .retry-table-number {
  background: #2c2c2c;
  color: #d6d6d6;
}
</style>

<style scoped lang="scss">
.retry-tab-title {
  font-size: 16px;
  font-weight: 600;
}

.retry-tab-badge {
  float: right;
  padding: 3px 7px;
  background-color: #f4f4f4;
  color: #555;
  text-shadow: none !important;
  font-weight: 400;
  border-radius: 4px;
}

.retry-tab-rank {
  height: 360px;
  overflow: hidden;

  &__list {
    padding: 0;
    height: 332px;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.5) transparent;

    &--index {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      background-color: #314659;
      color: #fff;
      margin-right: 10px;
      font-size: 13px;
    }

    &--item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px;
      margin: 3px 0;
      border: 1px solid #efefefd2;
      border-radius: 4px;
      box-shadow: none;
      transition: all 0.5s;
    }

    &--item:hover {
      box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
    }
  }

  &__list {
    @include scrollbar();
  }
}

.dark {
  .retry-tab-badge {
    background: #2c2c2c;
    color: #d6d6d6;
  }

  .retry-tab-rank {
    &__list {
      &--index {
        color: #d6d6d6;
      }

      &--item {
        border: 1px solid #646464;
      }

      &--item:hover {
        box-shadow: 1px 1px 8px transparent;
      }
    }

    &__list {
      @include scrollbar();
    }
  }
}

.n-divider:not(.n-divider--vertical) {
  margin-top: 16px;
  margin-bottom: 12px;
}
</style>
