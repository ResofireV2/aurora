import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import LinkButton from 'flarum/common/components/LinkButton';
import SessionDropdown from 'flarum/forum/components/SessionDropdown';
import NotificationsDropdown from 'flarum/forum/components/NotificationsDropdown';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import IndexSidebar from 'flarum/forum/components/IndexSidebar';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
import textContrastClass from 'flarum/common/helpers/textContrastClass';

export const extenders = [];

app.initializers.add('resofire-aurora', () => {

    // ── Discussion list: tag-colour accent stripe ─────────────
    extend(DiscussionListItem.prototype, 'elementAttrs', function (attrs) {
        const tags = this.attrs.discussion.tags?.();
        const color = tags && tags.length ? tags[0].color() : null;
        if (!attrs.style) attrs.style = {};
        attrs.style['--aurora-tag-color'] = color || 'var(--primary-color)';
    });

    // ── Tag tiles: replace flat tag list with colour grid ─────
    // Override navItems to inject our tile grid instead of TagLinkButton rows.
    extend(IndexSidebar.prototype, 'navItems', function (items) {
        // Remove all tag* items added by flarum/tags (they start with 'tag')
        const keys = Object.keys(items.items);
        keys.forEach((key) => {
            if (key.startsWith('tag') && key !== 'tags') {
                items.remove(key);
            }
        });
        // Also remove the separator
        items.remove('separator');

        // Get sorted primary tags
        const allTags = app.store.all('tags');
        const primaryTags = allTags
            .filter((t) => t.position() !== null && !t.isChild())
            .sort((a, b) => (a.position() ?? 0) - (b.position() ?? 0));

        if (!primaryTags.length) return;

        const params = app.search.state.stickyParams();
        const currentTag = app.currentTag?.();

        const tiles = primaryTags.map((tag) => {
            const color = tag.color() || '#888';
            const icon = tag.icon();
            const isActive = currentTag === tag;
            const contrastClass = textContrastClass(color);
            const count = tag.discussionCount();

            return (
                <a
                    href={app.route('tag', { ...params, tags: tag.slug() })}
                    className={'aurora-tag-tile ' + contrastClass + (isActive ? ' active' : '')}
                    style={{ '--tile-color': color }}
                    onclick={(e) => {
                        e.preventDefault();
                        m.route.set(app.route('tag', { ...params, tags: tag.slug() }));
                    }}
                >
                    {icon && <i className={'aurora-tag-tile-icon ' + icon} />}
                    <span className="aurora-tag-tile-name">{tag.name()}</span>
                    {count !== undefined && (
                        <span className="aurora-tag-tile-count">{count} discussions</span>
                    )}
                </a>
            );
        });

        items.add(
            'tagTiles',
            <div className="aurora-tag-grid">{tiles}</div>,
            -14
        );
    });

    // ── IndexSidebar: remove new discussion, add user block ───
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

    // ── HeaderSecondary: move session out, add new discussion ─
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
