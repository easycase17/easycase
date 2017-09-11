import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    createNewUser(options) {
        var userId = Accounts.createUser(options, function(error) {
            if(error){
                // @TODO: Need to handle the error
              } else {
                var userId = Meteor.userId();
                Meteor.call( "initApiKey", userId );
            }
        });
        Accounts.addEmail(userId, options.profile.emails[0], false);
        Accounts.sendVerificationEmail(userId, options.profile.emails[0]);
    },
    initApiKey(userId) {
        check(userId, Match.OneOf(Meteor.userId(), String));

        var newKey = Random.hexString(32);

        try {
            var key = APIKeys.insert({
                "owner": userId,
                "key": newKey
            });
            return key;
        } catch (exception) {
            return exception;
        }
    }
});
