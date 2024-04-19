import { transformRecordToOption } from '@/utils/common';

export const yesOrNoRecord: Record<Api.Common.YesOrNo, App.I18n.I18nKey> = {
  '0': 'common.yesOrNo.no',
  '1': 'common.yesOrNo.yes'
};

export const enableStatusRecord: Record<Api.Common.EnableStatus, App.I18n.I18nKey> = {
  '1': 'page.manage.common.status.enable',
  '2': 'page.manage.common.status.disable'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);

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

export const idGeneratorModeRecord: Record<Api.GroupConfig.IdGeneratorModeType, App.I18n.I18nKey> = {
  '1': 'page.groupConfig.idMode.segment',
  '2': 'page.groupConfig.idMode.idWorker'
};

export const alarmTypeRecord: Record<Api.NotifyRecipient.AlarmType, App.I18n.I18nKey> = {
  1: 'page.notifyRecipient.dingDing',
  2: 'page.notifyRecipient.email',
  3: 'page.notifyRecipient.weCom',
  4: 'page.notifyRecipient.lark'
};
export const alarmTypeRecordOptions = transformRecordToOption(alarmTypeRecord);
