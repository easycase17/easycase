Meteor.publish('cases', function() {
    return Cases.find({createdBy: this.userId});
});

Meteor.publish('contracts', function() {
    return Contracts.find({contractee: this.userId});
});