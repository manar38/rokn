/**
 * Application Entry Point
 * Initializes MVVM binding and UI interactive listeners when DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  if (window.QeemaApp && typeof window.QeemaApp.init === 'function') {
    window.QeemaApp.init();
  }
});
