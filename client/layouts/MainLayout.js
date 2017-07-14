Template.MainLayout.onCreated(function() {
    var self = this;
    Meteor.call('users.isLawyer', Meteor.userId(), (err, res) => {
        Session.set({'isLawyer': res});
    });
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