import React from 'react';
import { Card, Statistic, Table, Button, Row, Col, Divider, Space, Form, Input, Select, DatePicker, Tabs } from 'antd';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, FileTextOutlined, UserOutlined, SettingOutlined, BellOutlined, ClockCircleOutlined, CheckCircleOutlined, AlertOutlined } from '@ant-design/icons';
const { TextArea } = Input;
import pageContentConfig, { navTypeMap } from '../config/pageContentConfig';
// 导入20个模板组件
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

const ContentArea = ({ title, navType }) => {
  // 解析页面标题，获取左侧导航页名称和内容导航项
  const parseTitle = (title) => {
    if (title.includes(' - ')) {
      const [mainTitle, subTitle] = title.split(' - ');
      return { mainTitle, subTitle };
    }
    return { mainTitle: title, subTitle: '' };
  };

  const { mainTitle, subTitle } = parseTitle(title);
  
  // 获取页面配置
  const pageConfig = pageContentConfig[mainTitle] || {};
  
  // 确定导航类型
  const determineNavType = () => {
    if (navType) return navType;
    if (subTitle && navTypeMap[subTitle]) return navTypeMap[subTitle];
    return 'default';
  };

  const currentNavType = determineNavType();
  const contentConfig = pageConfig[currentNavType] || {};

  // 生成观察类内容（主体事实发生）
  const renderMonitorContent = () => {
    const indicators = contentConfig.indicators || ['指标1', '指标2', '指标3', '指标4'];
    const generateData = contentConfig.generateData || (() => {
      return indicators.map((indicator, index) => {
        const value = Math.floor(Math.random() * 10000);
        const status = Math.random() > 0.8 ? 'error' : Math.random() > 0.6 ? 'warning' : 'normal';
        const change = (Math.random() * 20 - 10).toFixed(2);
        return {
          key: `${index + 1}`,
          name: indicator,
          value,
          status,
          change: `${change.startsWith('-') ? '' : '+'}${change}%`
        };
      });
    });
    
    const monitorData = generateData(indicators);

    return (
      <div>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          {monitorData.map((item) => (
            <Col span={6} key={item.key}>
              <Card>
                <Statistic
                  title={item.name}
                  value={item.value}
                  precision={2}
                  valueStyle={{ color: item.status === 'normal' ? '#3f8600' : item.status === 'warning' ? '#faad14' : '#cf1322' }}
                  prefix={item.status === 'normal' ? <CheckCircleOutlined /> : item.status === 'warning' ? <AlertOutlined /> : <AlertOutlined />}
                  suffix={item.change}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="实时数据趋势" extra={<Button type="primary">查看详情</Button>}>
              <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LineChartOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                <span style={{ marginLeft: 16, fontSize: 18 }}>实时数据趋势图表</span>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="数据分布" extra={<Button type="primary">查看详情</Button>}>
              <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PieChartOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                <span style={{ marginLeft: 16, fontSize: 18 }}>数据分布图表</span>
              </div>
            </Card>
          </Col>
        </Row>
        <Divider />
        <Card title="实时数据列表" extra={<Button type="primary">导出数据</Button>}>
          <Table
            columns={[
              { title: '名称', dataIndex: 'name', key: 'name' },
              { title: '数值', dataIndex: 'value', key: 'value' },
              { title: '状态', dataIndex: 'status', key: 'status', render: (status) => (
                <span style={{ color: status === 'normal' ? '#3f8600' : status === 'warning' ? '#faad14' : '#cf1322' }}>
                  {status === 'normal' ? '正常' : status === 'warning' ? '警告' : '错误'}
                </span>
              ) },
              { title: '变化率', dataIndex: 'change', key: 'change', render: (change) => (
                <span style={{ color: change.startsWith('+') ? '#3f8600' : '#cf1322' }}>{change}</span>
              ) },
            ]}
            dataSource={monitorData}
            pagination={false}
          />
        </Card>
      </div>
    );
  };

  // 生成关注类内容（主体关注）
  const renderListContent = () => {
    const columnsConfig = contentConfig.columns || ['名称', '状态', '日期', '操作人'];
    const generateData = contentConfig.generateData || (() => {
      return Array.from({ length: 10 }, (_, index) => {
        const item = {
          key: `${index + 1}`
        };
        columnsConfig.forEach(column => {
          if (column === '状态') {
            const statuses = ['completed', 'in-progress', 'pending'];
            item[column] = statuses[Math.floor(Math.random() * statuses.length)];
          } else if (column === '日期' || column === '更新时间' || column === '创建时间' || column === '触发时间' || column === '处理时间') {
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 30));
            item[column] = date.toISOString().split('T')[0];
          } else if (column === '处理人' || column === '执行人' || column === '变更人') {
            const users = ['张三', '李四', '王五', '赵六', '孙七'];
            item[column] = users[Math.floor(Math.random() * users.length)];
          } else {
            item[column] = `${column}${index + 1}`;
          }
        });
        return item;
      });
    });
    
    const listData = generateData(columnsConfig);
    
    // 转换列配置为Table组件所需的列配置
    const columns = columnsConfig.map(column => {
      if (column === '状态') {
        return {
          title: column,
          dataIndex: column,
          key: column,
          render: (status) => (
            <span style={{ color: status === 'completed' ? '#3f8600' : status === 'in-progress' ? '#1890ff' : '#faad14' }}>
              {status === 'completed' ? '已完成' : status === 'in-progress' ? '进行中' : '待处理'}
            </span>
          )
        };
      }
      return {
        title: column,
        dataIndex: column,
        key: column
      };
    });
    
    // 添加操作列
    columns.push({
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link">查看</Button>
          <Button type="link">编辑</Button>
          <Button type="link" danger>删除</Button>
        </Space>
      )
    });

    return (
      <div>
        <Card title={title} extra={<Space>
          <Button type="primary">新增</Button>
          <Button>导入</Button>
          <Button>导出</Button>
        </Space>}>
          <Table
            columns={columns}
            dataSource={listData}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    );
  };

  // 生成感知类内容（决策分析）
  const renderReportContent = () => {
    const sections = contentConfig.sections || ['报告概览', '数据趋势', '对比分析'];

    return (
      <div>
        <Card title={title} extra={<Button type="primary">生成报告</Button>}>
          <div style={{ marginBottom: 16 }}>
            <h3>报告概览</h3>
            <p>本报告包含{title}的详细分析，包括数据趋势、对比分析、分布特征等内容。</p>
          </div>
          <Row gutter={16} style={{ marginBottom: 16 }}>
            {sections.slice(1).map((section, index) => (
              <Col span={12} key={index}>
                <Card title={section} size="small">
                  <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LineChartOutlined style={{ fontSize: 36, color: '#1890ff' }} />
                    <span style={{ marginLeft: 16, fontSize: 16 }}>{section}图表</span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Card title="详细数据" size="small">
            <Table
              columns={[
                { title: '维度', dataIndex: 'name', key: 'name' },
                { title: '数值', dataIndex: 'value', key: 'value' },
                { title: '占比', dataIndex: 'percentage', key: 'percentage', render: (percentage) => (
                  <span style={{ color: '#1890ff' }}>{percentage}</span>
                ) },
              ]}
              dataSource={[
                { key: '1', name: '维度1', value: 1234, percentage: '25%' },
                { key: '2', name: '维度2', value: 5678, percentage: '45%' },
                { key: '3', name: '维度3', value: 9012, percentage: '30%' },
              ]}
              pagination={false}
            />
          </Card>
        </Card>
      </div>
    );
  };

  // 生成行动类内容（行动操作）
  const renderFormContent = () => {
    const fields = contentConfig.fields || ['字段1', '字段2', '字段3', '字段4'];

    return (
      <Card title={title}>
        <div style={{ maxWidth: 600 }}>
          <Form layout="vertical">
            {fields.map((field, index) => (
              <Form.Item key={index} label={field} name={field.toLowerCase().replace(/\s+/g, '-')}>
                {field.includes('邮箱') && <Input placeholder={`请输入${field}`} />}
                {field.includes('手机') && <Input placeholder={`请输入${field}`} />}
                {field.includes('名称') && <Input placeholder={`请输入${field}`} />}
                {field.includes('状态') && (
                  <Select placeholder={`请选择${field}`}>
                    <Select.Option value="option1">选项1</Select.Option>
                    <Select.Option value="option2">选项2</Select.Option>
                    <Select.Option value="option3">选项3</Select.Option>
                  </Select>
                )}
                {field.includes('日期') && <DatePicker style={{ width: '100%' }} placeholder={`请选择${field}`} />}
                {field.includes('部门') && (
                  <Select placeholder={`请选择${field}`}>
                    <Select.Option value="option1">部门1</Select.Option>
                    <Select.Option value="option2">部门2</Select.Option>
                    <Select.Option value="option3">部门3</Select.Option>
                  </Select>
                )}
                {field.includes('职位') && (
                  <Select placeholder={`请选择${field}`}>
                    <Select.Option value="option1">职位1</Select.Option>
                    <Select.Option value="option2">职位2</Select.Option>
                    <Select.Option value="option3">职位3</Select.Option>
                  </Select>
                )}
                {!field.includes('邮箱') && !field.includes('手机') && !field.includes('名称') && !field.includes('状态') && !field.includes('日期') && !field.includes('部门') && !field.includes('职位') && <TextArea rows={4} placeholder={`请输入${field}`} />}
              </Form.Item>
            ))}
            <Form.Item>
              <Space>
                <Button type="primary" size="large">提交</Button>
                <Button size="large">保存草稿</Button>
                <Button size="large">重置</Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Card>
    );
  };

  // 生成默认页内容
  const renderDefaultContent = () => {
    return (
      <div>
        <Card title={title}>
          <p>欢迎访问{title}页面。</p>
          <p>本页面提供{title}相关的功能和数据。</p>
          <Divider />
          <h3>功能介绍</h3>
          <ul>
            <li>功能1：提供{title}的基本信息查看</li>
            <li>功能2：支持{title}的数据统计和分析</li>
            <li>功能3：提供{title}的相关操作入口</li>
          </ul>
          <Divider />
          <h3>数据概览</h3>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic title="总数据量" value={123456} prefix={<FileTextOutlined />} />
            </Col>
            <Col span={8}>
              <Statistic title="活跃用户" value={4567} prefix={<UserOutlined />} />
            </Col>
            <Col span={8}>
              <Statistic title="系统状态" value="正常" prefix={<CheckCircleOutlined />} valueStyle={{ color: '#3f8600' }} />
            </Col>
          </Row>
        </Card>
      </div>
    );
  };

  // 根据导航类型生成对应的内容
  const renderContent = () => {
    // 模板1：业务主体 - 事实发生（左侧 - 全景俯瞰 - 一级页）
    if (mainTitle === '运营全景' || mainTitle === '全过程价值链' || mainTitle === '资源池') {
      return <Template1 pageTitle={title} data={{}} />;
    }
    // 模板2：业务主体 - 事实发生（左侧 - 一级页）
    else if (['在线业务', '访客', '渠道', '行为', '内容', '应用服务', '流量承载', '在线体验', '服务传递效率', '基础资源', '存量', '服务可用性', '使用和转化', '服务健康', '健康状态报告', '黑名单状态', '常见问题', '健康干预绩效'].includes(mainTitle) && !subTitle) {
      return <Template2 pageTitle={title} data={{}} />;
    }
    // 模板3：业务主体 - 事实发生（左侧 - 观察-实时动态）
    else if (subTitle === '实时动态') {
      return <Template3 pageTitle={title} data={{}} />;
    }
    // 模板4：业务主体 - 事实发生（左侧 - 观察-近期发生）
    else if (subTitle === '近期发生') {
      return <Template4 pageTitle={title} data={{}} />;
    }
    // 模板5：业务主体 - 事实发生（左侧 - 观察-历史回顾）
    else if (subTitle === '历史回顾') {
      return <Template5 pageTitle={title} data={{}} />;
    }
    // 模板6：业务主体 - 深度分析(左侧-感知-变化分析报告）
    else if (subTitle === '变化分析报告') {
      return <Template6 pageTitle={title} data={{}} />;
    }
    // 模板7：业务主体 - 深度分析(左侧-感知-对比分析报告）
    else if (subTitle === '对比分析报告') {
      return <Template7 pageTitle={title} data={{}} />;
    }
    // 模板8：业务主体 - 深度分析(左侧-感知-分布特征分析报告）
    else if (subTitle === '分布特征分析报告') {
      return <Template8 pageTitle={title} data={{}} />;
    }
    // 模板9：业务主体 - 决策归因(左侧-感知-归因分析报告）
    else if (subTitle === '归因分析报告') {
      return <Template9 pageTitle={title} data={{}} />;
    }
    // 模板10：业务主体 - 决策归因(左侧-感知相关性分析报告）
    else if (subTitle === '相关性分析报告') {
      return <Template10 pageTitle={title} data={{}} />;
    }
    // 模板11：任务主体 - 事实发生（左侧 - 行动 - 变更操作）
    else if (subTitle === '处理任务变更操作') {
      return <Template11 pageTitle={title} data={{}} />;
    }
    // 模板12：任务主体 - 事实发生（左侧 - 行动 - 响应操作）
    else if (subTitle === '响应操作') {
      return <Template12 pageTitle={title} data={{}} />;
    }
    // 模板13：任务主体 - 事实发生（左侧 - 行动 - 协同操作）
    else if (subTitle === '参与协同操作') {
      return <Template13 pageTitle={title} data={{}} />;
    }
    // 模板14：任务主体 - 事实发生（顶部 - 任务）
    else if (mainTitle.includes('任务')) {
      return <Template14 pageTitle={title} data={{}} />;
    }
    // 模板15：事件主体 - 事实发生（顶部 - 报警）
    else if (mainTitle.includes('报警')) {
      return <Template15 pageTitle={title} data={{}} />;
    }
    // 模板16：事件主体 - 事实发生（顶部 - 事件）
    else if (mainTitle.includes('事件')) {
      return <Template16 pageTitle={title} data={{}} />;
    }
    // 模板17：责任主体 - 事实发生（顶部 - 在线）
    else if (mainTitle.includes('责任') || mainTitle.includes('在线') || mainTitle.includes('绩效')) {
      return <Template17 pageTitle={title} data={{}} />;
    }
    // 模板18：顶部 - 个人中心 - 注册信息
    else if (mainTitle === '注册信息') {
      return <Template18 pageTitle={title} data={{}} />;
    }
    // 模板19：顶部 - 个人中心 - 个性化设置
    else if (mainTitle === '个性化设置') {
      return <Template19 pageTitle={title} data={{}} />;
    }
    // 模板20：顶部 - 个人中心 - 我的内容
    else if (mainTitle === '我的内容') {
      return <Template20 pageTitle={title} data={{}} />;
    }
    // 默认情况
    else {
      return renderDefaultContent();
    }
  };

  // 生成个人中心模板内容
  const renderPersonalCenterContent = () => {
    if (mainTitle === '注册信息') {
      // 模板18：顶部 - 个人中心 - 注册信息
      return (
        <Card title={title}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="账号" name="username">
                  <Input placeholder="请输入账号" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="角色" name="role">
                  <Input placeholder="请输入角色" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="注册时间" name="registerTime">
                  <Input placeholder="请输入注册时间" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="认证状态" name="authStatus">
                  <Select placeholder="请选择认证状态">
                    <Select.Option value="verified">已认证</Select.Option>
                    <Select.Option value="unverified">未认证</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="手机号" name="phone">
                  <Input placeholder="请输入手机号" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="邮箱" name="email">
                  <Input placeholder="请输入邮箱" />
                </Form.Item>
              </Col>
            </Row>
            <Divider>
              <h3>待办任务</h3>
            </Divider>
            <Table
              columns={[
                { title: '任务名称', dataIndex: 'name', key: 'name' },
                { title: '状态', dataIndex: 'status', key: 'status', render: (status) => (
                  <span style={{ color: status === 'completed' ? '#3f8600' : status === 'in-progress' ? '#1890ff' : '#faad14' }}>
                    {status === 'completed' ? '已完成' : status === 'in-progress' ? '进行中' : '待处理'}
                  </span>
                ) },
                { title: '截止时间', dataIndex: 'deadline', key: 'deadline' },
                { title: '操作', key: 'action', render: () => (
                  <Space size="middle">
                    <Button type="link">查看</Button>
                    <Button type="link">处理</Button>
                  </Space>
                ) },
              ]}
              dataSource={[
                { key: '1', name: '访客骤降事件处理', status: 'in-progress', deadline: '2025-12-15' },
                { key: '2', name: '渠道推广优化任务', status: 'pending', deadline: '2025-12-20' },
              ]}
              pagination={false}
            />
          </Form>
        </Card>
      );
    } else if (mainTitle === '个性化设置') {
      // 模板19：顶部 - 个人中心 - 个性化设置
      return (
        <Card title={title}>
          <Form layout="vertical">
            <h3>界面设置</h3>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="主题" name="theme">
                  <Select placeholder="请选择主题">
                    <Select.Option value="light">浅色主题</Select.Option>
                    <Select.Option value="dark">深色主题</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="字体大小" name="fontSize">
                  <Select placeholder="请选择字体大小">
                    <Select.Option value="small">小</Select.Option>
                    <Select.Option value="medium">中</Select.Option>
                    <Select.Option value="large">大</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <h3>通知设置</h3>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="通知类型" name="notificationType">
                  <Select mode="multiple" placeholder="请选择通知类型">
                    <Select.Option value="email">邮件</Select.Option>
                    <Select.Option value="sms">短信</Select.Option>
                    <Select.Option value="system">系统通知</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="通知频率" name="notificationFrequency">
                  <Select placeholder="请选择通知频率">
                    <Select.Option value="immediate">实时</Select.Option>
                    <Select.Option value="daily">每日</Select.Option>
                    <Select.Option value="weekly">每周</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <h3>默认页面设置</h3>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="登录默认页" name="defaultPage">
                  <Input placeholder="请输入登录默认页" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Space>
                <Button type="primary" size="large">保存设置</Button>
                <Button size="large">重置默认</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      );
    } else if (mainTitle === '我的内容') {
      // 模板20：顶部 - 个人中心 - 我的内容
      return (
        <Card title={title}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="收藏内容" key="1">
              <Table
                columns={[
                  { title: '名称', dataIndex: 'name', key: 'name' },
                  { title: '类型', dataIndex: 'type', key: 'type' },
                  { title: '收藏时间', dataIndex: 'collectTime', key: 'collectTime' },
                  { title: '访问链接', dataIndex: 'link', key: 'link', render: (link) => (
                    <a href={link} target="_blank" rel="noopener noreferrer">访问</a>
                  ) },
                  { title: '操作', key: 'action', render: () => (
                    <Space size="middle">
                      <Button type="link">取消收藏</Button>
                    </Space>
                  ) },
                ]}
                dataSource={[
                  { key: '1', name: '访客分析报告', type: '报告', collectTime: '2025-12-10', link: '#' },
                  { key: '2', name: '渠道效果对比', type: '图表', collectTime: '2025-12-09', link: '#' },
                ]}
                pagination={false}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="历史记录" key="2">
              <Table
                columns={[
                  { title: '操作类型', dataIndex: 'type', key: 'type' },
                  { title: '名称', dataIndex: 'name', key: 'name' },
                  { title: '时间', dataIndex: 'time', key: 'time' },
                  { title: '关联模块', dataIndex: 'module', key: 'module' },
                ]}
                dataSource={[
                  { key: '1', type: '查看', name: '运营全景', time: '2025-12-11 10:30', module: '全景俯瞰' },
                  { key: '2', type: '编辑', name: '个性化设置', time: '2025-12-11 09:15', module: '个人中心' },
                ]}
                pagination={false}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="个人生成内容" key="3">
              <Table
                columns={[
                  { title: '名称', dataIndex: 'name', key: 'name' },
                  { title: '类型', dataIndex: 'type', key: 'type' },
                  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                  { title: '状态', dataIndex: 'status', key: 'status' },
                ]}
                dataSource={[
                  { key: '1', name: '自定义报表', type: '报告', createTime: '2025-12-10', status: '已发布' },
                  { key: '2', name: '访客分析图表', type: '图表', createTime: '2025-12-08', status: '草稿' },
                ]}
                pagination={false}
              />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      );
    }
    return renderDefaultContent();
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {renderContent()}
    </div>
  );
};

export default ContentArea;