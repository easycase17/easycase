Meteor.publish('singleContract', function(contractId) {
    return Collections.Contracts.find({_id: contractId});
});