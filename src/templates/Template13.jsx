import React from 'react';
import GridTemplate from './GridTemplate';
import { Tag, List } from 'antd';
import { ArrowUpOutlined, WarningOutlined, InfoCircleOutlined, UserOutlined, ClockCircleOutlined, BarChartOutlined, FileTextOutlined, CheckCircleOutlined, AlertOutlined } from '@ant-design/icons';

// 模板13：任务主体 - 事实发生（左侧 - 行动 - 协同操作）
const Template13 = ({ pageTitle, data }) => {
  // 协同关联业务目标数据
  const businessGoals = [
    { goal: '完成功能开发', impact: '高', description: '按计划完成所有功能模块开发', status: '已完成' },
    { goal: '确保系统稳定性', impact: '高', description: '系统可用性达到99.9%', status: '进行中' },
    { goal: '提高开发效率', impact: '中', description: '缩短开发周期20%', status: '进行中' },
    { goal: '提升团队协作', impact: '中', description: '改善跨团队沟通效率', status: '已完成' }
  ];

  // 触发事件数据
  const triggerEvents = [
    { event: '需求变更', time: '2023-10-20 14:30', level: 'medium', status: '已处理' },
    { event: '系统性能问题', time: '2023-10-20 15:00', level: 'high', status: '已处理' },
    { event: '业务需求新增', time: '2023-10-20 16:00', level: 'medium', status: '进行中' }
  ];

  // 执行团队数据
  const executionTeam = [
    { team: '技术团队', leader: '张三', members: 15, status: '在线' },
    { team: '测试团队', leader: '李四', members: 8, status: '在线' },
    { team: '运维团队', leader: '王五', members: 10, status: '在线' },
    { team: '业务团队', leader: '赵六', members: 7, status: '在线' }
  ];

  // 定义模板的sections配置
  const sections = {
    // 1. 摘要栏
    summary: [
      {
        title: '协同任务ID',
        value: 'COOP20231021001',
        valueStyle: { color: '#1890ff', fontSize: '13px' },
        titleStyle: { fontSize: '10px', marginBottom: '1px' }
      },
      {
        title: '任务状态',
        value: '进行中',
        valueStyle: { color: '#faad14', fontSize: '13px' },
        prefix: <ClockCircleOutlined />,
        titleStyle: { fontSize: '10px', marginBottom: '1px' }
      },
      {
        title: '参与团队数',
        value: 4,
        precision: 0,
        valueStyle: { color: '#3f8600', fontSize: '13px' },
        prefix: <ArrowUpOutlined />,
        suffix: '个',
        titleStyle: { fontSize: '10px', marginBottom: '1px' }
      },
      {
        title: '处理进度',
        value: 65,
        precision: 0,
        valueStyle: { color: '#52c41a', fontSize: '13px' },
        prefix: <ArrowUpOutlined />,
        suffix: '%',
        titleStyle: { fontSize: '10px', marginBottom: '1px' }
      }
    ],
    
    // 2. 协同分工矩阵
    changeComparison: {
      title: '协同分工矩阵',
      type: 'chart',
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['技术团队', '测试团队', '运维团队', '业务团队'],
          bottom: 10
        },
        xAxis: {
          type: 'category',
          data: ['需求分析', '设计开发', '测试验证', '部署上线', '运营支持']
        },
        yAxis: {
          type: 'value',
          name: '参与度'
        },
        series: [
          {
            name: '技术团队',
            type: 'bar',
            data: [90, 100, 70, 80, 60]
          },
          {
            name: '测试团队',
            type: 'bar',
            data: [80, 70, 100, 60, 50]
          },
          {
            name: '运维团队',
            type: 'bar',
            data: [60, 50, 80, 100, 70]
          },
          {
            name: '业务团队',
            type: 'bar',
            data: [100, 80, 60, 70, 90]
          }
        ]
      }
    },
    
    // 3. 协同进度甘特图
    changeProgress: {
      title: '协同进度甘特图',
      type: 'chart',
      option: {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['阶段1', '阶段2', '阶段3', '阶段4', '阶段5']
        },
        yAxis: {
          type: 'value',
          name: '进度'
        },
        series: [
          {
            name: '协同进度',
            type: 'bar',
            data: [100, 100, 75, 50, 25],
            itemStyle: {
              color: '#1890ff'
            }
          }
        ]
      }
    },
    
    // 4. 协同成果展示
    changeReason: {
      title: '协同成果展示',
      type: 'chart',
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}%'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          top: 40
        },
        series: [
          {
            name: '成果分布',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 35, name: '功能实现' },
              { value: 25, name: '性能优化' },
              { value: 20, name: 'bug修复' },
              { value: 15, name: '文档完善' },
              { value: 5, name: '其他成果' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    
    // 5. 协同关联业务目标
    changeBusinessGoals: {
      title: '协同关联业务目标',
      type: 'list',
      data: businessGoals,
      renderItem: (goal) => (
        <List.Item
          actions={[
            <Tag color={
              goal.status === '已完成' ? 'green' :
              goal.status === '进行中' ? 'blue' : 'gray'
            } style={{ fontSize: '10px' }}>
              {goal.status}
            </Tag>
          ]}
          style={{ padding: '2px 0', margin: '0' }}
        >
          <List.Item.Meta
            avatar={<Tag color={
              goal.impact === '高' ? 'red' :
              goal.impact === '中' ? 'orange' : 'green'
            } style={{ fontSize: '10px' }}>{goal.impact}</Tag>}
            title={<span style={{ fontSize: '12px' }}>{goal.goal}</span>}
            description={<span style={{ fontSize: '11px' }}>{goal.description}</span>}
          />
        </List.Item>
      )
    },
    
    // 6. 触发事件
    changeTriggerEvents: {
      title: '触发事件',
      type: 'list',
      data: triggerEvents,
      renderItem: (event) => (
        <List.Item
          actions={[
            <Tag color={
              event.status === '已处理' ? 'green' :
              event.status === '进行中' ? 'blue' : 'gray'
            } style={{ fontSize: '10px' }}>
              {event.status}
            </Tag>
          ]}
          style={{ padding: '2px 0', margin: '0' }}
        >
          <List.Item.Meta
            avatar={<Tag color={
              event.level === 'high' ? 'red' :
              event.level === 'medium' ? 'orange' : 'green'
            } style={{ fontSize: '10px' }}>{event.level}</Tag>}
            title={<span style={{ fontSize: '12px' }}>{event.event}</span>}
            description={<span style={{ fontSize: '11px' }}>{event.time}</span>}
          />
        </List.Item>
      )
    },
    
    // 7. 执行团队
    changeResponsibility: {
      title: '执行团队',
      type: 'list',
      data: executionTeam,
      renderItem: (team) => (
        <List.Item style={{ padding: '2px 0', margin: '0' }}>
          <List.Item.Meta
            avatar={<UserOutlined style={{ fontSize: '14px' }} />}
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px' }}>{team.team}</span>
                <Tag color={team.status === '在线' ? 'green' : 'red'} style={{ fontSize: '9px' }}>
                  {team.status}
                </Tag>
              </div>
            }
            description={
              <>
                <div style={{ fontSize: '11px' }}>负责人: {team.leader}</div>
                <div style={{ fontSize: '11px' }}>团队规模: {team.members}人</div>
              </>
            }
          />
        </List.Item>
      )
    }
  };

  return <GridTemplate pageTitle={pageTitle} sections={sections} data={data} templateType="template11" />;
};

export default Template13;