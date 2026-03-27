<?php

use Flarum\Extend;
use Flarum\Frontend\Document;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/less/forum.less')
        ->js(__DIR__ . '/js/dist/forum.js'),

    (new Extend\Frontend('admin'))
        ->css(__DIR__ . '/less/admin.less')
        ->js(__DIR__ . '/js/dist/admin.js'),

    // Expose admin-set surface settings as LESS variables so
    // the stylesheet can reference them as @aurora-body-bg etc.
    // Accent colors come from core's @primary-color — no need
    // to re-expose those here.
    (new Extend\Settings)
        ->serializeToForum('auroraCream.bodyBg',     'resofire-aurora.body_bg',      'strval', '#FBF8F3')
        ->serializeToForum('auroraCream.controlBg',  'resofire-aurora.control_bg',   'strval', '#F5F1EA')
        ->serializeToForum('auroraCream.radius',     'resofire-aurora.border_radius','strval', '18')
        ->serializeToForum('auroraCream.fontUrl',    'resofire-aurora.custom_font_url', 'strval', ''),

    new Extend\Locales(__DIR__ . '/locale'),
];
