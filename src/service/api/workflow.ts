import { request } from '../request';

/** get namespace list */
export function fetchGetWorkflowPageList(params?: Api.Workflow.WorkflowSearchParams) {
  return request<Api.Workflow.WorkflowList>({
    url: '/workflow/page/list',
    method: 'get',
    params
  });
}
