Template.NewCase.helpers({
    userId: function() {
        return Meteor.userId();
    }
});

Meteor.subscribe('cases');