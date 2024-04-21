import { transformRecordToNumberOption, transformRecordToOption } from '@/utils/common';

export const yesOrNoRecord: Record<Api.Common.YesOrNo, App.I18n.I18nKey> = {
  '0': 'common.yesOrNo.no',
  '1': 'common.yesOrNo.yes'
};

export const enableStatusRecord: Record<Api.Common.EnableStatus, App.I18n.I18nKey> = {
  '1': 'page.manage.common.status.enable',
  '2': 'page.manage.common.status.disable'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);

export const enableStatusNumberRecord: Record<Api.Common.EnableStatusNumber, App.I18n.I18nKey> = {
  0: 'page.manage.common.status.disable',
  1: 'page.manage.common.status.enable'
};

export const enableStatusNumberOptions = transformRecordToNumberOption(enableStatusNumberRecord, true);

export const userGenderRecord: Record<Api.SystemManage.UserGender, App.I18n.I18nKey> = {
  '1': 'page.manage.user.gender.male',
  '2': 'page.manage.user.gender.female'
};

export const userGenderOptions = transformRecordToOption(userGenderRecord);

export const menuTypeRecord: Record<Api.SystemManage.MenuType, App.I18n.I18nKey> = {
  '1': 'page.manage.menu.type.directory',
  '2': 'page.manage.menu.type.menu'
};

export const menuTypeOptions = transformRecordToOption(menuTypeRecord);

export const menuIconTypeRecord: Record<Api.SystemManage.IconType, App.I18n.I18nKey> = {
  '1': 'page.manage.menu.iconType.iconify',
  '2': 'page.manage.menu.iconType.local'
};

export const menuIconTypeOptions = transformRecordToOption(menuIconTypeRecord);

export const podsType: Record<Api.Dashboard.DashboardPodsType, App.I18n.I18nKey> = {
  1: 'page.pods.type.client',
  2: 'page.pods.type.server'
};

export const alarmTypeRecord: Record<Api.NotifyRecipient.AlarmType, App.I18n.I18nKey> = {
  1: 'page.notifyRecipient.dingDing',
  2: 'page.notifyRecipient.email',
  3: 'page.notifyRecipient.weCom',
  4: 'page.notifyRecipient.lark'
};
export const alarmTypeRecordOptions = transformRecordToOption(alarmTypeRecord);

export const systemTaskType: Record<Api.NotifyConfig.SystemTaskType, App.I18n.I18nKey> = {
  1: 'common.systemTaskType.retry',
  // 2: 'common.systemTaskType.callback',
  3: 'common.systemTaskType.job',
  4: 'common.systemTaskType.workflow'
};
export const systemTaskTypeOptions = transformRecordToNumberOption(systemTaskType);

export const retryNotifyScene: Record<Api.NotifyConfig.RetryNotifyScene, App.I18n.I18nKey> = {
  1: 'page.notifyConfig.retryNotifyScene.maxRetry',
  2: 'page.notifyConfig.retryNotifyScene.maxRetryError',
  3: 'page.notifyConfig.retryNotifyScene.clientReportError',
  4: 'page.notifyConfig.retryNotifyScene.clientComponentError',
  5: 'page.notifyConfig.retryNotifyScene.retryTaskReachThreshold',
  6: 'page.notifyConfig.retryNotifyScene.retryTaskEnterDeadLetter'
};
export const retryNotifySceneOptions = transformRecordToNumberOption(retryNotifyScene);

export const jobNotifyScene: Record<Api.NotifyConfig.JobNotifyScene, App.I18n.I18nKey> = {
  1: 'page.notifyConfig.jobNotifyScene.jobTaskError'
};
export const jobNotifySceneOptions = transformRecordToOption(jobNotifyScene);

export const groupConfigStatusRecord: Record<Api.GroupConfig.GroupStatusType, App.I18n.I18nKey> = {
  0: 'page.manage.common.status.disable',
  1: 'page.manage.common.status.enable'
};
export const groupConfigStatusOptions = transformRecordToNumberOption(groupConfigStatusRecord, true);

export const groupConfigIdModeRecord: Record<Api.GroupConfig.IdGeneratorModeType, App.I18n.I18nKey> = {
  1: 'page.groupConfig.idMode.segment',
  2: 'page.groupConfig.idMode.idWorker'
};
export const groupConfigIdModeOptions = transformRecordToNumberOption(groupConfigIdModeRecord);

export const groupConfigYesOrNoRecord: Record<Api.GroupConfig.YesOrNoType, App.I18n.I18nKey> = {
  0: 'common.yesOrNo.no',
  1: 'common.yesOrNo.yes'
};
export const groupConfigYesOrNoOptions = transformRecordToNumberOption(groupConfigYesOrNoRecord, true);

export const retryTaskStatusTypeRecord: Record<Api.RetryTask.RetryStatusType, App.I18n.I18nKey> = {
  0: 'page.retryTask.retryStatusType.retrying',
  1: 'page.retryTask.retryStatusType.finished',
  2: 'page.retryTask.retryStatusType.maxRetry',
  3: 'page.retryTask.retryStatusType.paused'
};
export const retryTaskStatusTypeOptions = transformRecordToNumberOption(retryTaskStatusTypeRecord);

export const retryTaskTypeRecord: Record<Api.RetryTask.TaskType, App.I18n.I18nKey> = {
  1: 'page.retryTask.taskTypeDict.retry',
  2: 'page.retryTask.taskTypeDict.callback'
};
export const retryTaskTypeOptions = transformRecordToNumberOption(retryTaskTypeRecord);

export const backOffRecord: Record<Api.RetryScene.BackOff, App.I18n.I18nKey> = {
  1: 'page.retryScene.backOffItem.delayLevel',
  2: 'page.retryScene.backOffItem.fixed',
  3: 'page.retryScene.backOffItem.cron',
  4: 'page.retryScene.backOffItem.random'
};
export const backOffRecordOptions = transformRecordToNumberOption(backOffRecord, true);

export const routeKeyRecord: Record<Api.RetryScene.RouteKey, App.I18n.I18nKey> = {
  1: 'page.retryScene.routeKeyItem.consistentHash',
  2: 'page.retryScene.routeKeyItem.random',
  3: 'page.retryScene.routeKeyItem.lru',
  4: 'page.retryScene.routeKeyItem.round'
};
export const routeKeyRecordOptions = transformRecordToNumberOption(routeKeyRecord, true);

/** 延迟等级 */
export const DelayLevel: Record<number, string> = {
  1: '10s',
  2: '15s',
  3: '30s',
  4: '35s',
  5: '40s',
  6: '50s',
  7: '1m',
  8: '2m',
  9: '4m',
  10: '6m',
  11: '8m',
  12: '10m',
  13: '20m',
  14: '40m',
  15: '1h',
  16: '2h',
  17: '3h',
  18: '4h',
  19: '5h',
  20: '6h',
  21: '7h',
  22: '8h',
  23: '9h',
  24: '10h',
  25: '11h',
  26: '12h'
};
