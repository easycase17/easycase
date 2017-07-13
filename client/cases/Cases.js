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
        return Meteor.users.findOne(userId).username;
    }
});

/* --------------------  Case Template  ---------------------- */
Template.Case.onCreated(function() {
    var self = this;
    self.isLawyer = new ReactiveVar( false );
    self.hasGrab = new ReactiveVar( false );
    self.lawyers = new ReactiveVar( String );
    var id = FlowRouter.getParam('id');
    var subs = self.subscribe('singleCase', id);

    self.autorun(function () {
        if (!subs.ready()) return;
        Meteor.call('users.isLawyer', Meteor.userId(), (err, res) => {
            self.isLawyer.set(res);
            Meteor.call('lawyers.hasGrabCase', id, res._id, (err, res) => {
                self.hasGrab.set(res);
            });
        });

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
        // @FIXME
        return Template.instance().isLawyer.get();
    },
    isAuthor: (blog) => {
        return (blog.createdBy.authorId == Meteor.userId());
    }
});

Template.Case.events({
    'click #drop-case': function(event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('lawyers.dropCase', caseId, template.isLawyer.get()._id, function(err, res) {
            if (!err) {
               template.hasGrab.set(false); 
               Meteor.disconnect();
               Meteor.reconnect();
            }
        });
    },
    'click #grab-case': function(event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('lawyers.grabCase', caseId, template.isLawyer.get()._id, function(err, res) {
            if (!err) {
               template.hasGrab.set(true); 
               Meteor.disconnect();
               Meteor.reconnect();
            }
        });
    }
});