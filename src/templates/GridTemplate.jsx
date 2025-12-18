import React, { useEffect, useRef, useState } from 'react';
import { Statistic, List, Tag, Card, Tabs, Drawer, Button } from 'antd';
import * as echarts from 'echarts';
import { ArrowUpOutlined, ArrowDownOutlined, WarningOutlined, InfoCircleOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const GridTemplate = ({ pageTitle, sections, data = {}, layoutConfig = {}, templateType = 'default' }) => {
  const chartRefs = useRef({});
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState('');

  const createChartRef = (key) => {
    if (!chartRefs.current[key]) {
      chartRefs.current[key] = React.createRef();
    }
    return chartRefs.current[key];
  };

  // 打开抽屉显示隐藏数据
  const openDrawer = (title, content) => {
    setDrawerTitle(title);
    setDrawerContent(content);
    setDrawerVisible(true);
  };

  // 关闭抽屉
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  useEffect(() => {
    const charts = {};
    const chartRefsObj = chartRefs.current;

    setTimeout(() => {
      Object.keys(chartRefsObj).forEach(chartKey => {
        const ref = chartRefsObj[chartKey];
        if (ref.current) {
          const section = sections[chartKey];
          if (section && section.type === 'chart') {
            const chart = echarts.init(ref.current);
            chart.setOption(section.option || {});
            charts[chartKey] = chart;
          }
        }
      });
    }, 0);

    const handleResize = () => {
      Object.values(charts).forEach(chart => chart.resize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Object.values(charts).forEach(chart => chart.dispose());
    };
  }, [sections]);

  // 模板1：业务主体 - 事实发生（左侧 - 全景俯瞰 - 一级页）
  const renderTemplate1 = () => {
    return (
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto 2.2fr 0.8fr auto', gap: '3px', overflow: 'hidden' }}>
        {/* 1. 摘要栏：第1行，1-4列 */}
        {sections.summary && (
          <div style={{ gridRow: '1 / 2', gridColumn: '1 / 5', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', overflow: 'hidden' }}>
            {sections.summary.map((item, index) => (
              <Card 
                key={index} 
                size="small" 
                style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
                bodyStyle={{ padding: '3px 5px', overflow: 'hidden' }}
              >
                <Statistic
                  title={item.title}
                  value={item.value}
                  precision={item.precision || 0}
                  valueStyle={{ color: item.color || '#333', fontSize: '13px' }}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  titleStyle={{ fontSize: '10px', marginBottom: '1px' }}
                />
              </Card>
            ))}
          </div>
        )}

        {/* 2. 主视图：第2行，1-3列 */}
        <div style={{ gridRow: '2 / 3', gridColumn: '1 / 4', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3px', overflow: 'hidden' }}>
          {/* 2.1 左侧：异常指标预警列表 */}
          <Card 
            title={sections.main4?.title || "异常指标预警列表"} 
            size="small" 
            style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.main4 && sections.main4.type === 'chart' && (
              <div ref={createChartRef('main4')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
            )}
            {sections.main4 && sections.main4.type === 'text' && (
              <div style={{ padding: '10px', textAlign: 'center', color: '#666', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {sections.main4.content}
              </div>
            )}
          </Card>

          {/* 2.2 中间：动态图表区 */}
          <Card 
            title={sections.main1?.title || "主视图"} 
            size="small" 
            style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            <Tabs style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {sections.main1 && (
                <TabPane tab={sections.main1.title || "可视化动态变化图"} key="1">
                  <div style={{ height: 'calc(100% - 36px)', overflow: 'hidden' }}>
                    {sections.main1.type === 'chart' && (
                      <div ref={createChartRef('main1')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
                    )}
                  </div>
                </TabPane>
              )}
              {sections.main2 && (
                <TabPane tab={sections.main2.title || "可视化对比分析动态图"} key="2">
                  <div style={{ height: 'calc(100% - 36px)', overflow: 'hidden' }}>
                    {sections.main2.type === 'chart' && (
                      <div ref={createChartRef('main2')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
                    )}
                  </div>
                </TabPane>
              )}
              {sections.main3 && (
                <TabPane tab={sections.main3.title || "位置 + 内容关系图"} key="3">
                  <div style={{ height: 'calc(100% - 36px)', overflow: 'hidden' }}>
                    {sections.main3.type === 'chart' && (
                      <div ref={createChartRef('main3')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
                    )}
                  </div>
                </TabPane>
              )}
            </Tabs>
          </Card>
        </div>

        {/* 3. 右侧辅助视图：第2-4行，4列 */}
        <Card 
          title={sections.aux2?.title || "责任 / 在线状态区"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '2 / 5', gridColumn: '4 / 5' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.aux2 && sections.aux2.type === 'list' && (
            <List
              size="small"
              dataSource={sections.aux2.data || []}
              renderItem={sections.aux2.renderItem}
              pagination={false}
              style={{ height: '100%', overflow: 'auto' }}
            />
          )}
        </Card>

        {/* 4. 底部辅助视图：第3-4行，1-3列 */}
        <Card 
          title={sections.aux1?.title || "事件 / 任务摘要区"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '3 / 5', gridColumn: '1 / 4' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.aux1 && sections.aux1.type === 'list' && (
            <div style={{ height: '100%', overflow: 'hidden' }}>
              <List
                size="small"
                dataSource={sections.aux1.data || []}
                renderItem={sections.aux1.renderItem}
                pagination={false}
                grid={sections.aux1.grid || { gutter: 5, column: 4 }}
                style={{ height: '100%', overflow: 'auto' }}
              />
            </div>
          )}
        </Card>
      </div>
    );
  };

  // 模板2：业务主体 - 事实发生（左侧 - 一级页）
  const renderTemplate2 = () => {
    return (
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'auto 1fr 1fr', gap: '3px', overflow: 'hidden' }}>
        {/* 1. 摘要栏：第1行，1-5列（占第一行整行） */}
        {sections.summary && (
          <div style={{ gridRow: '1 / 2', gridColumn: '1 / 6', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', overflow: 'hidden' }}>
            {sections.summary.map((item, index) => (
              <Card 
                key={index} 
                size="small" 
                style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
                bodyStyle={{ padding: '3px 5px', overflow: 'hidden' }}
              >
                <Statistic
                  title={item.title}
                  value={item.value}
                  precision={item.precision || 0}
                  valueStyle={{ color: item.color || '#333', fontSize: '13px' }}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  titleStyle={{ fontSize: '10px', marginBottom: '1px' }}
                />
              </Card>
            ))}
          </div>
        )}

        {/* 2. 主题责任团队信息：第2-3行，1列（占第1列） */}
        <Card 
          title={sections.aux2?.title || "主题责任团队信息"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '2 / 4', gridColumn: '1 / 2' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.aux2 && sections.aux2.type === 'list' && (
            <List
              size="small"
              dataSource={sections.aux2.data || []}
              renderItem={sections.aux2.renderItem}
              pagination={false}
              style={{ height: '100%', overflow: 'auto' }}
            />
          )}
        </Card>

        {/* 3. 可视化动态变化图：第2行，2-4列（中间主视图区占2-4列） */}
        <Card 
          title={sections.main1?.title || "可视化动态变化图"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '2 / 3', gridColumn: '2 / 5' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.main1 && sections.main1.type === 'chart' && (
            <div ref={createChartRef('main1')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
          )}
        </Card>

        {/* 4. 可视化对比分析动态图：第3行，2-4列（中间主视图区占2-4列） */}
        <Card 
          title={sections.main2?.title || "可视化对比分析动态图"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '3 / 4', gridColumn: '2 / 4' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.main2 && sections.main2.type === 'chart' && (
            <div ref={createChartRef('main2')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
          )}
        </Card>

        {/* 5. 主题可视化分布图：第3行，4列（中间主视图区占2-4列） */}
        <Card 
          title={sections.main3?.title || "主题可视化分布图"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '3 / 4', gridColumn: '4 / 5' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.main3 && sections.main3.type === 'chart' && (
            <div ref={createChartRef('main3')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
          )}
        </Card>

        {/* 6. 关联异常事件列表：第2-3行，5列（占第5列） */}
        <Card 
          title={sections.aux1?.title || "关联异常事件列表"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '2 / 4', gridColumn: '5 / 6' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.aux1 && sections.aux1.type === 'list' && (
            <List
              size="small"
              dataSource={sections.aux1.data || []}
              renderItem={sections.aux1.renderItem}
              pagination={false}
              style={{ height: '100%', overflow: 'auto' }}
            />
          )}
        </Card>
      </div>
    );
  };

  // 模板3：业务主体 - 事实发生（左侧 - 观察-实时动态）
  const renderTemplate3 = () => {
    return (
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto 1fr 1fr', gap: '3px' }}>
        {/* 1. 摘要栏：第1行，1-3列 */}
        {sections.summary && (
          <div style={{ gridRow: '1 / 2', gridColumn: '1 / 4', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', overflow: 'hidden' }}>
            {sections.summary.map((item, index) => (
              <Card 
                key={index} 
                size="small" 
                style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
                bodyStyle={{ padding: '3px 5px', overflow: 'hidden' }}
              >
                <Statistic
                  title={item.title}
                  value={item.value}
                  precision={item.precision || 0}
                  valueStyle={{ color: item.color || '#333', fontSize: '13px' }}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  titleStyle={{ fontSize: '10px', marginBottom: '1px' }}
                />
              </Card>
            ))}
          </div>
        )}

        {/* 2. 可视化动态变化图：第1-2列，第1-2行 */}
        <Card 
          title={sections.main1?.title || "可视化动态变化图"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '2 / 3', gridColumn: '1 / 3' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.main1 && sections.main1.type === 'chart' && (
            <div ref={createChartRef('main1')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
          )}
        </Card>

        {/* 3. 实时"主题"状态图：第1列，第3行 */}
        <Card 
          title={sections.main2?.title || "实时\"主题\"状态图"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '3 / 4', gridColumn: '1 / 2' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.main2 && sections.main2.type === 'chart' && (
            <div ref={createChartRef('main2')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
          )}
        </Card>

        {/* 4. 事件摘要区：第2列，第3行 */}
        <Card 
          title={sections.aux2?.title || "事件摘要区"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '3 / 4', gridColumn: '2 / 3' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.aux2 && sections.aux2.type === 'list' && (
            <List
              size="small"
              dataSource={sections.aux2.data || []}
              renderItem={sections.aux2.renderItem}
              pagination={false}
              style={{ height: '100%', overflow: 'auto' }}
            />
          )}
        </Card>

        {/* 5. 任务 + 责任 / 在线状态区：第3列，第1-3行 */}
        <Card 
          title={sections.aux1?.title || "任务 + 责任 / 在线状态区"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '2 / 4', gridColumn: '3 / 4' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.aux1 && sections.aux1.type === 'list' && (
            <List
              size="small"
              dataSource={sections.aux1.data || []}
              renderItem={sections.aux1.renderItem}
              pagination={false}
              style={{ height: '100%', overflow: 'auto' }}
            />
          )}
        </Card>
      </div>
    );
  };

  // 模板4：业务主体 - 事实发生（左侧 - 观察-近期发生）
  const renderTemplate4 = () => {
    return (
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto 1fr 1fr', gap: '3px' }}>
        {/* 1. 摘要栏：第1行，1-3列 */}
        {sections.summary && (
          <div style={{ gridRow: '1', gridColumn: '1 / 4', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', overflow: 'hidden' }}>
            {sections.summary.map((item, index) => (
              <Card 
                key={index} 
                size="small" 
                style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
                bodyStyle={{ padding: '3px 5px', overflow: 'hidden' }}
              >
                <Statistic
                  title={item.title}
                  value={item.value}
                  precision={item.precision || 0}
                  valueStyle={{ color: item.color || '#333', fontSize: '13px' }}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  titleStyle={{ fontSize: '10px', marginBottom: '1px' }}
                />
              </Card>
            ))}
          </div>
        )}

        {/* 2. 主视图1：图表占1-2列，1-2行 */}
        <Card 
          title={sections.main1?.title || "主视图1"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '2 / 4', gridColumn: '1 / 3' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.main1 && sections.main1.type === 'chart' && (
            <div ref={createChartRef('main1')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
          )}
        </Card>

        {/* 3. 辅助视图1：第3列，第1行 */}
        <Card 
          title={sections.aux1?.title || "辅助视图1"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '2', gridColumn: '3 / 4' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.aux1 && sections.aux1.type === 'list' && (
            <List
              size="small"
              dataSource={sections.aux1.data || []}
              renderItem={sections.aux1.renderItem}
              pagination={false}
              style={{ height: '100%', overflow: 'auto' }}
            />
          )}
        </Card>

        {/* 4. 辅助视图2：第3列，第2行 */}
        <Card 
          title={sections.aux2?.title || "辅助视图2"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '3', gridColumn: '3 / 4' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.aux2 && sections.aux2.type === 'list' && (
            <List
              size="small"
              dataSource={sections.aux2.data || []}
              renderItem={sections.aux2.renderItem}
              pagination={false}
              style={{ height: '100%', overflow: 'auto' }}
            />
          )}
        </Card>
      </div>
    );
  };

  // 模板5：业务主体 - 事实发生（左侧 - 观察-历史回顾）
  const renderTemplate5 = () => {
    return (
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto 1fr 1fr', gap: '3px' }}>
        {/* 1. 摘要栏：第1行，1-3列 */}
        {sections.summary && (
          <div style={{ gridRow: '1', gridColumn: '1 / 4', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', overflow: 'hidden' }}>
            {sections.summary.map((item, index) => (
              <Card 
                key={index} 
                size="small" 
                style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
                bodyStyle={{ padding: '3px 5px', overflow: 'hidden' }}
              >
                <Statistic
                  title={item.title}
                  value={item.value}
                  precision={item.precision || 0}
                  valueStyle={{ color: item.color || '#333', fontSize: '13px' }}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  titleStyle={{ fontSize: '10px', marginBottom: '1px' }}
                />
              </Card>
            ))}
          </div>
        )}

        {/* 2. 主视图1：图表占1-2列，1-2行 */}
        <Card 
          title={sections.main1?.title || "主视图1"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '2 / 4', gridColumn: '1 / 3' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          titleStyle={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {sections.main1 && sections.main1.type === 'chart' && (
            <div ref={createChartRef('main1')} style={{ width: '100%', height: '90%', overflow: 'hidden', marginTop: '10px' }} />
          )}
        </Card>

        {/* 3. 辅助视图1：第3列，第1行 */}
        <Card 
          title={sections.aux1?.title || "辅助视图1"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '2', gridColumn: '3 / 4' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.aux1 && sections.aux1.type === 'list' && (
            <List
              size="small"
              dataSource={sections.aux1.data || []}
              renderItem={sections.aux1.renderItem}
              pagination={false}
              style={{ height: '100%', overflow: 'auto' }}
            />
          )}
        </Card>

        {/* 4. 辅助视图2：第3列，第2行 */}
        <Card 
          title={sections.aux2?.title || "辅助视图2"} 
          size="small" 
          style={{ margin: 0, display: 'flex', flexDirection: 'column', gridRow: '3', gridColumn: '3 / 4' }}
          bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
        >
          {sections.aux2 && sections.aux2.type === 'list' && (
            <List
              size="small"
              dataSource={sections.aux2.data || []}
              renderItem={sections.aux2.renderItem}
              pagination={false}
              style={{ height: '100%', overflow: 'auto' }}
            />
          )}
        </Card>
      </div>
    );
  };

  // 模板6：业务主体 - 深度分析(左侧-感知-变化分析报告）
  const renderTemplate6 = () => {
    return (
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gridTemplateRows: 'auto 1fr 1fr', gap: '3px' }}>
        {/* 1. 摘要栏：第1行，1-3列 */}
        {sections.summary && (
          <div style={{ gridRow: '1', gridColumn: '1 / 4', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', overflow: 'hidden' }}>
            {sections.summary.map((item, index) => (
              <Card 
                key={index} 
                size="small" 
                style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
                bodyStyle={{ padding: '3px 5px', overflow: 'hidden' }}
              >
                <Statistic
                  title={item.title}
                  value={item.value}
                  precision={item.precision || 0}
                  valueStyle={{ color: item.color || '#333', fontSize: '13px' }}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  titleStyle={{ fontSize: '10px', marginBottom: '1px' }}
                />
              </Card>
            ))}
          </div>
        )}

        {/* 主视图区域：第1-2列，第2-3行 */}
        <div style={{ gridRow: '2 / 4', gridColumn: '1 / 3', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '2fr 1fr', gap: '3px' }}>
          {/* 2. 可视化对比 / 趋势分析：第2行，1列 */}
          <Card 
            title={sections.changeTrend?.title || "可视化对比 / 趋势分析"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.changeTrend && sections.changeTrend.type === 'chart' && (
              <div ref={createChartRef('changeTrend')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
            )}
          </Card>

          {/* 3. 变化影响范围分析：第2行，2列 */}
          <Card 
            title={sections.impactAnalysis?.title || "变化影响范围分析"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.impactAnalysis && sections.impactAnalysis.type === 'chart' && (
              <div ref={createChartRef('impactAnalysis')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
            )}
          </Card>

          {/* 4. 初步变化原因排查：第3行，1-2列 */}
          <Card 
            title={sections.causeAnalysis?.title || "初步变化原因排查"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column', gridColumn: '1 / 3' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.causeAnalysis && sections.causeAnalysis.type === 'chart' && (
              <div ref={createChartRef('causeAnalysis')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
            )}
          </Card>
        </div>

        {/* 辅助视图区域：第3列，第2-3行 */}
        <div style={{ gridRow: '2 / 4', gridColumn: '3', display: 'grid', gridTemplateRows: '1fr 1fr', gap: '3px' }}>
          {/* 5. 业务对事件的影响分析：第2行，3列 */}
          <Card 
            title={sections.businessImpact?.title || "业务对事件的影响分析"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.businessImpact && sections.businessImpact.type === 'list' && (
              <List
                size="small"
                dataSource={sections.businessImpact.data || []}
                renderItem={sections.businessImpact.renderItem}
                pagination={false}
                style={{ height: '100%', overflow: 'auto' }}
              />
            )}
          </Card>

          {/* 6. 任务 + 责任 / 在线状态区：第3行，3列 */}
          <Card 
            title={sections.taskResponsibility?.title || "任务 + 责任 / 在线状态区"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.taskResponsibility && sections.taskResponsibility.type === 'list' && (
              <List
                size="small"
                dataSource={sections.taskResponsibility.data || []}
                renderItem={sections.taskResponsibility.renderItem}
                pagination={false}
                style={{ height: '100%', overflow: 'auto' }}
              />
            )}
          </Card>
        </div>
      </div>
    );
  };

  // 模板7：业务主体 - 深度分析(左侧-感知-对比分析报告）
  const renderTemplate7 = () => {
    return (
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gridTemplateRows: 'auto 1fr 1fr', gap: '3px' }}>
        {/* 1. 摘要栏：第1行，1-3列 */}
        {sections.summary && (
          <div style={{ gridRow: '1', gridColumn: '1 / 4', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', overflow: 'hidden' }}>
            {sections.summary.map((item, index) => (
              <Card 
                key={index} 
                size="small" 
                style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
                bodyStyle={{ padding: '3px 5px', overflow: 'hidden' }}
              >
                <Statistic
                  title={item.title}
                  value={item.value}
                  precision={item.precision || 0}
                  valueStyle={{ color: item.color || '#333', fontSize: '13px' }}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  titleStyle={{ fontSize: '10px', marginBottom: '1px' }}
                />
              </Card>
            ))}
          </div>
        )}

        {/* 主视图区域：第1-2列，第2-3行 */}
        <div style={{ gridRow: '2 / 4', gridColumn: '1 / 3', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '2fr 1fr', gap: '3px' }}>
          {/* 2. 可视化对比 / 趋势分析：第2行，1列 */}
          <Card 
            title={sections.comparisonTrend?.title || "可视化对比 / 趋势分析"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.comparisonTrend && sections.comparisonTrend.type === 'chart' && (
              <div ref={createChartRef('comparisonTrend')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
            )}
          </Card>

          {/* 3. 跨问题类型对比：第2行，2列 */}
          <Card 
            title={sections.crossIssueComparison?.title || "跨问题类型对比"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.crossIssueComparison && sections.crossIssueComparison.type === 'chart' && (
              <div ref={createChartRef('crossIssueComparison')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
            )}
          </Card>

          {/* 4. 对比差异原因分析：第3行，1-2列 */}
          <Card 
            title={sections.differenceReasons?.title || "对比差异原因分析"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column', gridColumn: '1 / 3' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.differenceReasons && sections.differenceReasons.type === 'chart' && (
              <div ref={createChartRef('differenceReasons')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
            )}
          </Card>
        </div>

        {/* 辅助视图区域：第3列，第2-3行 */}
        <div style={{ gridRow: '2 / 4', gridColumn: '3', display: 'grid', gridTemplateRows: '1fr 1fr', gap: '3px' }}>
          {/* 5. 业务对事件的影响分析：第2行，3列 */}
          <Card 
            title={sections.businessEventImpact?.title || "业务对事件的影响分析"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.businessEventImpact && sections.businessEventImpact.type === 'list' && (
              <List
                size="small"
                dataSource={sections.businessEventImpact.data || []}
                renderItem={sections.businessEventImpact.renderItem}
                pagination={false}
                style={{ height: '100%', overflow: 'auto' }}
              />
            )}
          </Card>

          {/* 6. 业务对任务的影响分析：第3行，3列 */}
          <Card 
            title={sections.businessTaskImpact?.title || "业务对任务的影响分析"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.businessTaskImpact && sections.businessTaskImpact.type === 'list' && (
              <List
                size="small"
                dataSource={sections.businessTaskImpact.data || []}
                renderItem={sections.businessTaskImpact.renderItem}
                pagination={false}
                style={{ height: '100%', overflow: 'auto' }}
              />
            )}
          </Card>
        </div>
      </div>
    );
  };

  // 模板8：业务主体 - 深度分析(左侧-感知-分布特征分析报告）
  const renderTemplate8 = () => {
    return (
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gridTemplateRows: 'auto 1fr 1fr', gap: '3px' }}>
        {/* 1. 摘要栏：第1行，1-3列 */}
        {sections.summary && (
          <div style={{ gridRow: '1', gridColumn: '1 / 4', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', overflow: 'hidden' }}>
            {sections.summary.map((item, index) => (
              <Card 
                key={index} 
                size="small" 
                style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
                bodyStyle={{ padding: '3px 5px', overflow: 'hidden' }}
              >
                <Statistic
                  title={item.title}
                  value={item.value}
                  precision={item.precision || 0}
                  valueStyle={{ color: item.color || '#333', fontSize: '13px' }}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  titleStyle={{ fontSize: '10px', marginBottom: '1px' }}
                />
              </Card>
            ))}
          </div>
        )}

        {/* 主视图区域：第1-2列，第2-3行 */}
        <div style={{ gridRow: '2 / 4', gridColumn: '1 / 3', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '2fr 1fr', gap: '3px' }}>
          {/* 2. 可视化对比 / 趋势分析：第2行，1列 */}
          <Card 
            title={sections.comparisonTrend?.title || "可视化对比 / 趋势分析"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.comparisonTrend && sections.comparisonTrend.type === 'chart' && (
              <div ref={createChartRef('comparisonTrend')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
            )}
          </Card>

          {/* 3. 业务时段分布：第2行，2列 */}
          <Card 
            title={sections.timeDistribution?.title || "业务时段分布"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.timeDistribution && sections.timeDistribution.type === 'chart' && (
              <div ref={createChartRef('timeDistribution')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
            )}
          </Card>

          {/* 4. 分布特征价值：第3行，1-2列 */}
          <Card 
            title={sections.distributionValue?.title || "分布特征价值"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column', gridColumn: '1 / 3' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.distributionValue && sections.distributionValue.type === 'chart' && (
              <div ref={createChartRef('distributionValue')} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
            )}
          </Card>
        </div>

        {/* 辅助视图区域：第3列，第2-3行 */}
        <div style={{ gridRow: '2 / 4', gridColumn: '3', display: 'grid', gridTemplateRows: '1fr 1fr', gap: '3px' }}>
          {/* 5. 业务对事件的影响分析：第2行，3列 */}
          <Card 
            title={sections.businessEventImpact?.title || "业务对事件的影响分析"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.businessEventImpact && sections.businessEventImpact.type === 'list' && (
              <List
                size="small"
                dataSource={sections.businessEventImpact.data || []}
                renderItem={sections.businessEventImpact.renderItem}
                pagination={false}
                style={{ height: '100%', overflow: 'auto' }}
              />
            )}
          </Card>

          {/* 6. 业务对任务的影响分析：第3行，3列 */}
          <Card 
            title={sections.businessTaskImpact?.title || "业务对任务的影响分析"} 
            size="small" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, padding: '3px', overflow: 'hidden' }}
          >
            {sections.businessTaskImpact && sections.businessTaskImpact.type === 'list' && (
              <List
                size="small"
                dataSource={sections.businessTaskImpact.data || []}
                renderItem={sections.businessTaskImpact.renderItem}
                pagination={false}
                style={{ height: '100%', overflow: 'auto' }}
              />
            )}
          </Card>
        </div>
      </div>
    );
  };

  // 模板9：业务主体 - 决策归因(左侧-感知-归因分析报告）
  const renderTemplate9 = () => {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* 1. 摘要栏 */}
        {sections.summary && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', marginBottom: '3px' }}>
            {sections.summary.map((item, index) => (
              <Card 
                key={index} 
                size="small" 
                style={{ margin: 0 }}
                bodyStyle={{ padding: '3px 5px' }}
              >
                <Statistic
                  title={item.title}
                  value={item.value}
                  precision={item.precision || 0}
                  valueStyle={{ color: item.color || '#333', fontSize: '13px' }}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  titleStyle={{ fontSize: '10px', marginBottom: '1px' }}
                />
              </Card>
            ))}
          </div>
        )}
        
        {/* 2. 主体内容区：6列6行网格 */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(6, 1fr)', gap: '3px', minHeight: '400px' }}>
          {/* 关联事件主体：第1列所有行 */}
          <div style={{ gridColumn: '1', gridRow: '1 / 7' }}>
            <Card 
              title={sections.relatedEvents?.title || "关联事件主体"} 
              size="small" 
              style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
              bodyStyle={{ padding: '5px', flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {sections.relatedEvents && sections.relatedEvents.type === 'list' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                  {/* 列表内容 */}
                  <List
                    size="small"
                    dataSource={sections.relatedEvents.data || []}
                    renderItem={sections.relatedEvents.renderItem}
                    pagination={false}
                    style={{ overflow: 'auto', flex: 1 }}
                    bodyStyle={{ padding: '0' }}
                  />
                  
                  {/* 翻页组件：真正底对齐 */}
                  <div style={{ width: '100%', textAlign: 'center', fontSize: '10px', padding: '3px 0', backgroundColor: '#f0f2f5', borderTop: '1px solid #d9d9d9', marginTop: '5px' }}>
                    <span style={{ marginRight: '8px' }}>共 {sections.relatedEvents.data?.length || 0} 条</span>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', cursor: 'not-allowed', opacity: 0.6, border: '1px solid #d9d9d9', borderRadius: '2px', backgroundColor: '#fff' }}>上一页</button>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', backgroundColor: '#1890ff', color: '#fff', border: '1px solid #1890ff', borderRadius: '2px' }}>1</button>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', cursor: 'not-allowed', opacity: 0.6, border: '1px solid #d9d9d9', borderRadius: '2px', backgroundColor: '#fff' }}>下一页</button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* 归因拆解分析：第2-3列，1-4行 */}
          <Card 
            title={sections.attributionAnalysis?.title || "归因拆解分析"} 
            size="small" 
            style={{ margin: 0, gridColumn: '2 / 4', gridRow: '1 / 5', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ padding: '5px', flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            {sections.attributionAnalysis && sections.attributionAnalysis.type === 'chart' && (
              <div ref={createChartRef('attributionAnalysis')} style={{ flex: 1, width: '100%', height: '100%' }} />
            )}
          </Card>

          {/* 归因验证：第4-5列，1-4行 */}
          <Card 
            title={sections.attributionValidation?.title || "归因验证"} 
            size="small" 
            style={{ margin: 0, gridColumn: '4 / 6', gridRow: '1 / 5', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ padding: '5px', flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            {sections.attributionValidation && sections.attributionValidation.type === 'chart' && (
              <div ref={createChartRef('attributionValidation')} style={{ flex: 1, width: '100%', height: '100%' }} />
            )}
          </Card>

          {/* 决策建议优先级：第2-5列，5-6行 */}
          <Card 
            title={sections.suggestionPriority?.title || "决策建议优先级"} 
            size="small" 
            style={{ margin: 0, gridColumn: '2 / 6', gridRow: '5 / 7', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ padding: '5px', flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            {sections.suggestionPriority && sections.suggestionPriority.type === 'chart' && (
              <div ref={createChartRef('suggestionPriority')} style={{ flex: 1, width: '100%', height: '100%' }} />
            )}
          </Card>

          {/* 关联责任主体：第6列，1-3行 */}
          <div style={{ gridColumn: '6', gridRow: '1 / 4' }}>
            <Card 
              title={sections.relatedResponsibilities?.title || "关联责任主体"} 
              size="small" 
              style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
              bodyStyle={{ padding: '5px', flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {sections.relatedResponsibilities && sections.relatedResponsibilities.type === 'list' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                  {/* 列表内容 */}
                  <List
                    size="small"
                    dataSource={sections.relatedResponsibilities.data || []}
                    renderItem={sections.relatedResponsibilities.renderItem}
                    pagination={false}
                    style={{ overflow: 'auto', flex: 1 }}
                    bodyStyle={{ padding: '0' }}
                  />
                  
                  {/* 翻页组件：真正底对齐 */}
                  <div style={{ width: '100%', textAlign: 'center', fontSize: '10px', padding: '3px 0', backgroundColor: '#f0f2f5', borderTop: '1px solid #d9d9d9', marginTop: '5px' }}>
                    <span style={{ marginRight: '8px' }}>共 {sections.relatedResponsibilities.data?.length || 0} 条</span>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', cursor: 'not-allowed', opacity: 0.6, border: '1px solid #d9d9d9', borderRadius: '2px', backgroundColor: '#fff' }}>上一页</button>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', backgroundColor: '#1890ff', color: '#fff', border: '1px solid #1890ff', borderRadius: '2px' }}>1</button>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', cursor: 'not-allowed', opacity: 0.6, border: '1px solid #d9d9d9', borderRadius: '2px', backgroundColor: '#fff' }}>下一页</button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* 关联任务主体：第6列，4-6行 */}
          <div style={{ gridColumn: '6', gridRow: '4 / 7' }}>
            <Card 
              title={sections.relatedTasks?.title || "关联任务主体"} 
              size="small" 
              style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
              bodyStyle={{ padding: '5px', flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {sections.relatedTasks && sections.relatedTasks.type === 'list' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                  {/* 列表内容：限制只显示2条，无滚动条 */}
                  <List
                    size="small"
                    dataSource={sections.relatedTasks.data?.slice(0, 2) || []}
                    renderItem={sections.relatedTasks.renderItem}
                    pagination={false}
                    style={{ padding: '0' }}
                    bodyStyle={{ padding: '0' }}
                  />
                  
                  {/* 弹性空间，将翻页组件推到底部 */}
                  <div style={{ flex: 1 }}></div>
                  
                  {/* 翻页组件：固定在底部 */}
                  <div style={{ width: '100%', textAlign: 'center', fontSize: '10px', padding: '3px 0', backgroundColor: '#f0f2f5', borderTop: '1px solid #d9d9d9' }}>
                    <span style={{ marginRight: '8px' }}>共 {sections.relatedTasks.data?.length || 0} 条</span>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', cursor: 'not-allowed', opacity: 0.6, border: '1px solid #d9d9d9', borderRadius: '2px', backgroundColor: '#fff' }}>上一页</button>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', backgroundColor: '#1890ff', color: '#fff', border: '1px solid #1890ff', borderRadius: '2px' }}>1</button>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', cursor: 'not-allowed', opacity: 0.6, border: '1px solid #d9d9d9', borderRadius: '2px', backgroundColor: '#fff' }}>下一页</button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // 模板10：业务主体 - 决策归因(左侧-感知相关性分析报告）
  const renderTemplate10 = () => {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* 1. 摘要栏 */}
        {sections.summary && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', marginBottom: '3px' }}>
            {sections.summary.map((item, index) => (
              <Card 
                key={index} 
                size="small" 
                style={{ margin: 0 }}
                bodyStyle={{ padding: '3px 5px' }}
              >
                <Statistic
                  title={item.title}
                  value={item.value}
                  precision={item.precision || 0}
                  valueStyle={{ color: item.color || '#333', fontSize: '13px' }}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  titleStyle={{ fontSize: '10px', marginBottom: '1px' }}
                />
              </Card>
            ))}
          </div>
        )}
        
        {/* 2. 主体内容区：6列6行网格（与模板9相同布局） */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(6, 1fr)', gap: '3px', minHeight: '400px' }}>
          {/* 事件摘要区：第1列所有行 */}
          <div style={{ gridColumn: '1', gridRow: '1 / 7' }}>
            <Card 
              title={sections.eventSummary?.title || "事件摘要区"} 
              size="small" 
              style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
              bodyStyle={{ padding: '5px', flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {sections.eventSummary && sections.eventSummary.type === 'list' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                  {/* 列表内容 */}
                  <List
                    size="small"
                    dataSource={sections.eventSummary.data || []}
                    renderItem={sections.eventSummary.renderItem}
                    pagination={false}
                    style={{ overflow: 'auto', flex: 1 }}
                    bodyStyle={{ padding: '0' }}
                  />
                  
                  {/* 翻页组件：真正底对齐 */}
                  <div style={{ width: '100%', textAlign: 'center', fontSize: '10px', padding: '3px 0', backgroundColor: '#f0f2f5', borderTop: '1px solid #d9d9d9', marginTop: '5px' }}>
                    <span style={{ marginRight: '8px' }}>共 {sections.eventSummary.data?.length || 0} 条</span>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', cursor: 'not-allowed', opacity: 0.6, border: '1px solid #d9d9d9', borderRadius: '2px', backgroundColor: '#fff' }}>上一页</button>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', backgroundColor: '#1890ff', color: '#fff', border: '1px solid #1890ff', borderRadius: '2px' }}>1</button>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', cursor: 'not-allowed', opacity: 0.6, border: '1px solid #d9d9d9', borderRadius: '2px', backgroundColor: '#fff' }}>下一页</button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* 相关性分析：第2-3列，1-4行 */}
          <Card 
            title={sections.correlationAnalysis?.title || "相关性分析"} 
            size="small" 
            style={{ margin: 0, gridColumn: '2 / 4', gridRow: '1 / 5', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ padding: '5px', flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            {sections.correlationAnalysis && sections.correlationAnalysis.type === 'chart' && (
              <div ref={createChartRef('correlationAnalysis')} style={{ flex: 1, width: '100%', height: '100%' }} />
            )}
          </Card>

          {/* 相关性应用效果：第4-5列，1-4行 */}
          <Card 
            title={sections.applicationEffect?.title || "相关性应用效果"} 
            size="small" 
            style={{ margin: 0, gridColumn: '4 / 6', gridRow: '1 / 5', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ padding: '5px', flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            {sections.applicationEffect && sections.applicationEffect.type === 'chart' && (
              <div ref={createChartRef('applicationEffect')} style={{ flex: 1, width: '100%', height: '100%' }} />
            )}
          </Card>

          {/* 决策建议优先级：第2-5列，5-6行 */}
          <Card 
            title={sections.suggestionPriority?.title || "决策建议优先级"} 
            size="small" 
            style={{ margin: 0, gridColumn: '2 / 6', gridRow: '5 / 7', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ padding: '5px', flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            {sections.suggestionPriority && sections.suggestionPriority.type === 'chart' && (
              <div ref={createChartRef('suggestionPriority')} style={{ flex: 1, width: '100%', height: '100%' }} />
            )}
          </Card>

          {/* 责任与在线状态：第6列所有行 */}
          <div style={{ gridColumn: '6', gridRow: '1 / 7' }}>
            <Card 
              title={sections.responsibilityStatus?.title || "责任与在线状态"} 
              size="small" 
              style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
              bodyStyle={{ padding: '5px', flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {sections.responsibilityStatus && sections.responsibilityStatus.type === 'list' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                  {/* 列表内容 */}
                  <List
                    size="small"
                    dataSource={sections.responsibilityStatus.data || []}
                    renderItem={sections.responsibilityStatus.renderItem}
                    pagination={false}
                    style={{ overflow: 'auto', flex: 1 }}
                    bodyStyle={{ padding: '0' }}
                  />
                  
                  {/* 翻页组件：真正底对齐 */}
                  <div style={{ width: '100%', textAlign: 'center', fontSize: '10px', padding: '3px 0', backgroundColor: '#f0f2f5', borderTop: '1px solid #d9d9d9', marginTop: '5px' }}>
                    <span style={{ marginRight: '8px' }}>共 {sections.responsibilityStatus.data?.length || 0} 条</span>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', cursor: 'not-allowed', opacity: 0.6, border: '1px solid #d9d9d9', borderRadius: '2px', backgroundColor: '#fff' }}>上一页</button>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', backgroundColor: '#1890ff', color: '#fff', border: '1px solid #1890ff', borderRadius: '2px' }}>1</button>
                    <button style={{ margin: '0 2px', fontSize: '10px', padding: '2px 6px', cursor: 'not-allowed', opacity: 0.6, border: '1px solid #d9d9d9', borderRadius: '2px', backgroundColor: '#fff' }}>下一页</button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // 模板11：任务主体 - 事实发生（左侧 - 行动 - 变更操作）
  const renderTemplate11 = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '3px', padding: '3px', boxSizing: 'border-box' }}>
        {/* 1. 顶部摘要栏：变更基本信息（辅助视图，小尺寸） */}
        <div style={{ height: '50px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px' }}>
          {sections.summary && sections.summary.map((item, index) => (
            <Card
              key={index}
              size="small"
              style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
              bodyStyle={{ padding: '2px 4px', flex: 1 }}
            >
              <Statistic
                title={item.title}
                value={item.value}
                precision={item.precision || 0}
                valueStyle={{ color: item.color || '#333', fontSize: '11px', fontWeight: 500 }}
                prefix={item.prefix}
                suffix={item.suffix}
                titleStyle={{ fontSize: '9px', marginBottom: '1px', color: '#666' }}
              />
            </Card>
          ))}
        </div>
        
        {/* 2. 主体内容区：左侧主视图 + 右侧辅助视图 */}
        <div style={{ flex: 1, display: 'flex', gap: '3px' }}>
          {/* 左侧：主视图核心内容 */}
          <div style={{ flex: 4, display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {/* 变更前后对比 */}
            <Card
              title={sections.changeComparison?.title || "变更前后对比"}
              size="small"
              style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}
              bodyStyle={{ padding: '2px', flex: 1 }}
            >
              {/* 右上角：关联信息触发按钮组（主视图上的触发点） */}
              <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px', zIndex: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '5px', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    const content = sections.changeBusinessGoals && sections.changeBusinessGoals.type === 'list' ? (
                      <div style={{ maxHeight: '600px', overflow: 'auto', padding: '10px 0' }}>
                        <List
                          size="small"
                          dataSource={sections.changeBusinessGoals.data || []}
                          renderItem={sections.changeBusinessGoals.renderItem}
                          pagination={false}
                          style={{ width: '100%' }}
                        />
                      </div>
                    ) : <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>暂无数据</div>;
                    openDrawer(sections.changeBusinessGoals?.title || "变更关联业务目标", content);
                  }}
                >
                  关联业务目标
                </Button>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    const content = sections.changeTriggerEvents && sections.changeTriggerEvents.type === 'list' ? (
                      <div style={{ maxHeight: '600px', overflow: 'auto', padding: '10px 0' }}>
                        <List
                          size="small"
                          dataSource={sections.changeTriggerEvents.data || []}
                          renderItem={sections.changeTriggerEvents.renderItem}
                          pagination={false}
                          style={{ width: '100%' }}
                        />
                      </div>
                    ) : <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>暂无数据</div>;
                    openDrawer(sections.changeTriggerEvents?.title || "变更触发源事件", content);
                  }}
                >
                  触发源事件
                </Button>
              </div>
              
              {/* 图表容器：自适应占满整个主视图区域 */}
              <div style={{ height: '100%', width: '100%' }}>
                {sections.changeComparison && sections.changeComparison.type === 'chart' && (
                  <div 
                    ref={createChartRef('changeComparison')} 
                    style={{ height: '100%', width: '100%' }}
                  />
                )}
              </div>
            </Card>
            
            {/* 底部分析区：变更进度与变更原因（辅助视图） */}
            <div style={{ height: '200px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
              {/* 变更进度 */}
              <Card
                title={sections.changeProgress?.title || "变更进度"}
                size="small"
                style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '100%' }}
                bodyStyle={{ padding: '8px', flex: 1 }}
              >
                <div style={{ height: '100%', width: '100%' }}>
                  {sections.changeProgress && sections.changeProgress.type === 'chart' && (
                    <div 
                      ref={createChartRef('changeProgress')} 
                      style={{ height: '100%', width: '100%' }}
                    />
                  )}
                </div>
              </Card>
              
              {/* 变更原因分析 */}
              <Card
                title={sections.changeReason?.title || "变更原因分析"}
                size="small"
                style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '100%' }}
                bodyStyle={{ padding: '8px', flex: 1 }}
              >
                <div style={{ height: '100%', width: '100%' }}>
                  {sections.changeReason && sections.changeReason.type === 'chart' && (
                    <div 
                      ref={createChartRef('changeReason')} 
                      style={{ height: '100%', width: '100%' }}
                    />
                  )}
                </div>
              </Card>
            </div>
          </div>
          
          {/* 右侧：变更责任分工（辅助视图） */}
          <Card
            title={sections.changeResponsibility?.title || "变更责任分工"}
            size="small"
            style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ padding: '5px', flex: 1, overflow: 'hidden' }}
          >
            <div style={{ flex: 1, overflow: 'auto' }}>
              <List
                size="small"
                dataSource={sections.changeResponsibility.data || []}
                renderItem={sections.changeResponsibility.renderItem}
                pagination={false}
                style={{ width: '100%' }}
                bodyStyle={{ padding: '0' }}
              />
            </div>
          </Card>
        </div>
      </div>
    );
  };

  // 根据模板类型渲染不同的布局
  const renderByTemplateType = () => {
    switch (templateType) {
      case 'template1':
        return renderTemplate1();
      case 'template2':
        return renderTemplate2();
      case 'template3':
        return renderTemplate3();
      case 'template4':
        return renderTemplate4();
      case 'template5':
        return renderTemplate5();
      case 'template6':
        return renderTemplate6();
      case 'template7':
        return renderTemplate7();
      case 'template8':
        return renderTemplate8();
      case 'template9':
        return renderTemplate9();
      case 'template10':
        return renderTemplate10();
      case 'template11':
        return renderTemplate11();
      case '决策归因':
        return renderTemplate10();
      default:
        return renderTemplate1();
    }
  };

  return (
    <div style={{ height: '100%', backgroundColor: '#f0f2f5', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {renderByTemplateType()}
      
      {/* 侧边抽屉：用于显示隐藏的数据区 */}
      <Drawer
        title={drawerTitle}
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        width={400}
        style={{ padding: '10px' }}
      >
        <div style={{ padding: '10px 0' }}>
          {drawerContent}
        </div>
      </Drawer>
    </div>
  );
};

export default GridTemplate;