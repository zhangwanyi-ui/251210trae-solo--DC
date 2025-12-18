import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import BusinessList from '../pages/BusinessList';
import BusinessDetail from '../pages/BusinessDetail';
import UserList from '../pages/UserList';
import DocumentList from '../pages/DocumentList';
import AnalyticsList from '../pages/AnalyticsList';
import SystemList from '../pages/SystemList';
import BasePage from '../pages/BasePage';
import TemplatePreview from '../pages/TemplatePreview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // 默认页面 - 全景俯瞰-运营全景
      { index: true, element: <BasePage title="运营全景" /> },
      
      // 内容导航项相关路由 - 为每个左侧导航页添加14个内容导航项路由
      // 全景俯瞰 - 运营全景
      { path: 'overview/operation-overview/realtime-dynamic', element: <BasePage title="运营全景 - 实时动态" /> },
      { path: 'overview/operation-overview/recent-occurrences', element: <BasePage title="运营全景 - 近期发生" /> },
      { path: 'overview/operation-overview/history-review', element: <BasePage title="运营全景 - 历史回顾" /> },
      { path: 'overview/operation-overview/change-analysis', element: <BasePage title="运营全景 - 变化分析报告" /> },
      { path: 'overview/operation-overview/comparative-analysis', element: <BasePage title="运营全景 - 对比分析报告" /> },
      { path: 'overview/operation-overview/distribution-analysis', element: <BasePage title="运营全景 - 分布特征分析报告" /> },
      { path: 'overview/operation-overview/attribution-analysis', element: <BasePage title="运营全景 - 归因分析报告" /> },
      { path: 'overview/operation-overview/correlation-analysis', element: <BasePage title="运营全景 - 相关性分析报告" /> },
      { path: 'overview/operation-overview/my-follow', element: <BasePage title="运营全景 - 我的个人关注" /> },
      { path: 'overview/operation-overview/recommended-follow', element: <BasePage title="运营全景 - 推荐的关注" /> },
      { path: 'overview/operation-overview/mandatory-follow', element: <BasePage title="运营全景 - 强制关注" /> },
      { path: 'overview/operation-overview/task-change', element: <BasePage title="运营全景 - 处理任务变更操作" /> },
      { path: 'overview/operation-overview/response-operation', element: <BasePage title="运营全景 - 响应操作" /> },
      { path: 'overview/operation-overview/collaboration-operation', element: <BasePage title="运营全景 - 参与协同操作" /> },
      
      // 全景俯瞰 - 全过程价值链
      { path: 'overview/value-chain/realtime-dynamic', element: <BasePage title="全过程价值链 - 实时动态" /> },
      { path: 'overview/value-chain/recent-occurrences', element: <BasePage title="全过程价值链 - 近期发生" /> },
      { path: 'overview/value-chain/history-review', element: <BasePage title="全过程价值链 - 历史回顾" /> },
      { path: 'overview/value-chain/change-analysis', element: <BasePage title="全过程价值链 - 变化分析报告" /> },
      { path: 'overview/value-chain/comparative-analysis', element: <BasePage title="全过程价值链 - 对比分析报告" /> },
      { path: 'overview/value-chain/distribution-analysis', element: <BasePage title="全过程价值链 - 分布特征分析报告" /> },
      { path: 'overview/value-chain/attribution-analysis', element: <BasePage title="全过程价值链 - 归因分析报告" /> },
      { path: 'overview/value-chain/correlation-analysis', element: <BasePage title="全过程价值链 - 相关性分析报告" /> },
      { path: 'overview/value-chain/my-follow', element: <BasePage title="全过程价值链 - 我的个人关注" /> },
      { path: 'overview/value-chain/recommended-follow', element: <BasePage title="全过程价值链 - 推荐的关注" /> },
      { path: 'overview/value-chain/mandatory-follow', element: <BasePage title="全过程价值链 - 强制关注" /> },
      { path: 'overview/value-chain/task-change', element: <BasePage title="全过程价值链 - 处理任务变更操作" /> },
      { path: 'overview/value-chain/response-operation', element: <BasePage title="全过程价值链 - 响应操作" /> },
      { path: 'overview/value-chain/collaboration-operation', element: <BasePage title="全过程价值链 - 参与协同操作" /> },
      
      // 全景俯瞰 - 资源池
      { path: 'overview/resource-pool/realtime-dynamic', element: <BasePage title="资源池 - 实时动态" /> },
      { path: 'overview/resource-pool/recent-occurrences', element: <BasePage title="资源池 - 近期发生" /> },
      { path: 'overview/resource-pool/history-review', element: <BasePage title="资源池 - 历史回顾" /> },
      { path: 'overview/resource-pool/change-analysis', element: <BasePage title="资源池 - 变化分析报告" /> },
      { path: 'overview/resource-pool/comparative-analysis', element: <BasePage title="资源池 - 对比分析报告" /> },
      { path: 'overview/resource-pool/distribution-analysis', element: <BasePage title="资源池 - 分布特征分析报告" /> },
      { path: 'overview/resource-pool/attribution-analysis', element: <BasePage title="资源池 - 归因分析报告" /> },
      { path: 'overview/resource-pool/correlation-analysis', element: <BasePage title="资源池 - 相关性分析报告" /> },
      { path: 'overview/resource-pool/my-follow', element: <BasePage title="资源池 - 我的个人关注" /> },
      { path: 'overview/resource-pool/recommended-follow', element: <BasePage title="资源池 - 推荐的关注" /> },
      { path: 'overview/resource-pool/mandatory-follow', element: <BasePage title="资源池 - 强制关注" /> },
      { path: 'overview/resource-pool/task-change', element: <BasePage title="资源池 - 处理任务变更操作" /> },
      { path: 'overview/resource-pool/response-operation', element: <BasePage title="资源池 - 响应操作" /> },
      { path: 'overview/resource-pool/collaboration-operation', element: <BasePage title="资源池 - 参与协同操作" /> },
      
      // 在线业务 - 访客
      { path: 'online-business/visitors/realtime-dynamic', element: <BasePage title="访客 - 实时动态" /> },
      { path: 'online-business/visitors/recent-occurrences', element: <BasePage title="访客 - 近期发生" /> },
      { path: 'online-business/visitors/history-review', element: <BasePage title="访客 - 历史回顾" /> },
      { path: 'online-business/visitors/change-analysis', element: <BasePage title="访客 - 变化分析报告" /> },
      { path: 'online-business/visitors/comparative-analysis', element: <BasePage title="访客 - 对比分析报告" /> },
      { path: 'online-business/visitors/distribution-analysis', element: <BasePage title="访客 - 分布特征分析报告" /> },
      { path: 'online-business/visitors/attribution-analysis', element: <BasePage title="访客 - 归因分析报告" /> },
      { path: 'online-business/visitors/correlation-analysis', element: <BasePage title="访客 - 相关性分析报告" /> },
      { path: 'online-business/visitors/my-follow', element: <BasePage title="访客 - 我的个人关注" /> },
      { path: 'online-business/visitors/recommended-follow', element: <BasePage title="访客 - 推荐的关注" /> },
      { path: 'online-business/visitors/mandatory-follow', element: <BasePage title="访客 - 强制关注" /> },
      { path: 'online-business/visitors/task-change', element: <BasePage title="访客 - 处理任务变更操作" /> },
      { path: 'online-business/visitors/response-operation', element: <BasePage title="访客 - 响应操作" /> },
      { path: 'online-business/visitors/collaboration-operation', element: <BasePage title="访客 - 参与协同操作" /> },
      
      // 在线业务 - 渠道
      { path: 'online-business/channels/realtime-dynamic', element: <BasePage title="渠道 - 实时动态" /> },
      { path: 'online-business/channels/recent-occurrences', element: <BasePage title="渠道 - 近期发生" /> },
      { path: 'online-business/channels/history-review', element: <BasePage title="渠道 - 历史回顾" /> },
      { path: 'online-business/channels/change-analysis', element: <BasePage title="渠道 - 变化分析报告" /> },
      { path: 'online-business/channels/comparative-analysis', element: <BasePage title="渠道 - 对比分析报告" /> },
      { path: 'online-business/channels/distribution-analysis', element: <BasePage title="渠道 - 分布特征分析报告" /> },
      { path: 'online-business/channels/attribution-analysis', element: <BasePage title="渠道 - 归因分析报告" /> },
      { path: 'online-business/channels/correlation-analysis', element: <BasePage title="渠道 - 相关性分析报告" /> },
      { path: 'online-business/channels/my-follow', element: <BasePage title="渠道 - 我的个人关注" /> },
      { path: 'online-business/channels/recommended-follow', element: <BasePage title="渠道 - 推荐的关注" /> },
      { path: 'online-business/channels/mandatory-follow', element: <BasePage title="渠道 - 强制关注" /> },
      { path: 'online-business/channels/task-change', element: <BasePage title="渠道 - 处理任务变更操作" /> },
      { path: 'online-business/channels/response-operation', element: <BasePage title="渠道 - 响应操作" /> },
      { path: 'online-business/channels/collaboration-operation', element: <BasePage title="渠道 - 参与协同操作" /> },
      
      // 在线业务 - 行为
      { path: 'online-business/behaviors/realtime-dynamic', element: <BasePage title="行为 - 实时动态" /> },
      { path: 'online-business/behaviors/recent-occurrences', element: <BasePage title="行为 - 近期发生" /> },
      { path: 'online-business/behaviors/history-review', element: <BasePage title="行为 - 历史回顾" /> },
      { path: 'online-business/behaviors/change-analysis', element: <BasePage title="行为 - 变化分析报告" /> },
      { path: 'online-business/behaviors/comparative-analysis', element: <BasePage title="行为 - 对比分析报告" /> },
      { path: 'online-business/behaviors/distribution-analysis', element: <BasePage title="行为 - 分布特征分析报告" /> },
      { path: 'online-business/behaviors/attribution-analysis', element: <BasePage title="行为 - 归因分析报告" /> },
      { path: 'online-business/behaviors/correlation-analysis', element: <BasePage title="行为 - 相关性分析报告" /> },
      { path: 'online-business/behaviors/my-follow', element: <BasePage title="行为 - 我的个人关注" /> },
      { path: 'online-business/behaviors/recommended-follow', element: <BasePage title="行为 - 推荐的关注" /> },
      { path: 'online-business/behaviors/mandatory-follow', element: <BasePage title="行为 - 强制关注" /> },
      { path: 'online-business/behaviors/task-change', element: <BasePage title="行为 - 处理任务变更操作" /> },
      { path: 'online-business/behaviors/response-operation', element: <BasePage title="行为 - 响应操作" /> },
      { path: 'online-business/behaviors/collaboration-operation', element: <BasePage title="行为 - 参与协同操作" /> },
      
      // 在线业务 - 内容
      { path: 'online-business/content/realtime-dynamic', element: <BasePage title="内容 - 实时动态" /> },
      { path: 'online-business/content/recent-occurrences', element: <BasePage title="内容 - 近期发生" /> },
      { path: 'online-business/content/history-review', element: <BasePage title="内容 - 历史回顾" /> },
      { path: 'online-business/content/change-analysis', element: <BasePage title="内容 - 变化分析报告" /> },
      { path: 'online-business/content/comparative-analysis', element: <BasePage title="内容 - 对比分析报告" /> },
      { path: 'online-business/content/distribution-analysis', element: <BasePage title="内容 - 分布特征分析报告" /> },
      { path: 'online-business/content/attribution-analysis', element: <BasePage title="内容 - 归因分析报告" /> },
      { path: 'online-business/content/correlation-analysis', element: <BasePage title="内容 - 相关性分析报告" /> },
      { path: 'online-business/content/my-follow', element: <BasePage title="内容 - 我的个人关注" /> },
      { path: 'online-business/content/recommended-follow', element: <BasePage title="内容 - 推荐的关注" /> },
      { path: 'online-business/content/mandatory-follow', element: <BasePage title="内容 - 强制关注" /> },
      { path: 'online-business/content/task-change', element: <BasePage title="内容 - 处理任务变更操作" /> },
      { path: 'online-business/content/response-operation', element: <BasePage title="内容 - 响应操作" /> },
      { path: 'online-business/content/collaboration-operation', element: <BasePage title="内容 - 参与协同操作" /> },
      
      // 左侧导航 - 全景俯瞰
      { path: 'overview/operation-overview', element: <BasePage title="运营全景" /> },
      { path: 'overview/value-chain', element: <BasePage title="全过程价值链" /> },
      { path: 'overview/resource-pool', element: <BasePage title="资源池" /> },
      
      // 左侧导航 - 在线业务
      { path: 'online-business', element: <BasePage title="在线业务" /> },
      { path: 'online-business/visitors', element: <BasePage title="访客" /> },
      { path: 'online-business/channels', element: <BasePage title="渠道" /> },
      { path: 'online-business/behaviors', element: <BasePage title="行为" /> },
      { path: 'online-business/content', element: <BasePage title="内容" /> },
      
      // 应用服务 - 流量承载
      { path: 'application-service/traffic-bearing/realtime-dynamic', element: <BasePage title="流量承载 - 实时动态" /> },
      { path: 'application-service/traffic-bearing/recent-occurrences', element: <BasePage title="流量承载 - 近期发生" /> },
      { path: 'application-service/traffic-bearing/history-review', element: <BasePage title="流量承载 - 历史回顾" /> },
      { path: 'application-service/traffic-bearing/change-analysis', element: <BasePage title="流量承载 - 变化分析报告" /> },
      { path: 'application-service/traffic-bearing/comparative-analysis', element: <BasePage title="流量承载 - 对比分析报告" /> },
      { path: 'application-service/traffic-bearing/distribution-analysis', element: <BasePage title="流量承载 - 分布特征分析报告" /> },
      { path: 'application-service/traffic-bearing/attribution-analysis', element: <BasePage title="流量承载 - 归因分析报告" /> },
      { path: 'application-service/traffic-bearing/correlation-analysis', element: <BasePage title="流量承载 - 相关性分析报告" /> },
      { path: 'application-service/traffic-bearing/my-follow', element: <BasePage title="流量承载 - 我的个人关注" /> },
      { path: 'application-service/traffic-bearing/recommended-follow', element: <BasePage title="流量承载 - 推荐的关注" /> },
      { path: 'application-service/traffic-bearing/mandatory-follow', element: <BasePage title="流量承载 - 强制关注" /> },
      { path: 'application-service/traffic-bearing/task-change', element: <BasePage title="流量承载 - 处理任务变更操作" /> },
      { path: 'application-service/traffic-bearing/response-operation', element: <BasePage title="流量承载 - 响应操作" /> },
      { path: 'application-service/traffic-bearing/collaboration-operation', element: <BasePage title="流量承载 - 参与协同操作" /> },
      
      // 应用服务 - 在线体验
      { path: 'application-service/online-experience/realtime-dynamic', element: <BasePage title="在线体验 - 实时动态" /> },
      { path: 'application-service/online-experience/recent-occurrences', element: <BasePage title="在线体验 - 近期发生" /> },
      { path: 'application-service/online-experience/history-review', element: <BasePage title="在线体验 - 历史回顾" /> },
      { path: 'application-service/online-experience/change-analysis', element: <BasePage title="在线体验 - 变化分析报告" /> },
      { path: 'application-service/online-experience/comparative-analysis', element: <BasePage title="在线体验 - 对比分析报告" /> },
      { path: 'application-service/online-experience/distribution-analysis', element: <BasePage title="在线体验 - 分布特征分析报告" /> },
      { path: 'application-service/online-experience/attribution-analysis', element: <BasePage title="在线体验 - 归因分析报告" /> },
      { path: 'application-service/online-experience/correlation-analysis', element: <BasePage title="在线体验 - 相关性分析报告" /> },
      { path: 'application-service/online-experience/my-follow', element: <BasePage title="在线体验 - 我的个人关注" /> },
      { path: 'application-service/online-experience/recommended-follow', element: <BasePage title="在线体验 - 推荐的关注" /> },
      { path: 'application-service/online-experience/mandatory-follow', element: <BasePage title="在线体验 - 强制关注" /> },
      { path: 'application-service/online-experience/task-change', element: <BasePage title="在线体验 - 处理任务变更操作" /> },
      { path: 'application-service/online-experience/response-operation', element: <BasePage title="在线体验 - 响应操作" /> },
      { path: 'application-service/online-experience/collaboration-operation', element: <BasePage title="在线体验 - 参与协同操作" /> },
      
      // 应用服务 - 服务传递效率
      { path: 'application-service/service-efficiency/realtime-dynamic', element: <BasePage title="服务传递效率 - 实时动态" /> },
      { path: 'application-service/service-efficiency/recent-occurrences', element: <BasePage title="服务传递效率 - 近期发生" /> },
      { path: 'application-service/service-efficiency/history-review', element: <BasePage title="服务传递效率 - 历史回顾" /> },
      { path: 'application-service/service-efficiency/change-analysis', element: <BasePage title="服务传递效率 - 变化分析报告" /> },
      { path: 'application-service/service-efficiency/comparative-analysis', element: <BasePage title="服务传递效率 - 对比分析报告" /> },
      { path: 'application-service/service-efficiency/distribution-analysis', element: <BasePage title="服务传递效率 - 分布特征分析报告" /> },
      { path: 'application-service/service-efficiency/attribution-analysis', element: <BasePage title="服务传递效率 - 归因分析报告" /> },
      { path: 'application-service/service-efficiency/correlation-analysis', element: <BasePage title="服务传递效率 - 相关性分析报告" /> },
      { path: 'application-service/service-efficiency/my-follow', element: <BasePage title="服务传递效率 - 我的个人关注" /> },
      { path: 'application-service/service-efficiency/recommended-follow', element: <BasePage title="服务传递效率 - 推荐的关注" /> },
      { path: 'application-service/service-efficiency/mandatory-follow', element: <BasePage title="服务传递效率 - 强制关注" /> },
      { path: 'application-service/service-efficiency/task-change', element: <BasePage title="服务传递效率 - 处理任务变更操作" /> },
      { path: 'application-service/service-efficiency/response-operation', element: <BasePage title="服务传递效率 - 响应操作" /> },
      { path: 'application-service/service-efficiency/collaboration-operation', element: <BasePage title="服务传递效率 - 参与协同操作" /> },
      
      // 基础资源 - 存量
      { path: 'infrastructure/stock/realtime-dynamic', element: <BasePage title="存量 - 实时动态" /> },
      { path: 'infrastructure/stock/recent-occurrences', element: <BasePage title="存量 - 近期发生" /> },
      { path: 'infrastructure/stock/history-review', element: <BasePage title="存量 - 历史回顾" /> },
      { path: 'infrastructure/stock/change-analysis', element: <BasePage title="存量 - 变化分析报告" /> },
      { path: 'infrastructure/stock/comparative-analysis', element: <BasePage title="存量 - 对比分析报告" /> },
      { path: 'infrastructure/stock/distribution-analysis', element: <BasePage title="存量 - 分布特征分析报告" /> },
      { path: 'infrastructure/stock/attribution-analysis', element: <BasePage title="存量 - 归因分析报告" /> },
      { path: 'infrastructure/stock/correlation-analysis', element: <BasePage title="存量 - 相关性分析报告" /> },
      { path: 'infrastructure/stock/my-follow', element: <BasePage title="存量 - 我的个人关注" /> },
      { path: 'infrastructure/stock/recommended-follow', element: <BasePage title="存量 - 推荐的关注" /> },
      { path: 'infrastructure/stock/mandatory-follow', element: <BasePage title="存量 - 强制关注" /> },
      { path: 'infrastructure/stock/task-change', element: <BasePage title="存量 - 处理任务变更操作" /> },
      { path: 'infrastructure/stock/response-operation', element: <BasePage title="存量 - 响应操作" /> },
      { path: 'infrastructure/stock/collaboration-operation', element: <BasePage title="存量 - 参与协同操作" /> },
      
      // 基础资源 - 服务可用性
      { path: 'infrastructure/service-availability/realtime-dynamic', element: <BasePage title="服务可用性 - 实时动态" /> },
      { path: 'infrastructure/service-availability/recent-occurrences', element: <BasePage title="服务可用性 - 近期发生" /> },
      { path: 'infrastructure/service-availability/history-review', element: <BasePage title="服务可用性 - 历史回顾" /> },
      { path: 'infrastructure/service-availability/change-analysis', element: <BasePage title="服务可用性 - 变化分析报告" /> },
      { path: 'infrastructure/service-availability/comparative-analysis', element: <BasePage title="服务可用性 - 对比分析报告" /> },
      { path: 'infrastructure/service-availability/distribution-analysis', element: <BasePage title="服务可用性 - 分布特征分析报告" /> },
      { path: 'infrastructure/service-availability/attribution-analysis', element: <BasePage title="服务可用性 - 归因分析报告" /> },
      { path: 'infrastructure/service-availability/correlation-analysis', element: <BasePage title="服务可用性 - 相关性分析报告" /> },
      { path: 'infrastructure/service-availability/my-follow', element: <BasePage title="服务可用性 - 我的个人关注" /> },
      { path: 'infrastructure/service-availability/recommended-follow', element: <BasePage title="服务可用性 - 推荐的关注" /> },
      { path: 'infrastructure/service-availability/mandatory-follow', element: <BasePage title="服务可用性 - 强制关注" /> },
      { path: 'infrastructure/service-availability/task-change', element: <BasePage title="服务可用性 - 处理任务变更操作" /> },
      { path: 'infrastructure/service-availability/response-operation', element: <BasePage title="服务可用性 - 响应操作" /> },
      { path: 'infrastructure/service-availability/collaboration-operation', element: <BasePage title="服务可用性 - 参与协同操作" /> },
      
      // 基础资源 - 使用和转化
      { path: 'infrastructure/usage-conversion/realtime-dynamic', element: <BasePage title="使用和转化 - 实时动态" /> },
      { path: 'infrastructure/usage-conversion/recent-occurrences', element: <BasePage title="使用和转化 - 近期发生" /> },
      { path: 'infrastructure/usage-conversion/history-review', element: <BasePage title="使用和转化 - 历史回顾" /> },
      { path: 'infrastructure/usage-conversion/change-analysis', element: <BasePage title="使用和转化 - 变化分析报告" /> },
      { path: 'infrastructure/usage-conversion/comparative-analysis', element: <BasePage title="使用和转化 - 对比分析报告" /> },
      { path: 'infrastructure/usage-conversion/distribution-analysis', element: <BasePage title="使用和转化 - 分布特征分析报告" /> },
      { path: 'infrastructure/usage-conversion/attribution-analysis', element: <BasePage title="使用和转化 - 归因分析报告" /> },
      { path: 'infrastructure/usage-conversion/correlation-analysis', element: <BasePage title="使用和转化 - 相关性分析报告" /> },
      { path: 'infrastructure/usage-conversion/my-follow', element: <BasePage title="使用和转化 - 我的个人关注" /> },
      { path: 'infrastructure/usage-conversion/recommended-follow', element: <BasePage title="使用和转化 - 推荐的关注" /> },
      { path: 'infrastructure/usage-conversion/mandatory-follow', element: <BasePage title="使用和转化 - 强制关注" /> },
      { path: 'infrastructure/usage-conversion/task-change', element: <BasePage title="使用和转化 - 处理任务变更操作" /> },
      { path: 'infrastructure/usage-conversion/response-operation', element: <BasePage title="使用和转化 - 响应操作" /> },
      { path: 'infrastructure/usage-conversion/collaboration-operation', element: <BasePage title="使用和转化 - 参与协同操作" /> },
      
      // 服务健康 - 健康状态报告
      { path: 'service-health/health-report/realtime-dynamic', element: <BasePage title="健康状态报告 - 实时动态" /> },
      { path: 'service-health/health-report/recent-occurrences', element: <BasePage title="健康状态报告 - 近期发生" /> },
      { path: 'service-health/health-report/history-review', element: <BasePage title="健康状态报告 - 历史回顾" /> },
      { path: 'service-health/health-report/change-analysis', element: <BasePage title="健康状态报告 - 变化分析报告" /> },
      { path: 'service-health/health-report/comparative-analysis', element: <BasePage title="健康状态报告 - 对比分析报告" /> },
      { path: 'service-health/health-report/distribution-analysis', element: <BasePage title="健康状态报告 - 分布特征分析报告" /> },
      { path: 'service-health/health-report/attribution-analysis', element: <BasePage title="健康状态报告 - 归因分析报告" /> },
      { path: 'service-health/health-report/correlation-analysis', element: <BasePage title="健康状态报告 - 相关性分析报告" /> },
      { path: 'service-health/health-report/my-follow', element: <BasePage title="健康状态报告 - 我的个人关注" /> },
      { path: 'service-health/health-report/recommended-follow', element: <BasePage title="健康状态报告 - 推荐的关注" /> },
      { path: 'service-health/health-report/mandatory-follow', element: <BasePage title="健康状态报告 - 强制关注" /> },
      { path: 'service-health/health-report/task-change', element: <BasePage title="健康状态报告 - 处理任务变更操作" /> },
      { path: 'service-health/health-report/response-operation', element: <BasePage title="健康状态报告 - 响应操作" /> },
      { path: 'service-health/health-report/collaboration-operation', element: <BasePage title="健康状态报告 - 参与协同操作" /> },
      
      // 服务健康 - 黑名单状态
      { path: 'service-health/blacklist/realtime-dynamic', element: <BasePage title="黑名单状态 - 实时动态" /> },
      { path: 'service-health/blacklist/recent-occurrences', element: <BasePage title="黑名单状态 - 近期发生" /> },
      { path: 'service-health/blacklist/history-review', element: <BasePage title="黑名单状态 - 历史回顾" /> },
      { path: 'service-health/blacklist/change-analysis', element: <BasePage title="黑名单状态 - 变化分析报告" /> },
      { path: 'service-health/blacklist/comparative-analysis', element: <BasePage title="黑名单状态 - 对比分析报告" /> },
      { path: 'service-health/blacklist/distribution-analysis', element: <BasePage title="黑名单状态 - 分布特征分析报告" /> },
      { path: 'service-health/blacklist/attribution-analysis', element: <BasePage title="黑名单状态 - 归因分析报告" /> },
      { path: 'service-health/blacklist/correlation-analysis', element: <BasePage title="黑名单状态 - 相关性分析报告" /> },
      { path: 'service-health/blacklist/my-follow', element: <BasePage title="黑名单状态 - 我的个人关注" /> },
      { path: 'service-health/blacklist/recommended-follow', element: <BasePage title="黑名单状态 - 推荐的关注" /> },
      { path: 'service-health/blacklist/mandatory-follow', element: <BasePage title="黑名单状态 - 强制关注" /> },
      { path: 'service-health/blacklist/task-change', element: <BasePage title="黑名单状态 - 处理任务变更操作" /> },
      { path: 'service-health/blacklist/response-operation', element: <BasePage title="黑名单状态 - 响应操作" /> },
      { path: 'service-health/blacklist/collaboration-operation', element: <BasePage title="黑名单状态 - 参与协同操作" /> },
      
      // 服务健康 - 常见问题
      { path: 'service-health/common-issues/realtime-dynamic', element: <BasePage title="常见问题 - 实时动态" /> },
      { path: 'service-health/common-issues/recent-occurrences', element: <BasePage title="常见问题 - 近期发生" /> },
      { path: 'service-health/common-issues/history-review', element: <BasePage title="常见问题 - 历史回顾" /> },
      { path: 'service-health/common-issues/change-analysis', element: <BasePage title="常见问题 - 变化分析报告" /> },
      { path: 'service-health/common-issues/comparative-analysis', element: <BasePage title="常见问题 - 对比分析报告" /> },
      { path: 'service-health/common-issues/distribution-analysis', element: <BasePage title="常见问题 - 分布特征分析报告" /> },
      { path: 'service-health/common-issues/attribution-analysis', element: <BasePage title="常见问题 - 归因分析报告" /> },
      { path: 'service-health/common-issues/correlation-analysis', element: <BasePage title="常见问题 - 相关性分析报告" /> },
      { path: 'service-health/common-issues/my-follow', element: <BasePage title="常见问题 - 我的个人关注" /> },
      { path: 'service-health/common-issues/recommended-follow', element: <BasePage title="常见问题 - 推荐的关注" /> },
      { path: 'service-health/common-issues/mandatory-follow', element: <BasePage title="常见问题 - 强制关注" /> },
      { path: 'service-health/common-issues/task-change', element: <BasePage title="常见问题 - 处理任务变更操作" /> },
      { path: 'service-health/common-issues/response-operation', element: <BasePage title="常见问题 - 响应操作" /> },
      { path: 'service-health/common-issues/collaboration-operation', element: <BasePage title="常见问题 - 参与协同操作" /> },
      
      // 服务健康 - 健康干预绩效
      { path: 'service-health/intervention-performance/realtime-dynamic', element: <BasePage title="健康干预绩效 - 实时动态" /> },
      { path: 'service-health/intervention-performance/recent-occurrences', element: <BasePage title="健康干预绩效 - 近期发生" /> },
      { path: 'service-health/intervention-performance/history-review', element: <BasePage title="健康干预绩效 - 历史回顾" /> },
      { path: 'service-health/intervention-performance/change-analysis', element: <BasePage title="健康干预绩效 - 变化分析报告" /> },
      { path: 'service-health/intervention-performance/comparative-analysis', element: <BasePage title="健康干预绩效 - 对比分析报告" /> },
      { path: 'service-health/intervention-performance/distribution-analysis', element: <BasePage title="健康干预绩效 - 分布特征分析报告" /> },
      { path: 'service-health/intervention-performance/attribution-analysis', element: <BasePage title="健康干预绩效 - 归因分析报告" /> },
      { path: 'service-health/intervention-performance/correlation-analysis', element: <BasePage title="健康干预绩效 - 相关性分析报告" /> },
      { path: 'service-health/intervention-performance/my-follow', element: <BasePage title="健康干预绩效 - 我的个人关注" /> },
      { path: 'service-health/intervention-performance/recommended-follow', element: <BasePage title="健康干预绩效 - 推荐的关注" /> },
      { path: 'service-health/intervention-performance/mandatory-follow', element: <BasePage title="健康干预绩效 - 强制关注" /> },
      { path: 'service-health/intervention-performance/task-change', element: <BasePage title="健康干预绩效 - 处理任务变更操作" /> },
      { path: 'service-health/intervention-performance/response-operation', element: <BasePage title="健康干预绩效 - 响应操作" /> },
      { path: 'service-health/intervention-performance/collaboration-operation', element: <BasePage title="健康干预绩效 - 参与协同操作" /> },
      
      // 左侧导航 - 应用服务
      { path: 'application-service', element: <BasePage title="应用服务" /> },
      { path: 'application-service/traffic-bearing', element: <BasePage title="流量承载" /> },
      { path: 'application-service/online-experience', element: <BasePage title="在线体验" /> },
      { path: 'application-service/service-efficiency', element: <BasePage title="服务传递效率" /> },
      
      // 左侧导航 - 基础资源
      { path: 'infrastructure', element: <BasePage title="基础资源" /> },
      { path: 'infrastructure/stock', element: <BasePage title="存量" /> },
      { path: 'infrastructure/service-availability', element: <BasePage title="服务可用性" /> },
      { path: 'infrastructure/usage-conversion', element: <BasePage title="使用和转化" /> },
      
      // 左侧导航 - 服务健康
      { path: 'service-health', element: <BasePage title="服务健康" /> },
      { path: 'service-health/health-report', element: <BasePage title="健康状态报告" /> },
      { path: 'service-health/blacklist', element: <BasePage title="黑名单状态" /> },
      { path: 'service-health/common-issues', element: <BasePage title="常见问题" /> },
      { path: 'service-health/intervention-performance', element: <BasePage title="健康干预绩效" /> },
      
      // 顶部导航 - 报警
      { path: 'alarm/alarm-status', element: <BasePage title="报警状态" /> },
      { path: 'alarm/supervision', element: <BasePage title="督促" /> },
      { path: 'alarm/alarm-handling-performance', element: <BasePage title="报警处理绩效" /> },
      
      // 顶部导航 - 事件
      { path: 'event/business-operation-events', element: <BasePage title="业务运行事件" /> },
      { path: 'event/position-events', element: <BasePage title="岗位事件" /> },
      { path: 'event/task-events', element: <BasePage title="任务事件" /> },
      { path: 'event/performance-events', element: <BasePage title="绩效事件" /> },
      
      // 顶部导航 - 任务
      { path: 'task/emergency-response-tasks', element: <BasePage title="应急响应任务" /> },
      { path: 'task/intervention-plan-tasks', element: <BasePage title="视情干预计划任务" /> },
      { path: 'task/regular-tasks', element: <BasePage title="常态化任务" /> },
      
      // 顶部导航 - 在线
      { path: 'online/position-responsibility-report', element: <BasePage title="岗位责任情况报告" /> },
      { path: 'online/on-duty-report', element: <BasePage title="在线值守报告" /> },
      { path: 'online/position-responsibility-involvement-report', element: <BasePage title="岗位责任涉及报告" /> },
      { path: 'online/position-comprehensive-performance-report', element: <BasePage title="岗位综合绩效报告" /> },
      
      // 顶部导航 - 个人中心
      { path: 'personal/registration-info', element: <BasePage title="注册信息" /> },
      { path: 'personal/personalization-settings', element: <BasePage title="个性化设置" /> },
      { path: 'personal/my-content', element: <BasePage title="我的内容" /> },
      
      // 业务管理相关路由
      { path: 'business/list', element: <BusinessList /> },
      { path: 'business/detail/:id', element: <BusinessDetail /> },
      
      // 其他管理页面
      { path: 'users/list', element: <UserList /> },
      { path: 'documents/list', element: <DocumentList /> },
      { path: 'analytics/list', element: <AnalyticsList /> },
      { path: 'system/list', element: <SystemList /> },
      // 模板预览页面
      { path: 'template-preview', element: <TemplatePreview /> },


    ],
  },
]);

export default router;
