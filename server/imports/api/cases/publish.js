/* --------------------- Cases Collection --------------------- */
Meteor.publish('cases', function(userId) {
    check(userId, String);
    return Cases.find({createdBy: userId});
});

Meteor.smartPublish('singleCase', function(caseId) {
    check(caseId, String);
    var result = [];

    // Case
    var cases = Cases.find({_id: caseId});
    result.push(cases);

    // Authors (users)
    cases.forEach(function(c) {
        var userId = c.createdBy;
        // Meteor helps us to prevent private information to push to the client
        result.push(Meteor.users.find({_id: userId}));
    });

    // Contracts
    var contracts = Contracts.find({caseId: caseId});
    result.push(contracts);

    // Lawyers
    contracts.forEach(function(contract) {
        var lawyerId = contract.contractor;
        result.push(Lawyers.find({ _id: lawyerId }));
    });

    // Blogs
    result.push(CasesBlogs.find({caseId: caseId}));
    return result;
});