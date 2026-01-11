# 快捷键问题排查指南

## 🔍 问题诊断

KoalaSnap 的快捷键 `Ctrl+Shift+S` (Mac: `Cmd+Shift+S`) 无法使用。

## 🛠️ 解决方案

### 方法 1：检查快捷键配置（推荐）

1. **打开快捷键管理页面**
   - 在 Chrome 地址栏输入：`chrome://extensions/shortcuts`
   - 或者：
     - 打开 `chrome://extensions/`
     - 点击左上角的 ☰ 菜单
     - 选择"键盘快捷键"

2. **查找 KoalaSnap**
   - 找到"KoalaSnap - 考拉易截"
   - 查看"快速截取可见区域"的快捷键设置

3. **配置快捷键**
   - 如果显示"未设置"，点击输入框
   - 按下您想要的快捷键组合（如 `Ctrl+Shift+S`）
   - 如果提示冲突，选择其他组合

### 方法 2：更改快捷键（如果冲突）

如果 `Ctrl+Shift+S` 与其他扩展冲突，可以尝试：

**推荐的替代快捷键：**
- `Ctrl+Shift+X`
- `Ctrl+Shift+P`
- `Alt+Shift+S`
- `Ctrl+Alt+S`

**修改方法：**
1. 在 `chrome://extensions/shortcuts` 页面
2. 找到 KoalaSnap
3. 点击快捷键输入框
4. 按下新的快捷键组合

### 方法 3：修改 manifest.json（永久更改）

如果您想永久更改默认快捷键，编辑 `manifest.json`：

```json
"commands": {
  "capture-visible": {
    "suggested_key": {
      "default": "Ctrl+Shift+X",  // 改为其他组合
      "mac": "Command+Shift+X"
    },
    "description": "快速截取可见区域"
  }
}
```

然后重新加载扩展。

## ⚠️ 常见问题

### 1. 快捷键不生效
**原因**：
- Chrome 内部页面（如 `chrome://`、`chrome-extension://`）不支持扩展快捷键
- 新标签页可能不支持
- 某些特殊页面（如 Chrome Web Store）不支持

**解决**：在普通网页（如 Google、GitHub）上测试

### 2. 快捷键冲突
**原因**：
- 其他扩展使用了相同的快捷键
- Chrome 自带功能占用了该快捷键
- 操作系统快捷键冲突

**解决**：
- 在 `chrome://extensions/shortcuts` 中查看冲突
- 更改为其他快捷键组合

### 3. Mac 上的特殊情况
**原因**：
- Mac 的 `Cmd+Shift+S` 可能被系统占用
- 某些应用可能拦截该快捷键

**解决**：
- 尝试其他组合，如 `Cmd+Shift+X`
- 检查系统偏好设置中的快捷键

## ✅ 测试步骤

1. **打开普通网页**
   - 访问 https://www.google.com 或其他网站
   - **不要**在 Chrome 内部页面测试

2. **按下快捷键**
   - Windows/Linux: `Ctrl+Shift+S`
   - Mac: `Cmd+Shift+S`

3. **预期结果**
   - 自动执行可见区域截图
   - 弹出保存对话框

## 🔧 调试方法

### 检查快捷键是否注册

1. 打开 `chrome://extensions/`
2. 找到 KoalaSnap，点击"详细信息"
3. 向下滚动到"命令"部分
4. 查看是否显示快捷键

### 检查 background.js 日志

1. 在 `chrome://extensions/` 找到 KoalaSnap
2. 点击"检查视图" → "service worker"
3. 在控制台中查看是否有快捷键相关的日志
4. 按下快捷键，看是否有反应

## 📝 推荐配置

根据使用习惯，推荐以下快捷键组合：

| 功能 | Windows/Linux | Mac | 说明 |
|------|---------------|-----|------|
| 可见区域截图 | `Ctrl+Shift+X` | `Cmd+Shift+X` | 不易冲突 |
| 可见区域截图 | `Alt+Shift+S` | `Option+Shift+S` | 备选方案 |
| 可见区域截图 | `Ctrl+Alt+S` | `Cmd+Option+S` | 备选方案 |

## 💡 临时解决方案

如果快捷键始终无法使用，可以：

1. **使用扩展图标**
   - 点击浏览器工具栏的 KoalaSnap 图标
   - 选择"可见区域"

2. **固定扩展图标**
   - 在 `chrome://extensions/` 中
   - 点击 KoalaSnap 旁边的图钉图标
   - 图标会固定在工具栏，方便点击

---

**如果问题仍然存在，请提供以下信息：**
1. Chrome 版本号
2. 操作系统
3. `chrome://extensions/shortcuts` 中 KoalaSnap 的快捷键设置截图
4. 是否有其他扩展使用了相同快捷键
