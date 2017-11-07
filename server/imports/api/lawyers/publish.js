Meteor.publish('lawyers', function() {
    return Collections.Lawyers.find({});
});

Meteor.publish('singleLawyer', function(id) {
    return Collections.Lawyers.find({_id: id});
});