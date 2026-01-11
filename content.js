// Content Script for Screenshot Extension
// 这个文件会被注入到网页中，用于页面操作

console.log('Screenshot Extension Content Script Loaded');

// 监听来自 background 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'ping') {
        sendResponse({ status: 'ready' });
    } else if (request.action === 'startAreaSelection') {
        startAreaSelection();
        sendResponse({ status: 'started' });
    }
    return true;
});

// 区域选择功能
function startAreaSelection() {
    if (window.__areaSelectionActive) return;

    window.__areaSelectionActive = true;

    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.id = '__screenshot_overlay';
    overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    cursor: crosshair;
    z-index: 2147483647;
  `;

    // 创建选择框
    const selectionBox = document.createElement('div');
    selectionBox.id = '__screenshot_selection';
    selectionBox.style.cssText = `
    position: fixed;
    border: 2px solid #4F46E5;
    background: rgba(79, 70, 229, 0.1);
    display: none;
    z-index: 2147483648;
  `;

    document.body.appendChild(overlay);
    document.body.appendChild(selectionBox);

    let startX, startY, isSelecting = false;

    overlay.addEventListener('mousedown', (e) => {
        console.log('[KoalaSnap] mousedown 事件触发，开始选择');
        isSelecting = true;
        startX = e.clientX;
        startY = e.clientY;
        selectionBox.style.left = startX + 'px';
        selectionBox.style.top = startY + 'px';
        selectionBox.style.width = '0px';
        selectionBox.style.height = '0px';
        selectionBox.style.display = 'block';
    });

    // 将 mousemove 和 mouseup 绑定到 document，这样即使鼠标移出遮罩层也能捕获
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    function handleMouseMove(e) {
        if (!isSelecting) return;

        const currentX = e.clientX;
        const currentY = e.clientY;

        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        const left = Math.min(startX, currentX);
        const top = Math.min(startY, currentY);

        selectionBox.style.left = left + 'px';
        selectionBox.style.top = top + 'px';
        selectionBox.style.width = width + 'px';
        selectionBox.style.height = height + 'px';
    }

    function handleMouseUp(e) {
        console.log('[KoalaSnap] mouseup 事件触发');
        if (!isSelecting) {
            console.log('[KoalaSnap] 未在选择中，忽略');
            return;
        }
        isSelecting = false;

        const rect = selectionBox.getBoundingClientRect();
        console.log('[KoalaSnap] 选框尺寸:', rect.width, 'x', rect.height);
        console.log('[KoalaSnap] 选框位置:', rect.left, rect.top);

        // 如果选区太小，忽略
        if (rect.width < 10 || rect.height < 10) {
            console.log('[KoalaSnap] 选框太小，已忽略');
            selectionBox.style.display = 'none';
            return;
        }

        console.log('[KoalaSnap] 开始创建确认按钮...');

        // 创建确认按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.id = '__screenshot_buttons';

        // 智能定位按钮：优先放在选框右侧，如果空间不足则放在下方
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonWidth = 200; // 预估按钮宽度
        const buttonHeight = 50; // 预估按钮高度

        let buttonLeft, buttonTop;

        // 检查右侧是否有足够空间
        if (rect.right + buttonWidth + 20 < viewportWidth) {
            // 放在右侧
            buttonLeft = rect.right + 10;
            buttonTop = rect.top;
        } else if (rect.bottom + buttonHeight + 20 < viewportHeight) {
            // 放在下方
            buttonLeft = rect.left;
            buttonTop = rect.bottom + 10;
        } else {
            // 放在选框内部右上角
            buttonLeft = Math.max(10, rect.right - buttonWidth - 10);
            buttonTop = rect.top + 10;
        }

        buttonContainer.style.cssText = `
      position: fixed;
      left: ${buttonLeft}px;
      top: ${buttonTop}px;
      display: flex;
      gap: 8px;
      z-index: 2147483649;
    `;

        // 确认按钮
        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = '✓ 确认';
        confirmBtn.style.cssText = `
      padding: 10px 20px;
      background: #4F46E5;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
      transition: all 0.2s;
    `;
        confirmBtn.onmouseover = () => {
            confirmBtn.style.background = '#4338CA';
            confirmBtn.style.transform = 'translateY(-1px)';
        };
        confirmBtn.onmouseout = () => {
            confirmBtn.style.background = '#4F46E5';
            confirmBtn.style.transform = 'translateY(0)';
        };
        confirmBtn.onclick = () => {
            // 先隐藏 UI 元素
            overlay.style.display = 'none';
            selectionBox.style.display = 'none';
            buttonContainer.style.display = 'none';
            const hintElement = document.getElementById('__screenshot_hint');
            if (hintElement) hintElement.style.display = 'none';

            // 等待一小段时间让页面重新渲染，然后截图
            setTimeout(() => {
                // 发送选区信息到 background
                chrome.runtime.sendMessage({
                    action: 'captureSelectedAreaComplete',
                    rect: {
                        x: rect.left,
                        y: rect.top,
                        width: rect.width,
                        height: rect.height
                    },
                    devicePixelRatio: window.devicePixelRatio || 1
                });

                // 截图完成后清理 UI
                setTimeout(() => {
                    cleanup();
                }, 100);
            }, 50);
        };

        // 取消按钮
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = '✕ 取消';
        cancelBtn.style.cssText = `
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.9);
      color: #374151;
      border: 1px solid #D1D5DB;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.2s;
    `;
        cancelBtn.onmouseover = () => {
            cancelBtn.style.background = '#F3F4F6';
            cancelBtn.style.transform = 'translateY(-1px)';
        };
        cancelBtn.onmouseout = () => {
            cancelBtn.style.background = 'rgba(255, 255, 255, 0.9)';
            cancelBtn.style.transform = 'translateY(0)';
        };
        cancelBtn.onclick = () => {
            cleanup();
        };

        buttonContainer.appendChild(confirmBtn);
        buttonContainer.appendChild(cancelBtn);
        document.body.appendChild(buttonContainer);

        // 添加提示文字
        const hint = document.createElement('div');
        hint.style.cssText = `
      position: fixed;
      left: ${rect.left}px;
      top: ${rect.bottom + 10}px;
      padding: 8px 12px;
      background: rgba(0, 0, 0, 0.75);
      color: white;
      border-radius: 6px;
      font-size: 13px;
      z-index: 2147483649;
      pointer-events: none;
    `;
        hint.textContent = `选区大小: ${Math.round(rect.width)} × ${Math.round(rect.height)} 像素`;
        hint.id = '__screenshot_hint';
        document.body.appendChild(hint);
    }

    // 清理函数
    function cleanup() {
        overlay.remove();
        selectionBox.remove();
        const buttons = document.getElementById('__screenshot_buttons');
        const hint = document.getElementById('__screenshot_hint');
        if (buttons) buttons.remove();
        if (hint) hint.remove();
        window.__areaSelectionActive = false;
        document.removeEventListener('keydown', escHandler);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    // ESC 取消
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            cleanup();
        }
    };
    document.addEventListener('keydown', escHandler);
}
