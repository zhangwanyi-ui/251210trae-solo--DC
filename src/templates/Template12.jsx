import React from 'react';
import GridTemplate from './GridTemplate';
import { Tag, List } from 'antd';
import { ArrowUpOutlined, WarningOutlined, InfoCircleOutlined, UserOutlined, ClockCircleOutlined, BarChartOutlined, FileTextOutlined, CheckCircleOutlined, AlertOutlined } from '@ant-design/icons';

// 模板12：任务主体 - 事实发生（左侧 - 行动 - 响应操作）
const Template12 = ({ pageTitle, data }) => {
  // 响应关联业务指标数据
  const responseBusinessIndicators = [
    { indicator: '业务量', before: 10000, after: 12000, change: '+20%', status: 'positive' },
    { indicator: '转化率', before: 4.5, after: 4.8, change: '+6.7%', status: 'positive' },
    { indicator: '响应时间', before: 350, after: 250, change: '-28.6%', status: 'positive' },
    { indicator: '错误率', before: 2.5, after: 1.2, change: '-52%', status: 'positive' },
    { indicator: '用户满意度', before: 85, after: 92, change: '+8.2%', status: 'positive' }
  ];

  // 处置团队数据
  const responseTeam = [
    { role: '负责人', name: '张三', contact: '13800138000', status: '在线' },
    { role: '技术专家', name: '李四', contact: '13900139000', status: '在线' },
    { role: '运维工程师', name: '王五', contact: '13700137000', status: '在线' },
    { role: '业务代表', name: '赵六', contact: '13600136000', status: '在线' }
  ];

  // 报警处置任务数据
  const responseTasks = [
    { id: 'TASK20231021001', name: '问题诊断', assignee: '李四', status: '已完成', progress: 100 },
    { id: 'TASK20231021002', name: '方案制定', assignee: '张三', status: '已完成', progress: 100 },
    { id: 'TASK20231021003', name: '方案实施', assignee: '王五', status: '进行中', progress: 75 },
    { id: 'TASK20231021004', name: '效果验证', assignee: '赵六', status: '待开始', progress: 0 },
    { id: 'TASK20231021005', name: '事件闭环', assignee: '张三', status: '待开始', progress: 0 }
  ];

  // 定义模板的sections配置
  const sections = {
    // 1. 摘要栏
    summary: [
      {
        title: '事件ID',
        value: 'EVENT20231021001',
        valueStyle: { color: '#1890ff', fontSize: '13px' },
        titleStyle: { fontSize: '10px', marginBottom: '1px' }
      },
      {
        title: '事件状态',
        value: '处理中',
        valueStyle: { color: '#faad14', fontSize: '13px' },
        prefix: <ClockCircleOutlined />,
        titleStyle: { fontSize: '10px', marginBottom: '1px' }
      },
      {
        title: '影响范围',
        value: '全局',
        valueStyle: { color: '#f5222d', fontSize: '13px' },
        prefix: <WarningOutlined />,
        titleStyle: { fontSize: '10px', marginBottom: '1px' }
      },
      {
        title: '处理进度',
        value: 45,
        precision: 0,
        valueStyle: { color: '#52c41a', fontSize: '13px' },
        prefix: <ArrowUpOutlined />,
        suffix: '%',
        titleStyle: { fontSize: '10px', marginBottom: '1px' }
      }
    ],
    
    // 2. 响应步骤流程
    changeComparison: {
      title: '响应步骤流程',
      type: 'chart',
      option: {
        tooltip: {},
        series: [
          {
            type: 'sankey',
            layout: 'none',
            emphasis: {
              focus: 'adjacency'
            },
            data: [
              { name: '事件触发' },
              { name: '响应启动' },
              { name: '问题诊断' },
              { name: '解决方案制定' },
              { name: '方案实施' },
              { name: '效果验证' },
              { name: '事件闭环' }
            ],
            links: [
              { source: '事件触发', target: '响应启动', value: 1 },
              { source: '响应启动', target: '问题诊断', value: 1 },
              { source: '问题诊断', target: '解决方案制定', value: 1 },
              { source: '解决方案制定', target: '方案实施', value: 1 },
              { source: '方案实施', target: '效果验证', value: 1 },
              { source: '效果验证', target: '事件闭环', value: 1 }
            ],
            lineStyle: {
              color: 'gradient',
              curveness: 0.5
            }
          }
        ]
      }
    },
    
    // 3. 各步骤进度
    changeProgress: {
      title: '各步骤进度',
      type: 'chart',
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['响应启动', '问题诊断', '解决方案制定', '方案实施', '效果验证', '事件闭环']
        },
        yAxis: {
          type: 'value',
          name: '进度',
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [
          {
            name: '进度',
            type: 'bar',
            data: [100, 100, 100, 75, 0, 0],
            itemStyle: {
              color: function(params) {
                if (params.value === 100) return '#52c41a';
                if (params.value > 0) return '#1890ff';
                return '#8c8c8c';
              }
            }
          }
        ]
      }
    },
    
    // 4. 响应效果监控
    changeReason: {
      title: '响应效果监控',
      type: 'chart',
      option: {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}%'
        },
        xAxis: {
          type: 'category',
          data: ['响应时间', '错误率', '用户满意度', '系统可用性', '资源利用率']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [
          {
            name: '效果改进',
            type: 'bar',
            data: [35, 60, 20, 15, 25],
            itemStyle: {
              color: '#52c41a'
            }
          }
        ]
      }
    },
    
    // 5. 响应关联业务指标
    changeBusinessGoals: {
      title: '响应关联业务指标',
      type: 'list',
      data: responseBusinessIndicators,
      renderItem: (indicator) => (
        <List.Item
          actions={[
            <Tag color={indicator.status === 'positive' ? 'green' : 'red'} style={{ fontSize: '10px' }}>
              {indicator.change}
            </Tag>
          ]}
          style={{ padding: '2px 0', margin: '0' }}
        >
          <List.Item.Meta
            avatar={<BarChartOutlined style={{ fontSize: '14px' }} />}
            title={<span style={{ fontSize: '12px' }}>{indicator.indicator}</span>}
            description={
              <>
                <div style={{ fontSize: '11px' }}>响应前: {indicator.before}</div>
                <div style={{ fontSize: '11px' }}>响应后: {indicator.after}</div>
              </>
            }
          />
        </List.Item>
      )
    },
    
    // 6. 处置团队
    changeTriggerEvents: {
      title: '处置团队',
      type: 'list',
      data: responseTeam,
      renderItem: (member) => (
        <List.Item style={{ padding: '2px 0', margin: '0' }}>
          <List.Item.Meta
            avatar={<UserOutlined style={{ fontSize: '14px' }} />}
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px' }}>{member.name}</span>
                <Tag color={member.status === '在线' ? 'green' : 'red'} style={{ fontSize: '9px' }}>
                  {member.status}
                </Tag>
              </div>
            }
            description={
              <>
                <div style={{ fontSize: '11px' }}>角色: {member.role}</div>
                <div style={{ fontSize: '11px', color: '#8c8c8c', marginTop: '2px' }}>
                  联系方式: {member.contact.slice(0, 6)}****
                </div>
              </>
            }
          />
        </List.Item>
      )
    },
    
    // 7. 报警处置任务
    changeResponsibility: {
      title: '报警处置任务',
      type: 'list',
      data: responseTasks,
      renderItem: (task) => (
        <List.Item style={{ padding: '2px 0', margin: '0' }}>
          <List.Item.Meta
            avatar={<ClockCircleOutlined style={{ fontSize: '14px' }} />}
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px' }}>{task.name}</span>
                <Tag color={
                  task.status === '已完成' ? 'green' :
                  task.status === '进行中' ? 'blue' : 'gray'
                } style={{ fontSize: '9px' }}>
                  {task.status}
                </Tag>
              </div>
            }
            description={
              <>
                <div style={{ fontSize: '11px' }}>任务ID: {task.id.slice(-6)}</div>
                <div style={{ fontSize: '11px' }}>负责人: {task.assignee}</div>
                <div style={{ marginTop: '2px', fontSize: '11px' }}>
                  进度: {task.progress}%
                </div>
              </>
            }
          />
        </List.Item>
      )
    }
  };

  return <GridTemplate pageTitle={pageTitle} sections={sections} data={data} templateType="template11" />;
};

export default Template12;