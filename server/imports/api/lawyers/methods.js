Meteor.methods({
    'lawyers.findLawyer'(lawyerId) {
        return Lawyers.findOne(lawyerId).name;
    },
    'lawyers.dropCase'(caseId, lawyerId) {
        return Contracts.update({caseId: caseId}, {$pull: {contractors: lawyerId}}) ? true : false;
    },
    'lawyers.grabCase'(caseId, lawyerId) {
        Contracts.update({caseId: caseId}, {$addToSet: {contractors: lawyerId}});
        return Lawyers.findOne({_id: lawyerId});
    },
    'lawyers.hasGrabCase'(caseId, lawyerId) {
        return Contracts.findOne({caseId: caseId, contractors: {$in: [lawyerId]}});
    }
});