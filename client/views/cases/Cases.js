import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';

/* --------------------  NewCase Template  ---------------------- */
Template.NewCase.helpers({
    userId: function () {
        return Meteor.userId();
    }
});

Template.NewCase.onRendered(function() {
    this.$('textarea').froalaEditor({
        height: 400
    });
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
Template.Cases.onCreated(function() {
    Session.set('isLoading', false);
});

Template.Cases.helpers({
    cases: () => {
        return Collections.Cases.find({});
    }
});

Template.CasesItem.helpers({
    findUsername: (userId) => {
        // @FIXME
        return Meteor.users.findOne(userId).username;
    },
    chipsHtml: (caseId) => {
        var tags = Template.instance().data.tags;
        var tagsView = [];

        tags.forEach(function(tag) {
            let tmp = Collections.Options.findOne({ field: 'law', lang: TAPi18n.getLanguage() });
            tagsView.push(`<div class="chip">${tmp.options[tag].label}</div>`);
        });
        tagsView = tagsView.join('');
        return tagsView;
    },
    createdAtString: () => {
        var date = Template.instance().data.createdAt;
        return date.toString();
    }
});

Template.Cases.onDestroyed(function() {
    Session.set('isLoading', true);
});


/* --------------------  Case Template  ---------------------- */
Template.Case.onCreated(function () {
    var self = this;
    self.hasGrab = new ReactiveVar(false);
    self.lawyers = new ReactiveVar(String);

    var id = FlowRouter.getParam('id');
    var subs = self.subscribe('singleCase', id);

    // Inc view counts
    Meteor.call('cases.viewCase', id);

    self.autorun(function () {
        if (!subs.ready()) return;
        var isLawyer = Session.get('isLawyer');
        if (isLawyer) {
            // If the user isLawyer, then check if the lawyer hasGrabCase
            Meteor.call('lawyers.hasGrabCase', id, isLawyer._id, (err, res) => {
                self.hasGrab.set(res);
            });
        }

        var contracts = Collections.Contracts.find({});
        var lawyersView = [];
        contracts.forEach(function (contract) {
            var lawyer = Collections.Lawyers.findOne({ _id: contract.contractor });
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
        return Collections.Lawyers.findOne({ _id: lawyerId }).name;
    },
    case: () => {
        var id = FlowRouter.getParam('id');
        return Collections.Cases.findOne({ _id: id });
    },
    lawyers: () => {
        return Template.instance().lawyers.get();
    },
    contracts: () => {
        return Collections.Contracts.find({});
    },
    blogs: () => {
        return Collections.CasesBlogs.find({});
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
    },
    isComplete: (case_info) => {
        return case_info.isComplete;
    },
    hasLawyerAnswer: () => {
        return true;
    },
    hasBestAnswer: () => {
        return true;
    }
});

Template.Case.events({
    'click #drop-case': function (event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('lawyers.dropCase', caseId);
    },
    'click #grab-case': function (event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('lawyers.grabCase', caseId);
    },
    'click #private-case': function (event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('cases.setPrivate', caseId, function(err, res) {
            if (err) {
                console.log(err);
            }
        });
    },
    'click #public-case': function (event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('cases.setPublic', caseId, function(err, res) {
            if (err) {
                console.log(err);
            }
        });
    },
    'click #complete-case': function (event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('cases.setComplete', caseId, function(err, res) {
            if (err) {
                console.log(err);
            }
        });
    },
    'click #incomplete-case': function (event, template) {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('cases.setIncomplete', caseId, function(err, res) {
            if (err) {
                console.log(err);
            }
        });
    }
});