import { BACKEND_ERROR_CODE, createFlatRequest } from '@sa/axios';
import { localStg } from './storage';

const baseURL = '/snail-job';

export const request = createFlatRequest<Service.Response>(
  {
    baseURL,
    headers: {
      timeout: 6000
    }
  },
  {
    async onRequest(config) {
      const { headers } = config;

      // set token
      const token = localStg.get('token');
      const namespaceId = localStg.get('namespaceId');
      // const Authorization = token ? `Bearer ${token}` : null;
      headers['SNAIL-JOB-AUTH'] = token;
      headers['SNAIL-JOB-NAMESPACE-ID'] = namespaceId;
      Object.assign(headers, { 'SNAIL-JOB-AUTH': token, 'SNAIL-JOB-NAMESPACE-ID': namespaceId });

      return config;
    },
    isBackendSuccess(response) {
      // when the backend response code is "0000"(default), it means the request is success
      // to change this logic by yourself, you can modify the `VITE_SERVICE_SUCCESS_CODE` in `.env` file
      return response.data.status?.toString() === import.meta.env.VITE_SERVICE_SUCCESS_CODE;
    },
    transformBackendResponse(response) {
      return response.data.total ? response.data : response.data.data;
    },
    onError(error) {
      // when the request is fail, you can show error message

      let msg = error.message;
      let backendErrorCode = '';

      // get backend error message and code
      if (error.code === BACKEND_ERROR_CODE) {
        msg = error.response?.data?.message || msg;
        backendErrorCode = error.response?.data?.status?.toString() || '';
      }

      // the error message is displayed in the modal
      const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
      if (modalLogoutCodes.includes(backendErrorCode)) {
        return;
      }

      // when the token is expired, refresh token and retry request, so no need to show error message
      const expiredTokenCodes = import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
      if (expiredTokenCodes.includes(backendErrorCode)) {
        return;
      }

      window.$message?.error(msg);
    }
  }
);
