Meteor.methods({
    'users.isLawyer'(userId) {
        return Lawyers.findOne({userId: userId});
    },
    'users.findUser'({ userId }) {
        return Meteor.users.findOne(userId);
    }
});