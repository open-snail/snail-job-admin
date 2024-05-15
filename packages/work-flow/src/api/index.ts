import { request } from '../utils/request';

export function fetchJobList(groupName: string) {
  return request<FlowApi.JobList>({
    url: '/job/list',
    method: 'get',
    params: {
      groupName
    }
  });
}

export function fetchNodeRetry(nodeId: string, taskBatchId: string) {
  return request<null>({
    url: `/workflow/node/retry/${nodeId}/${taskBatchId}`,
    method: 'post'
  });
}

export function fetchNodeStop(nodeId: string, taskBatchId: string) {
  return request<null>({
    url: `/workflow/node/stop/${nodeId}/${taskBatchId}`,
    method: 'post'
  });
}

export function fetchGroupNameList() {
  return request<string[]>({
    url: `/group/all/group-name/list`,
    method: 'get'
  });
}
