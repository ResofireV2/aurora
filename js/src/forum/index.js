import app from 'flarum/forum/app';

export const extend = [];

app.initializers.add('resofire-aurora', () => {
    // All visual changes live in LESS.
    // Add forum-side component overrides here as needed, e.g.:
    //
    // import { extend } from 'flarum/common/extend';
    // import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
    // extend(DiscussionListItem.prototype, 'view', function(vnode) { ... });
});
