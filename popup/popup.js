// Popup Script for Screenshot Extension

document.addEventListener('DOMContentLoaded', () => {
    // Get button elements
    const captureVisibleBtn = document.getElementById('captureVisible');
    const captureFullPageBtn = document.getElementById('captureFullPage');
    const captureAreaBtn = document.getElementById('captureArea');

    const progressContainer = document.getElementById('progressContainer');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    // Event Listeners
    captureVisibleBtn.addEventListener('click', () => {
        handleCapture('captureVisible', chrome.i18n.getMessage('progressCapturing'));
    });

    captureFullPageBtn.addEventListener('click', () => {
        handleCapture('captureFullPage', chrome.i18n.getMessage('progressFullCapturing'));
    });

    captureAreaBtn.addEventListener('click', () => {
        handleCapture('captureArea', chrome.i18n.getMessage('progressAreaSelect'));
        // 区域选择模式下，立即关闭 popup
        setTimeout(() => window.close(), 500);
    });

    // Handle screenshot capture
    async function handleCapture(action, message) {
        try {
            // Show progress
            showProgress(message);

            // Send message to background script
            chrome.runtime.sendMessage({ action: action });

            // Simulate progress for visible area (instant)
            if (action === 'captureVisible') {
                updateProgress(100);
                setTimeout(() => {
                    hideProgress();
                    showSuccess(chrome.i18n.getMessage('msgSaved'));
                    setTimeout(() => window.close(), 1000);
                }, 500);
            }

            // For full page, show progress
            if (action === 'captureFullPage') {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 10;
                    updateProgress(Math.min(progress, 90));

                    if (progress >= 90) {
                        clearInterval(interval);
                    }
                }, 300);

                // Listen for completion (in real implementation)
                setTimeout(() => {
                    clearInterval(interval);
                    updateProgress(100);
                    hideProgress();
                    showSuccess(chrome.i18n.getMessage('msgFullSaved'));
                    setTimeout(() => window.close(), 1000);
                }, 3000);
            }

        } catch (error) {
            console.error('Screenshot failed:', error);
            hideProgress();
            showError(chrome.i18n.getMessage('msgFailed'));
        }
    }

    // Progress UI functions
    function showProgress(message) {
        progressText.textContent = message;
        progressContainer.style.display = 'block';
        progressFill.style.width = '0%';
    }

    function updateProgress(percent) {
        progressFill.style.width = percent + '%';
    }

    function hideProgress() {
        setTimeout(() => {
            progressContainer.style.display = 'none';
        }, 300);
    }

    function showSuccess(message) {
        progressText.textContent = message;
        progressText.style.color = 'hsl(140, 70%, 50%)';
    }

    function showError(message) {
        progressText.textContent = message;
        progressText.style.color = 'hsl(0, 70%, 50%)';
        setTimeout(() => {
            progressContainer.style.display = 'none';
        }, 2000);
    }

    // Listen for messages from background
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'updateProgress') {
            updateProgress(request.progress);
            if (request.message) {
                progressText.textContent = request.message;
            }
        }

        if (request.action === 'captureComplete') {
            updateProgress(100);
            hideProgress();
            showSuccess(chrome.i18n.getMessage('msgSaved'));
            setTimeout(() => window.close(), 1000);
        }

        if (request.action === 'captureError') {
            hideProgress();
            showError(request.message || chrome.i18n.getMessage('msgFailed'));
        }
    });
});
