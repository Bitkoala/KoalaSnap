# KoalaSnap Chrome Web Store 发布准备清单

## 📋 必需准备项

### 1. 开发者账号注册
- [ ] 注册 Chrome Web Store 开发者账号
- [ ] 支付一次性注册费用：**$5 USD**
- [ ] 完成身份验证
- 注册地址：https://chrome.google.com/webstore/devconsole

### 2. 宣传素材准备

#### 必需图片（重要！）
- [ ] **应用图标** (已完成 ✅)
  - 128x128 像素 PNG
  - 已有：`icons/icon-128.png`

- [ ] **小型宣传图块**（必需）
  - 尺寸：440x280 像素
  - 格式：PNG 或 JPEG
  - 用途：在 Chrome Web Store 搜索结果中显示

- [ ] **大型宣传图块**（推荐）
  - 尺寸：920x680 像素
  - 格式：PNG 或 JPEG
  - 用途：在扩展详情页顶部显示

- [ ] **侯爵图块**（可选）
  - 尺寸：1400x560 像素
  - 格式：PNG 或 JPEG
  - 用途：在 Chrome Web Store 首页精选展示

- [ ] **截图**（强烈推荐，至少 1 张，最多 5 张）
  - 尺寸：1280x800 或 640x400 像素
  - 格式：PNG 或 JPEG
  - 内容：展示扩展的主要功能界面

### 3. 商店列表信息

#### 必填信息
- [ ] **详细说明**（中文）
  - 最少 132 字符
  - 详细描述功能、特点、使用方法
  
- [ ] **详细说明**（英文）
  - 建议提供英文版本以覆盖国际用户
  
- [ ] **简短描述**
  - 最多 132 字符
  - 一句话概括扩展功能

- [ ] **类别选择**
  - 建议选择：**生产力工具 (Productivity)**

- [ ] **语言设置**
  - 主要语言：中文（简体）
  - 可添加：英语

### 4. 隐私政策（重要！）

由于您的扩展使用了以下权限，**必须提供隐私政策**：
- `activeTab` - 访问当前标签页
- `scripting` - 注入脚本
- `downloads` - 下载文件

- [ ] 编写隐私政策文档
- [ ] 将隐私政策托管到公开 URL
  - 可以使用 GitHub Pages
  - 或者您的网站（如 bitekaola.com）
- [ ] 在商店列表中填写隐私政策 URL

### 5. 代码审查准备

#### 需要检查的项目
- [x] 没有混淆代码
- [x] 没有外部脚本加载
- [x] 权限使用合理且必要
- [ ] 添加详细的代码注释（建议）
- [ ] 确保没有调试代码（console.log 等）

#### 可能需要说明的功能
- **整页截图**：需要注入脚本控制滚动
- **区域选择**：需要注入 UI 元素
- **下载功能**：需要 downloads 权限

### 6. 法律和合规

- [ ] **服务条款**（可选但推荐）
- [ ] **支持邮箱或网站**（必需）
  - 建议使用：support@bitekaola.com
- [ ] 确认不侵犯他人知识产权
- [ ] 确认符合 Chrome Web Store 政策

## 📝 商店列表文案建议

### 简短描述（132 字符以内）
```
KoalaSnap - 考拉易截：强大的截图工具，支持可见区域、整页滚动和区域选择三种模式，一键保存高清截图。
```

### 详细说明（中文）
```markdown
# KoalaSnap - 考拉易截

强大且易用的 Chrome 截图扩展，支持三种截图模式，满足您的各种截图需求。

## ✨ 核心功能

### 📸 可见区域截图
- 一键截取当前屏幕可见内容
- 快捷键 Ctrl+Shift+S (Mac: Cmd+Shift+S)
- 即时保存，无需等待

### 📜 整页滚动截图
- 自动滚动并拼接完整页面
- 智能处理固定定位元素
- 完美支持长文章、长网页

### ✂️ 区域选择截图
- 可视化选择框，精确控制
- 鼠标拖拽自由选择区域
- ESC 键随时取消

## 🎨 设计亮点

- 现代化玻璃态 UI 设计
- 流畅的动画效果
- 简洁直观的操作界面

## ⚡ 技术特性

- 高 DPI 屏幕完美支持
- Manifest V3 标准
- 轻量高效，不占用系统资源
- 本地处理，保护隐私

## 🚀 使用方法

1. 点击浏览器工具栏的 KoalaSnap 图标
2. 选择截图模式
3. 截图自动保存到下载文件夹

## 🔒 隐私承诺

- 所有截图在本地处理
- 不上传任何数据到服务器
- 不收集用户信息
- 开源透明

## 💡 适用场景

- 网页内容保存
- 设计稿截图
- 长文章截图
- 社交媒体分享
- 工作汇报材料

立即安装 KoalaSnap，让截图变得更简单！
```

### 详细说明（英文）
```markdown
# KoalaSnap - Powerful Screenshot Tool

A powerful and easy-to-use Chrome screenshot extension with three capture modes to meet all your screenshot needs.

## ✨ Core Features

### 📸 Visible Area Capture
- One-click screenshot of current viewport
- Keyboard shortcut: Ctrl+Shift+S (Mac: Cmd+Shift+S)
- Instant save, no waiting

### 📜 Full-Page Scrolling Capture
- Automatically scroll and stitch entire page
- Smart handling of fixed elements
- Perfect for long articles and web pages

### ✂️ Area Selection Capture
- Visual selection box for precise control
- Drag to select any area
- Press ESC to cancel anytime

## 🎨 Design Highlights

- Modern glassmorphic UI design
- Smooth animations
- Clean and intuitive interface

## ⚡ Technical Features

- Perfect support for high-DPI displays
- Manifest V3 compliant
- Lightweight and efficient
- Local processing for privacy

## 🚀 How to Use

1. Click the KoalaSnap icon in browser toolbar
2. Select capture mode
3. Screenshot automatically saved to Downloads

## 🔒 Privacy Commitment

- All processing done locally
- No data uploaded to servers
- No user information collected
- Open and transparent

Install KoalaSnap now and make screenshots easier!
```

## 🖼️ 需要创建的宣传图片

### 小型宣传图块 (440x280)
建议内容：
- 展示 KoalaSnap 的 Logo
- 三种截图模式的图标
- 简洁的文字说明

### 截图示例
建议包含：
1. 弹出窗口界面截图
2. 可见区域截图演示
3. 整页截图进度展示
4. 区域选择操作演示
5. 保存成功提示

## 📦 打包准备

### 创建发布包
```bash
# 1. 清理开发文件（如果有）
# 2. 压缩整个扩展目录为 ZIP 文件
# 3. 确保 ZIP 包含所有必需文件
```

### 必需文件检查清单
- [x] manifest.json
- [x] background.js
- [x] content.js
- [x] popup/popup.html
- [x] popup/popup.css
- [x] popup/popup.js
- [x] icons/icon-16.png
- [x] icons/icon-48.png
- [x] icons/icon-128.png
- [ ] README.md（可选，不会打包到扩展中）

## 💰 费用说明

- **开发者注册费**：$5 USD（一次性）
- **扩展发布**：免费
- **后续更新**：免费

## ⏱️ 审核时间

- **首次提交**：通常 1-3 个工作日
- **更新提交**：通常几小时到 1 天
- **可能延长**：如果需要人工审核

## 🚨 常见拒绝原因

1. **缺少隐私政策**（最常见）
2. **宣传图片不符合规范**
3. **权限使用说明不清楚**
4. **功能描述不准确**
5. **包含恶意代码或混淆代码**

## ✅ 提交流程

1. 登录 Chrome Web Store 开发者控制台
2. 点击「新增项」
3. 上传 ZIP 文件
4. 填写商店列表信息
5. 上传宣传素材
6. 提交审核
7. 等待审核结果

## 📞 需要帮助？

- Chrome Web Store 开发者文档：https://developer.chrome.com/docs/webstore/
- 开发者支持：https://support.google.com/chrome_webstore/

---

**建议：** 先完成隐私政策和宣传图片，这两项是最容易被拒绝的原因。
