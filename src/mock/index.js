import Mock from 'mockjs';

// 设置响应时间
Mock.setup({
  timeout: '200-600',
});

// 模拟业务列表数据
Mock.mock(/^\/api\/business\/list/, 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: {
      list: Mock.mock({
        'array|10': [{
          'id|+1': 1001,
          'name': '@cname(5, 10)',
          'type|1': ['类型A', '类型B', '类型C', '类型D', '类型E'],
          'createTime': '@date("yyyy-MM-dd")',
          'status|1': ['已完成', '进行中', '待处理'],
        }],
      }).array,
      total: 100,
    },
  };
});

// 模拟用户列表数据
Mock.mock(/^\/api\/users\/list/, 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: {
      list: Mock.mock({
        'array|10': [{
          'id|+1': 2001,
          'username': '@word(5, 10)',
          'name': '@cname',
          'email': '@email',
          'role|1': ['管理员', '普通用户'],
          'status|1': ['启用', '禁用'],
        }],
      }).array,
      total: 100,
    },
  };
});

// 模拟文档列表数据
Mock.mock(/^\/api\/documents\/list/, 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: {
      list: Mock.mock({
        'array|10': [{
          'id|+1': 3001,
          'name': '@cname(5, 15)',
          'type|1': ['类型A', '类型B', '类型C', '类型D', '类型E'],
          'creator': '@cname',
          'createTime': '@date("yyyy-MM-dd")',
          'status|1': ['已发布', '草稿'],
        }],
      }).array,
      total: 100,
    },
  };
});

// 模拟仪表盘数据
Mock.mock(/^\/api\/dashboard\/data/, 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: {
      totalUsers: 12345,
      totalBusiness: 6789,
      totalDocuments: 3456,
      todayVisits: 987,
      businessTrend: [5, 20, 36, 10, 10, 20, 30],
      businessTypes: [
        { value: 30, name: '类型A' },
        { value: 20, name: '类型B' },
        { value: 15, name: '类型C' },
        { value: 10, name: '类型D' },
        { value: 25, name: '类型E' }
      ],
    },
  };
});

export default Mock;
