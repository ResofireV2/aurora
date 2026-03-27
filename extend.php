<?php

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/less/forum.less')
        ->js(__DIR__ . '/js/dist/forum.js'),

    (new Extend\Frontend('admin'))
        ->css(__DIR__ . '/less/admin.less')
        ->js(__DIR__ . '/js/dist/admin.js'),

    // Register default values for settings that have not been saved yet.
    // Extend\Settings::default() was confirmed in Flarum 2.x Settings.php source.
    (new Extend\Settings)
        ->default('resofire-aurora.body_bg',         '#FBF8F3')
        ->default('resofire-aurora.control_bg',      '#F5F1EA')
        ->default('resofire-aurora.border_radius',   '18')
        ->default('resofire-aurora.custom_font_url', ''),

    // Serialize surface settings to the forum payload so JS can read them.
    // Two-arg form: Flarum reads the value (including default above) automatically.
    (new Extend\Settings)
        ->serializeToForum('auroraCream.bodyBg',    'resofire-aurora.body_bg')
        ->serializeToForum('auroraCream.controlBg', 'resofire-aurora.control_bg')
        ->serializeToForum('auroraCream.radius',    'resofire-aurora.border_radius')
        ->serializeToForum('auroraCream.fontUrl',   'resofire-aurora.custom_font_url'),

    new Extend\Locales(__DIR__ . '/locale'),
];
