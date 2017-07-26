Meteor.methods({
    'lawyers.findLawyer'(lawyerId) {
        return Lawyers.findOne(lawyerId).name;
    },
    'lawyers.dropCase'(caseId, lawyerId) {
        return Contracts.remove({caseId: caseId, contractor: lawyerId});
    },
    'lawyers.grabCase'(caseId, lawyerId) {
        check(caseId, String);
        check(lawyerId, String);
        var c = Cases.findOne({_id: caseId});
        return Contracts.insert({
            contractee: c.createdBy,
            contractor: lawyerId,
            caseId: caseId
        });
    },
    'lawyers.hasGrabCase'(caseId, lawyerId) {
        return Contracts.findOne({caseId: caseId, contractor: lawyerId});
    }
});