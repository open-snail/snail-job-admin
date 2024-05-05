const local: App.I18n.Schema = {
  system: {
    title: 'Snail Job',
    desc: '灵活，可靠和快速的分布式任务重试和分布式任务调度平台'
  },
  common: {
    action: '操作',
    add: '新增',
    batchAdd: '批量添加',
    addSuccess: '添加成功',
    backToHome: '返回首页',
    batchDelete: '批量删除',
    cancel: '取消',
    close: '关闭',
    check: '勾选',
    columnSetting: '列设置',
    config: '配置',
    confirm: '确认',
    save: '保存',
    delete: '删除',
    rollback: '回滚',
    batchRollback: '批量回滚',
    rollbackSuccess: '回滚成功',
    deleteSuccess: '删除成功',
    confirmDelete: '确认删除吗？',
    edit: '编辑',
    detail: '详情',
    index: '序号',
    keywordSearch: '请输入关键词搜索',
    logout: '退出登录',
    logoutConfirm: '确认退出登录吗？',
    lookForward: '敬请期待',
    modify: '修改',
    modifySuccess: '修改成功',
    noData: '无数据',
    operate: '操作',
    pleaseCheckValue: '请检查输入的值是否合法',
    refresh: '刷新',
    reset: '重置',
    search: '搜索',
    switch: '切换',
    tip: '提示',
    trigger: '触发',
    update: '更新',
    updateSuccess: '更新成功',
    updateFailed: '更新失败',
    userCenter: '个人中心',
    success: '成功',
    fail: '失败',
    stop: '停止',
    confirmStop: '确认停止吗？',
    execute: '执行',
    copy: '复制',
    batchList: '批次',
    resume: '恢复',
    pause: '暂停',
    finish: '完成',
    running: '运行中',
    executeSuccess: '执行成功',
    executeFailed: '执行失败',
    confirmExecute: '确认执行吗？',
    confirmResume: '确认恢复吗？',
    confirmPause: '确认暂停吗？',
    confirmFinish: '确认完成吗？',
    yesOrNo: {
      yes: '是',
      no: '否'
    },
    systemTaskType: {
      retry: '重试任务',
      callback: '回调任务',
      job: '定时任务',
      workflow: '工作流'
    },
    routeKey: {
      routeLabel: '路由策略',
      routeForm: '请选择路由策略',
      items: {
        consistentHash: '一致性哈希',
        random: '随机',
        lru: 'LRU',
        round: '轮询'
      }
    },
    blockStrategy: {
      label: '阻塞策略',
      form: '请选择阻塞策略',
      items: {
        discard: '丢弃',
        overwrite: '覆盖',
        parallel: '并行'
      }
    },
    executorType: {
      label: '执行器类型',
      form: '请选择执行器类型',
      items: {
        java: 'Java'
      }
    },
    taskType: {
      label: '任务类型',
      form: '请选择任务类型',
      items: {
        cluster: '集群',
        broadcast: '广播',
        slice: '切片'
      }
    },
    triggerType: {
      label: '触发类型',
      form: '请选择触发类型',
      items: {
        cron: 'CRON表达式',
        fixed: '固定时间',
        workflow: '工作流'
      }
    },
    taskBatchStatus: {
      label: '执行状态',
      form: '请选择执行状态',
      items: {
        waiting: '待处理',
        running: '运行中',
        success: '处理成功',
        fail: '处理失败',
        stop: '任务停止',
        cancel: '取消'
      }
    },
    jobOperationReason: {
      label: '操作原因',
      form: '请选择执行状态',
      items: {
        none: '',
        taskExecutionTimeout: '任务执行超时',
        notClient: '无客户端节点',
        closed: '任务已关闭',
        discard: '任务丢弃',
        overlay: '任务被覆盖',
        notExecutionTask: '无可执行任务项',
        taskExecutionError: '任务执行期间发生非预期异常',
        mannerStop: '手动停止',
        workflowConditionNodeExecutionError: '条件节点执行异常',
        jobTaskInterrupted: '任务中断',
        workflowCallbackNodeExecutionError: '回调节点执行异常',
        workflowNodeNoRequired: '无需处理',
        workflowNodeClosedSkipExecution: '节点关闭跳过执行',
        workflowDecisionFailed: '判定未通过'
      }
    },
    updateDt: '更新时间',
    createDt: '创建时间'
  },
  request: {
    logout: '请求失败后登出用户',
    logoutMsg: '用户状态失效，请重新登录',
    logoutWithModal: '请求失败后弹出模态框再登出用户',
    logoutWithModalMsg: '用户状态失效，请重新登录',
    refreshToken: '请求的token已过期，刷新token',
    tokenExpired: 'token已过期'
  },
  theme: {
    themeSchema: {
      title: '主题模式',
      light: '亮色模式',
      dark: '暗黑模式',
      auto: '跟随系统'
    },
    layoutMode: {
      title: '布局模式',
      vertical: '左侧菜单模式',
      'vertical-mix': '左侧菜单混合模式',
      horizontal: '顶部菜单模式',
      'horizontal-mix': '顶部菜单混合模式'
    },
    themeColor: {
      title: '主题颜色',
      primary: '主色',
      info: '信息色',
      success: '成功色',
      warning: '警告色',
      error: '错误色',
      followPrimary: '跟随主色'
    },
    scrollMode: {
      title: '滚动模式',
      wrapper: '外层滚动',
      content: '主体滚动'
    },
    page: {
      animate: '页面切换动画',
      mode: {
        title: '页面切换动画类型',
        'fade-slide': '滑动',
        fade: '淡入淡出',
        'fade-bottom': '底部消退',
        'fade-scale': '缩放消退',
        'zoom-fade': '渐变',
        'zoom-out': '闪现',
        none: '无'
      }
    },
    fixedHeaderAndTab: '固定头部和标签栏',
    header: {
      height: '头部高度',
      breadcrumb: {
        visible: '显示面包屑',
        showIcon: '显示面包屑图标'
      }
    },
    tab: {
      visible: '显示标签栏',
      cache: '缓存标签页',
      height: '标签栏高度',
      mode: {
        title: '标签栏风格',
        chrome: '谷歌风格',
        button: '按钮风格'
      }
    },
    sider: {
      inverted: '深色侧边栏',
      width: '侧边栏宽度',
      collapsedWidth: '侧边栏折叠宽度',
      mixWidth: '混合布局侧边栏宽度',
      mixCollapsedWidth: '混合布局侧边栏折叠宽度',
      mixChildMenuWidth: '混合布局子菜单宽度'
    },
    footer: {
      visible: '显示底部',
      fixed: '固定底部',
      height: '底部高度',
      right: '底部局右'
    },
    themeDrawerTitle: '主题配置',
    pageFunTitle: '页面功能',
    configOperation: {
      copyConfig: '复制配置',
      copySuccessMsg: '复制成功，请替换 src/theme/settings.ts 中的变量 themeSettings',
      resetConfig: '重置配置',
      resetSuccessMsg: '重置成功'
    }
  },
  route: {
    login: '登录',
    403: '无权限',
    404: '页面不存在',
    500: '服务器错误',
    'iframe-page': '外链页面',
    home: '首页',
    document: '文档',
    document_project: '项目文档',
    'document_project-link': '项目文档(外链)',
    document_vue: 'Vue文档',
    document_vite: 'Vite文档',
    document_unocss: 'UnoCSS文档',
    document_naive: 'Naive UI文档',
    document_antd: 'Ant Design Vue文档',
    'user-center': '个人中心',
    about: '关于',
    function: '系统功能',
    function_tab: '标签页',
    'function_multi-tab': '多标签页',
    'function_hide-child': '隐藏子菜单',
    'function_hide-child_one': '隐藏子菜单',
    'function_hide-child_two': '菜单二',
    'function_hide-child_three': '菜单三',
    function_request: '请求',
    'function_toggle-auth': '切换权限',
    'function_super-page': '超级管理员可见',
    pods: '在线机器',
    namespace: '命名空间',
    group: '组管理',
    manage: '系统管理',
    manage_user: '用户管理',
    notify: '告警通知',
    notify_recipient: '通知人',
    notify_scene: '通知场景',
    retry: '重试任务',
    retry_task: '重试任务',
    'retry_dead-letter': '死信任务',
    user: '用户管理',
    user_manager: '用户信息',
    retry_scene: '重试场景',
    retry_log: '重试日志',
    workflow: '工作流',
    workflow_task: '任务管理',
    workflow_batch: '执行批次',
    workflow_form: '工作流',
    workflow_form_copy: '复制工作流',
    workflow_form_batch: '工作流批次详情',
    workflow_form_detail: '工作流详情',
    workflow_form_edit: '编辑工作流',
    job: '定时任务',
    job_task: '任务管理',
    job_batch: '执行批次',
    'manage_user-detail': '用户详情',
    manage_role: '角色管理',
    manage_menu: '菜单管理',
    'multi-menu': '多级菜单',
    'multi-menu_first': '菜单一',
    'multi-menu_first_child': '菜单一子菜单',
    'multi-menu_second': '菜单二',
    'multi-menu_second_child': '菜单二子菜单',
    'multi-menu_second_child_home': '菜单二子菜单首页',
    exception: '异常页',
    exception_403: '403',
    exception_404: '404',
    exception_500: '500'
  },
  page: {
    common: {
      upadteTime: '更新时间',
      createTime: '创建时间'
    },
    login: {
      common: {
        loginOrRegister: '登录 / 注册',
        userNamePlaceholder: '请输入用户名',
        phonePlaceholder: '请输入手机号',
        codePlaceholder: '请输入验证码',
        passwordPlaceholder: '请输入密码',
        confirmPasswordPlaceholder: '请再次输入密码',
        codeLogin: '验证码登录',
        login: '登录',
        confirm: '确定',
        back: '返回',
        validateSuccess: '验证成功',
        loginSuccess: '登录成功',
        welcomeBack: '欢迎回来，{userName} ！'
      },
      pwdLogin: {
        title: '密码登录',
        rememberMe: '记住我',
        forgetPassword: '忘记密码？',
        register: '注册账号',
        otherAccountLogin: '其他账号登录',
        otherLoginMode: '其他登录方式',
        superAdmin: '超级管理员',
        admin: '管理员',
        user: '普通用户'
      },
      codeLogin: {
        title: '验证码登录',
        getCode: '获取验证码',
        reGetCode: '{time}秒后重新获取',
        sendCodeSuccess: '验证码发送成功',
        imageCodePlaceholder: '请输入图片验证码'
      },
      register: {
        title: '注册账号',
        agreement: '我已经仔细阅读并接受',
        protocol: '《用户协议》',
        policy: '《隐私权政策》'
      },
      resetPwd: {
        title: '重置密码'
      },
      bindWeChat: {
        title: '绑定微信'
      }
    },
    about: {
      title: '关于',
      introduction: `SoybeanAdmin 是一个优雅且功能强大的后台管理模板，基于最新的前端技术栈，包括 Vue3, Vite5, TypeScript, Pinia 和 UnoCSS。它内置了丰富的主题配置和组件，代码规范严谨，实现了自动化的文件路由系统。此外，它还采用了基于 ApiFox 的在线Mock数据方案。SoybeanAdmin 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。`,
      projectInfo: {
        title: '项目信息',
        version: '版本',
        latestBuildTime: '最新构建时间',
        githubLink: 'Github 地址',
        previewLink: '预览地址'
      },
      prdDep: '生产依赖',
      devDep: '开发依赖'
    },
    home: {
      Greeting: '{userName}，欢迎回来！',
      morningGreeting: '早安，{userName}，今天又是充满活力的一天！',
      bthGreeting: '上午好，{userName}，工作顺利吗，不要久坐，多起来走动走动哦！',
      noonGreeting: '中午好，{userName}，工作了一个上午，现在是午餐时间！',
      athGreeting: '下午好，{userName}，午后很容易犯困呢，是时候该打个盹了!',
      duskGreeting: '{userName}，傍晚了，窗外夕阳的景色很美丽呢，最美不过夕阳红~',
      eveningGreeting: '晚上好，{userName}，今天过得怎么样？请注意早点休息！',
      earlyMorningGreeting: '{userName}，已经这么晚了呀，早点休息吧，晚安~',
      weatherDesc: '今日多云转晴，20℃ - 25℃!',
      retryTaskCount: '重试任务',
      jobTaskCount: '定时任务',
      userCount: '用户',
      retryTask: '重试任务',
      retryDeadLetter: '死信任务',
      retryTaskTip: '总任务量: 重试/回调任务量',
      jobTask: '定时任务',
      jobBatch: '任务批次',
      jobTaskTip: '成功率:总完成/总调度量',
      onlineServiceCount: '总在线机器',
      onlineServiceTip: '总在线机器:注册到系统的客户端和服务端之和',
      workflow: '工作流',
      workflowTip: '成功率:总完成/总调度量',
      projectCount: '项目数',
      todo: '待办',
      message: '消息',
      downloadCount: '下载量',
      registerCount: '注册量',
      schedule: '作息安排',
      study: '学习',
      work: '工作',
      rest: '休息',
      entertainment: '娱乐',
      visitCount: '访问量',
      turnover: '成交额',
      dealCount: '成交量',
      retryTab: {
        params: {
          day: '今日',
          week: '最近一周',
          month: '最近一月',
          year: '全年'
        },
        rank: {
          title: '任务量排名'
        },
        task: {
          title: '场景列表',
          groupName: '组名称',
          run: '运行中任务数',
          total: '总任务数'
        },
        pie: {
          title: '成功比例图'
        }
      },
      projectNews: {
        title: '项目动态',
        moreNews: '更多动态',
        desc1: 'Soybean 在2021年5月28日创建了开源项目 soybean-admin!',
        desc2: 'Yanbowe 向 soybean-admin 提交了一个bug，多标签栏不会自适应。',
        desc3: 'Soybean 准备为 soybean-admin 的发布做充分的准备工作!',
        desc4: 'Soybean 正在忙于为soybean-admin写项目说明文档！',
        desc5: 'Soybean 刚才把工作台页面随便写了一些，凑合能看了！'
      },
      creativity: '创意'
    },
    pods: {
      title: '在线机器',
      nodeType: '类型',
      groupName: '组名称',
      hostId: 'Pod ID',
      hostIp: 'IP',
      hostPort: 'Port',
      consumerBuckets: '路径/组',
      updateDt: '更新时间',
      contextPath: '路径/组',
      form: {
        groupName: '请输入组名称'
      },
      type: {
        client: '客户端',
        server: '服务端'
      }
    },
    namespace: {
      title: '命名空间',
      name: '名称',
      keyword: '空间名称/唯一标识',
      uniqueId: '唯一标识(默认UUID)',
      form: {
        name: '请输入空间名称',
        keyword: '请输入空间名称/唯一标识',
        uniqueId: '请输入唯一标识'
      },
      addNamespace: '新增命名空间',
      editNamespace: '编辑命名空间'
    },
    groupConfig: {
      title: '组管理',
      detail: '组详情',
      namespaceId: '命名空间ID',
      groupName: '组名称',
      token: 'Token',
      groupStatus: '状态',
      idGeneratorMode: 'ID生成模式',
      version: '版本',
      groupPartition: '分区',
      initScene: '初始化场景',
      bucketIndex: 'Bucket',
      updateDt: '更新时间',
      description: '描述',
      commonConfig: '通用配置',
      retryConfig: '重试配置',
      form: {
        groupName: '请输入组名称',
        token: 'Token',
        groupStatus: '状态',
        description: '描述',
        idGeneratorMode: 'ID生成模式',
        groupPartition: '分区',
        initScene: '初始化场景',
        collapseCommon: '通用配置',
        collapseRetry: '重试配置'
      },
      idMode: {
        idWorker: '雪花算法',
        segment: '号段模式'
      },
      addGroupConfig: '新增组管理',
      editGroupConfig: '编辑组管理',
      generateToken: '随机生成'
    },
    function: {
      tab: {
        tabOperate: {
          title: '标签页操作',
          addTab: '添加标签页',
          addTabDesc: '跳转到关于页面',
          closeTab: '关闭标签页',
          closeCurrentTab: '关闭当前标签页',
          closeAboutTab: '关闭"关于"标签页',
          addMultiTab: '添加多标签页',
          addMultiTabDesc1: '跳转到多标签页页面',
          addMultiTabDesc2: '跳转到多标签页页面(带有查询参数)'
        },
        tabTitle: {
          title: '标签页标题',
          changeTitle: '修改标题',
          change: '修改',
          resetTitle: '重置标题',
          reset: '重置'
        }
      },
      multiTab: {
        routeParam: '路由参数',
        backTab: '返回 function_tab'
      },
      toggleAuth: {
        toggleAccount: '切换账号',
        authHook: '权限钩子函数 `hasAuth`',
        superAdminVisible: '超级管理员可见',
        adminVisible: '管理员可见',
        adminOrUserVisible: '管理员和用户可见'
      }
    },
    manage: {
      common: {
        status: {
          enable: '启用',
          disable: '禁用'
        }
      },
      machine: {
        type: {
          client: '客户端',
          server: '服务端'
        }
      },
      retryTask: {
        status: {
          maxRetryTimes: '最大重试次数',
          pauseRetry: '暂停重试'
        }
      },
      role: {
        title: '角色列表',
        roleName: '角色名称',
        roleCode: '角色编码',
        roleStatus: '角色状态',
        roleDesc: '角色描述',
        menuAuth: '菜单权限',
        buttonAuth: '按钮权限',
        form: {
          roleName: '请输入角色名称',
          roleCode: '请输入角色编码',
          roleStatus: '请选择角色状态',
          roleDesc: '请输入角色描述'
        },
        addRole: '新增角色',
        editRole: '编辑角色'
      },
      user: {
        title: '用户列表',
        userName: '用户名',
        userGender: '性别',
        nickName: '昵称',
        userPhone: '手机号',
        userEmail: '邮箱',
        userStatus: '用户状态',
        userRole: '用户角色',
        form: {
          userName: '请输入用户名',
          userGender: '请选择性别',
          nickName: '请输入昵称',
          userPhone: '请输入手机号',
          userEmail: '请输入邮箱',
          userStatus: '请选择用户状态',
          userRole: '请选择用户角色'
        },
        addUser: '新增用户',
        editUser: '编辑用户',
        gender: {
          male: '男',
          female: '女'
        }
      },
      menu: {
        home: '首页',
        title: '菜单列表',
        id: 'ID',
        parentId: '父级菜单ID',
        menuType: '菜单类型',
        menuName: '菜单名称',
        routeName: '路由名称',
        routePath: '路由路径',
        routeParams: '路由参数',
        layout: '布局',
        page: '页面组件',
        i18nKey: '国际化key',
        icon: '图标',
        localIcon: '本地图标',
        iconTypeTitle: '图标类型',
        order: '排序',
        keepAlive: '缓存路由',
        href: '外链',
        hideInMenu: '隐藏菜单',
        activeMenu: '高亮的菜单',
        multiTab: '支持多页签',
        fixedIndexInTab: '固定在页签中的序号',
        button: '按钮',
        buttonCode: '按钮编码',
        buttonDesc: '按钮描述',
        menuStatus: '菜单状态',
        form: {
          home: '请选择首页',
          menuType: '请选择菜单类型',
          menuName: '请输入菜单名称',
          routeName: '请输入路由名称',
          routePath: '请输入路由路径',
          page: '请选择页面组件',
          layout: '请选择布局组件',
          i18nKey: '请输入国际化key',
          icon: '请输入图标',
          localIcon: '请选择本地图标',
          order: '请输入排序',
          keepAlive: '请选择是否缓存路由',
          href: '请输入外链',
          hideInMenu: '请选择是否隐藏菜单',
          activeMenu: '请输入高亮的菜单的路由名称',
          multiTab: '请选择是否支持多标签',
          fixedInTab: '请选择是否固定在页签中',
          fixedIndexInTab: '请输入固定在页签中的序号',
          button: '请选择是否按钮',
          buttonCode: '请输入按钮编码',
          buttonDesc: '请输入按钮描述',
          menuStatus: '请选择菜单状态'
        },
        addMenu: '新增菜单',
        editMenu: '编辑菜单',
        addChildMenu: '新增子菜单',
        type: {
          directory: '目录',
          menu: '菜单'
        },
        iconType: {
          iconify: 'iconify图标',
          local: '本地图标'
        }
      }
    },
    notifyConfig: {
      title: '告警通知列表',
      groupName: '组名称',
      businessName: '业务ID',
      notifyStatus: '状态',
      notifyType: '通知类型',
      notifyScene: '通知场景',
      notifyThreshold: '通知阈值',
      description: '描述',
      notifyAttribute: '通知属性',
      retryScene: '重试场景',
      job: '定时任务',
      workflow: '工作流',
      form: {
        businessId: '请选择业务ID',
        description: '请输入描述',
        notifyType: '请选择通知类型',
        notifyAttribute: '请求输入通知属性',
        notifyScene: '请选择通知场景',
        groupName: '请选择组名称',
        notifyThreshold: '请输入通知阈值',
        notifyStatus: '请选择状态',
        systemTaskType: '请选择任务类型',
        notifyRecipient: '请选择通知人',
        rateLimiterThreshold: '请选择阈值',
        sceneName: '请选择重试场景',
        jobName: '请选择定时任务',
        workflowName: '请选择工作流'
      },
      addNotifyConfig: '新增告警通知',
      editNotifyConfig: '编辑告警通知',
      systemTaskType: '任务类型',
      retryNotifyScene: {
        maxRetry: '场景重试数量超过阈值',
        maxRetryError: '场景重试失败数量超过阈值',
        clientReportError: '客户端上报失败',
        clientComponentError: '客户端组件异常',
        retryTaskReachThreshold: '任务重试失败数量超过阈值',
        retryTaskEnterDeadLetter: '任务重试失败进入死信队列'
      },
      jobNotifyScene: {
        jobTaskError: '任务执行失败'
      },
      workflowNotifyScene: {
        workTaskError: '工作流任务执行失败',
        workflowTaskCallbackError: '工作流回调任务执行失败',
        workflowTaskDecisionError: '工作流判定节点执行失败'
      },
      notifyRecipient: '通知人信息',
      rateLimiterStatus: '限流开关',
      rateLimiterThreshold: '每秒限流阈值'
    },
    notifyRecipient: {
      title: '通知人列表',
      detail: '通知人详情',
      recipientName: '接收人名称',
      notifyType: '通知类型',
      notifyAttribute: '属性信息',
      description: '描述',
      form: {
        description: '请输入描述',
        notifyAttribute: '请输入属性信息',
        recipientName: '请输入接收人名称',
        notifyType: '请选择通知类型',
        dingDingAts: "请输入被{'@'}人手机号或钉钉号",
        weComAts: "请输入被{'@'}人企业微信用户id",
        larkAts: "请输入被{'@'}人open_id",
        webhookUrl: '请输入URL'
      },
      addNotifyRecipient: '新增通知接收人',
      editNotifyRecipient: '编辑通知接收人',
      ats: "{'@'}通知人",
      webhookUrl: '通知地址',
      tos: '通知人邮箱地址',
      dingDing: '钉钉',
      email: '邮箱',
      weCom: '企业微信',
      lark: '飞书'
    },
    retryDeadLetter: {
      title: '死信任务列表',
      detail: '死信任务详情',
      uniqueId: 'UniqueId',
      groupName: '组名',
      sceneName: '场景名称',
      idempotentId: '幂等ID',
      bizNo: '业务编号',
      taskType: '任务类型',
      createDt: '创建时间',
      form: {
        title: '请输入死信任务列表',
        uniqueId: '请输入UniqueId',
        groupName: '请输入组名',
        sceneName: '请输入场景名称',
        idempotentId: '请输入幂等ID',
        bizNo: '请输入业务编号',
        taskType: '请输入任务类型',
        createDt: '请输入创建时间'
      }
    },
    retryTask: {
      title: '重试任务列表',
      detail: '重试任务详情',
      uniqueId: 'UniqueId',
      groupName: '组名称',
      sceneName: '场景名称',
      idempotentId: '幂等ID',
      bizNo: '业务编号',
      executorName: '执行器名称',
      argsStr: '方法参数',
      nextTriggerAt: '下次触发时间',
      retryCount: '重试次数',
      retryStatus: '重试状态',
      taskType: '任务类型',
      form: {
        retryStatus: '请输入重试状态',
        bizNo: '请输入业务编号',
        uniqueId: '请输入UniqueId',
        groupName: '请输入组名称',
        argsStr: '请输入执行方法参数',
        sceneName: '请输入场景名称',
        executorName: '请输入执行器名称',
        taskType: '请输入任务类型',
        idempotentId: '请输入幂等ID',
        logStr: '日志信息'
      },
      retryStatusType: {
        retrying: '处理中',
        finished: '完成',
        maxRetry: '最大重试次数',
        paused: '暂停'
      },
      taskTypeDict: {
        retry: '重试数据',
        callback: '回调数据'
      },
      generateIdempotentId: '通过客户端生成',
      addRetryTask: '新增重试任务',
      editRetryTask: '编辑重试任务',
      batchAddRetryTask: '批量新增重试任务'
    },
    retryScene: {
      title: '场景列表',
      detail: '场景详情',
      groupName: '组名',
      sceneName: '场景名',
      sceneStatus: '状态',
      backOff: '退避策略',
      maxRetryCount: '最大重试次数',
      triggerInterval: '间隔时间(秒)',
      deadlineRequest: '调用链超时时间(毫秒)',
      executorTimeout: '超时时间(秒)',
      createDt: '创建时间',
      updateDt: '更新时间',
      description: '描述',
      routeKey: '路由策略',
      form: {
        maxRetryCount: '请输入最大重试次数',
        triggerInterval: '请输入间隔时间(秒)',
        groupName: '请输入组名',
        description: '请输入描述',
        executorTimeout: '请输入超时时间(秒)',
        sceneName: '请输入场景名',
        sceneStatus: '请输入状态',
        deadlineRequest: '请输入调用链超时时间(毫秒)',
        routeKey: '请输入路由策略',
        backOff: '请输入退避策略',
        sceneName2: '场景名称: 仅支持长度为:1~64位字符.格式为:数字、字母、下划线。'
      },
      addScene: '新增场景',
      editScene: '编辑场景',
      backOffItem: {
        delayLevel: '延迟等级',
        fixed: '固定时间',
        cron: 'CRON表达式',
        random: '随机等待'
      }
    },
    retryLog: {
      title: '重试日志列表',
      detail: '重试日志详情',
      UniqueId: 'UniqueId',
      groupName: '组名称',
      sceneName: '场景名称',
      retryStatus: '重试状态',
      taskType: '任务类型',
      idempotentId: '幂等id',
      bizNo: '业务编号',
      createDt: '创建时间',
      form: {
        groupName: '请输入组名称',
        idempotentId: '请输入幂等id',
        sceneName: '请输入场景名称',
        bizNo: '请输入业务编号',
        UniqueId: '请输入UniqueId'
      },
      addRetryLog: '新增重试日志',
      editRetryLog: '编辑重试日志'
    },
    workflow: {
      title: '工作流列表',
      workflowName: '工作流名称',
      groupName: '组名称',
      nextTriggerAt: '触发时间',
      workflowStatus: '状态',
      triggerType: '触发类型',
      triggerInterval: '间隔时长',
      executorTimeout: '超时时间',
      updateDt: '更新时间',
      form: {
        workflowName: '请输入工作流名称',
        groupName: '请输入组名称',
        workflowStatus: '请输入状态'
      },
      addWorkflow: '新增工作流',
      editWorkflow: '编辑工作流'
    },
    workflowBatch: {
      title: '工作流批次列表',
      workflowName: '工作流名称',
      groupName: '组名称',
      executionAt: '执行时间',
      taskBatchStatus: '状态',
      operationReason: '操作原因',
      createDt: '创建时间',
      form: {
        workflowName: '请输入工作流名称',
        taskBatchStatus: '请输入状态',
        groupName: '请输入组名称'
      },
      addWorkflowBatch: '新增工作流批次',
      editWorkflowBatch: '编辑工作流批次'
    },
    jobTask: {
      title: '定时任务列表',
      groupName: '组名称',
      jobName: '任务名称',
      argsStr: '方法参数',
      argsType: '参数类型',
      nextTriggerAt: '触发时间',
      jobStatus: '状态',
      routeKey: '路由策略',
      executorType: '执行器类型',
      executorInfo: '执行器名称',
      triggerType: '触发类型',
      triggerInterval: '间隔时长',
      blockStrategy: '阻塞策略',
      executorTimeout: '超时时间',
      maxRetryTimes: '最大重试次数',
      retryInterval: '重试间隔',
      taskType: '任务类型',
      parallelNum: '并行数',
      bucketIndex: 'Bucket',
      description: '描述',
      updateDt: '更新时间',
      form: {
        jobStatus: '请输入状态',
        maxRetryTimes: '请输入最大重试次数',
        description: '请输入描述',
        triggerType: '请输入触发类型',
        jobName: '请输入任务名称',
        executorTimeout: '请输入超时时间',
        triggerInterval: '请输入间隔时长(秒)',
        triggerInterval_CRON: '请输入间隔时长',
        taskType: '请输入任务类型',
        parallelNum: '请输入并行数',
        bucketIndex: '请输入Bucket',
        executorType: '请输入执行器类型',
        executorInfo: '请输入执行器名称',
        routeKey: '请输入路由策略',
        blockStrategy: '请输入阻塞策略',
        argsType: '请输入参数类型',
        argsStr: '请输入方法参数',
        groupName: '请输入组名称',
        retryInterval: '请输入重试间隔'
      },
      addJobTask: '新增定时任务',
      editJobTask: '编辑定时任务',
      triggerTypeItem: {
        fixed: '固定时间',
        cron: 'CRON表达式',
        workflow: '工作流'
      },
      detail: '定时任务详情'
    },
    jobBatch: {
      title: '任务批次列表',
      groupName: '组名称',
      jobName: '任务名称',
      executorInfo: '执行器名称',
      executorType: '执行器类型',
      executionAt: '开始执行时间',
      taskBatchStatus: '状态',
      operationReason: '操作原因',
      form: {
        groupName: '请输入组名称',
        jobName: '请输入任务名称',
        taskBatchStatus: '请输入状态'
      },
      detail: '执行批次详情'
    },
    userManager: {
      title: '用户列表',
      username: '用户名',
      role: '角色',
      permissions: '权限',
      checkPassword: '确认密码',
      password: '密码',
      updatePassword: '更新密码',
      permissionList: '权限列表',
      form: {
        role: '请输入角色',
        password: '请输入密码',
        username: '请输入用户名',
        checkPassword: '请输入确认密码',
        permissions: '请选择组',
        namespaceIds: '请选择命名空间'
      },
      addUser: '新增用户',
      editUser: '编辑用户',
      roleItem: {
        user: '普通用户',
        admin: '管理员'
      }
    }
  },
  form: {
    required: '不能为空',
    userName: {
      required: '请输入用户名',
      invalid: '用户名格式不正确'
    },
    phone: {
      required: '请输入手机号',
      invalid: '手机号格式不正确'
    },
    pwd: {
      required: '请输入密码',
      invalid: '密码格式不正确，6-18位字符，包含字母、数字、下划线'
    },
    confirmPwd: {
      required: '请输入确认密码',
      invalid: '两次输入密码不一致'
    },
    code: {
      required: '请输入验证码',
      invalid: '验证码格式不正确'
    },
    email: {
      required: '请输入邮箱',
      invalid: '邮箱格式不正确'
    }
  },
  dropdown: {
    closeCurrent: '关闭',
    closeOther: '关闭其它',
    closeLeft: '关闭左侧',
    closeRight: '关闭右侧',
    closeAll: '关闭所有'
  },
  icon: {
    themeConfig: '主题配置',
    themeSchema: '主题模式',
    lang: '切换语言',
    fullscreen: '全屏',
    fullscreenExit: '退出全屏',
    magnify: '放大',
    restore: '还原',
    reload: '刷新页面',
    collapse: '折叠菜单',
    expand: '展开菜单',
    pin: '固定',
    unpin: '取消固定',
    namespace: '切换空间'
  }
};

export default local;
