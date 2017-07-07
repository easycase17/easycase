Meteor.publish('cases', function() {
    return Cases.find({createdBy: this.userId});
});