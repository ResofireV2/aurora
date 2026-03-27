import app from 'flarum/forum/app';

app.initializers.add('resofire-aurora', () => {
    // All visual changes currently live in LESS.
    // This initializer is the right place to add component
    // overrides as the theme evolves, e.g.:
    //
    // import { extend } from 'flarum/common/extend';
    // import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
    //
    // extend(DiscussionListItem.prototype, 'view', function(vnode) {
    //     // modify vnode…
    // });
});
