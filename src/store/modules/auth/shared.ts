import { localStg } from '@/utils/storage';

/** Get token */
export function getToken() {
  return localStg.get('token') || '';
}

/** Get user info */
export function getUserInfo() {
  const emptyInfo: Api.Auth.UserInfo = {
    id: '',
    mode: '',
    username: '',
    role: '',
    namespaceIds: []
  };
  const userInfo = localStg.get('userInfo') || emptyInfo;

  return userInfo;
}

/** Clear auth storage */
export function clearAuthStorage() {
  localStg.remove('token');
  localStg.remove('namespaceId');
  localStg.remove('userInfo');
}
