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
    // If needed, add more code
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
    'click #profile-user-btn': function (event, template) {
        template.profileType.set('User');
    },
    'click #profile-lawyer-btn': function (event, template) {
        template.profileType.set('Lawyer');
    },
    'click .profile-user-avatar': function (event, template) {
        event.preventDefault();

        let imgupload = template.$('#imgupload');
        imgupload.trigger('click');
    },
    'change #imgupload': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
            file.owner = Meteor.userId(); //before upload also save the owner of that file
            Collections.Avatars.insert(file, function (err, fileObj) {
                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                if (err) {
                    console.log(err); //in case there is an error, log it to the console
                } else {
                    // Change Meteor.users.profile
                    setTimeout(function () {
                        Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.avatar': `/cfs/files/ec_avatars/${fileObj._id}` } });
                    }, 1000);
                }
            });
        });
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