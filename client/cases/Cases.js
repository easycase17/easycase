Template.NewCase.helpers({
    userId: function() {
        return Meteor.userId();
    }
});

Meteor.subscribe('cases');
Template.Cases.helpers({
    cases: function() {
        return Cases.find({});
    },
    user: function(userId) {
        return Meteor.users.findOne(userId).username;
    },
    lawyer: function(lawyerId) {
        return Meteor.call('lawyers.findLawyer', lawyerId);
    },
    contract: function(caseId) {
        return Meteor.call('cases.findContract', caseId).lawyersId;
    }
});