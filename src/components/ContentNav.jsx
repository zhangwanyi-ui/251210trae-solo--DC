import React, { useState } from 'react';
import { Card, Breadcrumb, Cascader } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { EyeOutlined, BarChartOutlined, StarOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigation } from '../hooks/useNavigation';
import { NAVIGATION_RULES } from '../config/navigationConfig';

const ContentNav = ({ title, style }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // 副标题到内容导航值的映射
  const subTitleToNavValue = {
    '实时动态': ['observation', 'real-time'],
    '近期发生': ['observation', 'recent'],
    '历史回顾': ['observation', 'history'],
    '变化分析报告': ['perception', 'change'],
    '对比分析报告': ['perception', 'comparison'],
    '分布特征分析报告': ['perception', 'distribution'],
    '归因分析报告': ['perception', 'attribution'],
    '相关性分析报告': ['perception', 'correlation'],
    '我的个人关注': ['attention', 'personal'],
    '推荐的关注': ['attention', 'recommended'],
    '强制关注': ['attention', 'mandatory'],
    '处理任务变更操作': ['action', 'task'],
    '响应操作': ['action', 'response'],
    '参与协同操作': ['action', 'collaboration']
  };

  // 根据当前title初始化级联选择器状态
  const initCascaderSelected = () => {
    // 解析title，获取主标题和副标题
    const parts = title.split(' - ').map(t => t.trim());
    const mainTitle = parts[0];
    const subTitle = parts.length > 1 ? parts.slice(1).join(' - ') : '';
    
    if (subTitle && subTitleToNavValue[subTitle]) {
      return subTitleToNavValue[subTitle];
    }
    return [];
  };

  const [cascaderSelected, setCascaderSelected] = useState(initCascaderSelected());
  
  // 使用导航hook
  const { isTopNavPage: checkIsTopNavPage, generateBreadcrumbItems, handleContentNavChange } = useNavigation();
  
  // 计算是否为顶部导航页面
  const isTopNavPage = checkIsTopNavPage();
  
  // 当title或pathname变化时，重新初始化级联选择器状态
  React.useEffect(() => {
    setCascaderSelected(initCascaderSelected());
  }, [pathname, title]);

  // 路径映射到内容导航项标签
  const pathToNavLabel = {
    'realtime-dynamic': '实时动态',
    'recent-occurrences': '近期发生',
    'history-review': '历史回顾',
    'change-analysis': '变化分析报告',
    'comparative-analysis': '对比分析报告',
    'distribution-analysis': '分布特征分析报告',
    'attribution-analysis': '归因分析报告',
    'correlation-analysis': '相关性分析报告',
    'my-follow': '我的个人关注',
    'recommended-follow': '推荐的关注',
    'mandatory-follow': '强制关注',
    'task-change': '处理任务变更操作',
    'response-operation': '响应操作',
    'collaboration-operation': '参与协同操作'
  };

  // 生成面包屑导航，不包含首页
  const generateBreadcrumb = () => {
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
      items.push({ title: '报警', href: '/alarm/alarm-status' });
    } else if (pathname.startsWith('/event')) {
      items.push({ title: '事件', href: '/event/business-operation-events' });
    } else if (pathname.startsWith('/task')) {
      items.push({ title: '任务', href: '/task/emergency-response-tasks' });
    } else if (pathname.startsWith('/online')) {
      items.push({ title: '在线', href: '/online/position-responsibility-report' });
    } else if (pathname.startsWith('/personal')) {
      items.push({ title: '个人中心', href: '/personal/registration-info' });
    }

    // 添加当前页面
    if (isTopNavPage) {
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

  // 使用useMemo确保breadcrumbItems在title或pathname变化时重新生成
  const breadcrumbItems = React.useMemo(() => {
    return generateBreadcrumbItems(title);
  }, [title, generateBreadcrumbItems]);

  // 内容导航选项定义 - 2级联动菜单，使用配置文件中的选项
  const cascaderOptions = [
    {
      value: 'observation',
      label: '观察',
      icon: <EyeOutlined />,
      children: NAVIGATION_RULES.CONTENT_NAV.observation,
    },
    {
      value: 'perception',
      label: '感知',
      icon: <BarChartOutlined />,
      children: NAVIGATION_RULES.CONTENT_NAV.perception,
    },
    {
      value: 'attention',
      label: '关注',
      icon: <StarOutlined />,
      children: NAVIGATION_RULES.CONTENT_NAV.attention,
    },
    {
      value: 'action',
      label: '行动',
      icon: <SettingOutlined />,
      children: NAVIGATION_RULES.CONTENT_NAV.action,
    },
  ];

  // 处理级联选择器变化
  const handleCascaderChange = (value, selectedOptions) => {
    setCascaderSelected(value);
    handleContentNavChange(value);
  };

  return (
    <div style={{ ...style, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
      <Breadcrumb items={breadcrumbItems} style={{ fontSize: '13px' }} />
      {!isTopNavPage && (
        <Cascader
          options={cascaderOptions}
          value={cascaderSelected}
          onChange={handleCascaderChange}
          placeholder="请选择内容导航"
          style={{ width: 180, fontSize: '13px' }}
          showSearch
          displayRender={(labels) => labels[labels.length - 1]}
          size="small"
        />
      )}
    </div>
  );
};

export default ContentNav;
