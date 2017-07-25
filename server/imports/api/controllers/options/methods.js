Meteor.methods({
    'options.getOptions': function(option) {
        this.unblock();
        if (option && option.params && option.params.field) {
            return Options.findOne({field: option.params.field}).options;
        }
    }
});