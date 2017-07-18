/* --------------------  Discovers Template  ---------------------- */
Template.Discovers.onCreated(function() {
    var self = this;
    self.fieldType = new ReactiveVar( String );
    self.fieldType.set('Cases');
    self.autorun(function() {
        self.subscribe('cases-discover', Meteor.userId());
    });
});

Template.Discovers.helpers({
    discovers: () => {
        switch(Template.instance().fieldType.get()) {
            case 'Cases':
                return Cases.find({});
            default:
                return Cases.find({});
        }
    },
    isCasesField: () => {
        return Template.instance().fieldType.get() == 'Cases';
    }
});

Template.DiscoversItem.helpers({
    // @FIXME
    findUsername: (userId) => {
        return new Promise(function(resolve, reject) {
            Meteor.call('users.findUser', userId, (err, res) => {
                 resolve(res);
            });
        });
    }
});
