import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

const userLanguage = () => {
    // If the user is logged in, retrieve their saved language
    if (Meteor.user()) return Meteor.user().profile.language;
};

if (Meteor.isClient) {
    Meteor.startup(function () {
        _.extend(Notifications.defaultOptions, {
            timeout: 3500
        });

        let lang;

        // URL Language takes priority
        const urlLang = FlowRouter.getQueryParam('lang');
        if (urlLang) {
            lang = urlLang;
        } else if (userLanguage()) {
            // User language is set if no url lang
            lang = userLanguage();
        } else {
            // If no user language, try setting by browser (default en)
            const localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
            let locale = 'en';

            if (localeFromBrowser.match(/en/)) locale = 'en';
            if (localeFromBrowser.match(/zh/)) locale = 'zh';

            lang = locale;
        }
        TAPi18n.setLanguage(lang);

        // When a file is added
        Collections.Avatars.resumable.on('fileAdded', function (file) {

            // Create a new file in the file collection to upload
            Collections.Avatars.insert({
                _id: file.uniqueIdentifier,  // This is the ID resumable will use
                filename: file.fileName,
                contentType: file.file.type
            },
                function (err, _id) {  // Callback to .insert
                    if (err) {
                        return Notifications.error('Error', err);
                    }
                    else {
                        // Once the file exists on the server, start uploading
                        Collections.Avatars.resumable.upload();

                        // render the url of the avatar
                        let avatarUrl = Meteor.settings.public.Company.domain + Collections.Avatars.baseURL + '/' + _id;

                        Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.avatar': avatarUrl } });
                    }
                }
            );
        });

        // Comments setting
        Comments.ui.config({
            template: 'bootstrap', // or ionic, semantic-ui
            limit: 5,
            loadMoreCount: 10,
            markdown: false,
            generateAvatar: function (user, isAnonymous) {
                if (user.profile.avatar) {
                    return user.profile.avatar;
                } else {
                    return `https://ui-avatars.com/api/?name=${user.profile.firstname}+${user.profile.lastname}&background=524763&color=FFF`;
                }
            }
        });

        Tracker.autorun(() => {
            // Comments content language
            Comments.ui.setContent({
                title: TAPi18n.__("COMMENTS.TITLE"),
                save: TAPi18n.__("COMMENTS.SAVE"),
                reply: TAPi18n.__("COMMENTS.REPLY"),
                edit: TAPi18n.__("COMMENTS.EDIT"),
                remove: TAPi18n.__("COMMENTS.REMOVE"),
                'placeholder-textarea': TAPi18n.__("COMMENTS.PLACEHOLDER"),
                'add-button-reply': TAPi18n.__("COMMENTS.ADD_BUTTON_REPLY"),
                'add-button': TAPi18n.__("COMMENTS.ADD_BUTTON"),
                'load-more': TAPi18n.__("COMMENTS.LOAD_MORE")
            });
        });
    });
}