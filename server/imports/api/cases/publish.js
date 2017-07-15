/* --------------------- Cases Collection --------------------- */
Meteor.publish('cases', function(userId) {
    check(userId, String);
    return Cases.find({createdBy: userId});
});

Meteor.publish('cases-discover', function(userId) {
    check(userId, String);
    return Cases.find({isPrivate: false});
});

Meteor.publish('singleCase', function(caseId) {
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

    // Contract
    var contracts = Contracts.find({caseId: caseId});
    result.push(contracts);

    // Lawyers
    contracts.forEach(function(contract) {
        var lawyersId = contract.contractors;
        lawyersId.forEach(function (lawyerId) {
            result.push(Lawyers.find({ _id: lawyerId }));
        });
    });

    // Blogs
    result.push(CasesBlogs.find({caseId: caseId}));
    return result;
});