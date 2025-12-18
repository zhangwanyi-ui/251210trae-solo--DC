// DC在线业务系统导航配置文件
// 集中管理导航规则，避免分散在多个组件中

// 内容导航项到路径的映射
export const CONTENT_NAV_PATH_MAP = {
  'real-time': 'realtime-dynamic',
  'recent': 'recent-occurrences',
  'history': 'history-review',
  'change': 'change-analysis',
  'comparison': 'comparative-analysis',
  'distribution': 'distribution-analysis',
  'attribution': 'attribution-analysis',
  'correlation': 'correlation-analysis',
  'personal': 'my-follow',
  'recommended': 'recommended-follow',
  'mandatory': 'mandatory-follow',
  'task': 'task-change',
  'response': 'response-operation',
  'collaboration': 'collaboration-operation',
};

// 导航规则配置
export const NAVIGATION_RULES = {
  // 顶部导航页面规则：这些路径开头的页面不显示内容导航项
  TOP_NAV_PAGES: [
    '/alarm',
    '/event',
    '/task',
    '/online/',  // 注意这里有斜杠，避免匹配 /online-business
    '/personal'
  ],
  
  // 左侧导航页面规则：这些路径开头的页面显示内容导航项
  LEFT_NAV_PAGES: [
    '/overview',
    '/online-business',
    '/application-service',
    '/infrastructure',
    '/service-health'
  ],
  
  // 面包屑导航规则
  BREADCRUMB: {
    // 不可点击的主要分类
    NON_CLICKABLE_CATEGORIES: [
      '全景俯瞰',
      '在线业务',
      '应用服务',
      '基础资源',
      '服务健康',
      '报警',
      '事件',
      '任务',
      '在线',
      '个人中心'
    ],
    
    // 可点击的具体页面
    CLICKABLE_PAGES: {
      '运营全景': '/overview/operation-overview',
      '全过程价值链': '/overview/value-chain',
      '资源池': '/overview/resource-pool',
      '访客': '/online-business/visitors',
      '渠道': '/online-business/channels',
      '行为': '/online-business/behaviors',
      '内容': '/online-business/content',
      '流量承载': '/application-service/traffic-bearing',
      '在线体验': '/application-service/online-experience',
      '服务传递效率': '/application-service/service-efficiency',
      '存量': '/infrastructure/stock',
      '服务可用性': '/infrastructure/service-availability',
      '使用和转化': '/infrastructure/usage-conversion',
      '健康状态': '/service-health/health-report',
      '黑名单状态': '/service-health/blacklist',
      '常见问题': '/service-health/common-issues',
      '健康干预绩效': '/service-health/intervention-performance',
      '报警状态': '/alarm/alarm-status',
      '督促': '/alarm/supervision',
      '报警处理绩效': '/alarm/alarm-handling-performance',
      '业务运行事件': '/event/business-operation-events',
      '岗位事件': '/event/position-events',
      '任务事件': '/event/task-events',
      '绩效事件': '/event/performance-events',
      '应急响应任务': '/task/emergency-response-tasks',
      '视情干预计划任务': '/task/intervention-plan-tasks',
      '常态化任务': '/task/regular-tasks',
      '岗位责任情况报告': '/online/position-responsibility-report',
      '在线值守报告': '/online/on-duty-report',
      '岗位责任涉及报告': '/online/position-responsibility-involvement-report',
      '岗位综合绩效报告': '/online/position-comprehensive-performance-report',
      '注册信息': '/personal/registration-info',
      '个性化设置': '/personal/personalization-settings',
      '我的内容': '/personal/my-content'
    }
  },
  
  // 内容导航项配置
  CONTENT_NAV: {
    'observation': [
      { value: 'real-time', label: '实时动态' },
      { value: 'recent', label: '近期发生' },
      { value: 'history', label: '历史回顾' }
    ],
    'perception': [
      { value: 'change', label: '变化分析报告' },
      { value: 'comparison', label: '对比分析报告' },
      { value: 'distribution', label: '分布特征分析报告' },
      { value: 'attribution', label: '归因分析报告' },
      { value: 'correlation', label: '相关性分析报告' }
    ],
    'attention': [
      { value: 'personal', label: '我的个人关注' },
      { value: 'recommended', label: '推荐的关注' },
      { value: 'mandatory', label: '强制关注' }
    ],
    'action': [
      { value: 'task', label: '处理任务变更操作' },
      { value: 'response', label: '响应操作' },
      { value: 'collaboration', label: '参与协同操作' }
    ]
  }
};

// 判断是否为顶部导航页面
export const isTopNavPage = (pathname) => {
  return NAVIGATION_RULES.TOP_NAV_PAGES.some(prefix => pathname.startsWith(prefix));
};

// 判断是否为左侧导航页面
export const isLeftNavPage = (pathname) => {
  return NAVIGATION_RULES.LEFT_NAV_PAGES.some(prefix => pathname.startsWith(prefix));
};

// 判断面包屑导航项是否可点击
export const isBreadcrumbItemClickable = (title) => {
  return NAVIGATION_RULES.BREADCRUMB.CLICKABLE_PAGES.hasOwnProperty(title);
};

// 获取面包屑导航项的链接
export const getBreadcrumbItemHref = (title) => {
  return NAVIGATION_RULES.BREADCRUMB.CLICKABLE_PAGES[title] || null;
};
