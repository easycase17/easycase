Meteor.publish('singleContract', function(contractId) {
    return Contracts.find({_id: contractId});
});