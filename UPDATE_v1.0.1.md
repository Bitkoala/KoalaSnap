# KoalaSnap v1.0.1 更新说明

## 🐛 Bug 修复

### 1. 区域选择截图修复
- ✅ **修复 DPR 问题**：正确使用设备像素比（devicePixelRatio），确保高 DPI 屏幕上的区域截图准确
- ✅ **修复遮罩层问题**：截图前隐藏遮罩层和选择框，避免截图中出现 UI 元素
- ✅ **优化截图时序**：添加延迟确保页面渲染完成后再截图

### 2. 技术改进
- 从 content script 传递 `devicePixelRatio` 到 background
- `cropImage` 函数使用正确的 DPR 参数
- 优化 UI 清理时序，先隐藏再截图

## 📝 更新内容

### 修改的文件
1. **content.js**
   - 添加 `devicePixelRatio` 到消息
   - 优化确认按钮点击逻辑
   - 先隐藏 UI，延迟 50ms 后截图

2. **background.js**
   - `handleAreaSelectionComplete` 接收 DPR 参数
   - `cropImage` 函数签名更新为 `cropImage(dataUrl, rect, dpr = 1)`
   - 使用传入的 DPR 进行准确裁剪

## ✅ 测试结果

- ✅ 可见区域截图：正常
- ✅ 整页滚动截图：正常
- ✅ 区域选择截图：已修复
  - 坐标准确
  - 无遮罩层
  - 高 DPI 支持

## 📦 提交信息

**版本号**：1.0.1  
**打包时间**：2026-01-11 22:48  
**文件名**：koalasnap.zip  

**提交类型**：Bug 修复更新

**更新说明（提交到 Chrome Web Store 时使用）**：
```
修复了区域选择截图的两个重要问题：
1. 修正了高 DPI 屏幕上区域截图坐标不准确的问题
2. 修复了截图中包含遮罩层的问题

现在区域选择截图功能完全正常，能够准确截取选择的区域。
```

**英文版本**：
```
Fixed two critical issues with area selection screenshots:
1. Corrected inaccurate coordinates on high DPI screens
2. Removed overlay mask from captured screenshots

Area selection now works perfectly and captures the exact selected region.
```

## 🚀 提交步骤

1. **登录 Chrome Web Store 开发者控制台**
   - https://chrome.google.com/webstore/devconsole

2. **找到 KoalaSnap 项目**
   - 点击项目名称进入

3. **上传新版本**
   - 点击"上传新版本"或"Package"标签
   - 上传 `koalasnap.zip`

4. **填写更新说明**
   - 复制上面的更新说明
   - 粘贴到"此版本的新增内容"字段

5. **提交审核**
   - 检查所有信息
   - 点击"提交审核"

## 📊 版本对比

| 功能 | v1.0.0 | v1.0.1 |
|------|--------|--------|
| 可见区域截图 | ✅ | ✅ |
| 整页滚动截图 | ✅ | ✅ |
| 区域选择截图 | ⚠️ 有问题 | ✅ 已修复 |
| 高 DPI 支持 | ⚠️ 部分 | ✅ 完整 |
| 快捷键 | ✅ | ✅ |

## 🎯 后续计划

- 等待审核通过（通常 1-3 个工作日）
- 更新 GitHub 仓库
- 发布 Release Notes
- 通知用户更新

---

**打包完成时间**：2026-01-11 22:48  
**准备提交**：✅
