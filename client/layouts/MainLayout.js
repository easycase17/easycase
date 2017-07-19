Template.MainLayout.onCreated(function() {
    var self = this;
    var sub = self.subscribe('users.isLawyer');
    // Keep the cases info throughout the whole app
    self.subscribe('cases', Meteor.userId());
    self.autorun(function() {
        Session.set({'currentLocation': Geolocation.latLng()});
        Session.set({'hasNewVersion': Reload.isWaitingForResume()})
        Session.set({'isLawyer': sub ? Lawyers.findOne({userId: Meteor.userId()}) : false});
    });
});

Template.MainLayout.helpers({
    hasNewVersion: () => {
        return Session.get('hasNewVersion');
    }
});