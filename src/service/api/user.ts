import { request } from '../request';

/** get user list */
export function fetchGetUserPageList(params?: Api.UserManager.UserManagerSearchParams) {
  return request<Api.UserManager.UserManagerList>({
    url: '/user/page/list',
    method: 'get',
    params
  });
}

/** add user */
export function fetchAddUser(data: Api.UserManager.UserManager) {
  return request<boolean>({
    url: '/user',
    method: 'post',
    data
  });
}

/** edit user */
export function fetchEditUser(data: Api.UserManager.UserManager) {
  return request<boolean>({
    url: '/user',
    method: 'put',
    data
  });
}

/** delete user */
export function fetchDelUser(id: number) {
  return request<boolean>({
    url: `/user/${id}`,
    method: 'delete'
  });
}
