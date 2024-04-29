import { request } from '../request';

/** get retry scene list */
export function fetchGetRetryScenePageList(params?: Api.RetryScene.SceneSearchParams) {
  return request<Api.RetryScene.SceneList>({
    url: '/scene-config/page/list',
    method: 'get',
    params
  });
}

/** get retry scene list */
export function fetchGetRetrySceneList(params?: Api.RetryScene.SceneSearchParams) {
  return request<Api.RetryScene.Scene[]>({
    url: '/scene-config/list',
    method: 'get',
    params
  });
}

/** add retry scene */
export function fetchAddRetryScene(data: Api.RetryScene.Scene) {
  return request<boolean>({
    url: '/scene-config',
    method: 'post',
    data
  });
}

/** edit retry scene */
export function fetchEditRetryScene(data: Api.RetryScene.Scene) {
  return request<boolean>({
    url: '/scene-config',
    method: 'put',
    data
  });
}

/** update retry scene status */
export function fetchUpdateSceneStatus(id: string, status: Api.Common.EnableStatusNumber) {
  return request<boolean>({
    url: `/scene-config/${id}/status/${status}`,
    method: 'put'
  });
}

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
