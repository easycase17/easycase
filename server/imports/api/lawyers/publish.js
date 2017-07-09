Meteor.publish('lawyers', function() {
    return Lawyers.find({});
});