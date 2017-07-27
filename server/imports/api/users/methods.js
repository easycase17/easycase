Meteor.methods({
    'users.findUser'(userId) {
        // Check if legal user
        if (this.userId) {
            check(userId, String);
            return Meteor.users.findOne(userId);
        } else {
            throw new Meteor.Error('IllegalUserError', 'When finding a user');
        }
    }
});