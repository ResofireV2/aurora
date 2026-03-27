import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import HeaderPrimary from 'flarum/forum/components/HeaderPrimary';
import IndexSidebar from 'flarum/forum/components/IndexSidebar';

export const extenders = [];

app.initializers.add('resofire-aurora', () => {

    // Add "Start a Discussion" to the header primary controls
    extend(HeaderPrimary.prototype, 'items', function (items) {
        const canStart = app.forum.attribute('canStartDiscussion') || !app.session.user;

        items.add(
            'newDiscussion',
            <Button
                icon="fas fa-edit"
                className="Button Button--primary aurora-newDiscussion"
                itemClassName="App-primaryControl"
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
            100
        );
    });

    // Remove the button from the sidebar — it now lives in the header
    extend(IndexSidebar.prototype, 'items', function (items) {
        items.remove('newDiscussion');
    });

});
