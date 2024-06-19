import { request } from '../request';

/** get workflow page list */
export function fetchGetWorkflowPageList(params?: Api.Workflow.WorkflowSearchParams) {
  return request<Api.Workflow.WorkflowList>({
    url: '/workflow/page/list',
    method: 'get',
    params
  });
}

/** trigger workflow */
export function fetchTriggerWorkflow(id: string) {
  return request({
    url: `/workflow/trigger/${id}`,
    method: 'post'
  });
}

/** get namespace list */
export function fetchGetWorkflowNameList(params?: Api.Workflow.WorkflowSearchParams) {
  return request<Api.Workflow.Workflow[]>({
    url: '/workflow/workflow-name/list',
    method: 'get',
    params
  });
}

/** get workflow batch list */
export function fetchGetWorkflowBatchList(params?: Api.WorkflowBatch.WorkflowBatchSearchParams) {
  return request<Api.WorkflowBatch.WorkflowBatchList>({
    url: '/workflow/batch/page/list',
    method: 'get',
    params
  });
}

export function fetchUpdateWorkflowStatus(id: string) {
  return request({
    url: `/workflow/update/status/${id}`,
    method: 'put'
  });
}

export function fetchDelWorkflow(id: string) {
  return request({
    url: `/workflow/${id}`,
    method: 'delete'
  });
}

export function fetchStopWorkflowBatch(id: string) {
  return request({
    url: `/workflow/batch/stop/${id}`,
    method: 'post'
  });
}
