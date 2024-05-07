import { request } from '../request';

/** get Job Log List */
export function fetchJobLogList(params?: Api.JobLog.JobLogSearchParams) {
  return request<Api.JobLog.JobLogList>({
    url: '/job/log/list',
    method: 'get',
    params
  });
}

/** get Retry Log List */
export function fetchRetryLogList(params?: Api.JobLog.JobLogSearchParams) {
  return request<Api.JobLog.JobLogList>({
    url: '/retry-task-log/message/list',
    method: 'get',
    params
  });
}
