/* --------------------  Discovers Template  ---------------------- */
Template.Discovers.onCreated(function() {
    var self = this;
    self.fieldType = new ReactiveVar( String );
    self.fieldType.set('Cases');
    self.discovers = new ReactiveVar( Array );
    self.discovers.set([]);

    self.autorun(function() {
        // Fetch the SearchRule
        var searchRule = Session.get('SearchRule');

        switch(self.fieldType.get()) {
            case 'Cases':
                Meteor.call('discovers.getCases', searchRule, function(err, res) {
                    if (!err) {
                        self.discovers.set(res);
                    }
                });
                break;
            case 'Lawyers':
                Meteor.call('discovers.getLawyers', searchRule, function(err, res) {
                    if (!err) {
                        self.discovers.set(res);
                    }
                });
                break;
            case 'Articles':
                break;
        }
    });
});

Template.Discovers.helpers({
    discovers: () => {
        return Template.instance().discovers.get();
    },
    isCasesField: () => {
        return Template.instance().fieldType.get() === 'Cases';
    },
    isLawyersField: () => {
        return Template.instance().fieldType.get() === 'Lawyers';
    },
    isArticlesField: () => {
        return Template.instance().fieldType.get() === 'Articles';
    }
});

Template.Discovers.events({
    'click #discover-cases-btn': function(event, template) {
        template.fieldType.set('Cases');
    },
    'click #discover-lawyers-btn': function(event, template) {
        template.fieldType.set('Lawyers');
    },
    'click #discover-articles-btn': function(event, template) {
        template.fieldType.set('Articles');
    }
});