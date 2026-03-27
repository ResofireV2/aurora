import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import SessionDropdown from 'flarum/forum/components/SessionDropdown';
import NotificationsDropdown from 'flarum/forum/components/NotificationsDropdown';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import IndexSidebar from 'flarum/forum/components/IndexSidebar';

export const extenders = [];

app.initializers.add('resofire-aurora', () => {

    // ── IndexSidebar ─────────────────────────────────────────
    extend(IndexSidebar.prototype, 'items', function (items) {

        // Remove the default new discussion button — it lives in the header now
        items.remove('newDiscussion');

        if (app.session.user) {
            // Resolve FlagsDropdown from the flags extension if it is installed
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
        // Remove items that now live in the sidebar
        items.remove('session');
        items.remove('notifications');
        items.remove('flags');  // added by flarum/flags at priority 15

        // Add Start a Discussion as the rightmost header item
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
