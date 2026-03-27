import app from 'flarum/admin/app';

app.initializers.add('resofire-aurora', () => {
    app.extensionData
        .for('resofire-aurora')
        .registerSetting({
            setting: 'resofire-aurora.body_bg',
            label:   app.translator.trans('resofire-aurora.admin.settings.body_bg_label'),
            help:    app.translator.trans('resofire-aurora.admin.settings.body_bg_help'),
            type:    'text',
        })
        .registerSetting({
            setting: 'resofire-aurora.control_bg',
            label:   app.translator.trans('resofire-aurora.admin.settings.control_bg_label'),
            help:    app.translator.trans('resofire-aurora.admin.settings.control_bg_help'),
            type:    'text',
        })
        .registerSetting({
            setting: 'resofire-aurora.border_radius',
            label:   app.translator.trans('resofire-aurora.admin.settings.border_radius_label'),
            help:    app.translator.trans('resofire-aurora.admin.settings.border_radius_help'),
            type:    'number',
        })
        .registerSetting({
            setting: 'resofire-aurora.custom_font_url',
            label:   app.translator.trans('resofire-aurora.admin.settings.custom_font_url_label'),
            help:    app.translator.trans('resofire-aurora.admin.settings.custom_font_url_help'),
            type:    'text',
        });
});
