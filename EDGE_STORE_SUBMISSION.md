# Microsoft Edge 插件商店发布指南

## 概述
好消息！KoalaSnap 基于 **Manifest V3** 和标准 Chromium Web 技术构建，因此完全兼容 Microsoft Edge，无需修改任何代码。您可以直接使用为 Chrome Web Store 创建的 `.zip` 包。

## 准备工作
1.  **Microsoft 账户**：您需要一个 Microsoft 账户（如 Hotmail, Outlook 等）。
2.  **开发者注册**：您需要在 [Microsoft Partner Center](https://partner.microsoft.com/en-us/dashboard/microsoftedge/public/login?ref=dd) 注册为 Edge 扩展开发者。
    *   *注：Edge 通常不需要像 Chrome 那样支付 $5 的一次性注册费（具体政策可能会有变化）。*

## 使用现有安装包
您无需重新打包。直接使用为您 Chrome 生成的 `KoalaSnap-v1.0.1.zip` 文件即可。
如果需要重新生成，请运行：
```powershell
./package-extension.ps1
```

## 提交步骤

1.  **登录 Partner Center**：
    访问 [Microsoft Partner Center - Edge Dashboard](https://partner.microsoft.com/en-us/dashboard/microsoftedge/overview)。

2.  **创建新扩展**：
    *   点击 **"Create new extension"**（创建新扩展）。
    *   上传您的 `KoalaSnap-v1.0.1.zip` 文件。
    *   Edge 会自动分析可用性（检查 `manifest.json`）。

3.  **填写商店详情 (Store Listing)**：
    填写商店展示信息。您可以直接复用 Chrome Web Store 的描述和截图。
    *   **名称**：KoalaSnap - 考拉易截
    *   **描述**：(复制 `CHROME_STORE_SUBMISSION.md` 中的内容)
    *   **Logo**：上传 `icons/icon-128.png`。
    *   **截图**：上传与 Chrome 商店相同的截图。
    *   **宣传图 (Promotional Tiles)**（可选但推荐）：
        *   小图：440x280 px
        *   大图：1400x560 px

4.  **可用性 (Availability)**：
    *   **市场 (Markets)**：选择 "All markets"（所有市场）或特定地区（如 China, US）。
    *   **可见性 (Visibility)**："Public"（公开）。测试时可选择 Hidden（隐藏）。

5.  **审核与发布 (Review & Publish)**：
    *   提交进行认证。
    *   Edge 的审核时间通常为几小时到几天（通常比 Chrome 快）。

## 验证
发布成功后，您将获得一个类似这样的链接：`https://microsoftedge.microsoft.com/addons/detail/[extension-id]`。
您可以将此链接添加到 `README.md` 和 `landing-page.html` 中。
