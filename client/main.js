const userLanguage = () => {
  // If the user is logged in, retrieve their saved language
  if (Meteor.user()) return Meteor.user().profile.language;
};

if (Meteor.isClient) {
  Meteor.startup(function () {
    _.extend(Notifications.defaultOptions, {
      timeout: 3500
    });

    Tracker.autorun(() => {
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
    });
  });
}