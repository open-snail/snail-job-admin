import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import { SetupStoreId } from '@/enum';
import { useRouterPush } from '@/hooks/common/router';
import { fetchGetUserInfo, fetchLogin } from '@/service/api';
import { localStg } from '@/utils/storage';
import { $t } from '@/locales';
import { roleTypeRecord } from '@/constants/business';
import { useRouteStore } from '../route';
import { clearAuthStorage, getToken, getUserInfo } from './shared';

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const route = useRoute();
  const routeStore = useRouteStore();
  const { toLogin, redirectFromLogin } = useRouterPush(false);
  const { loading: loginLoading, startLoading, endLoading } = useLoading();

  const token = ref(getToken());

  const userInfo: Api.Auth.UserInfo = reactive(getUserInfo());

  /** is super role in static route */
  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;
    return (
      VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.map(role => role.toString()).includes(VITE_STATIC_SUPER_ROLE)
    );
  });

  /** Is login */
  const isLogin = computed(() => Boolean(token.value));

  /** Reset auth store */
  async function resetStore() {
    const authStore = useAuthStore();

    clearAuthStorage();

    authStore.$reset();

    if (!route.meta.constant) {
      await toLogin();
    }

    routeStore.resetStore();
  }

  /**
   * Login
   *
   * @param userName User name
   * @param password Password
   * @param [redirect=true] Whether to redirect after login. Default is `true`
   */
  async function login(userName: string, password: string, redirect = true) {
    startLoading();

    const { data: loginToken, error } = await fetchLogin(userName, password);

    if (!error) {
      const pass = await loginByToken(loginToken);

      if (pass) {
        await routeStore.initAuthRoute();

        if (redirect) {
          await redirectFromLogin();
        }

        if (routeStore.isInitAuthRoute) {
          window.$notification?.success({
            title: $t('page.login.common.loginSuccess'),
            content: $t('page.login.common.welcomeBack', { userName: userInfo.userName }),
            duration: 4500
          });
        }
      }
    } else {
      resetStore();
    }

    endLoading();
  }

  async function loginByToken(loginToken: Api.Auth.LoginToken) {
    // 1. stored in the localStorage, the later requests need it in headers
    localStg.set('token', loginToken.token);
    // localStg.set('refreshToken', loginToken.refreshToken);
    const userNamespace = localStg.get('userNamespace') || {};
    const namespaceId = userNamespace[loginToken.id];
    localStg.set('namespaceId', namespaceId);

    if (!namespaceId || !loginToken.namespaceIds.map(item => item.uniqueId).includes(namespaceId)) {
      userNamespace[loginToken.id] = loginToken.namespaceIds[0].uniqueId;
      localStg.set('namespaceId', loginToken.namespaceIds[0].uniqueId);
      localStg.set('userNamespace', userNamespace);
    }

    const { data: info, error } = await fetchGetUserInfo();

    if (!error) {
      info!.userId = info?.id;
      info!.userName = info?.username;
      info!.roles = [roleTypeRecord[info.role]];
      // 2. store user info
      localStg.set('userInfo', info);

      // 3. update store
      token.value = loginToken.token;
      Object.assign(userInfo, info);

      return true;
    }

    return false;
  }

  function setNamespaceId(namespaceId: string) {
    const userNamespace = localStg.get('userNamespace') || {};
    userNamespace[userInfo.userId] = namespaceId;
    localStg.set('userNamespace', userNamespace);
    localStg.set('namespaceId', namespaceId);
  }

  async function getInfo() {
    const { data: info, error } = await fetchGetUserInfo();

    if (!error) {
      info!.userName = info?.username;
      info!.roles = [roleTypeRecord[info.role]];
      localStg.set('userInfo', info);
      Object.assign(userInfo, info);

      return true;
    }
    resetStore();
    return false;
  }

  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    loginLoading,
    resetStore,
    login,
    getInfo,
    setNamespaceId
  };
});
