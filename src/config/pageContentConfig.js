// 页面内容配置文件
// 根据PRD文档中的页面内容设计，定义每个页面的具体内容结构

// 动态生成监控数据
const generateMonitorData = (indicators, dataRange = [1000, 100000]) => {
  return indicators.map((indicator, index) => {
    const value = Math.floor(Math.random() * (dataRange[1] - dataRange[0] + 1)) + dataRange[0];
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
};

// 动态生成列表数据
const generateListData = (columns, count = 10) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const item = {
      key: `${i + 1}`
    };
    columns.forEach(column => {
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
      } else if (column === '名称' || column === '业务名称' || column === '事件名称' || column === '任务名称' || column === '报告ID' || column === '报警ID' || column === '指标名称') {
        item[column] = `${column}${i + 1}`;
      } else if (column === '类型' || column === '报警类型' || column === '事件类型' || column === '任务类型' || column === '内容类型' || column === '报告类型') {
        const types = ['类型1', '类型2', '类型3', '类型4', '类型5'];
        item[column] = types[Math.floor(Math.random() * types.length)];
      } else if (column === '级别' || column === '优先级') {
        const levels = ['高', '中', '低'];
        item[column] = levels[Math.floor(Math.random() * levels.length)];
      } else if (column === 'ID' || column === '报警ID' || column === '事件ID' || column === '任务ID' || column === '内容ID' || column === '变更ID' || column === '绩效ID') {
        item[column] = `ID${1000 + i}`;
      } else {
        item[column] = `值${i + 1}`;
      }
    });
    data.push(item);
  }
  return data;
};

// 页面内容配置 - 基于20个模板的详细配置
const pageContentConfig = {
  // 左侧导航页 - 全景俯瞰
  '运营全景': {
    // 模板1：业务主体 - 事实发生（左侧 - 全景俯瞰 - 一级页）
    monitor: {
      indicators: ['总业务量', '在线用户数', '转化率', '平均响应时间', '峰值流量', '用户满意度'],
      chartTypes: ['line', 'pie', 'bar', 'funnel'],
      dataRange: [1000, 100000],
      generateData: (indicators) => generateMonitorData(indicators, [1000, 100000]),
      template: 'template1' // 业务主体 - 事实发生（全景俯瞰 - 一级页）
    },
    // 模板2-5：业务主体 - 事实发生（观察-实时动态/近期发生/历史回顾）
    list: {
      columns: ['业务名称', '状态', '更新时间', '负责人', '业务类型', '优先级'],
      generateData: (columns) => generateListData(columns),
      template: 'template2' // 业务主体 - 事实发生（一级页）
    },
    // 模板6-10：业务主体 - 深度分析/决策归因（变化分析/对比分析/分布特征分析/归因分析/相关性分析报告）
    report: {
      sections: ['业务趋势分析', '用户行为分析', '渠道效果分析', '转化漏斗分析', '用户留存分析'],
      chartTypes: ['line', 'bar', 'scatter', 'funnel', 'heatmap'],
      template: 'template6' // 业务主体 - 深度分析
    },
    // 模板11-13：任务主体 - 事实发生（行动 - 变更操作/响应操作/协同操作）
    form: {
      fields: ['业务名称', '状态', '负责人', '更新时间', '业务描述', '影响范围'],
      template: 'template11' // 任务主体 - 事实发生（行动 - 变更操作）
    }
  },
  
  // 左侧导航页 - 全过程价值链
  '全过程价值链': {
    // 模板1：业务主体 - 事实发生（左侧 - 全景俯瞰 - 一级页）
    monitor: {
      indicators: ['总价值', '各环节价值贡献', '环节转化率', '环节响应时间', '流量分布', '资源利用率'],
      chartTypes: ['line', 'pie', 'bar', 'sankey', 'flow'],
      dataRange: [5000, 500000],
      generateData: (indicators) => generateMonitorData(indicators, [5000, 500000]),
      template: 'template1' // 业务主体 - 事实发生（全景俯瞰 - 一级页）
    },
    // 模板2-5：业务主体 - 事实发生（观察-实时动态/近期发生/历史回顾）
    list: {
      columns: ['环节名称', '价值', '转化率', '负责人', '响应时间', '流量'],
      generateData: (columns) => generateListData(columns),
      template: 'template2' // 业务主体 - 事实发生（一级页）
    },
    // 模板6-10：业务主体 - 深度分析/决策归因
    report: {
      sections: ['价值趋势分析', '转化率分析', '环节效率分析', '瓶颈识别分析', '协同效应分析'],
      chartTypes: ['line', 'bar', 'scatter', 'parallel', 'radar'],
      template: 'template6' // 业务主体 - 深度分析
    },
    // 模板11-13：任务主体 - 事实发生（行动 - 变更操作/响应操作/协同操作）
    form: {
      fields: ['环节名称', '价值', '转化率', '负责人', '优化建议', '预期效果'],
      template: 'template12' // 任务主体 - 事实发生（行动 - 响应操作）
    }
  },
  
  // 左侧导航页 - 资源池
  '资源池': {
    // 模板1：业务主体 - 事实发生（左侧 - 全景俯瞰 - 一级页）
    monitor: {
      indicators: ['总资源量', '已使用资源', '资源利用率', '资源健康状态', '热点资源数', '资源分布密度'],
      chartTypes: ['pie', '仪表盘', 'bar', 'heatmap', 'gauge'],
      dataRange: [100, 10000],
      generateData: (indicators) => generateMonitorData(indicators, [100, 10000]),
      template: 'template1' // 业务主体 - 事实发生（全景俯瞰 - 一级页）
    },
    // 模板2-5：业务主体 - 事实发生（观察-实时动态/近期发生/历史回顾）
    list: {
      columns: ['资源名称', '类型', '状态', '利用率', '更新时间', '所属区域'],
      generateData: (columns) => generateListData(columns),
      template: 'template2' // 业务主体 - 事实发生（一级页）
    },
    // 模板6-10：业务主体 - 深度分析/决策归因
    report: {
      sections: ['资源使用趋势', '资源分布分析', '健康状态分析', '资源预测分析', '优化建议'],
      chartTypes: ['line', 'pie', 'bar', 'area', 'forecast'],
      template: 'template6' // 业务主体 - 深度分析
    },
    // 模板11-13：任务主体 - 事实发生（行动 - 变更操作/响应操作/协同操作）
    form: {
      fields: ['资源名称', '类型', '状态', '利用率', '变更原因', '负责人'],
      template: 'template13' // 任务主体 - 事实发生（行动 - 协同操作）
    }
  },
  
  // 左侧导航页 - 在线业务
  '访客': {
    monitor: {
      indicators: ['访客总数', '新访客数', '回访率', '平均停留时间'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [10000, 1000000],
      generateData: (indicators) => generateMonitorData(indicators, [10000, 1000000])
    },
    list: {
      columns: ['访客ID', '来源', '设备', '停留时间', '访问页面'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['访客趋势分析', '来源分布分析', '行为分析'],
      chartTypes: ['line', 'pie', 'bar']
    },
    form: {
      fields: ['访客ID', '来源', '设备', '停留时间']
    }
  },
  
  '渠道': {
    monitor: {
      indicators: ['总流量', '各渠道流量', '转化率', '平均响应时间'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [5000, 500000],
      generateData: (indicators) => generateMonitorData(indicators, [5000, 500000])
    },
    list: {
      columns: ['渠道名称', '流量', '转化率', '平均响应时间', '状态'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['渠道效果分析', '流量趋势分析', '转化率对比'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['渠道名称', '流量', '转化率', '平均响应时间']
    }
  },
  
  '行为': {
    monitor: {
      indicators: ['页面浏览量', '点击量', '转化率', '跳出率'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [10000, 1000000],
      generateData: (indicators) => generateMonitorData(indicators, [10000, 1000000])
    },
    list: {
      columns: ['行为类型', '次数', '转化率', '页面', '时间'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['行为趋势分析', '路径分析', '转化漏斗'],
      chartTypes: ['line', 'bar', 'funnel']
    },
    form: {
      fields: ['行为类型', '次数', '转化率', '页面']
    }
  },
  
  '内容': {
    monitor: {
      indicators: ['内容总浏览量', '各类型内容浏览量', '转化率', '平均阅读时间'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [5000, 500000],
      generateData: (indicators) => generateMonitorData(indicators, [5000, 500000])
    },
    list: {
      columns: ['内容名称', '类型', '浏览量', '转化率', '平均阅读时间'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['内容效果分析', '类型分布分析', '趋势分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['内容名称', '类型', '浏览量', '转化率']
    }
  },
  
  // 左侧导航页 - 应用服务
  '流量承载': {
    monitor: {
      indicators: ['总流量', '峰值流量', '带宽利用率', '并发连接数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [10000, 1000000],
      generateData: (indicators) => generateMonitorData(indicators, [10000, 1000000])
    },
    list: {
      columns: ['流量类型', '流量值', '峰值', '带宽利用率', '时间'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['流量趋势分析', '带宽利用分析', '并发连接分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['流量类型', '流量值', '峰值', '带宽利用率']
    }
  },
  
  '在线体验': {
    monitor: {
      indicators: ['平均响应时间', '页面加载时间', '错误率', '用户满意度'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [100, 10000],
      generateData: (indicators) => generateMonitorData(indicators, [100, 10000])
    },
    list: {
      columns: ['体验指标', '当前值', '基准值', '状态', '更新时间'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['响应时间分析', '页面加载分析', '用户满意度分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['体验指标', '当前值', '基准值', '状态']
    }
  },
  
  '服务传递效率': {
    monitor: {
      indicators: ['服务响应时间', '吞吐量', '成功率', '瓶颈节点'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [500, 50000],
      generateData: (indicators) => generateMonitorData(indicators, [500, 50000])
    },
    list: {
      columns: ['服务名称', '响应时间', '吞吐量', '成功率', '状态'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['服务效率分析', '吞吐量趋势', '成功率分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['服务名称', '响应时间', '吞吐量', '成功率']
    }
  },
  
  // 左侧导航页 - 基础资源
  '存量': {
    monitor: {
      indicators: ['总资源量', '已使用资源', '可用资源', '资源利用率'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [1000, 100000],
      generateData: (indicators) => generateMonitorData(indicators, [1000, 100000])
    },
    list: {
      columns: ['资源名称', '总容量', '已使用', '可用', '利用率'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['资源存量分析', '使用趋势', '利用率分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['资源名称', '总容量', '已使用', '可用']
    }
  },
  
  '服务可用性': {
    monitor: {
      indicators: ['服务可用率', '宕机次数', '平均恢复时间', '服务健康状态'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [90, 100],
      generateData: (indicators) => generateMonitorData(indicators, [90, 100])
    },
    list: {
      columns: ['服务名称', '可用率', '宕机次数', '平均恢复时间', '状态'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['可用性趋势分析', '宕机分析', '恢复时间分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['服务名称', '可用率', '宕机次数', '平均恢复时间']
    }
  },
  
  '使用和转化': {
    monitor: {
      indicators: ['资源使用率', '转化率', '绩效评分', 'ROI'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [50, 100],
      generateData: (indicators) => generateMonitorData(indicators, [50, 100])
    },
    list: {
      columns: ['资源名称', '使用率', '转化率', '绩效评分', 'ROI'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['使用率分析', '转化率趋势', 'ROI分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['资源名称', '使用率', '转化率', '绩效评分']
    }
  },
  
  // 左侧导航页 - 服务健康
  '健康状态': {
    monitor: {
      indicators: ['健康评分', '异常指标数', '风险等级', '健康趋势'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [70, 100],
      generateData: (indicators) => generateMonitorData(indicators, [70, 100])
    },
    list: {
      columns: ['健康指标', '当前值', '状态', '风险等级', '更新时间'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['健康评分分析', '异常指标分析', '风险趋势'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['健康指标', '当前值', '状态', '风险等级']
    }
  },
  
  '黑名单状态': {
    monitor: {
      indicators: ['黑名单总数', '新增黑名单数', '处理中黑名单数', '已处理黑名单数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [100, 10000],
      generateData: (indicators) => generateMonitorData(indicators, [100, 10000])
    },
    list: {
      columns: ['黑名单ID', '类型', '状态', '添加时间', '处理人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['黑名单趋势分析', '类型分布', '处理情况分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['黑名单ID', '类型', '状态', '添加时间']
    }
  },
  
  '常见问题': {
    monitor: {
      indicators: ['问题总数', '未解决问题数', '解决率', '平均解决时间'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [50, 1000],
      generateData: (indicators) => generateMonitorData(indicators, [50, 1000])
    },
    list: {
      columns: ['问题名称', '类型', '状态', '创建时间', '处理人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['问题趋势分析', '类型分布', '解决率分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['问题名称', '类型', '状态', '创建时间']
    }
  },
  
  '健康干预绩效': {
    monitor: {
      indicators: ['干预次数', '成功率', '平均干预时间', '绩效评分'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [60, 100],
      generateData: (indicators) => generateMonitorData(indicators, [60, 100])
    },
    list: {
      columns: ['干预任务', '成功率', '平均时间', '绩效评分', '状态'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['干预效果分析', '成功率趋势', '绩效评分分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['干预任务', '成功率', '平均时间', '绩效评分']
    }
  },
  
  // 功能入口导航页 - 报警
  '报警状态': {
    monitor: {
      indicators: ['未处理报警数', '处理中报警数', '已处理报警数', '报警趋势'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [50, 5000],
      generateData: (indicators) => generateMonitorData(indicators, [50, 5000])
    },
    list: {
      columns: ['报警ID', '类型', '级别', '状态', '触发时间', '处理人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['报警趋势分析', '级别分布', '处理情况分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['报警ID', '类型', '级别', '状态']
    }
  },
  
  '督促': {
    monitor: {
      indicators: ['待督促任务数', '正在督促任务数', '已完成督促任务数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [100, 2000],
      generateData: (indicators) => generateMonitorData(indicators, [100, 2000])
    },
    list: {
      columns: ['督促ID', '对象', '内容', '状态', '督促时间', '处理人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['督促任务分析', '完成情况', '效率分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['督促ID', '对象', '内容', '状态']
    }
  },
  
  '报警处理绩效': {
    monitor: {
      indicators: ['处理效率', '平均处理时间', '处理成功率', '积压报警数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [70, 100],
      generateData: (indicators) => generateMonitorData(indicators, [70, 100])
    },
    list: {
      columns: ['绩效ID', '处理人', '报警类型', '处理时间', '状态'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['处理效率分析', '时间趋势', '成功率分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['绩效ID', '处理人', '报警类型', '处理时间']
    }
  },
  
  // 功能入口导航页 - 事件
  '业务运行事件': {
    monitor: {
      indicators: ['总事件数', '未处理事件数', '处理中事件数', '已处理事件数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [200, 10000],
      generateData: (indicators) => generateMonitorData(indicators, [200, 10000])
    },
    list: {
      columns: ['事件ID', '类型', '级别', '状态', '发生时间', '处理人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['事件趋势分析', '级别分布', '处理情况分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['事件ID', '类型', '级别', '状态']
    }
  },
  
  '岗位事件': {
    monitor: {
      indicators: ['总事件数', '未处理事件数', '处理中事件数', '已处理事件数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [100, 5000],
      generateData: (indicators) => generateMonitorData(indicators, [100, 5000])
    },
    list: {
      columns: ['事件ID', '岗位', '类型', '状态', '发生时间', '处理人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['岗位事件分析', '类型分布', '处理情况分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['事件ID', '岗位', '类型', '状态']
    }
  },
  
  '任务事件': {
    monitor: {
      indicators: ['总事件数', '未处理事件数', '处理中事件数', '已处理事件数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [150, 7500],
      generateData: (indicators) => generateMonitorData(indicators, [150, 7500])
    },
    list: {
      columns: ['事件ID', '任务ID', '类型', '状态', '发生时间', '处理人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['任务事件分析', '类型分布', '处理情况分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['事件ID', '任务ID', '类型', '状态']
    }
  },
  
  '绩效事件': {
    monitor: {
      indicators: ['总事件数', '未处理事件数', '处理中事件数', '已处理事件数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [80, 4000],
      generateData: (indicators) => generateMonitorData(indicators, [80, 4000])
    },
    list: {
      columns: ['事件ID', '绩效类型', '状态', '发生时间', '处理人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['绩效事件分析', '类型分布', '处理情况分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['事件ID', '绩效类型', '状态', '发生时间']
    }
  },
  
  // 功能入口导航页 - 任务
  '应急响应任务': {
    monitor: {
      indicators: ['总任务数', '待执行任务数', '执行中任务数', '已完成任务数', '失败任务数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [50, 2500],
      generateData: (indicators) => generateMonitorData(indicators, [50, 2500])
    },
    list: {
      columns: ['任务ID', '类型', '状态', '优先级', '创建时间', '执行人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['应急任务分析', '状态分布', '优先级分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['任务ID', '类型', '状态', '优先级']
    }
  },
  
  '视情干预计划任务': {
    monitor: {
      indicators: ['总任务数', '待执行任务数', '执行中任务数', '已完成任务数', '暂停任务数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [70, 3500],
      generateData: (indicators) => generateMonitorData(indicators, [70, 3500])
    },
    list: {
      columns: ['任务ID', '类型', '状态', '优先级', '创建时间', '执行人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['干预计划分析', '状态分布', '优先级分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['任务ID', '类型', '状态', '优先级']
    }
  },
  
  '常态化任务': {
    monitor: {
      indicators: ['总任务数', '待执行任务数', '执行中任务数', '已完成任务数', '失败任务数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [100, 5000],
      generateData: (indicators) => generateMonitorData(indicators, [100, 5000])
    },
    list: {
      columns: ['任务ID', '类型', '状态', '执行周期', '创建时间', '执行人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['常态化任务分析', '状态分布', '执行周期分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['任务ID', '类型', '状态', '执行周期']
    }
  },
  
  // 功能入口导航页 - 在线
  '岗位责任情况报告': {
    monitor: {
      indicators: ['总报告数', '未处理报告数', '处理中报告数', '已完成报告数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [60, 3000],
      generateData: (indicators) => generateMonitorData(indicators, [60, 3000])
    },
    list: {
      columns: ['报告ID', '岗位', '状态', '创建时间', '处理人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['责任报告分析', '状态分布', '岗位分布'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['报告ID', '岗位', '状态', '创建时间']
    }
  },
  
  '在线值守报告': {
    monitor: {
      indicators: ['总报告数', '未处理报告数', '处理中报告数', '已完成报告数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [80, 4000],
      generateData: (indicators) => generateMonitorData(indicators, [80, 4000])
    },
    list: {
      columns: ['报告ID', '值守人员', '状态', '创建时间', '处理人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['值守报告分析', '状态分布', '人员分布'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['报告ID', '值守人员', '状态', '创建时间']
    }
  },
  
  '岗位责任涉及报告': {
    monitor: {
      indicators: ['总报告数', '未处理报告数', '处理中报告数', '已完成报告数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [50, 2500],
      generateData: (indicators) => generateMonitorData(indicators, [50, 2500])
    },
    list: {
      columns: ['报告ID', '涉及岗位', '状态', '创建时间', '处理人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['涉及报告分析', '状态分布', '岗位分布'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['报告ID', '涉及岗位', '状态', '创建时间']
    }
  },
  
  '岗位综合绩效报告': {
    monitor: {
      indicators: ['总报告数', '未处理报告数', '处理中报告数', '已完成报告数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [70, 3500],
      generateData: (indicators) => generateMonitorData(indicators, [70, 3500])
    },
    list: {
      columns: ['报告ID', '岗位', '绩效评分', '状态', '创建时间', '处理人'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['绩效报告分析', '评分分布', '岗位分布'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['报告ID', '岗位', '绩效评分', '状态']
    }
  },
  
  // 功能入口导航页 - 个人中心
  '注册信息': {
    monitor: {
      indicators: [],
      chartTypes: [],
      dataRange: []
    },
    list: {
      columns: ['变更ID', '变更内容', '变更时间', '变更人'],
      generateData: (columns) => generateListData(columns)
    },
    form: {
      fields: ['用户名', '真实姓名', '邮箱', '手机号码', '部门', '职位']
    }
  },
  
  '个性化设置': {
    monitor: {
      indicators: [],
      chartTypes: [],
      dataRange: []
    },
    list: {
      columns: ['变更ID', '变更内容', '变更时间', '变更人'],
      generateData: (columns) => generateListData(columns)
    },
    form: {
      fields: ['主题设置', '语言设置', '通知设置', '显示设置']
    }
  },
  
  '我的内容': {
    monitor: {
      indicators: ['总内容数', '未读内容数', '已读内容数', '收藏内容数'],
      chartTypes: ['line', 'pie', 'bar'],
      dataRange: [100, 5000],
      generateData: (indicators) => generateMonitorData(indicators, [100, 5000])
    },
    list: {
      columns: ['内容ID', '标题', '类型', '状态', '创建时间', '阅读时间'],
      generateData: (columns) => generateListData(columns)
    },
    report: {
      sections: ['内容趋势分析', '类型分布', '阅读情况分析'],
      chartTypes: ['line', 'bar', 'pie']
    },
    form: {
      fields: ['内容ID', '标题', '类型', '状态']
    }
  }
};

// 内容导航项类型映射
const navTypeMap = {
  '实时动态': 'monitor',
  '近期发生': 'list',
  '历史回顾': 'list',
  '变化分析报告': 'report',
  '对比分析报告': 'report',
  '分布特征分析报告': 'report',
  '归因分析报告': 'report',
  '相关性分析报告': 'report',
  '我的个人关注': 'list',
  '推荐的关注': 'list',
  '强制关注': 'list',
  '处理任务变更操作': 'form',
  '响应操作': 'form',
  '参与协同操作': 'form'
};

export { pageContentConfig, navTypeMap };
export default pageContentConfig;