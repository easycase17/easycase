Meteor.publish('users.isLawyer', function () {
    return Lawyers.find({ userId: this.userId });
});

Meteor.publish('users.APIKey', function () {
    var user = this.userId;
    var data = APIKeys.find({ "owner": user }, { fields: { "key": 1 } });

    if (data) {
        return data;
    }

    return this.ready();
});