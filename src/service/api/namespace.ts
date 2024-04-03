import { request } from '../request';

/** Namespace */
export function fetchGetNamespaceList(params?: Api.Namespace.NamespaceSearchParams) {
  return request<Api.Namespace.NamespaceList>({
    url: '/namespace/list',
    method: 'get',
    params
  });
}
