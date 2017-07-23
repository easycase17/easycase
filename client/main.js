getUserLanguage = function () {
  // Put here the logic for determining the user language

  return "zh";
};

if (Meteor.isClient) {
  Meteor.startup(function () {
    _.extend(Notifications.defaultOptions, {
      timeout: 3500
    });

    TAPi18n.setLanguage(getUserLanguage())
      .done(function () {
        Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });
  });
}