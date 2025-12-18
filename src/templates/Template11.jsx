import React from 'react';
import GridTemplate from './GridTemplate';
import { Tag, List } from 'antd';
import { ArrowUpOutlined, WarningOutlined, InfoCircleOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

// 模板11：任务主体 - 事实发生（左侧 - 行动 - 变更操作）
const Template11 = ({ pageTitle, data }) => {
  // 变更关联业务目标数据
  const changeBusinessGoals = [
    { goal: '提升系统性能', impact: '高', description: '响应时间降低28.6%', status: '已达成' },
    { goal: '提高系统吞吐量', impact: '高', description: '吞吐量提升40%', status: '已达成' },
    { goal: '降低错误率', impact: '中', description: '错误率降低52%', status: '已达成' },
    { goal: '优化资源利用率', impact: '中', description: '资源利用率降低11.8%', status: '已达成' },
    { goal: '提高用户满意度', impact: '高', description: '用户满意度提升8.2%', status: '已达成' }
  ];

  // 变更触发源事件数据
  const changeTriggerEvents = [
    { event: '系统性能告警', time: '2023-10-20 14:30', level: 'high', status: '已处理' },
    { event: '用户反馈响应慢', time: '2023-10-20 15:00', level: 'medium', status: '已处理' },
    { event: '吞吐量达到瓶颈', time: '2023-10-20 16:00', level: 'high', status: '已处理' }
  ];

  // 变更责任分工数据
  const changeResponsibility = [
    { team: '技术团队', responsibility: '变更实施', members: ['张三', '李四', '王五'], status: '已完成' },
    { team: '测试团队', responsibility: '变更测试', members: ['赵六', '孙七'], status: '已完成' },
    { team: '运维团队', responsibility: '变更监控', members: ['周八', '吴九'], status: '进行中' },
    { team: '业务团队', responsibility: '变更验证', members: ['郑十'], status: '待开始' }
  ];

  // 定义模板的sections配置
  const sections = {
    // 1. 摘要栏
    summary: [
      {
        title: '变更ID',
        value: 'CHG20231021001',
        valueStyle: { color: '#1890ff', fontSize: '13px' },
        titleStyle: { fontSize: '10px', marginBottom: '1px' }
      },
      {
        title: '变更状态',
        value: '进行中',
        valueStyle: { color: '#faad14', fontSize: '13px' },
        prefix: <ClockCircleOutlined />,
        titleStyle: { fontSize: '10px', marginBottom: '1px' }
      },
      {
        title: '变更进度',
        value: 75,
        precision: 0,
        valueStyle: { color: '#52c41a', fontSize: '13px' },
        prefix: <ArrowUpOutlined />,
        suffix: '%',
        titleStyle: { fontSize: '10px', marginBottom: '1px' }
      },
      {
        title: '影响范围',
        value: '全局',
        valueStyle: { color: '#f5222d', fontSize: '13px' },
        prefix: <WarningOutlined />,
        titleStyle: { fontSize: '10px', marginBottom: '1px' }
      }
    ],
    
    // 2. 变更前后对比
    changeComparison: {
      title: '变更前后对比',
      type: 'chart',
      option: {

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['变更前', '变更后'],
          bottom: 5,
          textStyle: { fontSize: 10 }
        },
        grid: {
          left: '3%',
          right: '3%',
          top: '20%',
          bottom: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['响应时间', '吞吐量', '错误率', '资源利用率', '用户满意度'],
          axisLabel: { fontSize: 10, rotate: 30 }
        },
        yAxis: {
          type: 'value',
          axisLabel: { fontSize: 10 }
        },
        series: [
          {
            name: '变更前',
            type: 'bar',
            data: [350, 5000, 2.5, 85, 85]
          },
          {
            name: '变更后',
            type: 'bar',
            data: [250, 7000, 1.2, 75, 92]
          }
        ]
      }
    },
    
    // 3. 变更进度
    changeProgress: {
      title: '变更进度',
      type: 'chart',
      option: {

        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}%'
        },
        series: [
          {
            name: '变更进度',
            type: 'gauge',
            detail: {
              formatter: '{value}%',
              fontSize: 12
            },
            radius: '80%',
            center: ['50%', '60%'],
            data: [{ value: 75, name: '进度' }],
            axisLine: {
              lineStyle: {
                color: [
                  [0.6, '#52c41a'],
                  [0.8, '#faad14'],
                  [1, '#f5222d']
                ]
              }
            }
          }
        ]
      }
    },
    
    // 4. 变更原因分析
    changeReason: {
      title: '变更原因分析',
      type: 'chart',
      option: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 5,
          top: '20%',
          textStyle: { fontSize: 10 }
        },
        grid: {
          left: '3%',
          right: '3%',
          top: '10%',
          bottom: '5%',
          containLabel: true
        },
        series: [
          {
            name: '变更原因',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['70%', '55%'],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 40, name: '性能优化' },
              { value: 25, name: '功能升级' },
              { value: 20, name: 'bug修复' },
              { value: 15, name: '安全加固' }
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
    
    // 5. 变更关联业务目标
    changeBusinessGoals: {
      title: '变更关联业务目标',
      type: 'list',
      data: changeBusinessGoals,
      renderItem: (goal) => (
        <List.Item
          actions={[
            <Tag color={
              goal.status === '已达成' ? 'green' :
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
    
    // 6. 变更触发源事件
    changeTriggerEvents: {
      title: '变更触发源事件',
      type: 'list',
      data: changeTriggerEvents,
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
    
    // 7. 变更责任分工
    changeResponsibility: {
      title: '变更责任分工',
      type: 'list',
      data: changeResponsibility,
      renderItem: (responsibility) => (
        <List.Item style={{ padding: '2px 0', margin: '0' }}>
          <List.Item.Meta
            avatar={<UserOutlined style={{ fontSize: '14px' }} />}
            title={<span style={{ fontSize: '12px' }}>{responsibility.team}</span>}
            description={
              <>
                <div style={{ fontSize: '11px' }}>{responsibility.responsibility}</div>
                <div style={{ fontSize: '11px', color: '#8c8c8c', marginTop: '2px' }}>
                  成员: {responsibility.members.slice(0, 2).join(', ')}
                </div>
                <div style={{ fontSize: '11px', color: '#8c8c8c', marginTop: '2px' }}>
                  状态: <Tag color={
                    responsibility.status === '已完成' ? 'green' :
                    responsibility.status === '进行中' ? 'blue' : 'gray'
                  } style={{ fontSize: '9px' }}>{responsibility.status}</Tag>
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

export default Template11;