Meteor.publish('lawyers', function() {
    return Lawyers.find({});
});

Meteor.publish('singleLawyer', function(id) {
    return Lawyers.find({_id: id});
});