Meteor.subscribe('cases');
Meteor.subscribe('contracts');
Meteor.subscribe('lawyers');

Template.NewCase.helpers({
    userId: function() {
        return Meteor.userId();
    }
});

Template.Cases.helpers({
    cases: () => {
        return Cases.find({});
    },
});

Template.Case.helpers({
    findUsername: (userId) => {
        return Meteor.users.findOne(userId).username;
    },
    // @FIXME
    findLawyers: (caseId) => {
        var lawyersId = Contracts.findOne({caseId: caseId}).contractors;
        if (lawyersId && lawyersId[0]) {
            return Lawyers.findOne(lawyersId[0]).name;
        }
        else
            return null;
    }
});