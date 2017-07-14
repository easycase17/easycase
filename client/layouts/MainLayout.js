Template.MainLayout.onCreated(function() {
    var self = this;
    Meteor.call('users.isLawyer', Meteor.userId(), (err, res) => {
        Session.set({'isLawyer': res});
    });
    self.autorun(function() {
        Session.set({'currentLocation': Geolocation.latLng()});
    });
});