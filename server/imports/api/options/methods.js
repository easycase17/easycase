Meteor.methods({
    'options.getOptions': function (option) {
        // Check if legal user
        if (this.userId) {
            this.unblock();
            if (option && option.params && option.params.field) {
                return Collections.Options.findOne({ field: option.params.field }).options;
            } else {
                throw new Meteor.Error('InvalidArguments');
            }
        }
        else {
            throw new Meteor.Error('IllegalUserError', 'When getting options');
        }
    }
});