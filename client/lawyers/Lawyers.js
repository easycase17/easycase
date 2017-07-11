/* ---------------------- Lawyers Template ---------------------- */
Template.Lawyers.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('lawyers');
    });
});

Template.Lawyers.helpers({
    lawyers: () => {
        return Lawyers.find({});
    }
});

/* -------------------- Lawyer Template ----------------------- */
Template.Lawyer.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('id');
        self.subscribe('singleLawyer', id);
    });
});

Template.Lawyer.helpers({
    lawyer: () => {
        var id = FlowRouter.getParam('id');
        return Lawyers.findOne({_id: id});
    }
});