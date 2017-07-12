Meteor.publish('cases', function() {
    return Cases.find({});
});

Meteor.publish('singleCase', function(caseId) {
    check(caseId, String);
    var result = [];

    // Case
    result.push(Cases.find({_id: caseId}));

    // Contract
    var contract = Contracts.find({caseId: caseId});
    result.push(contract);

    // Lawyers
    var lawyersId = Contracts.findOne({caseId: caseId}).contractors;
    lawyersId.forEach(function(lawyerId) {
        result.push(Lawyers.find({_id: lawyerId}));
    });
    return result;
});