import React, { useState } from 'react';
import { Card, Row, Col, Select, Button, Divider } from 'antd';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';
import Template4 from '../templates/Template4';
import Template5 from '../templates/Template5';
import Template6 from '../templates/Template6';
import Template7 from '../templates/Template7';
import Template8 from '../templates/Template8';
import Template9 from '../templates/Template9';
import Template10 from '../templates/Template10';
import Template11 from '../templates/Template11';
import Template12 from '../templates/Template12';
import Template13 from '../templates/Template13';
import Template14 from '../templates/Template14';
import Template15 from '../templates/Template15';
import Template16 from '../templates/Template16';
import Template17 from '../templates/Template17';
import Template18 from '../templates/Template18';
import Template19 from '../templates/Template19';
import Template20 from '../templates/Template20';

const { Option } = Select;

const TemplatePreview = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('1');
  const [showAll, setShowAll] = useState(false);

  // 模板列表
  const templates = [
    { id: '1', name: '模板1：业务主体 - 事实发生（左侧 - 全景俯瞰 - 一级页）', component: <Template1 pageTitle="运营全景" data={{}} /> },
    { id: '2', name: '模板2：业务主体 - 事实发生（左侧 - 一级页）', component: <Template2 pageTitle="在线业务" data={{}} /> },
    { id: '3', name: '模板3：业务主体 - 事实发生（左侧 - 观察-实时动态）', component: <Template3 pageTitle="访客 - 实时动态" data={{}} /> },
    { id: '4', name: '模板4：业务主体 - 事实发生（左侧 - 观察-近期发生）', component: <Template4 pageTitle="访客 - 近期发生" data={{}} /> },
    { id: '5', name: '模板5：业务主体 - 事实发生（左侧 - 观察-历史回顾）', component: <Template5 pageTitle="访客 - 历史回顾" data={{}} /> },
    { id: '6', name: '模板6：业务主体 - 深度分析(左侧-感知-变化分析报告）', component: <Template6 pageTitle="访客 - 变化分析报告" data={{}} /> },
    { id: '7', name: '模板7：业务主体 - 深度分析(左侧-感知-对比分析报告）', component: <Template7 pageTitle="访客 - 对比分析报告" data={{}} /> },
    { id: '8', name: '模板8：业务主体 - 深度分析(左侧-感知-分布特征分析报告）', component: <Template8 pageTitle="访客 - 分布特征分析报告" data={{}} /> },
    { id: '9', name: '模板9：业务主体 - 决策归因(左侧-感知-归因分析报告）', component: <Template9 pageTitle="访客 - 归因分析报告" data={{}} /> },
    { id: '10', name: '模板10：业务主体 - 决策归因(左侧-感知相关性分析报告）', component: <Template10 pageTitle="访客 - 相关性分析报告" data={{}} /> },
    { id: '11', name: '模板11：任务主体 - 事实发生（左侧 - 行动 - 变更操作）', component: <Template11 pageTitle="访客 - 处理任务变更操作" data={{}} /> },
    { id: '12', name: '模板12：任务主体 - 事实发生（左侧 - 行动 - 响应操作）', component: <Template12 pageTitle="访客 - 响应操作" data={{}} /> },
    { id: '13', name: '模板13：任务主体 - 事实发生（左侧 - 行动 - 协同操作）', component: <Template13 pageTitle="访客 - 参与协同操作" data={{}} /> },
    { id: '14', name: '模板14：任务主体 - 事实发生（顶部 - 任务）', component: <Template14 pageTitle="应急响应任务" data={{}} /> },
    { id: '15', name: '模板15：事件主体 - 事实发生（顶部 - 报警）', component: <Template15 pageTitle="报警状态" data={{}} /> },
    { id: '16', name: '模板16：事件主体 - 事实发生（顶部 - 事件）', component: <Template16 pageTitle="业务运行事件" data={{}} /> },
    { id: '17', name: '模板17：责任主体 - 事实发生（顶部 - 在线）', component: <Template17 pageTitle="岗位责任情况报告" data={{}} /> },
    { id: '18', name: '模板18：顶部 - 个人中心 - 注册信息', component: <Template18 pageTitle="注册信息" data={{}} /> },
    { id: '19', name: '模板19：顶部 - 个人中心 - 个性化设置', component: <Template19 pageTitle="个性化设置" data={{}} /> },
    { id: '20', name: '模板20：顶部 - 个人中心 - 我的内容', component: <Template20 pageTitle="我的内容" data={{}} /> },
  ];

  // 获取当前选中的模板
  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  return (
    <div style={{ height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
      <div style={{ flexShrink: 0 }}>
        <h1 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>模板预览页面</h1>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>您可以在这里预览所有20个模板，选择不同的模板查看效果。</p>
      </div>

      <Divider style={{ margin: '8px 0' }} />

      {/* 模板选择器 */}
      <div style={{ flexShrink: 0, marginBottom: '8px' }}>
        <Select
          style={{ width: 500, marginRight: '12px' }}
          placeholder="选择要预览的模板"
          value={selectedTemplate}
          onChange={setSelectedTemplate}
          size="middle"
        >
          {templates.map(template => (
            <Option key={template.id} value={template.id}>
              {template.name}
            </Option>
          ))}
        </Select>
        <Button size="middle" type={showAll ? 'primary' : 'default'} onClick={() => setShowAll(!showAll)}>
          {showAll ? '单模板视图' : '全模板视图'}
        </Button>
      </div>

      {/* 单模板视图 */}
        {!showAll && (
          <div style={{ flex: 1, border: '1px solid #f0f0f0', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 12px', background: '#fafafa', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{currentTemplate.name}</h3>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
              {currentTemplate.component}
            </div>
          </div>
        )}

      {/* 全模板视图 */}
      {showAll && (
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Row gutter={12}>
            {templates.map(template => (
              <Col span={24} key={template.id} style={{ marginBottom: '12px' }}>
                <div style={{ border: '1px solid #f0f0f0', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '400px' }}>
                  <div style={{ padding: '8px 12px', background: '#fafafa', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{template.name}</h3>
                  </div>
                  <div style={{ flex: 1, overflow: 'auto' }}>
                    {template.component}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default TemplatePreview;