Meteor.methods({
    'lawyers.findLawyer'(lawyerId) {
        return Lawyers.findOne(lawyerId).name;
    },
    'lawyers.dropCase'(caseId, lawyerId) {
        return Contracts.update({caseId: caseId}, {$pull: {contractors: lawyerId}}) ? true : false;
    },
    'lawyers.grabCase'(caseId, lawyerId) {
        check(caseId, String);
        check(lawyerId, String);
        var res = Contracts.update({caseId: caseId}, {$addToSet: {contractors: lawyerId}});
        // If there is no contracts on this caseId, then insert a new doc into db
        if (!res) {
            // Get the userId from the Case
            var c = Cases.findOne({_id: caseId});
            Contracts.insert({
                contractee: c.createdBy,
                contractors: [lawyerId],
                caseId: caseId
            });
        }
        return Lawyers.findOne({_id: lawyerId});
    },
    'lawyers.hasGrabCase'(caseId, lawyerId) {
        return Contracts.findOne({caseId: caseId, contractors: {$in: [lawyerId]}});
    }
});