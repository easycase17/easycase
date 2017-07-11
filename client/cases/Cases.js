Meteor.subscribe('contracts');
Meteor.subscribe('lawyers');


/* --------------------  NewCase Template  ---------------------- */
Template.NewCase.helpers({
    userId: function() {
        return Meteor.userId();
    }
});


/* --------------------  Cases Template  ---------------------- */
Template.Cases.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('cases');
    });
});

Template.Cases.helpers({
    cases: () => {
        return Cases.find({});
    },
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

/* --------------------  Case Template  ---------------------- */
Template.Case.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('cases');
    });
});

Template.Case.helpers({
    case: () => {
        var id = FlowRouter.getParam('id');
        return Cases.findOne({_id: id});
    }
});