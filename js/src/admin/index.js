import app from 'flarum/admin/app';

export { default as extend } from './extend';

app.initializers.add('resofire-aurora', () => {
    // Settings are registered via the exported extend array above.
    // Add any imperative admin JS here if needed in future.
});
