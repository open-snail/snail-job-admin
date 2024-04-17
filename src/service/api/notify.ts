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
