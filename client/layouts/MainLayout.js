Template.MainLayout.onCreated(function() {
    var self = this;
    Meteor.call('users.isLawyer', Meteor.userId(), (err, res) => {
        Session.set({'isLawyer': res});
    });
    // Keep the cases info throughout the whole app
    self.subscribe('cases', Meteor.userId());
    self.autorun(function() {
        Session.set({'currentLocation': Geolocation.latLng()});
        Session.set({'hasNewVersion': Reload.isWaitingForResume()})
    });
});

Template.MainLayout.helpers({
    hasNewVersion: () => {
        return Session.get('hasNewVersion');
    }
});