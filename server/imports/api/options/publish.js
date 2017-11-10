Meteor.publish('options.getOptions', function(field, lang) {
    return Collections.Options.find({field: field, lang: lang});
});