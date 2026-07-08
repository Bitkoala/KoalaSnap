// i18n utility script for HTML files
document.addEventListener('DOMContentLoaded', () => {
  // Translate all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const messageKey = element.getAttribute('data-i18n');
    const message = chrome.i18n.getMessage(messageKey);
    if (message) {
      // Check if it's an input element that needs a placeholder translated
      if (element.tagName.toLowerCase() === 'input' && element.hasAttribute('placeholder')) {
        element.placeholder = message;
      } else {
        element.innerHTML = message;
      }
    }
  });

  // Optionally set page language for better accessibility
  const lang = chrome.i18n.getUILanguage();
  document.documentElement.lang = lang;
});
