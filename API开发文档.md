# DC在线业务系统 - API开发文档

## 1. 文档概述

### 1.1 文档目的
本API开发文档旨在为开发人员提供DC在线业务系统API的详细说明，包括API设计原则、接口规范、认证授权机制、错误处理、接口列表和开发指南，帮助开发人员理解和使用系统的API接口。

### 1.2 适用范围
本文档适用于所有参与DC在线业务系统开发、集成和维护的开发人员，包括前端开发人员、后端开发人员和第三方集成开发人员。

### 1.3 术语定义
| 术语 | 解释 |
|------|------|
| API | 应用程序编程接口 |
| REST | 表述性状态转移，一种软件架构风格 |
| JWT | JSON Web Token，用于用户认证和授权 |
| RBAC | 基于角色的访问控制 |
| HTTP | 超文本传输协议 |
| HTTPS | 安全的超文本传输协议 |
| JSON | JavaScript对象表示法，一种数据交换格式 |
| CRUD | 创建(Create)、读取(Read)、更新(Update)、删除(Delete) |

## 2. API设计原则

### 2.1 RESTful设计
- **资源导向**：API设计以资源为中心，使用名词表示资源
- **统一接口**：使用标准的HTTP方法（GET、POST、PUT、DELETE等）
- **无状态**：每个请求都是独立的，服务器不保存客户端状态
- **分层系统**：API可以部署在多层服务器上
- **缓存机制**：支持HTTP缓存，提高性能
- **按需代码**：可选，允许服务器扩展客户端功能

### 2.2 版本控制
- 使用URL路径进行版本控制，例如：`/api/v1/users`
- 版本号使用数字，如v1、v2等
- 不推荐使用URL参数或请求头进行版本控制

### 2.3 认证授权
- 使用JWT进行用户认证
- 基于角色的访问控制（RBAC）
- API请求需要携带认证令牌
- 支持细粒度的权限控制

### 2.4 错误处理
- 使用标准的HTTP状态码
- 提供详细的错误信息
- 统一的错误响应格式
- 包含错误码和错误消息

### 2.5 数据格式
- 请求和响应数据使用JSON格式
- 统一的数据字段命名规范（驼峰式命名）
- 明确的数据类型和格式

### 2.6 速率限制
- 实现API速率限制，防止滥用
- 基于IP或用户的速率限制
- 返回速率限制相关的响应头

## 3. API基础信息

### 3.1 基础URL
- **开发环境**：`http://localhost:3000/api/v1`
- **测试环境**：`https://test.example.com/api/v1`
- **生产环境**：`https://api.example.com/api/v1`

### 3.2 请求方法
| HTTP方法 | 描述 |
|----------|------|
| GET | 获取资源 |
| POST | 创建资源 |
| PUT | 更新资源（全部更新） |
| PATCH | 更新资源（部分更新） |
| DELETE | 删除资源 |
| OPTIONS | 获取资源支持的HTTP方法 |

### 3.3 状态码
| 状态码 | 描述 |
|--------|------|
| 200 | 请求成功 |
| 201 | 资源创建成功 |
| 204 | 请求成功，但无响应体 |
| 400 | 请求参数错误 |
| 401 | 未认证，缺少或无效的认证令牌 |
| 403 | 已认证，但无权限访问资源 |
| 404 | 资源不存在 |
| 405 | HTTP方法不支持 |
| 409 | 资源冲突 |
| 500 | 服务器内部错误 |
| 501 | 功能未实现 |
| 502 | 网关错误 |
| 503 | 服务不可用 |
| 504 | 网关超时 |

### 3.4 请求头
| 请求头 | 描述 | 示例 |
|--------|------|------|
| Content-Type | 请求体的媒体类型 | application/json |
| Authorization | 认证令牌 | Bearer <token> |
| X-Requested-With | 请求来源 | XMLHttpRequest |
| Accept | 期望的响应媒体类型 | application/json |
| X-CSRF-Token | CSRF令牌 | <token> |

### 3.5 响应格式

#### 3.5.1 成功响应
```json
{
  "success": true,
  "data": { /* 响应数据 */ },
  "message": "请求成功",
  "code": 200
}
```

#### 3.5.2 列表响应
```json
{
  "success": true,
  "data": {
    "list": [ /* 列表数据 */ ],
    "total": 100,
    "page": 1,
    "pageSize": 20
  },
  "message": "请求成功",
  "code": 200
}
```

#### 3.5.3 错误响应
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": "详细错误信息（可选）"
  },
  "code": 400
}
```

### 3.6 分页
- 使用查询参数进行分页
- `page`：页码，默认1
- `pageSize`：每页数量，默认20，最大100

**示例**：
```
GET /api/v1/users?page=2&pageSize=50
```

### 3.7 排序
- 使用`sort`参数进行排序
- 格式：`sort=field1:asc,field2:desc`
- 默认排序：根据创建时间倒序

**示例**：
```
GET /api/v1/users?sort=name:asc,createdAt:desc
```

### 3.8 筛选
- 使用查询参数进行筛选
- 支持等值筛选、范围筛选、模糊筛选等

**示例**：
```
GET /api/v1/users?name=张三&age[gte]=18&email[like]=%@example.com
```

## 4. 认证和授权

### 4.1 JWT认证

#### 4.1.1 获取令牌
**请求**：
```
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": 1,
      "username": "admin",
      "name": "管理员",
      "role": "admin"
    }
  },
  "message": "登录成功",
  "code": 200
}
```

#### 4.1.2 使用令牌
- 在请求头中携带认证令牌
- 格式：`Authorization: Bearer <token>`

**示例**：
```
GET /api/v1/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4.2 权限控制

#### 4.2.1 基于角色的访问控制
- 系统使用RBAC（基于角色的访问控制）
- 角色定义：admin（管理员）、operator（操作员）、monitor（监控人员）、decision（决策人员）
- 权限定义：基于资源和操作的权限

#### 4.2.2 权限检查
- API请求会检查用户是否有相应的权限
- 权限不足时返回403状态码

### 4.3 令牌管理

#### 4.3.1 刷新令牌
**请求**：
```
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "token": "new-token",
    "expiresIn": 3600
  },
  "message": "令牌刷新成功",
  "code": 200
}
```

#### 4.3.2 注销令牌
**请求**：
```
POST /api/v1/auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**响应**：
```json
{
  "success": true,
  "message": "注销成功",
  "code": 200
}
```

## 5. 错误处理

### 5.1 错误码
| 错误码 | 描述 | 状态码 |
|--------|------|--------|
| INVALID_REQUEST | 无效的请求参数 | 400 |
| UNAUTHORIZED | 未认证或认证失败 | 401 |
| FORBIDDEN | 无权限访问 | 403 |
| NOT_FOUND | 资源不存在 | 404 |
| CONFLICT | 资源冲突 | 409 |
| SERVER_ERROR | 服务器内部错误 | 500 |
| SERVICE_UNAVAILABLE | 服务不可用 | 503 |
| INVALID_TOKEN | 无效的令牌 | 401 |
| EXPIRED_TOKEN | 令牌已过期 | 401 |
| INVALID_CREDENTIALS | 无效的凭证 | 401 |
| RATE_LIMIT_EXCEEDED | 超出速率限制 | 429 |

### 5.2 错误响应格式
```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "无效的请求参数",
    "details": {
      "name": "用户名不能为空",
      "email": "请输入有效的邮箱地址"
    }
  },
  "code": 400
}
```

### 5.3 常见错误

#### 5.3.1 认证错误
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "未认证，请先登录"
  },
  "code": 401
}
```

#### 5.3.2 权限错误
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "无权限访问此资源"
  },
  "code": 403
}
```

#### 5.3.3 资源不存在
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "用户不存在"
  },
  "code": 404
}
```

#### 5.3.4 服务器错误
```json
{
  "success": false,
  "error": {
    "code": "SERVER_ERROR",
    "message": "服务器内部错误，请稍后重试"
  },
  "code": 500
}
```

## 6. API接口文档

### 6.1 认证模块

#### 6.1.1 用户登录
**请求**：
```
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": 1,
      "username": "admin",
      "name": "管理员",
      "role": "admin"
    }
  },
  "message": "登录成功",
  "code": 200
}
```

#### 6.1.2 用户登出
**请求**：
```
POST /api/v1/auth/logout
Authorization: Bearer <token>
```

**响应**：
```json
{
  "success": true,
  "message": "登出成功",
  "code": 200
}
```

#### 6.1.3 获取当前用户信息
**请求**：
```
GET /api/v1/auth/me
Authorization: Bearer <token>
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "name": "管理员",
    "role": "admin",
    "email": "admin@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "获取成功",
  "code": 200
}
```

#### 6.1.4 刷新令牌
**请求**：
```
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "token": "<token>"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "token": "<new-token>",
    "expiresIn": 3600
  },
  "message": "令牌刷新成功",
  "code": 200
}
```

### 6.2 用户管理

#### 6.2.1 获取用户列表
**请求**：
```
GET /api/v1/users?page=1&pageSize=20&name=张三&sort=createdAt:desc
Authorization: Bearer <token>
```

**响应**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "username": "admin",
        "name": "管理员",
        "role": "admin",
        "email": "admin@example.com",
        "status": "active",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      },
      {
        "id": 2,
        "username": "operator",
        "name": "操作员",
        "role": "operator",
        "email": "operator@example.com",
        "status": "active",
        "createdAt": "2023-01-02T00:00:00.000Z",
        "updatedAt": "2023-01-02T00:00:00.000Z"
      }
    ],
    "total": 2,
    "page": 1,
    "pageSize": 20
  },
  "message": "获取成功",
  "code": 200
}
```

#### 6.2.2 获取用户详情
**请求**：
```
GET /api/v1/users/1
Authorization: Bearer <token>
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "name": "管理员",
    "role": "admin",
    "email": "admin@example.com",
    "status": "active",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "获取成功",
  "code": 200
}
```

#### 6.2.3 创建用户
**请求**：
```
POST /api/v1/users
Content-Type: application/json
Authorization: Bearer <token>

{
  "username": "newuser",
  "password": "password123",
  "name": "新用户",
  "email": "newuser@example.com",
  "role": "operator",
  "status": "active"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": 3,
    "username": "newuser",
    "name": "新用户",
    "role": "operator",
    "email": "newuser@example.com",
    "status": "active",
    "createdAt": "2023-01-03T00:00:00.000Z",
    "updatedAt": "2023-01-03T00:00:00.000Z"
  },
  "message": "创建成功",
  "code": 201
}
```

#### 6.2.4 更新用户
**请求**：
```
PUT /api/v1/users/3
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "更新后的用户",
  "email": "updated@example.com",
  "status": "active"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": 3,
    "username": "newuser",
    "name": "更新后的用户",
    "role": "operator",
    "email": "updated@example.com",
    "status": "active",
    "createdAt": "2023-01-03T00:00:00.000Z",
    "updatedAt": "2023-01-04T00:00:00.000Z"
  },
  "message": "更新成功",
  "code": 200
}
```

#### 6.2.5 删除用户
**请求**：
```
DELETE /api/v1/users/3
Authorization: Bearer <token>
```

**响应**：
```json
{
  "success": true,
  "message": "删除成功",
  "code": 204
}
```

### 6.3 角色管理

#### 6.3.1 获取角色列表
**请求**：
```
GET /api/v1/roles?page=1&pageSize=20
Authorization: Bearer <token>
```

**响应**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "name": "admin",
        "description": "管理员",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      },
      {
        "id": 2,
        "name": "operator",
        "description": "操作员",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ],
    "total": 2,
    "page": 1,
    "pageSize": 20
  },
  "message": "获取成功",
  "code": 200
}
```

#### 6.3.2 创建角色
**请求**：
```
POST /api/v1/roles
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "monitor",
  "description": "监控人员"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "monitor",
    "description": "监控人员",
    "createdAt": "2023-01-05T00:00:00.000Z",
    "updatedAt": "2023-01-05T00:00:00.000Z"
  },
  "message": "创建成功",
  "code": 201
}
```

### 6.4 权限管理

#### 6.4.1 获取权限列表
**请求**：
```
GET /api/v1/permissions
Authorization: Bearer <token>
```

**响应**：
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "user:read",
      "description": "读取用户权限",
      "resource": "user",
      "action": "read",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "name": "user:create",
      "description": "创建用户权限",
      "resource": "user",
      "action": "create",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "message": "获取成功",
  "code": 200
}
```

#### 6.4.2 为角色分配权限
**请求**：
```
POST /api/v1/roles/1/permissions
Content-Type: application/json
Authorization: Bearer <token>

{
  "permissionIds": [1, 2]
}
```

**响应**：
```json
{
  "success": true,
  "message": "权限分配成功",
  "code": 200
}
```

### 6.5 报警管理

#### 6.5.1 获取报警列表
**请求**：
```
GET /api/v1/alarms?page=1&pageSize=20&status=unhandled&level=high
Authorization: Bearer <token>
```

**响应**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "type": "system",
        "level": "high",
        "title": "系统CPU使用率过高",
        "content": "CPU使用率超过90%",
        "status": "unhandled",
        "deviceId": 1,
        "triggerTime": "2023-01-01T10:00:00.000Z",
        "createdAt": "2023-01-01T10:00:00.000Z",
        "updatedAt": "2023-01-01T10:00:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 20
  },
  "message": "获取成功",
  "code": 200
}
```

#### 6.5.2 处理报警
**请求**：
```
PUT /api/v1/alarms/1/handle
Content-Type: application/json
Authorization: Bearer <token>

{
  "handlerId": 1,
  "handleResult": "已处理，CPU使用率已恢复正常"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": 1,
    "type": "system",
    "level": "high",
    "title": "系统CPU使用率过高",
    "content": "CPU使用率超过90%",
    "status": "handled",
    "deviceId": 1,
    "triggerTime": "2023-01-01T10:00:00.000Z",
    "handlerId": 1,
    "handleTime": "2023-01-01T10:30:00.000Z",
    "handleResult": "已处理，CPU使用率已恢复正常",
    "createdAt": "2023-01-01T10:00:00.000Z",
    "updatedAt": "2023-01-01T10:30:00.000Z"
  },
  "message": "处理成功",
  "code": 200
}
```

### 6.6 事件管理

#### 6.6.1 获取事件列表
**请求**：
```
GET /api/v1/events?page=1&pageSize=20&type=business&startTime=2023-01-01T00:00:00Z&endTime=2023-01-31T23:59:59Z
Authorization: Bearer <token>
```

**响应**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "type": "business",
        "level": "info",
        "title": "业务事件",
        "content": "业务数据更新",
        "impactScope": "system",
        "deviceId": 1,
        "userId": 1,
        "eventTime": "2023-01-01T11:00:00.000Z",
        "status": "completed",
        "result": "成功",
        "createdAt": "2023-01-01T11:00:00.000Z",
        "updatedAt": "2023-01-01T11:00:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 20
  },
  "message": "获取成功",
  "code": 200
}
```

### 6.7 任务管理

#### 6.7.1 获取任务列表
**请求**：
```
GET /api/v1/tasks?page=1&pageSize=20&status=pending
Authorization: Bearer <token>
```

**响应**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "name": "数据备份任务",
        "type": "backup",
        "status": "pending",
        "executorId": 1,
        "content": "备份数据库",
        "startTime": null,
        "endTime": null,
        "expectedCompletionTime": "2023-01-01T12:00:00.000Z",
        "actualCompletionTime": null,
        "progress": 0,
        "result": null,
        "createdAt": "2023-01-01T10:00:00.000Z",
        "updatedAt": "2023-01-01T10:00:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 20
  },
  "message": "获取成功",
  "code": 200
}
```

#### 6.7.2 创建任务
**请求**：
```
POST /api/v1/tasks
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "新任务",
  "type": "regular",
  "executorId": 1,
  "content": "执行定期任务",
  "expectedCompletionTime": "2023-01-01T13:00:00.000Z"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "新任务",
    "type": "regular",
    "status": "pending",
    "executorId": 1,
    "content": "执行定期任务",
    "startTime": null,
    "endTime": null,
    "expectedCompletionTime": "2023-01-01T13:00:00.000Z",
    "actualCompletionTime": null,
    "progress": 0,
    "result": null,
    "createdAt": "2023-01-01T11:30:00.000Z",
    "updatedAt": "2023-01-01T11:30:00.000Z"
  },
  "message": "创建成功",
  "code": 201
}
```

### 6.8 设备管理

#### 6.8.1 获取设备列表
**请求**：
```
GET /api/v1/devices?page=1&pageSize=20&status=online
Authorization: Bearer <token>
```

**响应**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "name": "服务器1",
        "code": "SERVER_001",
        "type": "server",
        "status": "online",
        "ipAddress": "192.168.1.100",
        "macAddress": "00:00:00:00:00:01",
        "location": "机房A",
        "manufacturer": "Dell",
        "model": "PowerEdge R740",
        "firmwareVersion": "1.0.0",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "lastOnlineTime": "2023-01-01T12:00:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 20
  },
  "message": "获取成功",
  "code": 200
}
```

### 6.9 指标管理

#### 6.9.1 获取指标数据
**请求**：
```
GET /api/v1/indicators?deviceId=1&indicatorCode=cpu_usage&startTime=2023-01-01T00:00:00Z&endTime=2023-01-01T12:00:00Z
Authorization: Bearer <token>
```

**响应**：
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "deviceId": 1,
      "indicatorCode": "cpu_usage",
      "value": 85.5,
      "unit": "%",
      "collectionTime": "2023-01-01T11:00:00.000Z",
      "createdAt": "2023-01-01T11:00:00.000Z"
    },
    {
      "id": 2,
      "deviceId": 1,
      "indicatorCode": "cpu_usage",
      "value": 90.2,
      "unit": "%",
      "collectionTime": "2023-01-01T11:30:00.000Z",
      "createdAt": "2023-01-01T11:30:00.000Z"
    }
  ],
  "message": "获取成功",
  "code": 200
}
```

### 6.10 统计分析

#### 6.10.1 获取运营全景统计
**请求**：
```
GET /api/v1/statistics/operation-overview?startTime=2023-01-01T00:00:00Z&endTime=2023-01-31T23:59:59Z
Authorization: Bearer <token>
```

**响应**：
```json
{
  "success": true,
  "data": {
    "totalUsers": 1000,
    "activeUsers": 850,
    "totalDevices": 50,
    "onlineDevices": 45,
    "totalAlarms": 10,
    "unhandledAlarms": 2,
    "totalEvents": 100,
    "successfulEvents": 95,
    "totalTasks": 20,
    "completedTasks": 18
  },
  "message": "获取成功",
  "code": 200
}
```

## 5. API开发指南

### 5.1 环境设置

#### 5.1.1 开发环境要求
- Node.js 18+
- npm 9+
- MySQL 8+
- Redis 7+
- Git

#### 5.1.2 安装依赖
```bash
npm install
```

#### 5.1.3 配置环境变量
创建`.env`文件：
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=dc_system
JWT_SECRET=secret_key
REDIS_HOST=localhost
REDIS_PORT=6379
```

#### 5.1.4 启动开发服务器
```bash
npm run dev
```

### 5.2 开发流程

1. **克隆代码**：从Git仓库克隆代码
2. **创建分支**：创建特性分支
3. **开发功能**：实现API功能
4. **编写测试**：编写单元测试和集成测试
5. **代码检查**：运行ESLint和Prettier
6. **提交代码**：提交代码到Git仓库
7. **创建PR**：创建Pull Request
8. **代码评审**：进行代码评审
9. **合并代码**：合并到主分支

### 5.3 测试方法

#### 5.3.1 单元测试
```bash
npm run test
```

#### 5.3.2 集成测试
```bash
npm run test:integration
```

#### 5.3.3 API测试
使用Postman或curl测试API：
```bash
curl -X GET http://localhost:3000/api/v1/users -H "Authorization: Bearer <token>"
```

### 5.4 部署流程

#### 5.4.1 构建生产版本
```bash
npm run build
```

#### 5.4.2 启动生产服务器
```bash
npm start
```

#### 5.4.3 使用PM2管理进程
```bash
pm install pm2 -g
pm run pm2:start
```

#### 5.4.4 Docker部署
```bash
docker build -t dc-api .
docker run -p 3000:3000 dc-api
```

## 6. 最佳实践

### 6.1 API设计最佳实践
- **使用名词表示资源**：`/users`而不是`/get-users`
- **使用复数形式**：`/users`而不是`/user`
- **使用HTTP方法表示操作**：GET/POST/PUT/DELETE
- **使用查询参数进行筛选、排序和分页**
- **返回适当的状态码**
- **提供详细的错误信息**
- **使用一致的命名规范**（驼峰式命名）
- **版本化API**

### 6.2 性能优化
- **实现缓存机制**：使用Redis缓存热点数据
- **优化数据库查询**：添加适当的索引
- **实现分页**：避免返回大量数据
- **使用异步编程**：提高并发处理能力
- **实现速率限制**：防止滥用
- **压缩响应数据**：使用gzip压缩

### 6.3 安全最佳实践
- **使用HTTPS**：加密传输数据
- **使用JWT认证**：安全的认证机制
- **实现权限控制**：基于角色的访问控制
- **验证输入参数**：防止SQL注入、XSS等攻击
- **使用参数化查询**：防止SQL注入
- **实现输入验证**：验证请求参数
- **使用CSRF保护**：防止CSRF攻击
- **记录安全日志**：记录关键操作
- **定期更新依赖**：修复已知漏洞

## 7. 附录

### 7.1 参考资料
- [RESTful API设计指南](https://restfulapi.net/)
- [HTTP状态码](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [JWT官方文档](https://jwt.io/)
- [Node.js官方文档](https://nodejs.org/)
- [Express官方文档](https://expressjs.com/)

### 7.2 联系方式

| 联系方式 | 联系人 | 电话 | 邮箱 |
|----------|--------|------|------|
| API团队 | 张三 | 138****1234 | api-team@example.com |
| 技术支持 | 李四 | 139****5678 | support@example.com |
| 文档反馈 | 王五 | 137****9012 | docs@example.com |

### 7.3 版本历史

| 版本 | 日期 | 更新内容 | 更新人 |
|------|------|----------|--------|
| V1.0 | 2023-01-01 | 初始版本 | API团队 |
| V1.1 | 2023-03-15 | 增加了设备管理和指标管理API | API团队 |
| V1.2 | 2023-06-30 | 优化了错误处理和响应格式 | API团队 |
| V1.3 | 2023-09-30 | 增加了统计分析API | API团队 |
