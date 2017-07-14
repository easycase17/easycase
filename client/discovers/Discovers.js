/* --------------------  Discovers Template  ---------------------- */
Template.Discovers.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('cases-discover', Meteor.userId());
    });
});

Template.Discovers.helpers({
    discovers: () => {
        return Cases.find({});
    }
});

Template.DiscoversItem.helpers({
    // @FIXME
    findUsername: (userId) => {
        return new Promise(function(resolve, reject) {
            Meteor.call('users.findUser', userId, (err, res) => {
                 resolve(res);
            });
        });
    }
});
