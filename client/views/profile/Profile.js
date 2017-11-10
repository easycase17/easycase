/* ---------------- Profile Template ----------------- */
Template.Profile.onCreated(function() {
    var self = this;
    self.profileType = new ReactiveVar( String );
    self.profileType.set('User');
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
    getAvatar: () => {
        let user = Meteor.users.findOne({_id: Meteor.userId()});
        if (user.profile.avatar) {
            return user.profile.avatar;
        } else {
            return `<img align="right" class="profile-user-avatar" src="https://ui-avatars.com/api/?name=${user.profile.firstname}+${user.profile.lastname}&size=128&background=524763&color=FFF"/>`;
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