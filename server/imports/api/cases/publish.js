Meteor.publish('cases', function() {
    return Cases.find({});
});

Meteor.publish('singleCase', function(id) {
    check(id, String);
    return Cases.find({_id: id});
});

Meteor.publish('contracts', function() {
    return Contracts.find({contractee: this.userId});
});