# KoalaSnap 双语适配说明

## 已完成的双语适配

### 1. privacy.html（隐私政策页面）
✅ 完全双语支持
- 中英文内容完整
- 语言切换按钮
- 导航栏双语
- 页脚双语
- 使用 localStorage 保存语言偏好

### 2. index.html（落地页首页）
✅ 部分双语支持（主要区域已完成）
- ✅ 导航栏（包含语言切换按钮）
- ✅ Hero 区域（标题、副标题、按钮、统计数据）
- ✅ 功能特性标题
- ⏳ 功能卡片内容（待补充英文）
- ⏳ 使用方法区域（待补充英文）
- ⏳ 下载区域（待补充英文）
- ⏳ 页脚（待补充英文）

## 语言切换机制

### 工作原理
1. 所有中文内容包裹在 `<span class="lang-zh">` 中
2. 所有英文内容包裹在 `<span class="lang-en" style="display: none;">` 中
3. 点击语言切换按钮时，切换显示/隐藏对应语言的元素
4. 使用 `localStorage.setItem('koalasnap-lang', 'zh'/'en')` 保存用户偏好
5. 页面加载时自动读取并应用保存的语言设置

### 语言切换按钮
```html
<button class="lang-toggle" onclick="toggleLanguage()">
  <span class="lang-zh">English</span>
  <span class="lang-en" style="display: none;">中文</span>
</button>
```

## 需要补充的英文内容

### 功能卡片（Features）
```html
<!-- Feature 1 -->
<h3 class="feature-title">
  <span class="lang-zh">可见区域截图</span>
  <span class="lang-en" style="display: none;">Visible Area Capture</span>
</h3>
<p class="feature-desc">
  <span class="lang-zh">一键截取当前屏幕可见内容，支持快捷键 Ctrl+Shift+S，即时保存无需等待</span>
  <span class="lang-en" style="display: none;">One-click capture of current viewport, supports Ctrl+Shift+S shortcut, instant save</span>
</p>
<div class="feature-badge">
  <span class="lang-zh">快捷</span>
  <span class="lang-en" style="display: none;">Quick</span>
</div>
```

### 附加功能（Additional Features）
```html
<span class="lang-zh">高 DPI 屏幕完美支持</span>
<span class="lang-en" style="display: none;">Perfect High-DPI Support</span>
```

### 使用方法（How It Works）
```html
<h2 class="section-title">
  <span class="lang-zh">使用方法</span>
  <span class="lang-en" style="display: none;">How It Works</span>
</h2>
```

### 下载区域（Download）
```html
<h2 class="download-title">
  <span class="lang-zh">立即开始使用 KoalaSnap</span>
  <span class="lang-en" style="display: none;">Start Using KoalaSnap Now</span>
</h2>
```

### 页脚（Footer）
```html
<p class="footer-desc">
  <span class="lang-zh">让截图变得简单</span>
  <span class="lang-en" style="display: none;">Make Screenshots Easy</span>
</p>
```

## 使用建议

### 当前状态
- **privacy.html**: 100% 双语完成 ✅
- **index.html**: 约 60% 双语完成 ⏳

### 快速完成方案
如果您需要快速完成剩余的双语适配，可以：

1. **方案 A（推荐）**: 我可以继续完成所有剩余区域的双语适配
2. **方案 B**: 保持当前状态，核心区域（导航、Hero、功能标题）已支持双语
3. **方案 C**: 仅保留中文版本，移除语言切换功能

### 测试方法
1. 打开 `landing-page/index.html` 或 `landing-page/privacy.html`
2. 点击右上角的语言切换按钮（"English" 或 "中文"）
3. 观察页面内容是否正确切换
4. 刷新页面，确认语言偏好被保存

## 技术细节

### CSS 样式
```css
.lang-toggle {
  padding: 8px 16px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}
```

### JavaScript 函数
```javascript
function toggleLanguage() {
  const currentLang = localStorage.getItem('koalasnap-lang') || 'zh';
  const newLang = currentLang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('koalasnap-lang', newLang);
  updateLanguage(newLang);
}

function updateLanguage(lang) {
  const zhElements = document.querySelectorAll('.lang-zh');
  const enElements = document.querySelectorAll('.lang-en');
  
  if (lang === 'en') {
    zhElements.forEach(el => el.style.display = 'none');
    enElements.forEach(el => el.style.display = '');
  } else {
    zhElements.forEach(el => el.style.display = '');
    enElements.forEach(el => el.style.display = 'none');
  }
}
```

## 下一步

请告诉我您希望如何处理：
1. 继续完成所有剩余区域的双语适配？
2. 保持当前状态（核心区域已双语）？
3. 其他需求？
