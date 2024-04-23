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
     * enable status
     *
     * - 0: enabled
     * - 1: disabled
     */
    type EnableStatusNumber = 0 | 1;

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

    type IdGeneratorModeType = 1 | 2;

    type GroupStatusType = 0 | 1;

    type YesOrNoType = 0 | 1;

    /** groupConfig */
    type GroupConfig = Common.CommonRecord<{
      /** 命名空间id */
      namespaceId?: string;
      /** 组名 */
      groupName: string;
      /** 组描述 */
      description: string;
      /** token */
      token: string;
      /** 组状态 0、未启用 1、启用 */
      groupStatus: GroupStatusType;
      /** 版本号 */
      version?: number;
      /** 分区 */
      groupPartition: number;
      /** 唯一id生成模式 默认号段模式 */
      idGeneratorMode: IdGeneratorModeType;
      /** 是否初始化场景 0:否 1:是 */
      initScene: YesOrNoType;
      /** bucket */
      bucketIndex?: number;
    }>;

    /** groupConfig search params */
    type GroupConfigSearchParams = CommonType.RecordNullable<
      Pick<Api.GroupConfig.GroupConfig, 'groupName'> & CommonSearchParams
    >;

    type GroupConfigRequestVO = {
      groupName: string;
      groupStatus: GroupStatusType;
      token?: string;
      description?: string;
      groupPartition?: number;
      idGeneratorMode?: IdGeneratorModeType;
      initScene?: YesOrNoType;
    };

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
      /** 通知人id */
      notifyRecipientIds: number;
      /** 任务类型 1、重试任务 2、回调任务、3、JOB任务 4、WORKFLOW任务 */
      systemTaskType: SystemTaskType;
      /** 业务名称 */
      businessName?: string;
      /** 状态 */
      notifyStatus: Api.Common.EnableStatusNumber;
      /** 通知场景 */
      notifyScene: string;
      /** 通知阈值 */
      notifyThreshold: number;
      /** 限流开关 */
      rateLimiterStatus: Api.Common.EnableStatusNumber;
      /** 每秒限流阈值 */
      rateLimiterThreshold: number;
      /** 描述 */
      description: string;
    }>;

    /** notify-config search params */
    type NotifySearchParams = CommonType.RecordNullable<
      Pick<
        Api.NotifyConfig.NotifyConfig,
        'groupName' | 'businessId' | 'systemTaskType' | 'notifyStatus' | 'notifyScene'
      > &
        CommonSearchParams
    >;

    /** notify-config list */
    type NotifyConfigList = Common.PaginatingQueryRecord<NotifyConfig>;

    /** 任务类型 1、重试任务 2、回调任务、 3、JOB任务 4、WORKFLOW任务 */
    type SystemTaskType = 1 | 3 | 4;

    /** 1、场景重试数量超过阈值 2、场景重试失败数量超过阈值 3、客户端上报失败 4、客户端组件异常 5、任务重试失败数量超过阈值 6、任务重试失败进入死信队列 */
    type RetryNotifyScene = 1 | 2 | 3 | 4 | 5 | 6;

    /** 1、任务执行失败 */
    type JobNotifyScene = 1;
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
      /** @的用户 */
      ats: string[];
    }> &
      NotifyRecipient;

    /** email Notify */
    type EmailNotify = Common.CommonRecord<{
      /** 通知人 */
      tos: string[];
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

  /**
   * namespace RetryTask
   *
   * backend api module: "retryTask"
   */
  namespace RetryTask {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    type RetryStatusType = 0 | 1 | 2 | 3;

    type TaskType = 1 | 2;

    /** RetryTask */
    type RetryTask = Common.CommonRecord<{
      /** UniqueId */
      uniqueId?: string;
      /** 组名称 */
      groupName: string;
      /** 场景名称 */
      sceneName: string;
      /** 幂等id */
      idempotentId: string;
      /** 业务编号 */
      bizNo: string;
      /** 执行器名称 */
      executorName: string;
      /** 执行方法参数 */
      argsStr: string;
      /** 扩展字段 */
      extAttrs?: string;
      /** 下次触发时间 */
      nextTriggerAt?: string;
      /** 重试次数 */
      retryCount?: number;
      /** 重试状态 0、重试中 1、重试完成 2、最大次数 3、暂停 */
      retryStatus: RetryStatusType;
      /** 任务类型 1、重试数据 2、回调数据 */
      taskType?: TaskType;
    }>;

    type RetryTaskBatchAdd = {
      /** 组名称 */
      groupName: string;
      /** 重试状态 0、重试中 1、重试完成 2、最大次数 3、暂停 */
      retryStatus: RetryStatusType;
      /** 日志 */
      logStr: string;
    };

    type RetryTaskUpdateStatusRequest = {
      /** id */
      id: number;
      /** 组名称 */
      groupName: string;
      /** 重试状态 0、重试中 1、重试完成 2、最大次数 3、暂停 */
      retryStatus: RetryStatusType;
    };

    type ManualTriggerTaskRequestVO = {
      groupName: string;
      uniqueIds: string[];
    };

    type BatchDeleteRetryTaskVO = {
      groupName: string;
      ids: string[];
    };

    type GenerateRetryIdempotentIdVO = {
      /** 组名称 */
      groupName: string;
      /** 场景名称 */
      sceneName: string;
      /** 执行参数 */
      argsStr: string;
      /** 执行器名称 */
      executorName: string;
    };

    /** RetryTask search params */
    type RetryTaskSearchParams = CommonType.RecordNullable<
      Pick<Api.RetryTask.RetryTask, 'uniqueId' | 'groupName' | 'sceneName' | 'idempotentId' | 'bizNo' | 'retryStatus'> &
        CommonSearchParams
    >;

    /** RetryTask list */
    type RetryTaskList = Common.PaginatingQueryRecord<RetryTask>;
  }

  /**
   * namespace Scene
   *
   * backend api module: "scene"
   */
  namespace RetryScene {
    import EnableStatusNumber = Api.Common.EnableStatusNumber;
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    /** scene */
    type Scene = Common.CommonRecord<{
      /** 组名 */
      groupName: string;
      /** 场景名 */
      sceneName: string;
      /** 状态 */
      sceneStatus: EnableStatusNumber;
      /** 退避策略 */
      backOff: BackOff;
      /** 路由策略 */
      routeKey: RouteKey;
      /** 最大重试次数 */
      maxRetryCount: number;
      /** 间隔时间 */
      triggerInterval: number;
      /** 调用链超时时间 */
      deadlineRequest: number;
      /** 超时时间 */
      executorTimeout: number;
      /** 描述 */
      description: string;
    }>;

    /** scene search params */
    type SceneSearchParams = CommonType.RecordNullable<
      Pick<
        Api.RetryScene.Scene,
        | 'groupName'
        | 'sceneName'
        | 'sceneStatus'
        | 'backOff'
        | 'maxRetryCount'
        | 'triggerInterval'
        | 'deadlineRequest'
        | 'executorTimeout'
        | 'description'
        | 'routeKey'
      > &
        CommonSearchParams
    >;

    /** scene list */
    type SceneList = Common.PaginatingQueryRecord<Scene>;

    /** 1: 延迟等级 2: 固定时间 3: CRON表达式 4: 随机等待 */
    type BackOff = 1 | 2 | 3 | 4;

    /** 1: 一致性Hash 2: 随机 3: LRU 4: 轮询 */
    type RouteKey = 1 | 2 | 3 | 4;
  }

  /**
   * namespace Workflow
   *
   * backend api module: "workflow"
   */
  namespace Workflow {
    import EnableStatusNumber = Api.Common.EnableStatusNumber;
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    /** workflow */
    type Workflow = Common.CommonRecord<{
      /** 工作流名称 */
      workflowName: string;
      /** 组名称 */
      groupName: string;
      /** 触发时间 */
      nextTriggerAt: string;
      /** 状态 */
      workflowStatus: EnableStatusNumber;
      /** 触发类型 */
      triggerType: number;
      /** 间隔时长 */
      triggerInterval: string;
      /** 超时时间 */
      executorTimeout: number;
    }>;

    /** workflow search params */
    type WorkflowSearchParams = CommonType.RecordNullable<
      Pick<Api.Workflow.Workflow, 'workflowName' | 'groupName' | 'workflowStatus'> & CommonSearchParams
    >;

    /** workflow list */
    type WorkflowList = Common.PaginatingQueryRecord<Workflow>;
  }

  /**
   * namespace JobTask
   *
   * backend api module: "jobTask"
   */
  namespace JobTask {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    /** JobTask */
    type JobTask = Common.CommonRecord<{
      /** 组名称 */
      groupName: string;
      /** 任务名称 */
      jobName: string;
      /** 方法参数 */
      argsStr: string;
      /** 参数类型 */
      argsType: string;
      /** 扩展字段 */
      extAttrs: string;
      /** 下次触发时间 */
      nextTriggerAt: string;
      /** 状态 */
      jobStatus: string;
      /** 路由策略 */
      routeKey: string;
      /** 执行器类型 */
      executorType: string;
      /** 触发类型 */
      triggerType: string;
      /** 间隔时长 */
      triggerInterval: number;
      /** 阻塞策略 */
      blockStrategy: number;
      /** 超时时间 */
      executorTimeout: number;
      /** 最大重试次数 */
      maxRetryTimes: number;
      /** 重试间隔 */
      retryInterval: number;
      /** 任务类型 */
      taskType: number;
      /** 并行数 */
      parallelNum: number;
      /** Bucket */
      bucketIndex: number;
      /** 描述 */
      description: string;
    }>;

    /** JobTask search params */
    type JobTaskSearchParams = CommonType.RecordNullable<
      Pick<
        Api.JobTask.JobTask,
        | 'groupName'
        | 'jobName'
        | 'argsStr'
        | 'argsType'
        | 'jobStatus'
        | 'routeKey'
        | 'executorType'
        | 'triggerType'
        | 'triggerInterval'
        | 'blockStrategy'
        | 'executorTimeout'
        | 'maxRetryTimes'
        | 'retryInterval'
        | 'taskType'
        | 'parallelNum'
        | 'description'
      > &
        CommonSearchParams
    >;

    /** JobTask list */
    type JobTaskList = Common.PaginatingQueryRecord<JobTask>;
  }

  /**
   * namespace WorkflowBatch
   *
   * backend api module: "workflowBatch"
   */
  namespace WorkflowBatch {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'size'>;

    /** workflowBatch */
    type WorkflowBatch = Common.CommonRecord<{
      /** 工作流名称 */
      workflowName: string;
      /** 工作流ID */
      workflowId?: number;
      /** 组名称 */
      groupName: string;
      /** 执行时间 */
      executionAt: string;
      /** 状态 */
      taskBatchStatus: string;
      /** 操作原因 */
      operationReason: string;
      /** 创建时间 */
      createDt: string;
    }>;

    /** workflowBatch search params */
    type WorkflowBatchSearchParams = CommonType.RecordNullable<
      Pick<Api.WorkflowBatch.WorkflowBatch, 'workflowId' | 'groupName' | 'taskBatchStatus'> & CommonSearchParams
    >;

    /** workflowBatch list */
    type WorkflowBatchList = Common.PaginatingQueryRecord<WorkflowBatch>;
  }
}
