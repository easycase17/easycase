/* --------------------  Discovers Template  ---------------------- */
Template.Discovers.onCreated(function() {
    var self = this;
    self.fieldType = new ReactiveVar( String );
    self.fieldType.set('Cases');
    self.discovers = new ReactiveVar( Array );
    self.discovers.set([]);
    self.page = new ReactiveVar( Number );
    self.page.set(1);
    self.numPages = new ReactiveVar( Number );
    self.numPages.set(1);
    Session.set('isLoading', true);

    self.autorun(function() {
        // Fetch the SearchRule
        var searchRule = Session.get('SearchRule');

        // Before calling to fetch data, change to loading mode
        Session.set('isLoading', true);

        switch(self.fieldType.get()) {
            case 'Cases':
                Meteor.call('discovers.getCases', searchRule, { perPage: 10, reqPage: self.page.get() }, function(err, res) {
                    if (!err) {
                        self.discovers.set(res.data);
                        self.numPages.set(res.numPages);
                        Session.set('isLoading', false);
                    }
                });
                break;
            case 'Lawyers':
                Meteor.call('discovers.getLawyers', searchRule, { perPage: 10, reqPage: self.page.get() }, function(err, res) {
                    if (!err) {
                        self.discovers.set(res.data);
                        self.numPages.set(res.numPages);
                        Session.set('isLoading', false);
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
    },
    page: () => {
        return Template.instance().page.get();
    },
    numPages: () => {
        return Template.instance().numPages.get();
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

Template.Discovers.onDestroyed(function() {
    Session.set('isLoading', true);
});