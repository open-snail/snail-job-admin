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

export const enableStatus01Record: Record<Api.Common.EnableStatus01, App.I18n.I18nKey> = {
  0: 'page.manage.common.status.enable',
  1: 'page.manage.common.status.disable'
};

export const enableStatus01Options = transformRecordToNumberOption(enableStatus01Record);

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
  '1': 'common.systemTaskType.retry',
  // '2': 'common.systemTaskType.callback',
  '3': 'common.systemTaskType.job',
  '4': 'common.systemTaskType.workflow'
};
export const systemTaskTypeOptions = transformRecordToOption(systemTaskType);

export const retryNotifyScene: Record<Api.NotifyConfig.RetryNotifyScene, App.I18n.I18nKey> = {
  '1': 'page.notifyConfig.retryNotifyScene.maxRetry',
  '2': 'page.notifyConfig.retryNotifyScene.maxRetryError',
  '3': 'page.notifyConfig.retryNotifyScene.clientReportError',
  '4': 'page.notifyConfig.retryNotifyScene.clientComponentError',
  '5': 'page.notifyConfig.retryNotifyScene.retryTaskReachThreshold',
  '6': 'page.notifyConfig.retryNotifyScene.retryTaskEnterDeadLetter'
};
export const retryNotifySceneOptions = transformRecordToOption(retryNotifyScene);

export const jobNotifyScene: Record<Api.NotifyConfig.JobNotifyScene, App.I18n.I18nKey> = {
  '1': 'page.notifyConfig.jobNotifyScene.jobTaskError'
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
