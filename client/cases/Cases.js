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
    }
});

Template.Cases.events({
    'click #create-case': function() {
        FlowRouter.go('/cases/create');
    }
});

Template.CasesItem.helpers({
    findUsername: (userId) => {
        return Meteor.users.findOne(userId).username;
    }
});

/* --------------------  Case Template  ---------------------- */
Template.Case.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('id');
        self.subscribe('singleCase', id);
    });
});

Template.Case.helpers({
    findUsername: (userId) => {
        return Meteor.users.findOne(userId).username;
    },
    case: () => {
        var id = FlowRouter.getParam('id');
        return Cases.findOne({_id: id});
    },
    lawyers: () => {
        return Lawyers.find({});
    },
    contract: () => {
        var id = FlowRouter.getParam('id');
        return Contracts.findOne({caseId: id});
    },
    blogs: () => {
        return [{}, {}, {}, {}];
    }
});