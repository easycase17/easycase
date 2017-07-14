Meteor.methods({
    'cases.findCase'(caseId) {
        return Cases.findOne(caseId);
    },
    'cases.findContract'(caseId) {
        return Contracts.find({caseId: caseId});
    },
    'cases.findContractors'(caseId) {
        return Contracts.find({caseId: caseId}, {contractors: true});
    },
    'cases.setPrivate'(caseId, userId) {
        return Cases.update({_id: caseId, createdBy: userId}, {$set: {isPrivate: true}});
    },
    'cases.setPublic'(caseId, userId) {
        return Cases.update({_id: caseId, createdBy: userId}, {$set: {isPrivate: false}});
    }
});