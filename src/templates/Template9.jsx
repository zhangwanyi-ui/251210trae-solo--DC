import React from 'react';
import GridTemplate from './GridTemplate';
import { Tag, List } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

// 模板9：业务主体 - 决策归因(左侧-感知-归因分析报告）
const Template9 = ({ pageTitle, data }) => {
  // 关联事件主体数据
  const relatedEvents = [
    { id: 1, name: '系统性能异常', time: '2023-10-21 14:30', status: '已处理', impact: '高' },
    { id: 2, name: '用户量骤降', time: '2023-10-20 10:15', status: '已处理', impact: '中' },
    { id: 3, name: '市场活动效果不佳', time: '2023-10-19 09:00', status: '处理中', impact: '中' }
  ];

  // 关联责任主体数据
  const relatedResponsibilities = [
    { team: '技术团队', responsibility: '系统性能优化', status: '进行中', progress: 75 },
    { team: '运营团队', responsibility: '用户运营策略', status: '待开始', progress: 0 },
    { team: '市场团队', responsibility: '市场活动调整', status: '进行中', progress: 50 }
  ];

  // 关联任务主体数据
  const relatedTasks = [
    { id: 1, name: '性能优化', assignee: '技术团队', status: '进行中', deadline: '2023-10-25' },
    { id: 2, name: '用户体验改进', assignee: '产品团队', status: '待开始', deadline: '2023-10-30' },
    { id: 3, name: '市场策略调整', assignee: '市场团队', status: '进行中', deadline: '2023-10-28' }
  ];

  // 定义模板的sections配置
  const sections = {
    // 1. 摘要栏
    summary: [
      {
        title: '主要影响因素',
        value: 5,
        prefix: <ArrowUpOutlined />,
        suffix: '个',
        color: '#3f8600'
      },
      {
        title: '高影响因素',
        value: 2,
        prefix: <ArrowUpOutlined />,
        suffix: '个',
        color: '#1890ff'
      },
      {
        title: '中影响因素',
        value: 2,
        prefix: <ArrowUpOutlined />,
        suffix: '个',
        color: '#faad14'
      },
      {
        title: '低影响因素',
        value: 1,
        prefix: <ArrowDownOutlined />,
        suffix: '个',
        color: '#cf1322'
      }
    ],
    
    // 2. 归因拆解分析
    attributionAnalysis: {
      title: '归因拆解分析',
      type: 'chart',
      row: 2,
      col: 1,
      rowSpan: 2,
      colSpan: 1,
      option: {
        title: {
          text: '归因拆解分析',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 5,
          top: 30,
          textStyle: { fontSize: 10 }
        },
        series: [
          {
            name: '归因分布',
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
              { value: 40, name: '系统性能' },
              { value: 25, name: '用户行为' },
              { value: 20, name: '市场环境' },
              { value: 10, name: '竞争对手' },
              { value: 5, name: '其他因素' }
            ],
            itemStyle: {
              borderRadius: 8,
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        ]
      }
    },
    
    // 3. 归因验证
    attributionValidation: {
      title: '归因验证',
      type: 'chart',
      row: 2,
      col: 2,
      rowSpan: 1,
      colSpan: 1,
      option: {
        title: {
          text: '归因验证结果',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['系统性能', '用户行为', '市场环境', '竞争对手', '其他因素'],
          axisLabel: { fontSize: 10, rotate: 30 }
        },
        yAxis: {
          type: 'value',
          name: '验证得分',
          axisLabel: {
            formatter: '{value}%',
            fontSize: 10
          }
        },
        series: [
          {
            name: '验证得分',
            type: 'bar',
            data: [95, 88, 82, 75, 65],
            itemStyle: {
              color: function(params) {
                const colors = ['#52c41a', '#1890ff', '#faad14', '#fadb14', '#fa8c16'];
                return colors[params.dataIndex];
              }
            }
          }
        ]
      }
    },
    
    // 4. 决策建议优先级
    suggestionPriority: {
      title: '决策建议优先级',
      type: 'chart',
      row: 3,
      col: 2,
      rowSpan: 1,
      colSpan: 1,
      option: {
        title: {
          text: '决策建议优先级',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}'
        },
        xAxis: {
          type: 'category',
          data: ['性能优化', '用户体验改进', '市场策略调整', '竞争应对', '其他建议'],
          axisLabel: { fontSize: 10, rotate: 30 }
        },
        yAxis: {
          type: 'value',
          name: '优先级得分',
          axisLabel: { fontSize: 10 }
        },
        series: [
          {
            name: '优先级',
            type: 'bar',
            data: [95, 88, 82, 75, 65],
            itemStyle: {
              color: '#1890ff'
            }
          }
        ]
      }
    },
    
    // 5. 关联事件主体
    relatedEvents: {
      title: '关联事件主体',
      type: 'list',
      row: 4,
      col: 1,
      rowSpan: 1,
      colSpan: 1,
      data: relatedEvents,
      pagination: {
        pageSize: 3,
        showSizeChanger: false,
        showTotal: (total) => `共 ${total} 条`,
        style: { fontSize: '10px' }
      },
      renderItem: (event) => (
        <List.Item
          actions={[
            <Tag color={
              event.status === '已处理' ? 'green' : 'blue'
            } style={{ fontSize: '10px' }}>
              {event.status}
            </Tag>
          ]}
          style={{ padding: '2px 0', margin: '0' }}
        >
          <List.Item.Meta
            avatar={<Tag color={
              event.impact === '高' ? 'red' :
              event.impact === '中' ? 'orange' : 'green'
            } style={{ fontSize: '10px' }}>{event.impact}</Tag>}
            title={<span style={{ fontSize: '12px' }}>{event.name}</span>}
            description={<span style={{ fontSize: '11px' }}>{event.time}</span>}
          />
        </List.Item>
      )
    },
    
    // 6. 关联责任主体
    relatedResponsibilities: {
      title: '关联责任主体',
      type: 'list',
      row: 4,
      col: 2,
      rowSpan: 1,
      colSpan: 1,
      data: relatedResponsibilities,
      pagination: {
        pageSize: 3,
        showSizeChanger: false,
        showTotal: (total) => `共 ${total} 条`,
        style: { fontSize: '10px' }
      },
      renderItem: (responsibility) => (
        <List.Item style={{ padding: '2px 0', margin: '0' }}>
          <List.Item.Meta
            avatar={<UserOutlined style={{ fontSize: '14px' }} />}
            title={<span style={{ fontSize: '12px' }}>{responsibility.team}</span>}
            description={
              <>
                <div style={{ fontSize: '11px' }}>{responsibility.responsibility}</div>
                <div style={{ fontSize: '11px', color: '#8c8c8c', marginTop: '2px' }}>
                  状态: <Tag color={
                    responsibility.status === '进行中' ? 'blue' :
                    responsibility.status === '待开始' ? 'gray' : 'green'
                  } style={{ fontSize: '9px' }}>{responsibility.status}</Tag>
                  <span style={{ marginLeft: '6px' }}>进度: {responsibility.progress}%</span>
                </div>
              </>
            }
          />
        </List.Item>
      )
    },
    
    // 7. 关联任务主体
    relatedTasks: {
      title: '关联任务主体',
      type: 'list',
      row: 5,
      col: 1,
      rowSpan: 1,
      colSpan: 2,
      data: relatedTasks,
      pagination: {
        pageSize: 3,
        showSizeChanger: false,
        showTotal: (total) => `共 ${total} 条`,
        style: { fontSize: '10px' }
      },
      renderItem: (task) => (
        <List.Item style={{ padding: '2px 0', margin: '0' }}>
          <List.Item.Meta
            avatar={<ClockCircleOutlined style={{ fontSize: '14px' }} />}
            title={<span style={{ fontSize: '12px' }}>{task.name}</span>}
            description={
              <>
                <div style={{ fontSize: '11px' }}>负责人: {task.assignee}</div>
                <div style={{ fontSize: '11px', color: '#8c8c8c', marginTop: '2px' }}>
                  状态: <Tag color={
                    task.status === '进行中' ? 'blue' :
                    task.status === '待开始' ? 'gray' : 'green'
                  } style={{ fontSize: '9px' }}>{task.status}</Tag>
                  <span style={{ marginLeft: '6px' }}>截止: {task.deadline}</span>
                </div>
              </>
            }
          />
        </List.Item>
      )
    }
  };

  return <GridTemplate pageTitle={pageTitle} sections={sections} data={data} templateType="template9" />;
};

export default Template9;