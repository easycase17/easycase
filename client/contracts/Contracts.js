/* ------------------- Contract ----------------- */
Template.Contract.onCreated(function() {
    var self = this;
    var id = FlowRouter.getParam('id');
    var subs = self.subscribe('singleContract', id);

    // @TODO
    self.autorun(function () {
        if (!subs.ready()) return;
    });
});

Template.Contract.helpers({
    contract: () => {
        var id = FlowRouter.getParam('id');
        return Contracts.findOne({_id: id});
    }
});