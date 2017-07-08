Meteor.methods({
    'users.findUser'({ userId }) {
        return Meteor.users.findOne(userId);
    }
});