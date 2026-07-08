// Background Service Worker for Screenshot Extension

// 监听快捷键命令
chrome.commands.onCommand.addListener((command) => {
  if (command === 'capture-visible') {
    captureVisibleArea();
  }
});

// 监听来自 popup 和 content script 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureVisible') {
    captureVisibleArea();
  } else if (request.action === 'captureFullPage') {
    captureFullPage();
  } else if (request.action === 'captureArea') {
    captureSelectedArea();
  } else if (request.action === 'captureSelectedAreaComplete') {
    // 处理区域选择完成
    handleAreaSelectionComplete(request, sender);
  }
  return true;
});

// 模式 A: 截取可见区域
async function captureVisibleArea() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, {
      format: 'png'
    });

    const now = new Date();
    const filename = `Screenshot_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.png`;

    await chrome.downloads.download({
      url: dataUrl,
      filename: filename,
      saveAs: true
    });

    console.log('可见区域截图完成');
  } catch (error) {
    console.error('截图失败:', error);
  }
}

// 模式 B: 截取整页（滚动截图）
async function captureFullPage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // 注入 content script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });

    // 获取页面信息
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getPageInfo
    });

    const { pageHeight, viewportHeight, devicePixelRatio } = result.result;

    // 计算需要截取的次数
    const scrollSteps = Math.ceil(pageHeight / viewportHeight);
    const screenshots = [];

    // 隐藏固定定位元素
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: hideFixedElements
    });

    // 滚动并截图
    for (let i = 0; i < scrollSteps; i++) {
      const scrollY = i * viewportHeight;

      // 滚动到指定位置
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrollToPosition,
        args: [scrollY]
      });

      // 等待渲染
      await sleep(300);

      // 截图
      const dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, {
        format: 'png'
      });

      screenshots.push({
        dataUrl,
        offsetY: scrollY
      });
    }

    // 恢复固定定位元素
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: restoreFixedElements
    });

    // 滚动回顶部
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrollToPosition,
      args: [0]
    });

    // 拼接图片
    const finalImage = await stitchImages(screenshots, pageHeight, viewportHeight, devicePixelRatio);

    // 下载
    const now = new Date();
    const filename = `Screenshot_FullPage_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.png`;
    await chrome.downloads.download({
      url: finalImage,
      filename: filename,
      saveAs: true
    });

    console.log('整页截图完成');
  } catch (error) {
    console.error('整页截图失败:', error);
  }
}

// 模式 C: 区域选择截图
async function captureSelectedArea() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // 注入 content script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });

    // 发送消息启动区域选择
    await chrome.tabs.sendMessage(tab.id, { action: 'startAreaSelection' });

    console.log('区域选择模式已启动');
  } catch (error) {
    console.error('区域选择失败:', error);
  }
}

// 工具函数：获取页面信息
function getPageInfo() {
  return {
    pageHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1
  };
}

// 工具函数：隐藏固定定位元素
function hideFixedElements() {
  window.__fixedElements = [];
  const elements = document.querySelectorAll('*');
  elements.forEach(el => {
    const style = window.getComputedStyle(el);
    if (style.position === 'fixed' || style.position === 'sticky') {
      window.__fixedElements.push({
        element: el,
        originalDisplay: el.style.display
      });
      el.style.display = 'none';
    }
  });
}

// 工具函数：恢复固定定位元素
function restoreFixedElements() {
  if (window.__fixedElements) {
    window.__fixedElements.forEach(({ element, originalDisplay }) => {
      element.style.display = originalDisplay;
    });
    window.__fixedElements = [];
  }
}

// 工具函数：滚动到指定位置
function scrollToPosition(y) {
  window.scrollTo(0, y);
}


// 处理区域选择完成
async function handleAreaSelectionComplete(request, sender) {
  try {
    const dataUrl = await chrome.tabs.captureVisibleTab(sender.tab.windowId, {
      format: 'png'
    });

    // 裁剪图片（传入 devicePixelRatio）
    const croppedImage = await cropImage(dataUrl, request.rect, request.devicePixelRatio || 1);

    // 下载
    const now = new Date();
    const filename = `Screenshot_Area_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.png`;
    await chrome.downloads.download({
      url: croppedImage,
      filename: filename,
      saveAs: true
    });

    console.log('区域截图完成');
  } catch (error) {
    console.error('区域截图失败:', error);
  }
}

// 工具函数：拼接图片
async function stitchImages(screenshots, totalHeight, viewportHeight, dpr) {
  return new Promise((resolve, reject) => {
    // 工具函数：Data URL 转 Blob
    const dataUrlToBlob = (url) => {
      const parts = url.split(',');
      const mime = parts[0].match(/:(.*?);/)[1];
      const bstr = atob(parts[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    };

    // 加载第一张图片以获取宽度
    Promise.resolve(dataUrlToBlob(screenshots[0].dataUrl))
      .then(blob => createImageBitmap(blob))
      .then(firstBitmap => {
        const width = firstBitmap.width / dpr;
        const canvas = new OffscreenCanvas(firstBitmap.width, totalHeight * dpr);
        const ctx = canvas.getContext('2d');

        // 工具函数：Data URL 转 Blob，避免 Service Worker 中 fetch data: URI 失败
        const dataUrlToBlob = (url) => {
          const parts = url.split(',');
          const mime = parts[0].match(/:(.*?);/)[1];
          const bstr = atob(parts[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], { type: mime });
        };

        // 加载并绘制所有图片
        const promises = screenshots.map(({ dataUrl, offsetY }) => {
          return Promise.resolve(dataUrlToBlob(dataUrl))
            .then(blob => createImageBitmap(blob))
            .then(bitmap => {
              ctx.drawImage(bitmap, 0, offsetY * dpr);
            });
        });

        Promise.all(promises)
          .then(() => canvas.convertToBlob({ type: 'image/png' }))
          .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

// 工具函数：裁剪图片
async function cropImage(dataUrl, rect, dpr = 1) {
  return new Promise((resolve, reject) => {
    // 工具函数：Data URL 转 Blob
    const dataUrlToBlob = (url) => {
      const parts = url.split(',');
      const mime = parts[0].match(/:(.*?);/)[1];
      const bstr = atob(parts[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    };

    Promise.resolve(dataUrlToBlob(dataUrl))
      .then(blob => createImageBitmap(blob))
      .then(bitmap => {
        // 使用传入的 devicePixelRatio
        const canvas = new OffscreenCanvas(rect.width * dpr, rect.height * dpr);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
          bitmap,
          rect.x * dpr,
          rect.y * dpr,
          rect.width * dpr,
          rect.height * dpr,
          0,
          0,
          rect.width * dpr,
          rect.height * dpr
        );

        return canvas.convertToBlob({ type: 'image/png' });
      })
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
}

// 工具函数：延迟
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function dataUrlToBlob(url) {
  const parts = url.split(',');
  const mime = parts[0].match(/:(.*?);/)[1];
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}