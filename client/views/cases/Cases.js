/* --------------------  NewCase Template  ---------------------- */
Template.NewCase.helpers({
    userId: function () {
        return Meteor.userId();
    }
});

AutoForm.hooks({
    insertCaseForm: {
        onSuccess: function (formType, res) {
            FlowRouter.go('/cases');
            Notifications.success('Success', 'Your case will be delivered to nearby lawyers!');
        },
        onError: function (name, error, template) {
            console.log(name + " error:", error);
        }
    }
});


/* --------------------  Cases Template  ---------------------- */

Template.Cases.helpers({
    cases: () => {
        return Cases.find({});
    }
});

Template.Cases.events({
    'click #create-case': function () {
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
Template.Case.onCreated(function () {
    var self = this;
    self.hasGrab = new ReactiveVar(false);
    self.lawyers = new ReactiveVar(String);

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

        var contracts = Contracts.find({});
        var lawyersView = [];
        contracts.forEach(function (contract) {
            var lawyer = Lawyers.findOne({ _id: contract.contractor });
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
    getLawyerName: (lawyerId) => {
        return Lawyers.findOne({ _id: lawyerId }).name;
    },
    case: () => {
        var id = FlowRouter.getParam('id');
        return Cases.findOne({ _id: id });
    },
    lawyers: () => {
        return Template.instance().lawyers.get();
    },
    contracts: () => {
        return Contracts.find({});
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
    'click #drop-case': function (event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('lawyers.dropCase', caseId, function (err, res) {
            if (!err) {
                Meteor.disconnect();
                Meteor.reconnect();
            }
        });
    },
    'click #grab-case': function (event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('lawyers.grabCase', caseId, function (err, res) {
            if (!err) {
                Meteor.disconnect();
                Meteor.reconnect();
            }
        });
    },
    'click #private-case': function (event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('cases.setPrivate', caseId, Meteor.userId());
    },
    'click #public-case': function (event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('cases.setPublic', caseId, Meteor.userId());
    }
});


/* ----------------- NewCaseBlog --------------------- */
Template.NewCaseBlog.helpers({
    userId: function () {
        return Meteor.userId();
    },
    caseId: function () {
        return FlowRouter.getParam('id');
    },
    isLawyer: () => {
        // @FIXME
        return Session.get('isLawyer');
    },
});
