import Extend from 'flarum/common/extenders';
import app from 'flarum/admin/app';

export default [
    new Extend.Admin()
        .setting(() => ({
            setting: 'resofire-aurora.body_bg',
            label: app.translator.trans('resofire-aurora.admin.settings.body_bg_label', {}, true),
            help: app.translator.trans('resofire-aurora.admin.settings.body_bg_help', {}, true),
            type: 'text',
            placeholder: '#FBF8F3',
        }))
        .setting(() => ({
            setting: 'resofire-aurora.control_bg',
            label: app.translator.trans('resofire-aurora.admin.settings.control_bg_label', {}, true),
            help: app.translator.trans('resofire-aurora.admin.settings.control_bg_help', {}, true),
            type: 'text',
            placeholder: '#F5F1EA',
        }))
        .setting(() => ({
            setting: 'resofire-aurora.border_radius',
            label: app.translator.trans('resofire-aurora.admin.settings.border_radius_label', {}, true),
            help: app.translator.trans('resofire-aurora.admin.settings.border_radius_help', {}, true),
            type: 'number',
            placeholder: '18',
        }))
        .setting(() => ({
            setting: 'resofire-aurora.custom_font_url',
            label: app.translator.trans('resofire-aurora.admin.settings.custom_font_url_label', {}, true),
            help: app.translator.trans('resofire-aurora.admin.settings.custom_font_url_help', {}, true),
            type: 'text',
        })),
];
