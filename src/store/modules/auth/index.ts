import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import { SetupStoreId } from '@/enum';
import { useRouterPush } from '@/hooks/common/router';
import { fetchGetUserInfo, fetchLogin, fetchVersion } from '@/service/api';
import { localStg } from '@/utils/storage';
import { $t } from '@/locales';
import { roleTypeRecord } from '@/constants/business';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import { useThemeStore } from '../theme';
import { clearAuthStorage, getToken } from './shared';

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Snail Job';
  const route = useRoute();
  const routeStore = useRouteStore();
  const themeStore = useThemeStore();
  const tabStore = useTabStore();
  const { toLogin, redirectFromLogin } = useRouterPush(false);
  const { loading: loginLoading, startLoading, endLoading } = useLoading();

  const token = ref(getToken());

  const namespaceUniqueId = ref('');

  const userInfo: Api.Auth.UserInfo = reactive({
    id: '',
    userId: '',
    mode: '',
    role: 1,
    username: '',
    userName: '',
    roles: [],
    buttons: [],
    namespaceIds: []
  });

  /** is super role in static route */
  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;
    return (
      VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.map(role => role?.toString()).includes(VITE_STATIC_SUPER_ROLE)
    );
  });

  /** Is login */
  const isLogin = computed(() => Boolean(token.value));

  /** Reset auth store */
  async function resetStore() {
    const authStore = useAuthStore();

    clearAuthStorage();

    authStore.$reset();

    themeStore.setWatermarkText(appTitle);

    if (!route.meta.constant) {
      await toLogin();
    }

    tabStore.cacheTabs();
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
        themeStore.setWatermarkText(`${userInfo.userName}@${appTitle}`);
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

    // 2. get user info
    const pass = await getUserInfo();

    if (pass) {
      token.value = loginToken.token;

      return true;
    }

    return false;
  }

  async function getUserInfo() {
    // update user info
    const { data: info, error } = await fetchGetUserInfo();

    if (!error) {
      // update store
      info!.userId = info.id;
      info!.userName = info?.username;
      info!.roles = [roleTypeRecord[info.role]];
      localStg.set('userInfo', info);
      Object.assign(userInfo, info);

      return true;
    }

    return false;
  }

  async function initUserInfo() {
    const hasToken = getToken();

    if (hasToken) {
      const pass = await getUserInfo();

      if (!pass) {
        resetStore();
      }
    }
  }

  async function initAppVersion() {
    const { data: version, error: versionError } = await fetchVersion();
    if (!versionError && version) {
      localStg.set('version', version!);
    } else {
      localStg.remove('version');
    }
  }

  function setNamespaceId(namespaceId: string) {
    namespaceUniqueId.value = namespaceId;
    const userNamespace = localStg.get('userNamespace') || {};
    userNamespace[userInfo.userId] = namespaceId;
    localStg.set('userNamespace', userNamespace);
    localStg.set('namespaceId', namespaceId);
  }

  return {
    token,
    userInfo,
    namespaceUniqueId,
    isStaticSuper,
    isLogin,
    loginLoading,
    resetStore,
    login,
    getUserInfo,
    initUserInfo,
    initAppVersion,
    setNamespaceId
  };
});
