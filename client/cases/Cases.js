Template.NewCase.helpers({
    userId: function() {
        return Meteor.userId();
    }
});

Meteor.subscribe('cases');
Template.Cases.helpers({
    cases: () => {
        return Cases.find({});
    },
    user: (userId) => {
        return Meteor.users.findOne(userId).username;
    }
});