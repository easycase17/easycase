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
    Meteor.call('lawyers.isLawyer', Meteor.userId(), (err, res) => {
        self.isLawyer.set(res);
    });
    self.autorun(function () {
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
        var lawyers = Lawyers.find({});
        var result = [];
        lawyers.forEach(function(lawyer) {
            result.push(`<a href="/lawyers/${lawyer._id}">${lawyer.name}</a>`);
        });
        Array.prototype.join(', ');
        return result;
    },
    contract: () => {
        var id = FlowRouter.getParam('id');
        return Contracts.findOne({caseId: id});
    },
    blogs: () => {
        return CasesBlogs.find({});
    },
    hasGrab: () => {
        return Lawyers.find({userId: Meteor.userId()});
    },
    isLawyer: () => {
        // @FIXME
        return Template.instance().isLawyer.get();
    },
    isAuthor: (blog) => {
        return (blog.createdBy.authorId == Meteor.userId());
    }
});