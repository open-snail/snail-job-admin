import { request } from '../request';

/** get retry log list */
export function fetchRetryLogPageList(params?: Api.RetryLog.RetryLogSearchParams) {
  return request<Api.RetryLog.RetryLogList>({
    url: '/retry-task-log/list',
    method: 'get',
    params
  });
}

/** get retry log list */
export function fetchRetryLogById(id: string) {
  return request<Api.RetryLog.RetryLog>({
    url: `/retry-task-log/${id}`,
    method: 'get'
  });
}

/** delete retry log */
export function fetchDeleteRetryLog(id: number) {
  return request<boolean>({
    url: `/retry-task-log/${id}`,
    method: 'delete'
  });
}

/** delete retry log */
export function fetchBatchDeleteRetryLog(ids: number[]) {
  return request<boolean>({
    url: `/retry-task-log/ids`,
    method: 'delete',
    data: ids
  });
}
