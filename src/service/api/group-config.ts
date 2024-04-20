import { request } from '../request';

/** get groupConfig list */
export function fetchGetGroupConfigList(params?: Api.GroupConfig.GroupConfigSearchParams) {
  return request<Api.GroupConfig.GroupConfigList>({
    url: '/group/list',
    method: 'get',
    params
  });
}

export function fetchGetAllGroupNameList(params?: Api.GroupConfig.GroupConfigSearchParams) {
  return request<string[]>({
    url: '/group/all/group-name/list',
    method: 'get',
    params
  });
}

/** add groupConfig */
export function fetchAddGroupConfig(data: Api.GroupConfig.GroupConfig) {
  return request<boolean>({
    url: '/group',
    method: 'post',
    data
  });
}

/** edit groupConfig */
export function fetchEditGroupConfig(data: Api.GroupConfig.GroupConfig) {
  return request<boolean>({
    url: '/group',
    method: 'put',
    data
  });
}

/** get partition table list */
export function fetchGetPartitionTableList() {
  return request<number[]>({
    url: '/group/partition-table/list',
    method: 'get'
  });
}
