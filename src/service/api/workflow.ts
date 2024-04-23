import { request } from '../request';

/** get workflow page list */
export function fetchGetWorkflowPageList(params?: Api.Workflow.WorkflowSearchParams) {
  return request<Api.Workflow.WorkflowList>({
    url: '/workflow/page/list',
    method: 'get',
    params
  });
}

/** get namespace list */
export function fetchGetWorkflowNameList(params?: Api.WorkflowBatch.WorkflowBatchSearchParams) {
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
