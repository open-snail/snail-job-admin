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

export function fetchAddWorkflow(data: Flow.NodeDataType) {
  return request<null>({
    url: `/workflow`,
    method: 'post',
    data
  });
}

export function fetchUpdateWorkflow(data: Flow.NodeDataType) {
  return request<null>({
    url: `/workflow`,
    method: 'put',
    data
  });
}

export function fetchWorkflowInfo(id: string) {
  return request<Flow.NodeDataType>({
    url: `/workflow/${id}`,
    method: 'get'
  });
}

export function fetchWorkflowBatchInfo(id: string) {
  return request<Flow.NodeDataType>({
    url: `/workflow/batch/${id}`,
    method: 'get'
  });
}
