Template.MainLayout.onCreated(function() {
    var self = this;

    // Set loading var
    Session.set('isLoading', true);

    var sub = self.subscribe('users.isLawyer');
    // Keep the cases info throughout the whole app
    self.subscribe('cases', Meteor.userId());
    self.autorun(function() {
        Session.set({
            'currentLocation': Geolocation.latLng(),
            'hasNewVersion': Reload.isWaitingForResume(),
            'isLawyer': sub ? Lawyers.findOne({userId: Meteor.userId()}) : false
        });
    });
});

Template.MainLayout.helpers({
    hasNewVersion: () => {
        return Session.get('hasNewVersion');
    }
});

Template.MainLayout.events({
    'change #lang-dropdown': (event) => {
        console.log(event.currentTarget);
        TAPi18n.setLanguage(event.currentTarget.val());
    }
});