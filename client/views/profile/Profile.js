/* ---------------- Profile Template ----------------- */
Template.Profile.onCreated(function() {
    var self = this;
    self.profileType = new ReactiveVar( String );
    self.profileType.set('User');

    self.autorun(function() {
        Meteor.subscribe('avatar');
        $.cookie('X-Auth-Token', Accounts._storedLoginToken());
    });
});

Template.Profile.onRendered(function() {
    // This assigns a browse action to a DOM node
    Collections.Avatars.resumable.assignBrowse($(".fileBrowse"));
});

Template.Profile.helpers({
    isLawyer: () => {
        return Session.get('isLawyer');
    },
    lawyerProfile: () => {
        return Collections.Lawyers.findOne({userId: Meteor.userId()});
    },
    isUserProfile: () => {
        return Template.instance().profileType.get() == 'User';
    },
    isLawyerProfile: () => {
        return Template.instance().profileType.get() == 'Lawyer';
    },
    getAvatar: (currentUser) => {
        if (currentUser.profile.avatar) {
            return currentUser.profile.avatar;
        } else {
            return `https://ui-avatars.com/api/?name=${currentUser.profile.firstname}+${currentUser.profile.lastname}&size=128&background=524763&color=FFF`;
        }
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

AutoForm.hooks({
    updateUserProfile: {
        onSuccess: () => {
            Notifications.success('Success', 'You have successfully updated your profile!');
        },
        onError: function(formType, error) {
            Notifications.error('Error', error);
        }
    },
    updateLawyerProfile: {
        onSuccess: () => {
            Notifications.success('Success', 'You have successfully updated your lawyer profile!');
        },
        onError: function(formType, error) {
            Notifications.error('Error', error);
        }
    }
});