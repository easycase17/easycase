Meteor.methods({
    'cases.findCase'(caseId) {
        return Cases.findOne(caseId);
    },
    'cases.findContract'(caseId) {
        return Contracts.findOne(caseId);
    }
});