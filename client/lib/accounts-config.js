/* ----------------------- Accounts.ui ----------------------- */
Accounts.ui.config({
    requestPermissions: {
        facebook: [
            'public_profile', 
            'email',
            'user_friends', 
            'user_photos',
            'user_education_history'
        ]
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});