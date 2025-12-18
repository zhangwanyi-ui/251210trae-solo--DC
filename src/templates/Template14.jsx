import React, { useRef, useEffect } from 'react';
import { Card, Statistic, List, Tag, Button } from 'antd';
import * as echarts from 'echarts';
import {
  UserOutlined,
  BarChartOutlined, AlertOutlined
} from '@ant-design/icons';

// 模板14：任务主体 - 事实发生（顶部 - 任务）
const Template14 = ({ pageTitle, data }) => {
  // 图表引用
  const chartRefs = {
    taskGantt: useRef(null),
    teamCollaboration: useRef(null)
  };

  // 模拟任务数据
  const tasks = [
    { id: 1, name: '性能优化', status: '执行中', team: '技术团队', priority: '高', startTime: '2023-10-01', endTime: '2023-10-15', progress: 75 },
    { id: 2, name: '用户体验改进', status: '待开始', team: '业务团队', priority: '中', startTime: '2023-10-16', endTime: '2023-10-30', progress: 0 },
    { id: 3, name: '安全加固', status: '已完成', team: '运维团队', priority: '高', startTime: '2023-09-15', endTime: '2023-09-30', progress: 100 },
    { id: 4, name: '功能测试', status: '执行中', team: '测试团队', priority: '中', startTime: '2023-10-05', endTime: '2023-10-20', progress: 50 },
    { id: 5, name: '文档更新', status: '待分配', team: '', priority: '低', startTime: '2023-10-21', endTime: '2023-10-25', progress: 0 }
  ];

  // 模拟数据
  const taskStats = {
    total: 150,
    inProgress: 60,
    completed: 75,
    pending: 15
  };

  // 任务支撑业务目标数据
  const businessGoals = [
    { 
      id: 1,
      goal: '提升系统性能', 
      tasks: ['性能优化', '响应时间优化'], 
      status: '进行中', 
      progress: 75 
    },
    { 
      id: 2,
      goal: '提高用户满意度', 
      tasks: ['用户体验改进', '功能优化'], 
      status: '待开始', 
      progress: 0 
    },
    { 
      id: 3,
      goal: '增强系统稳定性', 
      tasks: ['bug修复', '安全加固'], 
      status: '已完成', 
      progress: 100 
    }
  ];

  // 触发事件数据
  const triggerEvents = [
    { 
      id: 1,
      event: '系统性能告警', 
      tasks: ['性能优化', '响应时间优化'], 
      time: '2023-10-20 14:30',
      severity: 'high'
    },
    { 
      id: 2,
      event: '用户反馈', 
      tasks: ['用户体验改进'], 
      time: '2023-10-20 15:00',
      severity: 'medium'
    },
    { 
      id: 3,
      event: '安全漏洞', 
      tasks: ['安全加固'], 
      time: '2023-10-20 16:00',
      severity: 'critical'
    }
  ];

  // 执行团队数据
  const executionTeams = [
    { 
      id: 1,
      team: '技术团队', 
      tasks: 45, 
      status: '在线', 
      members: 15,
      performance: 85
    },
    { 
      id: 2,
      team: '测试团队', 
      tasks: 30, 
      status: '在线', 
      members: 8,
      performance: 78
    },
    { 
      id: 3,
      team: '运维团队', 
      tasks: 25, 
      status: '在线', 
      members: 10,
      performance: 92
    },
    { 
      id: 4,
      team: '业务团队', 
      tasks: 20, 
      status: '在线', 
      members: 7,
      performance: 80
    }
  ];

  // 初始化任务进度甘特图
  useEffect(() => {
    if (chartRefs.taskGantt.current) {
      const chart = echarts.init(chartRefs.taskGantt.current);
      
      // 转换任务数据为甘特图所需格式
      const taskNames = tasks.map(task => task.name);
      const startDates = tasks.map(task => new Date(task.startTime));
      const endDates = tasks.map(task => new Date(task.endTime));
      const durations = tasks.map((task, index) => endDates[index] - startDates[index]);
      const progressDurations = tasks.map((task, index) => durations[index] * (task.progress / 100));
      
      // 计算时间范围
      const minDate = new Date(Math.min(...startDates.map(d => d.getTime())));
      const maxDate = new Date(Math.max(...endDates.map(d => d.getTime())));
      
      // 甘特图配置
      const option = {
        title: {
          text: '任务进度甘特图',
          left: 'center',
          textStyle: {
            fontSize: '12px',
            fontWeight: '600'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            const task = tasks[params[0].dataIndex];
            return `
              <div style='font-size: 10px;'>
                <strong>${task.name}</strong><br/>
                状态: ${task.status}<br/>
                团队: ${task.team || '未分配'}<br/>
                优先级: ${task.priority}<br/>
                时间: ${task.startTime} - ${task.endTime}<br/>
                进度: ${task.progress}%
              </div>
            `;
          }
        },
        grid: {
          left: '25%',
          right: '5%',
          bottom: '15%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'time',
          name: '时间',
          min: minDate,
          max: maxDate,
          axisLabel: {
            fontSize: '10px',
            formatter: function(value) {
              return new Date(value).toLocaleDateString('zh-CN', {
                month: '2-digit',
                day: '2-digit'
              });
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0',
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: taskNames,
          axisLabel: {
            fontSize: '10px',
            width: 120,
            overflow: 'truncate',
            formatter: function(value) {
              return value.length > 14 ? value.substring(0, 14) + '...' : value;
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '背景',
            type: 'bar',
            stack: 'gantt',
            itemStyle: {
              color: '#e6f7ff',
              borderColor: '#1890ff',
              borderWidth: 1
            },
            data: tasks.map((task, index) => {
              return {
                value: [
                  startDates[index].getTime(),
                  durations[index]
                ]
              };
            }),
            barWidth: 20
          },
          {
            name: '进度',
            type: 'bar',
            stack: 'gantt',
            itemStyle: {
              color: '#1890ff'
            },
            data: tasks.map((task, index) => {
              return {
                value: [
                  startDates[index].getTime(),
                  progressDurations[index]
                ]
              };
            }),
            barWidth: 20,
            label: {
              show: true,
              position: 'insideRight',
              fontSize: '9px',
              formatter: '{c}%',
              color: '#fff'
            }
          },
          {
            name: '开始点',
            type: 'scatter',
            data: tasks.map((task, index) => [
              startDates[index].getTime(),
              task.name
            ]),
            itemStyle: {
              color: '#1890ff',
              borderWidth: 2
            },
            symbolSize: 6,
            z: 10
          }
        ]
      };
      
      chart.setOption(option);
      
      return () => chart.dispose();
    }
  }, []);

  // 初始化团队协同雷达图
  useEffect(() => {
    if (chartRefs.teamCollaboration.current) {
      const chart = echarts.init(chartRefs.teamCollaboration.current);
      const option = {
        title: {
          text: '团队协同效能',
          left: 'center',
          textStyle: {
            fontSize: '12px',
            fontWeight: '600'
          }
        },
        tooltip: {},
        legend: {
          orient: 'horizontal',
          bottom: 10,
          textStyle: {
            fontSize: '11px'
          }
        },
        radar: {
          indicator: [
            { name: '任务响应', max: 100 },
            { name: '协作效率', max: 100 },
            { name: '完成质量', max: 100 },
            { name: '沟通效果', max: 100 },
            { name: '问题解决', max: 100 }
          ],
          radius: '60%',
          axisName: {
            fontSize: '10px'
          }
        },
        series: [
          {
            name: '团队协同',
            type: 'radar',
            data: [
              {
                value: [85, 75, 90, 80, 88],
                name: '技术团队',
                areaStyle: {
                  color: 'rgba(24, 144, 255, 0.2)'
                },
                lineStyle: {
                  color: '#1890ff'
                }
              },
              {
                value: [78, 82, 85, 88, 80],
                name: '业务团队',
                areaStyle: {
                  color: 'rgba(82, 196, 26, 0.2)'
                },
                lineStyle: {
                  color: '#52c41a'
                }
              }
            ]
          }
        ]
      };
      chart.setOption(option);
      
      return () => chart.dispose();
    }
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      gap: '3px', 
      padding: '3px', 
      boxSizing: 'border-box',
      backgroundColor: '#f0f2f5'
    }}>
      {/* 1. 顶部摘要栏：任务基本信息（辅助视图，小尺寸） */}
      <div style={{ height: '50px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px' }}>
        <Card
          size="small"
          style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
          bodyStyle={{ padding: '2px 4px', flex: 1 }}
        >
          <Statistic
            title="任务总数"
            value={taskStats.total}
            valueStyle={{ color: '#333', fontSize: '11px', fontWeight: 500 }}
            suffix="个任务"
            titleStyle={{ fontSize: '9px', marginBottom: '1px', color: '#666' }}
          />
        </Card>
        <Card
          size="small"
          style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
          bodyStyle={{ padding: '2px 4px', flex: 1 }}
        >
          <Statistic
            title="执行中"
            value={taskStats.inProgress}
            valueStyle={{ color: '#1890ff', fontSize: '11px', fontWeight: 500 }}
            suffix="个"
            titleStyle={{ fontSize: '9px', marginBottom: '1px', color: '#666' }}
          />
        </Card>
        <Card
          size="small"
          style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
          bodyStyle={{ padding: '2px 4px', flex: 1 }}
        >
          <Statistic
            title="已完成"
            value={taskStats.completed}
            valueStyle={{ color: '#52c41a', fontSize: '11px', fontWeight: 500 }}
            suffix="个"
            titleStyle={{ fontSize: '9px', marginBottom: '1px', color: '#666' }}
          />
        </Card>
        <Card
          size="small"
          style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
          bodyStyle={{ padding: '2px 4px', flex: 1 }}
        >
          <Statistic
            title="待分配"
            value={taskStats.pending}
            valueStyle={{ color: '#faad14', fontSize: '11px', fontWeight: 500 }}
            suffix="个"
            titleStyle={{ fontSize: '9px', marginBottom: '1px', color: '#666' }}
          />
        </Card>
      </div>
      
      {/* 2. 主体内容区：左侧主视图 + 右侧辅助视图 */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3px', overflow: 'hidden' }}>
        {/* 左侧：主视图核心内容 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', overflow: 'hidden' }}>
          {/* 2.1 主图：任务进度甘特图 */}
          <Card
            size="small"
            style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}
            headStyle={{ 
              borderBottom: '1px solid #f0f0f0',
              fontSize: '12px',
              fontWeight: '600',
              padding: '3px 5px' 
            }}
            bodyStyle={{ padding: '5px', flex: 1, overflow: 'hidden' }}
          >
            <div 
              ref={chartRefs.taskGantt} 
              style={{ width: '100%', height: '100%' }}
            />
          </Card>
          
          {/* 2.2 底部分析区：包含两个区域 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', flexShrink: 0, height: '280px' }}>
            {/* 2.2.1 任务支撑业务目标 */}
            <Card
              title="任务支撑业务目标"
              size="small"
              style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}
              headStyle={{ 
                borderBottom: '1px solid #f0f0f0',
                fontSize: '12px',
                fontWeight: '600',
                padding: '3px 5px' 
              }}
              bodyStyle={{ padding: '8px', flex: 1 }}
            >
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <List
                  size="small"
                  bordered={false}
                  dataSource={businessGoals}
                  renderItem={goal => (
                    <List.Item
                      key={goal.id}
                      style={{ padding: '5px 0', margin: 0, borderBottom: '1px solid #f0f0f0' }}
                    >
                      <List.Item.Meta
                        avatar={<BarChartOutlined style={{ fontSize: '14px', color: '#52c41a' }} />}
                        title={<span style={{ fontSize: '12px', fontWeight: '500' }}>{goal.goal}</span>}
                        description={
                          <>
                            <div style={{ fontSize: '11px', color: '#666', marginBottom: '2px' }}>
                              关联任务: {goal.tasks.join(', ')}
                            </div>
                            <div style={{ fontSize: '10px', color: '#8c8c8c' }}>
                              进度: {goal.progress}% | 
                              <Tag 
                                color={goal.status === '已完成' ? 'green' : goal.status === '进行中' ? 'blue' : 'gray'}
                                style={{ marginLeft: '3px', fontSize: '8px' }}
                              >
                                {goal.status}
                              </Tag>
                            </div>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                  pagination={{
                    pageSize: 2,
                    showSizeChanger: false,
                    showTotal: total => `共 ${total} 项`,
                    style: { marginTop: '5px', fontSize: '12px' }
                  }}
                />
              </div>
            </Card>
            
            {/* 2.2.2 触发事件 */}
            <Card
              title="触发事件"
              size="small"
              style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}
              headStyle={{ 
                borderBottom: '1px solid #f0f0f0',
                fontSize: '12px',
                fontWeight: '600',
                padding: '3px 5px' 
              }}
              bodyStyle={{ padding: '8px', flex: 1 }}
            >
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <List
                  size="small"
                  bordered={false}
                  dataSource={triggerEvents}
                  renderItem={event => (
                    <List.Item
                      key={event.id}
                      style={{ padding: '5px 0', margin: 0, borderBottom: '1px solid #f0f0f0' }}
                    >
                      <List.Item.Meta
                        avatar={<AlertOutlined style={{ fontSize: '14px', color: '#ff7875' }} />}
                        title={<span style={{ fontSize: '12px', fontWeight: '500' }}>{event.event}</span>}
                        description={
                          <>
                            <div style={{ fontSize: '11px', color: '#666', marginBottom: '2px' }}>
                              关联任务: {event.tasks.join(', ')}
                            </div>
                            <div style={{ fontSize: '10px', color: '#8c8c8c' }}>
                              {event.time} | 
                              <Tag 
                                color={event.severity === 'critical' ? 'red' : event.severity === 'high' ? 'orange' : 'yellow'}
                                style={{ marginLeft: '3px', fontSize: '8px' }}
                              >
                                {event.severity}
                              </Tag>
                            </div>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                  pagination={{
                    pageSize: 2,
                    showSizeChanger: false,
                    showTotal: total => `共 ${total} 项`,
                    style: { marginTop: '5px', fontSize: '12px' }
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
        
        {/* 右侧：辅助视图内容 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', overflow: 'hidden' }}>
          {/* 2.3 右上：团队协同表，占1/3高度 */}
          <Card
            title="团队协同表"
            size="small"
            style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}
            headStyle={{ 
              borderBottom: '1px solid #f0f0f0',
              fontSize: '12px',
              fontWeight: '600',
              padding: '3px 5px' 
            }}
            bodyStyle={{ padding: '8px', flex: 1, overflow: 'hidden' }}
          >
            <div 
              ref={chartRefs.teamCollaboration} 
              style={{ width: '100%', height: '100%' }}
            />
          </Card>
          
          {/* 2.4 右下：执行团队，占2/3高度 */}
          <Card
            title="执行团队"
            size="small"
            style={{ margin: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', flex: 2, display: 'flex', flexDirection: 'column' }}
            headStyle={{ 
              borderBottom: '1px solid #f0f0f0',
              fontSize: '12px',
              fontWeight: '600',
              padding: '3px 5px' 
            }}
            bodyStyle={{ padding: '8px', flex: 1, overflow: 'hidden' }}
          >
            <List
              size="small"
              bordered={false}
              dataSource={executionTeams}
              renderItem={team => (
                <List.Item
                  key={team.id}
                  style={{ padding: '5px 0', margin: 0, borderBottom: '1px solid #f0f0f0' }}
                >
                  <List.Item.Meta
                    avatar={<UserOutlined style={{ fontSize: '14px', color: '#1890ff' }} />}
                    title={<span style={{ fontSize: '12px', fontWeight: '500' }}>{team.team}</span>}
                    description={
                      <>
                        <div style={{ fontSize: '11px', color: '#666', marginBottom: '2px' }}>
                          参与任务数: <strong>{team.tasks}</strong> 个 | 团队规模: <strong>{team.members}</strong> 人
                        </div>
                        <div style={{ fontSize: '10px', color: '#8c8c8c' }}>
                          团队绩效: <strong>{team.performance}</strong> 分 | 
                          <Tag 
                            color={team.status === '在线' ? 'green' : 'red'}
                            style={{ marginLeft: '3px', fontSize: '8px' }}
                          >
                            {team.status}
                          </Tag>
                        </div>
                      </>
                    }
                  />
                </List.Item>
              )}
              pagination={false}
              style={{ overflow: 'auto', flex: 1 }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Template14;