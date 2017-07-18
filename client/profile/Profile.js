/* ---------------- Profile Template ----------------- */
Template.Profile.onCreated(function() {
    var self = this;
    self.profileType = new ReactiveVar( String );
    self.profileType.set('User');
});

Template.Profile.helpers({
    userProfile: () => {
        return Meteor.user();
    },
    isLawyer: () => {
        return Session.get('isLawyer');
    },
    lawyerProfile: () => {
        return Lawyers.findOne({userId: Meteor.userId()});
    },
    isUserProfile: () => {
        return Template.instance().profileType.get() == 'User';
    },
    isLawyerProfile: () => {
        return Template.instance().profileType.get() == 'Lawyer';
    }
});

Template.Profile.events({
    'click #profile-user-btn': function(event, template) {
        template.profileType.set('User');
    },
    'click #profile-lawyer-btn': function(event, template) {
        template.profileType.set('Lawyer');
    }
});