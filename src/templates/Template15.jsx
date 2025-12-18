import React, { useEffect, useRef } from 'react';
import { Card, Row, Col, Statistic, List, Tag, Table, Descriptions, Progress } from 'antd';
import * as echarts from 'echarts';
import { ArrowUpOutlined, ArrowDownOutlined, WarningOutlined, InfoCircleOutlined, UserOutlined, ClockCircleOutlined, BarChartOutlined, FileTextOutlined, CheckCircleOutlined, AlertOutlined } from '@ant-design/icons';

// 模板15：事件主体 - 事实发生（顶部 - 报警）
const Template15 = ({ pageTitle, data }) => {
  const chartRefs = {
    alertListChart: useRef(null),
    realTimeAlertChart: useRef(null),
    businessImpactChart: useRef(null)
  };

  // 初始化图表
  useEffect(() => {
    // 报警列表可视化
    if (chartRefs.alertListChart.current) {
      const chart = echarts.init(chartRefs.alertListChart.current);
      const option = {
        title: {
          text: '报警状态分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          top: 40
        },
        series: [
          {
            name: '报警状态',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 45, name: '未处理' },
              { value: 30, name: '处理中' },
              { value: 20, name: '已处理' },
              { value: 5, name: '已忽略' }
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
      };
      chart.setOption(option);
      
      return () => chart.dispose();
    }
  }, []);

  useEffect(() => {
    // 实时告警图
    if (chartRefs.realTimeAlertChart.current) {
      const chart = echarts.init(chartRefs.realTimeAlertChart.current);
      const option = {
        title: {
          text: '实时告警趋势',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}次'
        },
        xAxis: {
          type: 'category',
          data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
        },
        yAxis: {
          type: 'value',
          name: '告警次数'
        },
        series: [
          {
            name: '告警次数',
            type: 'line',
            data: [12, 8, 15, 30, 45, 35, 25, 18],
            smooth: true,
            lineStyle: {
              color: '#f5222d',
              width: 3
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(245, 34, 45, 0.5)' },
                { offset: 1, color: 'rgba(245, 34, 45, 0.1)' }
              ])
            }
          }
        ]
      };
      chart.setOption(option);
      
      return () => chart.dispose();
    }
  }, []);

  useEffect(() => {
    // 业务影响标注
    if (chartRefs.businessImpactChart.current) {
      const chart = echarts.init(chartRefs.businessImpactChart.current);
      const option = {
        title: {
          text: '业务影响分析',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['业务模块A', '业务模块B', '业务模块C', '业务模块D', '业务模块E']
        },
        yAxis: {
          type: 'value',
          name: '影响程度',
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [
          {
            name: '影响程度',
            type: 'bar',
            data: [85, 70, 50, 30, 15],
            itemStyle: {
              color: function(params) {
                const colors = ['#f5222d', '#faad14', '#fa8c16', '#faad14', '#52c41a'];
                return colors[params.dataIndex];
              }
            }
          }
        ]
      };
      chart.setOption(option);
      
      return () => chart.dispose();
    }
  }, []);

  // 报警关联业务数据
  const businessData = [
    { business: '业务模块A', alerts: 25, impact: '高', status: '受影响' },
    { business: '业务模块B', alerts: 20, impact: '中', status: '部分受影响' },
    { business: '业务模块C', alerts: 15, impact: '中', status: '部分受影响' },
    { business: '业务模块D', alerts: 10, impact: '低', status: '轻微受影响' },
    { business: '业务模块E', alerts: 5, impact: '低', status: '未受影响' }
  ];

  // 处置团队数据
  const处置Team = [
    { team: '技术团队', leader: '张三', members: 15, status: '在线' },
    { team: '运维团队', leader: '李四', members: 10, status: '在线' },
    { team: '业务团队', leader: '王五', members: 7, status: '在线' }
  ];

  // 报警处置任务数据
  const alertTasks = [
    { id: 'TASK20231021001', name: '处理系统性能告警', assignee: '张三', status: '进行中', progress: 75 },
    { id: 'TASK20231021002', name: '处理数据库连接告警', assignee: '李四', status: '待开始', progress: 0 },
    { id: 'TASK20231021003', name: '处理网络延迟告警', assignee: '王五', status: '已完成', progress: 100 }
  ];

  return (
    <div style={{ height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1 style={{ margin: '0 0 6px 0', fontSize: '20px' }}>{pageTitle}</h1>
      
      {/* 1. 摘要栏 */}
      <Row gutter={10} style={{ height: '70px' }}>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic
              title="告警总数"
              value={250}
              precision={0}
              valueStyle={{ color: '#3f8600', fontSize: '16px' }}
              prefix={<ArrowUpOutlined />}
              suffix="个"
              titleStyle={{ fontSize: '12px' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic
              title="未处理告警"
              value={45}
              precision={0}
              valueStyle={{ color: '#1890ff', fontSize: '16px' }}
              prefix={<ArrowUpOutlined />}
              suffix="个"
              titleStyle={{ fontSize: '12px' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic
              title="已处理告警"
              value={200}
              precision={0}
              valueStyle={{ color: '#52c41a', fontSize: '16px' }}
              prefix={<ArrowUpOutlined />}
              suffix="个"
              titleStyle={{ fontSize: '12px' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ height: '100%', padding: '8px' }}>
            <Statistic
              title="误报率"
              value={5.2}
              precision={1}
              valueStyle={{ color: '#faad14', fontSize: '16px' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
              titleStyle={{ fontSize: '12px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 2. 报警状态分布 + 3. 实时告警趋势 + 4. 业务影响分析 */}
      <Row gutter={10} style={{ flex: 1, minHeight: 0 }}>
        <Col span={12} style={{ height: '240px' }}>
          <Card title="报警状态分布" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
            <div ref={chartRefs.alertListChart} style={{ width: '100%', height: '190px' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Row gutter={10} style={{ height: '240px' }}>
            <Col span={12} style={{ height: '100%' }}>
              <Card title="实时告警趋势" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <div ref={chartRefs.realTimeAlertChart} style={{ width: '100%', height: '115px' }} />
              </Card>
            </Col>
            <Col span={12} style={{ height: '100%' }}>
              <Card title="业务影响分析" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
                <div ref={chartRefs.businessImpactChart} style={{ width: '100%', height: '115px' }} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* 5. 报警关联业务数据 + 6. 处置团队 + 7. 报警处置任务 */}
      <Row gutter={10} style={{ height: '200px' }}>
        <Col span={8} style={{ height: '100%' }}>
          <Card title="报警关联业务数据" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
            <div style={{ fontSize: '12px', overflow: 'hidden' }}>
              <List
                size="small"
                dataSource={businessData.slice(0, 3)}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Tag color={
                        item.status === '受影响' ? 'red' :
                        item.status === '部分受影响' ? 'orange' : 'green'
                      } style={{ fontSize: '10px' }}>
                        {item.status}
                      </Tag>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Tag color={
                        item.impact === '高' ? 'red' :
                        item.impact === '中' ? 'orange' : 'green'
                      } style={{ fontSize: '10px' }}>{item.impact}</Tag>}
                      title={<span style={{ fontSize: '12px' }}>{item.business}</span>}
                      description={`报警数量: ${item.alerts}个`}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
        <Col span={8} style={{ height: '100%' }}>
          <Card title="处置团队" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
            <div style={{ fontSize: '12px', overflow: 'hidden' }}>
              <List
                size="small"
                dataSource={处置Team.slice(0, 3)}
                renderItem={(team) => (
                  <List.Item>
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
                )}
              />
            </div>
          </Card>
        </Col>
        <Col span={8} style={{ height: '100%' }}>
          <Card title="报警处置任务" style={{ height: '100%' }} titleStyle={{ fontSize: '14px' }}>
            <div style={{ fontSize: '12px', overflow: 'hidden' }}>
              <List
                size="small"
                dataSource={alertTasks.slice(0, 2)}
                renderItem={(task) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<ClockCircleOutlined style={{ fontSize: '14px' }} />}
                      title={<span style={{ fontSize: '12px' }}>{task.name}</span>}
                      description={
                        <>
                          <div style={{ fontSize: '11px' }}>任务ID: {task.id.slice(-6)}</div>
                          <div style={{ fontSize: '11px' }}>负责人: {task.assignee}</div>
                          <div style={{ marginTop: '2px' }}>
                            状态: <Tag color={
                              task.status === '已完成' ? 'green' :
                              task.status === '进行中' ? 'blue' : 'gray'
                            } style={{ fontSize: '9px' }}>{task.status}</Tag>
                            <span style={{ marginLeft: '6px' }}>
                              <Progress percent={task.progress} size="small" status={task.progress === 100 ? 'success' : 'active'} strokeWidth={3} />
                            </span>
                          </div>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Template15;