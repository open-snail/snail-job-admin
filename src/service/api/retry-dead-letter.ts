import { request } from '../request';

/** get retry dead letter list */
export function fetchGetRetryDeadLetterPageList(params?: Api.RetryDeadLetter.RetryDeadLetterSearchParams) {
  return request<Api.RetryDeadLetter.RetryDeadLetterList>({
    url: '/retry-dead-letter/list',
    method: 'get',
    params
  });
}

/** add retry scene */
export function fetchRollbackRetryDeadLetter(data: { id: string | undefined | null }) {
  return request<boolean>({
    url: '/retry-dead-letter/batch/rollback',
    method: 'post',
    data
  });
}

/** edit retry scene */
export function fetchDeleteRetryDeadLetter(data: { id: string | undefined | null }) {
  return request<boolean>({
    url: '/retry-dead-letter/batch',
    method: 'delete',
    data
  });
}
