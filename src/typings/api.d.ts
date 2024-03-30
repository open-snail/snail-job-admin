/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** page size */
      size: number;
      /** total count */
      total: number;
      /** current page number */
      page: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      data: T[];
      status: number;
    }

    /** common page record */
    type CommonPageRecord<T> = {
      data: T[];
      page: number;
      size: number;
      status: number;
      total: number;
    };

    /**
     * enable status
     *
     * - "1": enabled
     * - "2": disabled
     */
    type EnableStatus = '1' | '2';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id?: number;
      /** record creator */
      createBy?: string;
      /** record create time */
      createTime?: string;
      /** record updater */
      updateBy?: string;
      /** record update time */
      updateTime?: string;
      /** record status */
      status?: EnableStatus | null;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      id: string;
      mode: string;
      role: String;
      token: string;
      refreshToken: string;
      createDt: string;
      updateDt: string;
      namespaceIds: NamespaceId[];
    }

    interface UserInfo {
      userId: string;
      username: string;
      userName: string;
      mode: string;
      role: string;
      roles: string[];
      buttons: string[];
      namespaceIds: NamespaceId[];
    }

    interface NamespaceId {
      id: string;
      name: string;
      uniqueId: string;
    }
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  /**
   * namespace Dashboard
   *
   * backend api module: "dashboard"
   */
  namespace Dashboard {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    /** Task Retry Job */
    type CardCount = {
      jobTask: JobTask;
      retryTask: RetryTask;
      retryTaskBarList: RetryTaskBarList[];
      onLineService: OnlineService;
    };

    type OnlineService = {
      total: number;
      clientTotal: number;
      serverTotal: number;
    };

    type RetryTaskBarList = {
      x?: string;
      taskTotal?: number;
    };

    type RetryTask = {
      totalNum: number;
      runningNum: number;
      finishNum: number;
      maxCountNum: number;
      suspendNum: number;
    };

    type JobTask = {
      successNum: number;
      failNum: number;
      cancelNum: number;
      stopNum: number;
      totalNum: number;
      successRate: number;
    };

    /** Dashboard Line */
    type DashboardLine = {
      taskList: TaskList;
      rankList: RankList[];
      dashboardLineResponseDOList: DashboardLineResponseDOList[];
    };

    type DashboardLineResponseDOList = {
      createDt: string;
      total: number;
    } & DashboardLineJob &
      DashboardLineRetry;

    type DashboardLineJob = {
      createDt: string;
      total: number;
      fail: number;
      stop: number;
      cancel: number;
      success: number;
    };

    type DashboardLineRetry = {
      createDt: string;
      total: number;
      successNum: number;
      runningNum: number;
      maxCountNum: number;
      suspendNum: number;
    };

    type RankList = {
      name: string;
      total: string;
    };

    type TaskList = {
      status: number;
      data: Datum[];
      page: number;
      size: number;
      total: number;
    };

    type Datum = {
      groupName: string;
      run: number;
      total: number;
    };

    type DashboardLineType = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'OTHERS';

    type DashboardLineParams = {
      groupName?: string;
      type: DashboardLineType;
      startTime?: string;
      endTime?: string;
    };

    type DashboardPodsType = 1 | 2;

    type DashboardPodList = Common.PaginatingQueryRecord<DashboardPod>;

    type DashboardPod = {
      /** 路径/组 */
      consumerBuckets: number[];
      /** context path */
      contextPath: string;
      /** 创建时间 */
      createDt: string;
      /** ext attrs */
      extAttrs: string;
      /** 组名称 */
      groupName: string;
      /** host id */
      hostId: string;
      /** host IP */
      hostIp: string;
      /** host port */
      hostPort: string;
      /** 类型 */
      nodeType: DashboardPodsType;
      /** 更新时间 */
      updateDt: string;
    };

    type DashboardPodsParams = CommonType.RecordNullable<
      Pick<Api.Dashboard.DashboardPod, 'groupName'> & CommonSearchParams
    >;
  }

  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    /** role */
    type Role = Common.CommonRecord<{
      id: number;
      /** role name */
      roleName: string;
      /** role code */
      roleCode: string;
      /** role description */
      roleDesc: string;
    }>;

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'status'> & CommonSearchParams
    >;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'roleName' | 'roleCode'>;

    /**
     * user gender
     *
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = '1' | '2';

    /** user */
    type User = Common.CommonRecord<{
      /** user name */
      userName: string;
      /** user gender */
      userGender: UserGender | null;
      /** user nick name */
      nickName: string;
      /** user phone */
      userPhone: string;
      /** user email */
      userEmail: string;
      /** user role code collection */
      userRoles: string[];
    }>;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.User, 'userName' | 'userGender' | 'nickName' | 'userPhone' | 'userEmail' | 'status'> &
        CommonSearchParams
    >;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /**
     * menu type
     *
     * - "1": directory
     * - "2": menu
     */
    type MenuType = '1' | '2';

    type MenuButton = {
      /**
       * button code
       *
       * it can be used to control the button permission
       */
      code: string;
      /** button description */
      desc: string;
    };

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = '1' | '2';

    type Menu = Common.CommonRecord<{
      id: number;
      /** parent menu id */
      parentId: number;
      /** menu type */
      menuType: MenuType;
      /** menu name */
      menuName: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** component */
      component?: string;
      /**
       * i18n key
       *
       * it is for internationalization
       */
      i18nKey?: App.I18n.I18nKey;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** menu order */
      order: number;
      /** whether to cache the route */
      keepAlive?: boolean;
      /** outer link */
      href?: string;
      /** whether to hide the route in the menu */
      hideInMenu?: boolean;
      /**
       * The menu key will be activated when entering the route
       *
       * The route is not in the menu
       *
       * @example
       *   the route is "user_detail", if it is set to "user_list", the menu "user_list" will be activated
       */
      activeMenu?: import('@elegant-router/types').LastLevelRouteKey;
      /** By default, the same route path will use one tab, if set to true, it will use multiple tabs */
      multiTab?: boolean;
      /** If set, the route will be fixed in tabs, and the value is the order of fixed tabs */
      fixedIndexInTab?: number;
      /** menu buttons */
      buttons?: MenuButton[];
      /** children menu */
      children?: Menu[];
    }>;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    type MenuTree = {
      id: number;
      label: string;
      pId: number;
      children?: MenuTree[];
    };
  }
}
