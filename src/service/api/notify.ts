import { request } from '../request';

/** get notify list */
export function fetchGetNotifyConfigList(params?: Api.NotifyConfig.NotifySearchParams) {
  return request<Api.NotifyConfig.NotifyConfigList>({
    url: '/notify-config/list',
    method: 'get',
    params
  });
}

/** add notify */
export function fetchAddNotify(data: Api.NotifyConfig.NotifyConfig) {
  return request<boolean>({
    url: '/notify-config',
    method: 'post',
    data
  });
}

/** edit notify */
export function fetchEditNotify(data: Api.NotifyConfig.NotifyConfig) {
  return request<boolean>({
    url: '/notify-config',
    method: 'put',
    data
  });
}

/** get notify recipient list */
export function fetchGetNotifyRecipientList(params?: Api.NotifyRecipient.NotifyRecipientParams) {
  return request<Api.NotifyRecipient.NotifyRecipientList>({
    url: '/notify-recipient/page/list',
    method: 'get',
    params
  });
}

/** add notify recipient */
export function fetchAddNotifyRecipient(data: Api.NotifyRecipient.NotifyRecipient) {
  return request<boolean>({
    url: '/notify-config',
    method: 'post',
    data
  });
}

/** edit notify recipient */
export function fetchEditNotifyRecipient(data: Api.NotifyRecipient.NotifyRecipient) {
  return request<boolean>({
    url: '/notify-config',
    method: 'put',
    data
  });
}
