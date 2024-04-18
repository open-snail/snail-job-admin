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

    /**
     * yes/no status
     *
     * - "0": no
     * - "1": yes
     */
    type YesOrNo = '0' | '1';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id?: string;
      /** record creator */
      createBy?: string;
      /** record create time */
      createDt?: string;
      /** record updater */
      updateBy?: string;
      /** record update time */
      updateDt?: string;
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
      workFlowTask: JobTask;
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
      data: Task[];
      page: number;
      size: number;
      total: number;
    };

    type Task = {
      groupName: string;
      run: number;
      total: number;
    };

    /**
     * dashboard line type
     *
     * - "DAY": "今日"
     * - "WEEK": "最近一周"
     * - "MONTH": "最近一月"
     * - "YEAR": "全年"
     * - "OTHERS": "自选日期"
     */
    type DashboardLineType = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'OTHERS';

    /**
     * dashboard line mode
     *
     * - "JOB": "job"
     * - "WORKFLOW": "workflow"
     */
    type DashboardLineMode = 'JOB' | 'WORKFLOW';

    type DashboardLineParams = {
      groupName?: string;
      type: DashboardLineType;
      mode?: DashboardLineMode;
      startTime?: string;
      endTime?: string;
    } & CommonSearchParams;

    /**
     * dashboard line mode
     *
     * - "1": "client"
     * - "2": "server"
     */
    type DashboardPodsType = 1 | 2;

    /** dashboard list */
    type DashboardPodList = Common.PaginatingQueryRecord<DashboardPod>;

    /** dashboard pod */
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

    /** dashboard search params */
    type DashboardPodsParams = CommonType.RecordNullable<
      Pick<Api.Dashboard.DashboardPod, 'groupName'> & CommonSearchParams
    >;
  }

  /**
   * namespace Namespace
   *
   * backend api module: "Namespace"
   */
  namespace Namespace {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    /** namespace */
    type Namespace = Common.CommonRecord<{
      /** 主键 */
      id?: string;
      /** 名称 */
      name?: string;
      /** UniqueId */
      uniqueId: string;
    }>;

    /** namespace search params */
    type NamespaceSearchParams = CommonType.RecordNullable<{ keyword: string } & CommonSearchParams>;

    /** namespace list */
    type NamespaceList = Common.PaginatingQueryRecord<Namespace>;
  }

  namespace GroupConfig {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    type IdGeneratorModeType = '1' | '2';

    /** groupConfig */
    type GroupConfig = Common.CommonRecord<{
      /** 命名空间id */
      namespaceId: string;
      /** 组名 */
      groupName: string;
      /** 组描述 */
      description: string;
      /** token */
      token: string;
      /** 组状态 0、未启用 1、启用 */
      groupStatus: Api.Common.EnableStatus;
      /** 版本号 */
      version: number;
      /** 分区 */
      groupPartition: number;
      /** 唯一id生成模式 默认号段模式 */
      idGeneratorMode: IdGeneratorModeType;
      /** 是否初始化场景 0:否 1:是 */
      initScene: Api.Common.YesOrNo;
      /** bucket */
      bucketIndex: number;
    }>;

    /** groupConfig search params */
    type GroupConfigSearchParams = CommonType.RecordNullable<
      Pick<Api.GroupConfig.GroupConfig, 'groupName'> & CommonSearchParams
    >;

    /** groupConfig list */
    type GroupConfigList = Common.PaginatingQueryRecord<GroupConfig>;
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
      id: string;
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
      id: string;
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
      id: string;
      label: string;
      pId: number;
      children?: MenuTree[];
    };
  }

  /**
   * namespace NotifyConfig
   *
   * backend api module: "notifyConfig"
   */
  namespace NotifyConfig {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    /** notify-config */
    type NotifyConfig = Common.CommonRecord<{
      /** 组名称 */
      groupName: string;
      /** 业务ID */
      businessId: string;
      /** 业务名称 */
      businessName?: string;
      /** 状态 */
      notifyStatus: string;
      /** 通知类型 */
      notifyType: string;
      /** 通知属性 */
      notifyAttribute: string;
      /** 通知场景 */
      notifyScene: string;
      /** 通知阈值 */
      notifyThreshold: number;
      /** 描述 */
      description: string;
    }>;

    /** notify-config search params */
    type NotifySearchParams = CommonType.RecordNullable<
      Pick<
        Api.NotifyConfig.NotifyConfig,
        | 'groupName'
        | 'businessId'
        | 'notifyStatus'
        | 'notifyType'
        | 'notifyAttribute'
        | 'notifyScene'
        | 'notifyThreshold'
        | 'description'
      > &
        CommonSearchParams
    >;

    /** notify-config list */
    type NotifyConfigList = Common.PaginatingQueryRecord<NotifyConfig>;
  }

  /**
   * namespace Notify-recipient
   *
   * backend api module: "notify-recipient"
   */
  namespace NotifyRecipient {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    /** notifyRecipient */
    type NotifyRecipient = Common.CommonRecord<{
      /** 接收人名称 */
      recipientName: string;
      /** 通知类型 */
      notifyType: AlarmType;
      /** 属性信息 */
      notifyAttribute?: string;
      /** 描述 */
      description: string;
    }>;

    /** dingDing Notify */
    type DingDingNotify = Common.CommonRecord<{
      /** 接收人名称 */
      webhookUrl: string;
      /** 通知类型 */
      ats: string[];
    }> &
      NotifyRecipient;

    /** notifyRecipient search params */
    type NotifyRecipientParams = CommonType.RecordNullable<
      Pick<Api.NotifyRecipient.NotifyRecipient, 'recipientName' | 'notifyType' | 'notifyAttribute' | 'description'> &
        CommonSearchParams
    >;

    /** notifyRecipient list */
    type NotifyRecipientList = Common.PaginatingQueryRecord<NotifyRecipient>;

    /** 1: 钉钉通知 2: 邮件通知 3: 企业通知 4: 飞书 */
    type AlarmType = 1 | 2 | 3 | 4;
  }
}
