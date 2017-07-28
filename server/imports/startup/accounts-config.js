/* ------------------------ Accounts Email ----------------------------- */
Accounts.config({
    sendVerificationEmail: true
});

// Email settings
Accounts.emailTemplates.siteName = 'EasyCase';
Accounts.emailTemplates.from = 'EasyCase <easycase@guochengwei.com>';

Accounts.emailTemplates.enrollAccount = {
    subject(user) {
        return `Welcome to EasyCase, ${user.profile.name}`;
    },
    text(user, url) {
        return 'To activate your account, click the line below \n\n' + url;
    }
}

Accounts.emailTemplates.resetPassword = {
    // Overrides the value set in `Accounts.emailTemplates.from` when resetting
    // passwords.
    subject() {
        return 'Reset Password';
    }
};

Accounts.emailTemplates.verifyEmail = {
    subject() {
        return 'Activate your account now!';
    },
   text(user, url) {
        return `Hey ${user}! Verify your e-mail by following this link: ${url}`;
   }
}