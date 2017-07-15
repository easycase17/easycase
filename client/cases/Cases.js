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
        self.subscribe('cases', Meteor.userId());
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
        // @FIXME
        return Meteor.users.findOne(userId).username;
    }
});

/* --------------------  Case Template  ---------------------- */
Template.Case.onCreated(function() {
    var self = this;
    self.hasGrab = new ReactiveVar( false );
    self.lawyers = new ReactiveVar( String );

    var id = FlowRouter.getParam('id');
    var subs = self.subscribe('singleCase', id);

    self.autorun(function () {
        if (!subs.ready()) return;
        var isLawyer = Session.get('isLawyer');
        if (isLawyer) {
            // If the user isLawyer, then check if the lawyer hasGrabCase
            Meteor.call('lawyers.hasGrabCase', id, isLawyer._id, (err, res) => {
                self.hasGrab.set(res);
            });
        }

        var lawyers = Lawyers.find({});
        var lawyersView = [];
        lawyers.forEach(function(lawyer) {
            lawyersView.push(`<a href="/lawyers/${lawyer._id}">${lawyer.name}</a>`);
        });
        lawyersView = lawyersView.join(', ');
        self.lawyers.set(lawyersView);
    });
});

Template.Case.helpers({
    findUsername: (userId) => {
        // @FIXME
        return Meteor.users.findOne(userId).username;
    },
    case: () => {
        var id = FlowRouter.getParam('id');
        return Cases.findOne({_id: id});
    },
    lawyers: () => {
        return Template.instance().lawyers.get();
    },
    contract: () => {
        var id = FlowRouter.getParam('id');
        return Contracts.findOne({caseId: id});
    },
    blogs: () => {
        return CasesBlogs.find({});
    },
    hasGrab: () => {
        return Template.instance().hasGrab.get();
    },
    isLawyer: () => {
        return Session.get('isLawyer');
    },
    isAuthor: (blog) => {
        return (blog.createdBy.authorId == Meteor.userId());
    },
    isOwner: (case_info) => {
        return case_info.createdBy == Meteor.userId();
    },
    isPrivate: (case_info) => {
        return case_info.isPrivate;
    }
});

Template.Case.events({
    'click #drop-case': function(event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('lawyers.dropCase', caseId, Session.get('isLawyer')._id, function(err, res) {
            if (!err) {
               Meteor.disconnect();
               Meteor.reconnect();
            }
        });
    },
    'click #grab-case': function(event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('lawyers.grabCase', caseId, Session.get('isLawyer')._id, function(err, res) {
            if (!err) {
               Meteor.disconnect();
               Meteor.reconnect();
            }
        });
    },
    'click #private-case': function(event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('cases.setPrivate', caseId, Meteor.userId());
    },
    'click #public-case': function(event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('cases.setPublic', caseId, Meteor.userId());
    }
});


/* ----------------- NewCaseBlog --------------------- */
Template.NewCaseBlog.helpers({
    userId: function() {
        return Meteor.userId();
    },
    caseId: function() {
        return FlowRouter.getParam('id');
    },
    isLawyer: () => {
        // @FIXME
        return Session.get('isLawyer');
    },
});