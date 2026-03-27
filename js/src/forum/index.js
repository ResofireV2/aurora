import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import SessionDropdown from 'flarum/forum/components/SessionDropdown';
import NotificationsDropdown from 'flarum/forum/components/NotificationsDropdown';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import IndexSidebar from 'flarum/forum/components/IndexSidebar';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';

export const extenders = [];

app.initializers.add('resofire-aurora', () => {

    // ── Discussion list item: tag-colour accent stripe ────────
    // Sets --aurora-tag-color on each row so the LESS ::before
    // stripe can pick it up. Falls back gracefully if no tags.
    extend(DiscussionListItem.prototype, 'elementAttrs', function (attrs) {
        const tags = this.attrs.discussion.tags?.();
        const color = tags && tags.length ? tags[0].color() : null;
        if (!attrs.style) attrs.style = {};
        attrs.style['--aurora-tag-color'] = color || 'var(--primary-color)';
    });

    // ── IndexSidebar ─────────────────────────────────────────
    extend(IndexSidebar.prototype, 'items', function (items) {
        items.remove('newDiscussion');

        if (app.session.user) {
            const FlagsDropdown = flarum.reg.get('flarum-flags', 'forum/components/FlagsDropdown');

            items.add(
                'userBlock',
                <div className="aurora-sidebar-user">
                    <div className="aurora-sidebar-actions">
                        <NotificationsDropdown state={app.notifications} />
                        {FlagsDropdown && app.forum.attribute('canViewFlags')
                            ? <FlagsDropdown state={app.flags} />
                            : null}
                    </div>
                    <SessionDropdown />
                </div>,
                50
            );
        }
    });

    // ── HeaderSecondary ───────────────────────────────────────
    extend(HeaderSecondary.prototype, 'items', function (items) {
        items.remove('session');
        items.remove('notifications');
        items.remove('flags');

        const canStart = app.forum.attribute('canStartDiscussion') || !app.session.user;

        items.add(
            'newDiscussion',
            <Button
                icon="fas fa-edit"
                className="Button Button--primary aurora-newDiscussion"
                onclick={() => {
                    if (app.session.user) {
                        app.composer
                            .load(() => import('flarum/forum/components/DiscussionComposer'), { user: app.session.user })
                            .then(() => app.composer.show());
                    } else {
                        app.modal.show(() => import('flarum/forum/components/LogInModal'));
                    }
                }}
                disabled={!canStart}
            >
                {app.translator.trans(
                    canStart
                        ? 'core.forum.index.start_discussion_button'
                        : 'core.forum.index.cannot_start_discussion_button'
                )}
            </Button>,
            -10
        );
    });

});
