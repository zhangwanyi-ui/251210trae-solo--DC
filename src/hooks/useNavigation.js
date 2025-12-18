// 导航工具函数Hook
// 封装导航相关的逻辑，供组件使用

import { useLocation, useNavigate } from 'react-router-dom';
import { NAVIGATION_RULES, CONTENT_NAV_PATH_MAP } from '../config/navigationConfig';

/**
 * 导航工具函数Hook
 * 封装导航相关的逻辑，供组件使用
 * 请勿随意修改导航规则，如需修改请更新 navigationConfig.js 配置文件
 */
export const useNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  /**
   * 判断当前页面是否为顶部导航页面
   * @returns {boolean} 是否为顶部导航页面
   */
  const isTopNavPage = () => {
    return NAVIGATION_RULES.TOP_NAV_PAGES.some(prefix => pathname.startsWith(prefix));
  };

  /**
   * 判断当前页面是否为左侧导航页面
   * @returns {boolean} 是否为左侧导航页面
   */
  const isLeftNavPage = () => {
    return NAVIGATION_RULES.LEFT_NAV_PAGES.some(prefix => pathname.startsWith(prefix));
  };

  /**
   * 生成面包屑导航项
   * @param {string} title - 页面标题
   * @returns {Array} 面包屑导航项数组
   */
  const generateBreadcrumbItems = (title) => {
    const items = [];
    
    // 解析title，获取主标题和副标题
    const parts = title.split(' - ').map(t => t.trim());
    const mainTitle = parts[0];
    const subTitle = parts.length > 1 ? parts.slice(1).join(' - ') : '';
    
    // 添加左侧导航项
    if (mainTitle === '在线业务') {
      items.push({ title: '在线业务' });
    } else if (mainTitle.includes('运营全景')) {
      items.push({ title: '全景俯瞰' });
      items.push({ title: '运营全景', href: '/overview/operation-overview' });
    } else if (mainTitle === '全景俯瞰') {
      items.push({ title: '全景俯瞰' });
    } else if (mainTitle.includes('全过程价值链')) {
      items.push({ title: '全景俯瞰' });
      items.push({ title: '全过程价值链', href: '/overview/value-chain' });
    } else if (mainTitle.includes('资源池')) {
      items.push({ title: '全景俯瞰' });
      items.push({ title: '资源池', href: '/overview/resource-pool' });
    } else if (mainTitle.includes('访客')) {
      items.push({ title: '在线业务' });
      items.push({ title: '访客', href: '/online-business/visitors' });
    } else if (mainTitle.includes('渠道')) {
      items.push({ title: '在线业务' });
      items.push({ title: '渠道', href: '/online-business/channels' });
    } else if (mainTitle.includes('行为')) {
      items.push({ title: '在线业务' });
      items.push({ title: '行为', href: '/online-business/behaviors' });
    } else if (mainTitle.includes('内容')) {
      items.push({ title: '在线业务' });
      items.push({ title: '内容', href: '/online-business/content' });
    } else if (mainTitle === '应用服务') {
      items.push({ title: '应用服务' });
    } else if (mainTitle.includes('流量承载')) {
      items.push({ title: '应用服务' });
      items.push({ title: '流量承载', href: '/application-service/traffic-bearing' });
    } else if (mainTitle.includes('在线体验')) {
      items.push({ title: '应用服务' });
      items.push({ title: '在线体验', href: '/application-service/online-experience' });
    } else if (mainTitle.includes('服务传递效率')) {
      items.push({ title: '应用服务' });
      items.push({ title: '服务传递效率', href: '/application-service/service-efficiency' });
    } else if (mainTitle === '基础资源') {
      items.push({ title: '基础资源' });
    } else if (mainTitle.includes('存量')) {
      items.push({ title: '基础资源' });
      items.push({ title: '存量', href: '/infrastructure/stock' });
    } else if (mainTitle.includes('服务可用性')) {
      items.push({ title: '基础资源' });
      items.push({ title: '服务可用性', href: '/infrastructure/service-availability' });
    } else if (mainTitle.includes('使用和转化')) {
      items.push({ title: '基础资源' });
      items.push({ title: '使用和转化', href: '/infrastructure/usage-conversion' });
    } else if (mainTitle === '服务健康') {
      items.push({ title: '服务健康' });
    } else if (mainTitle.includes('健康状态')) {
      items.push({ title: '服务健康' });
      items.push({ title: '健康状态', href: '/service-health/health-report' });
    } else if (mainTitle.includes('黑名单状态')) {
      items.push({ title: '服务健康' });
      items.push({ title: '黑名单状态', href: '/service-health/blacklist' });
    } else if (mainTitle.includes('常见问题')) {
      items.push({ title: '服务健康' });
      items.push({ title: '常见问题', href: '/service-health/common-issues' });
    } else if (mainTitle.includes('健康干预绩效')) {
      items.push({ title: '服务健康' });
      items.push({ title: '健康干预绩效', href: '/service-health/intervention-performance' });
    }
    // 添加顶部导航项
    else if (pathname.startsWith('/alarm')) {
      items.push({ title: '报警' });
    } else if (pathname.startsWith('/event')) {
      items.push({ title: '事件' });
    } else if (pathname.startsWith('/task')) {
      items.push({ title: '任务' });
    } else if (pathname.startsWith('/online/')) {
      items.push({ title: '在线' });
    } else if (pathname.startsWith('/personal')) {
      items.push({ title: '个人中心' });
    }

    // 添加当前页面
    const isTopNav = isTopNavPage();
    if (isTopNav) {
      items.push({ title: mainTitle });
    } 
    // 添加内容导航项（从副标题中提取）
    else if (subTitle) {
      items.push({ title: subTitle });
    }
    // 对于没有副标题的左侧导航页面，确保面包屑导航完整
    else {
      // 检查最后一个项的标题是否与当前mainTitle相同，避免重复
      const lastItem = items[items.length - 1];
      if (!lastItem || lastItem.title !== mainTitle) {
        items.push({ title: mainTitle });
      }
    }
    
    return items;
  };

  /**
   * 生成内容导航项的目标路径
   * @param {string} tabKey - 内容导航项的key
   * @returns {string} 目标路径
   */
  const generateContentNavPath = (tabKey) => {
    // 根据当前路径生成新的路径
    let newPath = pathname;
    
    // 处理不同的左侧导航页
    if (pathname.includes('/overview/operation-overview')) {
      newPath = `/overview/operation-overview/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/overview/value-chain')) {
      newPath = `/overview/value-chain/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/overview/resource-pool')) {
      newPath = `/overview/resource-pool/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/online-business/visitors')) {
      newPath = `/online-business/visitors/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/online-business/channels')) {
      newPath = `/online-business/channels/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/online-business/behaviors')) {
      newPath = `/online-business/behaviors/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/online-business/content')) {
      newPath = `/online-business/content/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/application-service/traffic-bearing')) {
      newPath = `/application-service/traffic-bearing/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/application-service/online-experience')) {
      newPath = `/application-service/online-experience/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/application-service/service-efficiency')) {
      newPath = `/application-service/service-efficiency/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/infrastructure/stock')) {
      newPath = `/infrastructure/stock/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/infrastructure/service-availability')) {
      newPath = `/infrastructure/service-availability/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/infrastructure/usage-conversion')) {
      newPath = `/infrastructure/usage-conversion/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/service-health/health-report')) {
      newPath = `/service-health/health-report/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/service-health/blacklist')) {
      newPath = `/service-health/blacklist/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/service-health/common-issues')) {
      newPath = `/service-health/common-issues/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    } else if (pathname.includes('/service-health/intervention-performance')) {
      newPath = `/service-health/intervention-performance/${CONTENT_NAV_PATH_MAP[tabKey]}`;
    }
    
    return newPath;
  };

  /**
   * 处理内容导航项变化
   * @param {Array} value - 内容导航项的value
   */
  const handleContentNavChange = (value) => {
    if (value.length === 2) {
      const [categoryValue, itemValue] = value;
      const newPath = generateContentNavPath(itemValue);
      navigate(newPath);
    }
  };

  /**
   * 根据当前路径获取左侧菜单的选中key和展开key
   * @returns {Object} 包含selectedKey和openKeys的对象
   */
  const getMenuState = () => {
    const isTopNav = isTopNavPage();
    if (isTopNav) {
      return { selectedKey: '', openKeys: [] };
    }

    let selectedKey = 'overview-1';
    let openKey = 'overview';
    
    if (pathname.includes('/overview/operation-overview')) {
      selectedKey = 'overview-1';
      openKey = 'overview';
    } else if (pathname.includes('/overview/value-chain')) {
      selectedKey = 'overview-2';
      openKey = 'overview';
    } else if (pathname.includes('/overview/resource-pool')) {
      selectedKey = 'overview-3';
      openKey = 'overview';
    } else if (pathname.includes('/online-business/visitors')) {
      selectedKey = 'online-business-1';
      openKey = 'online-business';
    } else if (pathname.includes('/online-business/channels')) {
      selectedKey = 'online-business-2';
      openKey = 'online-business';
    } else if (pathname.includes('/online-business/behaviors')) {
      selectedKey = 'online-business-3';
      openKey = 'online-business';
    } else if (pathname.includes('/online-business/content')) {
      selectedKey = 'online-business-4';
      openKey = 'online-business';
    } else if (pathname.includes('/application-service/traffic-bearing')) {
      selectedKey = 'application-service-1';
      openKey = 'application-service';
    } else if (pathname.includes('/application-service/online-experience')) {
      selectedKey = 'application-service-2';
      openKey = 'application-service';
    } else if (pathname.includes('/application-service/service-efficiency')) {
      selectedKey = 'application-service-3';
      openKey = 'application-service';
    } else if (pathname.includes('/infrastructure/stock')) {
      selectedKey = 'basic-resource-1';
      openKey = 'basic-resource';
    } else if (pathname.includes('/infrastructure/service-availability')) {
      selectedKey = 'basic-resource-2';
      openKey = 'basic-resource';
    } else if (pathname.includes('/infrastructure/usage-conversion')) {
      selectedKey = 'basic-resource-3';
      openKey = 'basic-resource';
    } else if (pathname.includes('/service-health/health-report')) {
      selectedKey = 'service-health-1';
      openKey = 'service-health';
    } else if (pathname.includes('/service-health/blacklist')) {
      selectedKey = 'service-health-2';
      openKey = 'service-health';
    } else if (pathname.includes('/service-health/common-issues')) {
      selectedKey = 'service-health-3';
      openKey = 'service-health';
    } else if (pathname.includes('/service-health/intervention-performance')) {
      selectedKey = 'service-health-4';
      openKey = 'service-health';
    }
    
    return { selectedKey, openKeys: [openKey] };
  };

  return {
    isTopNavPage,
    isLeftNavPage,
    generateBreadcrumbItems,
    generateContentNavPath,
    handleContentNavChange,
    getMenuState
  };
};
