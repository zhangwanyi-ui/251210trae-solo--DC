# DC在线业务系统 - API接口文档

## 1. 文档概述

### 1.1 文档目的

本文档详细描述了DC在线业务系统的API接口设计，包括接口规范、接口列表、请求/响应格式、认证方式等，为前后端开发团队提供明确的接口开发依据，确保系统接口设计合理、规范统一、易于维护。

### 1.2 术语定义

| 术语 | 解释 |
|------|------|
| API | 应用程序编程接口，用于系统内部或外部系统之间的数据交互 |
| JWT | JSON Web Token，用于用户认证和授权的令牌机制 |
| RBAC | 基于角色的访问控制（Role-Based Access Control），用于权限管理 |
| RESTful | 一种API设计风格，使用HTTP方法和URI来表示资源和操作 |
| 接口规范 | API接口的设计标准，包括命名规则、请求/响应格式、状态码等 |

## 2. 接口规范

### 2.1 HTTP方法

系统API采用RESTful设计风格，使用以下HTTP方法：

| HTTP方法 | 含义 |
|----------|------|
| GET | 获取资源 |
| POST | 创建资源 |
| PUT | 更新资源 |
| DELETE | 删除资源 |
| PATCH | 部分更新资源 |

### 2.2 状态码

系统API使用以下HTTP状态码：

| 状态码 | 含义 |
|--------|------|
| 200 | 请求成功 |
| 201 | 资源创建成功 |
| 400 | 请求参数错误 |
| 401 | 未授权，需要登录 |
| 403 | 拒绝访问，没有权限 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

### 2.3 请求/响应格式

#### 2.3.1 请求格式

- **URL格式**：`https://api.example.com/api/[resource]/[id]`
- **请求头**：
  - `Content-Type: application/json`
  - `Authorization: Bearer [token]`（认证令牌）
- **请求体**：JSON格式

#### 2.3.2 响应格式

- **成功响应**：
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {}
  }
  ```

- **失败响应**：
  ```json
  {
    "code": 400,
    "message": "error message",
    "data": null
  }
  ```

### 2.4 认证方式

系统采用JWT（JSON Web Token）进行认证：

1. 用户登录成功后，服务器返回JWT令牌
2. 客户端在后续请求中，将令牌放在请求头的Authorization字段中
3. 服务器验证令牌的有效性，决定是否允许访问

### 2.5 分页规范

对于返回列表数据的接口，采用以下分页参数和响应格式：

#### 2.5.1 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| page | Number | 否 | 当前页码，默认1 |
| pageSize | Number | 否 | 每页条数，默认10 |
| keyword | String | 否 | 搜索关键词 |

#### 2.5.2 响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [],
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "pages": 10
  }
}
```

## 3. 详细接口列表

### 3.1 用户认证接口

| 接口名称 | 请求方法 | URL | 功能描述 | 请求参数 | 返回值 | 权限要求 |
|----------|----------|-----|----------|----------|--------|----------|
| 用户登录 | POST | /api/auth/login | 用户登录 | `{"username": "admin", "password": "123456"}` | `{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "userInfo": {...}}` | 无 |
| 用户登出 | POST | /api/auth/logout | 用户登出 | - | `{"success": true, "message": "登出成功"}` | 已登录用户 |
| 获取当前用户信息 | GET | /api/auth/current-user | 获取当前用户信息 | - | `{"userInfo": {...}}` | 已登录用户 |
| 刷新令牌 | POST | /api/auth/refresh-token | 刷新JWT令牌 | `{"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}` | `{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}` | 已登录用户 |
| 权限验证 | GET | /api/auth/verify-permission | 验证用户是否有某权限 | `permissionCode`（查询参数） | `{"hasPermission": true}` | 已登录用户 |

### 3.2 用户管理接口

| 接口名称 | 请求方法 | URL | 功能描述 | 请求参数 | 返回值 | 权限要求 |
|----------|----------|-----|----------|----------|--------|----------|
| 获取用户列表 | GET | /api/users | 获取用户列表 | `page`, `pageSize`, `keyword`（查询参数） | `{"list": [...], "total": 100, ...}` | 管理员 |
| 获取用户详情 | GET | /api/users/:id | 获取用户详情 | `id`（路径参数） | `{"userInfo": {...}}` | 管理员 |
| 创建用户 | POST | /api/users | 创建用户 | `{"username": "test", "password": "123456", "realName": "测试用户", "email": "test@example.com", "phone": "13800138000", "roleId": 1}` | `{"success": true, "message": "创建成功", "userId": 1}` | 管理员 |
| 更新用户 | PUT | /api/users/:id | 更新用户 | `id`（路径参数） + `{"realName": "测试用户1", "email": "test1@example.com", "phone": "13800138001", "roleId": 2}` | `{"success": true, "message": "更新成功"}` | 管理员 |
| 删除用户 | DELETE | /api/users/:id | 删除用户 | `id`（路径参数） | `{"success": true, "message": "删除成功"}` | 管理员 |
| 启用/禁用用户 | PUT | /api/users/:id/status | 启用/禁用用户 | `id`（路径参数） + `{"status": 1}` | `{"success": true, "message": "操作成功"}` | 管理员 |

### 3.3 角色管理接口

| 接口名称 | 请求方法 | URL | 功能描述 | 请求参数 | 返回值 | 权限要求 |
|----------|----------|-----|----------|----------|--------|----------|
| 获取角色列表 | GET | /api/roles | 获取角色列表 | `page`, `pageSize`, `keyword`（查询参数） | `{"list": [...], "total": 10, ...}` | 管理员 |
| 获取角色详情 | GET | /api/roles/:id | 获取角色详情 | `id`（路径参数） | `{"roleInfo": {...}}` | 管理员 |
| 创建角色 | POST | /api/roles | 创建角色 | `{"roleName": "测试角色", "description": "测试角色描述"}` | `{"success": true, "message": "创建成功", "roleId": 1}` | 管理员 |
| 更新角色 | PUT | /api/roles/:id | 更新角色 | `id`（路径参数） + `{"roleName": "测试角色1", "description": "测试角色描述1"}` | `{"success": true, "message": "更新成功"}` | 管理员 |
| 删除角色 | DELETE | /api/roles/:id | 删除角色 | `id`（路径参数） | `{"success": true, "message": "删除成功"}` | 管理员 |
| 分配权限 | POST | /api/roles/:id/permissions | 为角色分配权限 | `id`（路径参数） + `{"permissions": [1, 2, 3]}` | `{"success": true, "message": "分配成功"}` | 管理员 |

### 3.4 权限管理接口

| 接口名称 | 请求方法 | URL | 功能描述 | 请求参数 | 返回值 | 权限要求 |
|----------|----------|-----|----------|----------|--------|----------|
| 获取权限列表 | GET | /api/permissions | 获取权限列表 | `type`（查询参数，1:菜单, 2:按钮, 3:接口） | `{"permissions": [...]}` | 管理员 |
| 获取权限树 | GET | /api/permissions/tree | 获取权限树 | - | `{"permissionTree": [...]}` | 管理员 |
| 创建权限 | POST | /api/permissions | 创建权限 | `{"permissionName": "测试权限", "permissionCode": "test:permission", "permissionType": 1, "parentId": 0, "path": "/test", "component": "Test", "icon": "test", "sort": 0}` | `{"success": true, "message": "创建成功", "permissionId": 1}` | 管理员 |
| 更新权限 | PUT | /api/permissions/:id | 更新权限 | `id`（路径参数） + `{"permissionName": "测试权限1", "permissionCode": "test:permission1", "sort": 1}` | `{"success": true, "message": "更新成功"}` | 管理员 |
| 删除权限 | DELETE | /api/permissions/:id | 删除权限 | `id`（路径参数） | `{"success": true, "message": "删除成功"}` | 管理员 |

### 3.5 报警管理接口

| 接口名称 | 请求方法 | URL | 功能描述 | 请求参数 | 返回值 | 权限要求 |
|----------|----------|-----|----------|----------|--------|----------|
| 获取报警列表 | GET | /api/alarms | 获取报警列表 | `page`, `pageSize`, `status`, `level`, `startTime`, `endTime`（查询参数） | `{"list": [...], "total": 100, ...}` | 管理员、监控人员 |
| 获取报警详情 | GET | /api/alarms/:id | 获取报警详情 | `id`（路径参数） | `{"alarmInfo": {...}}` | 管理员、监控人员 |
| 处理报警 | PUT | /api/alarms/:id/handle | 处理报警 | `id`（路径参数） + `{"handlerId": 1, "handleResult": "处理完成"}` | `{"success": true, "message": "处理成功"}` | 管理员、监控人员 |
| 关闭报警 | PUT | /api/alarms/:id/close | 关闭报警 | `id`（路径参数） | `{"success": true, "message": "关闭成功"}` | 管理员、监控人员 |
| 报警统计 | GET | /api/alarms/statistics | 获取报警统计数据 | `startTime`, `endTime`（查询参数） | `{"statistics": {...}}` | 管理员、监控人员 |

### 3.6 事件管理接口

| 接口名称 | 请求方法 | URL | 功能描述 | 请求参数 | 返回值 | 权限要求 |
|----------|----------|-----|----------|----------|--------|----------|
| 获取事件列表 | GET | /api/events | 获取事件列表 | `page`, `pageSize`, `type`, `level`, `startTime`, `endTime`（查询参数） | `{"list": [...], "total": 100, ...}` | 管理员、监控人员 |
| 获取事件详情 | GET | /api/events/:id | 获取事件详情 | `id`（路径参数） | `{"eventInfo": {...}}` | 管理员、监控人员 |
| 创建事件 | POST | /api/events | 创建事件 | `{"eventType": "业务事件", "eventLevel": 2, "title": "测试事件", "content": "测试事件内容", "impactScope": "系统A", "deviceId": 1, "eventTime": "2023-01-01 12:00:00"}` | `{"success": true, "message": "创建成功", "eventId": 1}` | 管理员、监控人员 |
| 更新事件 | PUT | /api/events/:id | 更新事件 | `id`（路径参数） + `{"title": "测试事件1", "content": "测试事件内容1", "status": 2, "result": "处理完成"}` | `{"success": true, "message": "更新成功"}` | 管理员、监控人员 |
| 事件查询 | GET | /api/events/search | 搜索事件 | `keyword`, `startTime`, `endTime`（查询参数） | `{"events": [...]}` | 管理员、监控人员 |

### 3.7 任务管理接口

| 接口名称 | 请求方法 | URL | 功能描述 | 请求参数 | 返回值 | 权限要求 |
|----------|----------|-----|----------|----------|--------|----------|
| 获取任务列表 | GET | /api/tasks | 获取任务列表 | `page`, `pageSize`, `status`, `executorId`（查询参数） | `{"list": [...], "total": 100, ...}` | 管理员、业务操作员 |
| 获取任务详情 | GET | /api/tasks/:id | 获取任务详情 | `id`（路径参数） | `{"taskInfo": {...}}` | 管理员、业务操作员 |
| 创建任务 | POST | /api/tasks | 创建任务 | `{"taskName": "测试任务", "taskType": "应急任务", "executorId": 1, "content": "测试任务内容", "expectedCompletionTime": "2023-01-02 12:00:00"}` | `{"success": true, "message": "创建成功", "taskId": 1}` | 管理员、业务操作员 |
| 更新任务 | PUT | /api/tasks/:id | 更新任务 | `id`（路径参数） + `{"taskName": "测试任务1", "content": "测试任务内容1", "expectedCompletionTime": "2023-01-03 12:00:00"}` | `{"success": true, "message": "更新成功"}` | 管理员、业务操作员 |
| 删除任务 | DELETE | /api/tasks/:id | 删除任务 | `id`（路径参数） | `{"success": true, "message": "删除成功"}` | 管理员、业务操作员 |
| 执行任务 | PUT | /api/tasks/:id/execute | 执行任务 | `id`（路径参数） | `{"success": true, "message": "执行成功"}` | 管理员、业务操作员 |
| 暂停任务 | PUT | /api/tasks/:id/pause | 暂停任务 | `id`（路径参数） | `{"success": true, "message": "暂停成功"}` | 管理员、业务操作员 |
| 任务进度更新 | PUT | /api/tasks/:id/progress | 更新任务进度 | `id`（路径参数） + `{"progress": 50, "result": "进行中"}` | `{"success": true, "message": "更新成功"}` | 管理员、业务操作员 |

### 3.8 设备管理接口

| 接口名称 | 请求方法 | URL | 功能描述 | 请求参数 | 返回值 | 权限要求 |
|----------|----------|-----|----------|----------|--------|----------|
| 获取设备列表 | GET | /api/devices | 获取设备列表 | `page`, `pageSize`, `status`, `keyword`（查询参数） | `{"list": [...], "total": 100, ...}` | 管理员、监控人员 |
| 获取设备详情 | GET | /api/devices/:id | 获取设备详情 | `id`（路径参数） | `{"deviceInfo": {...}}` | 管理员、监控人员 |
| 创建设备 | POST | /api/devices | 创建设备 | `{"deviceName": "测试设备", "deviceCode": "DEV001", "deviceType": "服务器", "status": 1, "ipAddress": "192.168.1.1", "macAddress": "00:00:00:00:00:01", "location": "机房A", "manufacturer": "厂商A", "model": "型号A", "firmwareVersion": "1.0.0"}` | `{"success": true, "message": "创建成功", "deviceId": 1}` | 管理员 |
| 更新设备 | PUT | /api/devices/:id | 更新设备 | `id`（路径参数） + `{"deviceName": "测试设备1", "status": 2, "location": "机房B", "firmwareVersion": "1.0.1"}` | `{"success": true, "message": "更新成功"}` | 管理员 |
| 删除设备 | DELETE | /api/devices/:id | 删除设备 | `id`（路径参数） | `{"success": true, "message": "删除成功"}` | 管理员 |
| 获取设备在线状态 | GET | /api/devices/online-status | 获取设备在线状态 | - | `{"onlineCount": 50, "offlineCount": 10, "totalCount": 60}` | 管理员、监控人员 |

### 3.9 指标监控接口

| 接口名称 | 请求方法 | URL | 功能描述 | 请求参数 | 返回值 | 权限要求 |
|----------|----------|-----|----------|----------|--------|----------|
| 获取指标数据 | GET | /api/indicators | 获取指标数据 | `deviceId`, `indicatorCode`, `startTime`, `endTime`（查询参数） | `{"indicators": [...]}` | 管理员、监控人员 |
| 获取实时指标 | GET | /api/indicators/realtime | 获取实时指标数据 | `deviceId`（查询参数） | `{"realtimeData": {...}}` | 管理员、监控人员 |
| 指标统计 | GET | /api/indicators/statistics | 获取指标统计数据 | `deviceId`, `indicatorCode`, `startTime`, `endTime`, `interval`（查询参数） | `{"statistics": {...}}` | 管理员、监控人员 |

### 3.10 统计分析接口

| 接口名称 | 请求方法 | URL | 功能描述 | 请求参数 | 返回值 | 权限要求 |
|----------|----------|-----|----------|----------|--------|----------|
| 运营全景统计 | GET | /api/statistics/operation-overview | 获取运营全景统计数据 | `startTime`, `endTime`（查询参数） | `{"statistics": {...}}` | 管理员、决策人员 |
| 价值链分析 | GET | /api/statistics/value-chain | 获取价值链分析数据 | `startTime`, `endTime`（查询参数） | `{"valueChainData": {...}}` | 管理员、决策人员 |
| 资源池统计 | GET | /api/statistics/resource-pool | 获取资源池统计数据 | `startTime`, `endTime`（查询参数） | `{"resourcePoolData": {...}}` | 管理员、决策人员 |
| 访客分析 | GET | /api/statistics/visitors | 获取访客分析数据 | `startTime`, `endTime`（查询参数） | `{"visitorData": {...}}` | 管理员、决策人员 |
| 渠道分析 | GET | /api/statistics/channels | 获取渠道分析数据 | `startTime`, `endTime`（查询参数） | `{"channelData": {...}}` | 管理员、决策人员 |
| 行为分析 | GET | /api/statistics/behaviors | 获取行为分析数据 | `startTime`, `endTime`（查询参数） | `{"behaviorData": {...}}` | 管理员、决策人员 |

### 3.11 系统配置接口

| 接口名称 | 请求方法 | URL | 功能描述 | 请求参数 | 返回值 | 权限要求 |
|----------|----------|-----|----------|----------|--------|----------|
| 获取系统配置 | GET | /api/configs | 获取系统配置 | `configKey`（查询参数） | `{"configs": {...}}` | 管理员 |
| 更新系统配置 | PUT | /api/configs | 更新系统配置 | `{"configKey1": "value1", "configKey2": "value2"}` | `{"success": true, "message": "更新成功"}` | 管理员 |
| 获取配置项 | GET | /api/configs/:key | 获取单个配置项 | `key`（路径参数） | `{"config": {...}}` | 管理员 |
| 更新配置项 | PUT | /api/configs/:key | 更新单个配置项 | `key`（路径参数） + `{"value": "newValue"}` | `{"success": true, "message": "更新成功"}` | 管理员 |

### 3.12 通用接口

| 接口名称 | 请求方法 | URL | 功能描述 | 请求参数 | 返回值 | 权限要求 |
|----------|----------|-----|----------|----------|--------|----------|
| 文件上传 | POST | /api/files/upload | 文件上传 | `file`（FormData） | `{"fileUrl": "http://example.com/file.jpg", "fileName": "file.jpg"}` | 已登录用户 |
| 文件下载 | GET | /api/files/download/:id | 文件下载 | `id`（路径参数） | `file`（Binary） | 已登录用户 |
| 数据导出 | POST | /api/common/export | 数据导出 | `{"data": [...], "type": "excel", "filename": "数据导出"}` | `{"fileUrl": "http://example.com/export.xlsx"}` | 已登录用户 |
| 数据导入 | POST | /api/common/import | 数据导入 | `file`（FormData）, `type`（FormData） | `{"success": true, "message": "导入成功"}` | 管理员、业务操作员 |

## 4. API版本控制

系统API采用URL路径版本控制：

```
https://api.example.com/api/v1/[resource]
```

当前版本：v1

## 5. 接口安全

### 5.1 认证与授权

- 使用JWT令牌进行认证
- 基于RBAC进行权限控制
- 敏感操作需要二次验证

### 5.2 数据安全

- 敏感数据传输使用HTTPS加密
- 密码使用BCrypt等算法加密存储
- 敏感数据在响应中脱敏处理

### 5.3 防攻击措施

- 实现API限流，防止DDoS攻击
- 输入参数验证，防止SQL注入、XSS等攻击
- 防止CSRF攻击

## 6. 接口测试

### 6.1 测试工具

推荐使用以下工具进行API测试：

- Postman
- Insomnia
- Swagger UI
- curl

### 6.2 测试环境

| 环境 | URL |
|------|-----|
| 开发环境 | http://dev-api.example.com |
| 测试环境 | http://test-api.example.com |
| 生产环境 | https://api.example.com |

## 7. 附录

### 7.1 接口文档更新日志

| 版本 | 更新时间 | 更新内容 | 更新人 |
|------|----------|----------|--------|
| v1.0 | 2023-01-01 | 初始版本 | 产品经理 |

### 7.2 联系方式

| 角色 | 姓名 | 联系方式 |
|------|------|----------|
| 产品经理 | XXX | XXX@example.com |
| 后端开发负责人 | XXX | XXX@example.com |
| 前端开发负责人 | XXX | XXX@example.com |
| 测试负责人 | XXX | XXX@example.com |