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
    Meteor.call('users.isLawyer', Meteor.userId(), (err, res) => {
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
        var lawyer = Template.instance().isLawyer.get();
        return lawyer ? (Contracts.find({contractors: {$in: [lawyer._id]}}) ? true : false) : false;
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
    'click #drop-case': function() {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('lawyers.dropCase', caseId, Template.instance().isLawyer.get()._id, function(err, res) {
            if (!err) {
               Template.instance().isLawyer.set(false); 
            }
        });
    },
    'click #grab-case': function() {
        var caseId = FlowRouter.getParam('id');
        Meteor.call('lawyers.grabCase', caseId, Template.instance().isLawyer.get()._id, function(err, res) {
            if (!err) {
               Template.instance().isLawyer.set(res); 
            }
        });
    }
});