import React from 'react';
import GridTemplate from './GridTemplate';
import { Tag, List } from 'antd';
import { ArrowUpOutlined, InfoCircleOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

// 模板10：业务主体 - 决策归因(左侧-感知相关性分析报告）
const Template10 = ({ pageTitle, data }) => {
  // 事件摘要区数据
  const eventSummary = [
    { id: 1, title: '相关性分析报告生成', time: '2023-10-21 14:30', status: '已完成' },
    { id: 2, title: '基于相关性的决策建议提出', time: '2023-10-21 15:00', status: '已完成' },
    { id: 3, title: '相关性应用方案制定', time: '2023-10-21 16:00', status: '进行中' },
    { id: 4, title: '相关性监控系统部署', time: '2023-10-22 10:00', status: '待开始' }
  ];

  // 责任 / 在线状态区数据
  const responsibilityStatus = [
    { team: '技术团队', responsibleFor: '相关性监控系统', status: '在线', members: 15, available: 12 },
    { team: '数据团队', responsibleFor: '相关性分析报告', status: '在线', members: 8, available: 6 },
    { team: '运营团队', responsibleFor: '相关性应用方案', status: '部分在线', members: 10, available: 7 },
    { team: '产品团队', responsibleFor: '基于相关性的产品改进', status: '在线', members: 7, available: 5 }
  ];

  // 定义模板的sections配置
  const sections = {
    // 1. 摘要栏
    summary: [
      {
        title: '强相关关系数',
        value: 5,
        prefix: <ArrowUpOutlined />,
        suffix: '个',
        color: '#3f8600'
      },
      {
        title: '平均相关系数',
        value: 0.63,
        precision: 2,
        prefix: <ArrowUpOutlined />,
        color: '#1890ff'
      },
      {
        title: '应用建议数',
        value: 5,
        prefix: <InfoCircleOutlined />,
        suffix: '条',
        color: '#faad14'
      },
      {
        title: '最大相关系数',
        value: 0.90,
        precision: 2,
        prefix: <ArrowUpOutlined />,
        color: '#52c41a'
      }
    ],
    
    // 2. 相关性分析
    correlationAnalysis: {
      title: '相关性分析',
      type: 'chart',
      row: 2,
      col: 1,
      rowSpan: 2,
      colSpan: 1,
      option: {
        title: {
          text: '相关性分析',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['相关性系数'],
          bottom: 5,
          textStyle: { fontSize: 10 }
        },
        xAxis: {
          type: 'category',
          data: ['业务量与响应时间', '用户量与转化率', '流量与服务器负载', '营销投入与用户增长', '用户满意度与留存率'],
          axisLabel: { fontSize: 10, rotate: 30 }
        },
        yAxis: {
          type: 'value',
          name: '相关性系数',
          axisLabel: {
            formatter: '{value}',
            fontSize: 10
          }
        },
        series: [
          {
            name: '相关性系数',
            type: 'bar',
            data: [-0.85, 0.72, 0.90, 0.88, 0.75],
            itemStyle: {
              color: function(params) {
                return params.value > 0 ? '#52c41a' : '#f5222d';
              }
            }
          }
        ]
      }
    },
    
    // 3. 相关性应用效果
    applicationEffect: {
      title: '相关性应用效果',
      type: 'chart',
      row: 2,
      col: 2,
      rowSpan: 1,
      colSpan: 1,
      option: {
        title: {
          text: '相关性应用效果',
          left: 'center',
          textStyle: { fontSize: 14 }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}%'
        },
        xAxis: {
          type: 'category',
          data: ['性能优化', '转化率提升', '资源调度', '营销优化', '用户体验改进'],
          axisLabel: { fontSize: 10, rotate: 30 }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}%',
            fontSize: 10
          }
        },
        series: [
          {
            name: '应用效果',
            type: 'line',
            data: [35, 28, 32, 30, 25],
            smooth: true,
            lineStyle: {
              color: '#1890ff',
              width: 3
            },
            areaStyle: {
              color: 'rgba(24, 144, 255, 0.3)'
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
          data: ['基于相关性的资源调度', '优化用户转化路径', '调整营销投入策略', '改进用户体验', '性能优化建议'],
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
            data: [95, 90, 85, 80, 75],
            itemStyle: {
              color: '#faad14'
            }
          }
        ]
      }
    },
    
    // 5. 事件摘要区
    eventSummary: {
      title: '事件摘要区',
      type: 'list',
      row: 4,
      col: 1,
      rowSpan: 1,
      colSpan: 1,
      data: eventSummary.slice(0, 4),
      renderItem: (event) => (
        <List.Item
          actions={[
            <Tag color={
              event.status === '已完成' ? 'green' :
              event.status === '进行中' ? 'blue' : 'gray'
            } style={{ fontSize: '10px' }}>
              {event.status}
            </Tag>
          ]}
          style={{ padding: '2px 0', margin: '0' }}
        >
          <List.Item.Meta
            avatar={<ClockCircleOutlined style={{ fontSize: '14px' }} />}
            title={<span style={{ fontSize: '12px' }}>{event.title}</span>}
            description={<span style={{ fontSize: '11px' }}>{event.time}</span>}
          />
        </List.Item>
      )
    },
    
    // 6. 责任与在线状态
    responsibilityStatus: {
      title: '责任与在线状态',
      type: 'list',
      row: 4,
      col: 2,
      rowSpan: 1,
      colSpan: 1,
      data: responsibilityStatus.slice(0, 4),
      renderItem: (item) => (
        <List.Item style={{ padding: '2px 0', margin: '0' }}>
          <List.Item.Meta
            avatar={<UserOutlined style={{ fontSize: '14px' }} />}
            title={<span style={{ fontSize: '12px' }}>{item.team}</span>}
            description={
              <>
                <div style={{ fontSize: '11px' }}>负责范围: {item.responsibleFor}</div>
                <div style={{ fontSize: '11px', color: '#8c8c8c', marginTop: '2px' }}>
                  状态: <Tag color={
                    item.status === '在线' ? 'green' :
                    item.status === '部分在线' ? 'orange' : 'red'
                  } style={{ fontSize: '9px' }}>{item.status}</Tag>
                  <span style={{ marginLeft: '6px' }}>团队: {item.members}人</span>
                  <span style={{ marginLeft: '6px' }}>在线: {item.available}人</span>
                </div>
              </>
            }
          />
        </List.Item>
      )
    }
  };

  return <GridTemplate pageTitle={pageTitle} sections={sections} data={data} templateType="template10" />;
};

export default Template10;