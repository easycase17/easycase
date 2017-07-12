Meteor.publish('cases', function() {
    return Cases.find({});
});

Meteor.publish('singleCase', function(caseId) {
    check(caseId, String);
    return Cases.find({_id: caseId});
});

Meteor.publish('singleCase.lawyers', function(caseId) {
    check(caseId, String);
    var lawyersId = Contracts.findOne({caseId: caseId}).contractors;
    var result = [];
    lawyersId.forEach(function(lawyerId) {
        result.push(Lawyers.find({_id: lawyerId}));
    });
    return result;
})

Meteor.publish('contracts', function() {
    return Contracts.find({contractee: this.userId});
});