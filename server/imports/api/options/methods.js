Meteor.methods({
    'options.getOptions': function(option) {
        this.unblock();
        return Options.findOne({field: option.params.field}).options;
    }
});