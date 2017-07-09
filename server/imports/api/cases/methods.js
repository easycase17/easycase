Meteor.methods({
    'cases.findCase'(caseId) {
        return Cases.findOne(caseId);
    },
    'cases.findContract'(caseId) {
        return Contracts.find({caseId: caseId});
    },
    'cases.findContractors'(caseId) {
        return Contracts.find({caseId: caseId}, {contractors: true});
    }
});