// Shared utilities for Aurora Cream
// Import from forum/index.js or admin/index.js as needed.

/**
 * Resolve a theme setting with a fallback default.
 * Settings are stored via the admin panel and injected into
 * the page payload by Flarum core.
 *
 * @param {string} key      Setting key (without vendor prefix)
 * @param {string} fallback Default value if unset
 * @returns {string}
 */
export function themeSetting(key, fallback) {
    const val = app.forum.attribute(`resofire-aurora.${key}`);
    return val !== undefined && val !== '' ? val : fallback;
}

/**
 * Apply dynamic CSS custom properties from admin settings.
 * Call this once in the forum initializer if you want to expose
 * admin-set surface colors as CSS variables for advanced customization.
 */
export function applyDynamicVars() {
    const root = document.documentElement;
    const bodyBg    = themeSetting('body_bg',    '#FBF8F3');
    const controlBg = themeSetting('control_bg', '#F5F1EA');
    const radius    = themeSetting('border_radius', '18');

    root.style.setProperty('--aurora-body-bg',    bodyBg);
    root.style.setProperty('--aurora-control-bg', controlBg);
    root.style.setProperty('--aurora-radius',     `${radius}px`);
}
