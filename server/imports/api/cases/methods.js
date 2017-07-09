Meteor.methods({
    'cases.findCase'(caseId) {
        return Cases.findOne(caseId);
    }
});