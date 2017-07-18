Meteor.publish('users.isLawyer', function() {
    return Lawyers.find({userId: this.userId});
});