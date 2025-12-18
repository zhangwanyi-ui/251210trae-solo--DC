import React from 'react';
import { Breadcrumb } from 'antd';
import ContentNav from '../components/ContentNav';
import ContentArea from '../components/ContentArea';
import { navTypeMap } from '../config/pageContentConfig';

const BasePage = ({ title }) => {
  // 解析页面标题，获取主标题和副标题
  const parseTitle = (title) => {
    if (title.includes(' - ')) {
      const [mainTitle, subTitle] = title.split(' - ');
      return { mainTitle, subTitle };
    }
    return { mainTitle: title, subTitle: '' };
  };

  const { mainTitle, subTitle } = parseTitle(title);

  // 根据页面标题和副标题确定内容类型，支持20个模板
  const getNavType = () => {
    if (subTitle) {
      return navTypeMap[subTitle] || 'default';
    }
    
    // 观察类：实时动态、近期发生、历史回顾
    if (title.includes('实时动态') || title.includes('近期发生') || title.includes('历史回顾')) {
      return 'monitor';
    }
    // 感知类：各种分析报告
    if (title.includes('报告')) {
      return 'report';
    }
    // 关注类：我的个人关注、推荐的关注、强制关注
    if (title.includes('关注')) {
      return 'list';
    }
    // 行动类：处理任务变更操作、响应操作、参与协同操作
    if (title.includes('操作')) {
      return 'form';
    }
    // 列表类：访客、渠道、行为、内容、存量、服务可用性等
    if (['访客', '渠道', '行为', '内容', '存量', '服务可用性', '使用和转化', '绩效', '健康状态', '黑名单状态', '常见问题', '健康干预绩效', '报警状态', '督促', '报警处理绩效', '业务运行事件', '岗位事件', '任务事件', '应急响应任务', '视情干预计划任务', '常态化任务', '岗位责任情况报告', '在线值守报告', '岗位责任涉及报告', '岗位综合绩效报告', '注册信息', '个性化设置', '我的内容'].includes(title)) {
      return 'list';
    }
    // 监控类：运营全景、全过程价值链、资源池、流量承载、在线体验、服务传递效率
    if (['运营全景', '全过程价值链', '资源池', '流量承载', '在线体验', '服务传递效率'].includes(title)) {
      return 'monitor';
    }
    // 默认为普通页面
    return 'default';
  };

  const navType = getNavType();

  // 面包屑导航现在由ContentNav组件统一处理，不再需要在BasePage中生成
  const generateBreadcrumb = () => {
    return [];
  };

  return (
    <div className="base-page" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 页面标题 */}
      <h1 style={{ margin: '0 0 6px 0', fontSize: 18, fontWeight: 600 }}>{title}</h1>
      
      {/* 内容导航 - 包含面包屑导航和下拉选择器 */}
      <ContentNav title={title} style={{ marginBottom: '6px' }} />
      
      {/* 内容区域 - 支持20个模板的内容渲染 */}
      <div style={{ flex: 1, minHeight: 0, marginTop: '4px' }}>
        <ContentArea title={title} navType={navType} />
      </div>
    </div>
  );
};

export default BasePage;
