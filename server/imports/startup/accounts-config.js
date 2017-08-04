/* ------------------------ Accounts Email ----------------------------- */
Accounts.config({
    sendVerificationEmail: true
});

// Email settings
Accounts.emailTemplates.siteName = 'EasyCase';
Accounts.emailTemplates.from = 'EasyCase <easycase@guochengwei.com>';

Accounts.emailTemplates.enrollAccount = {
    subject(user) {
        return `Welcome to EasyCase, ${user.username}`;
    },
    html(user, url) {
        var ECEmail = require('../../core/email/index.js');
        // This is the content html
        var tplt = `
            <p>Dear ${user.username},</p>
            <p>To activate your account, follow this link: ${url}</p>
        `;
        return ECEmail.renderTemplate(tplt);
    }
};

Accounts.emailTemplates.resetPassword = {
    // Overrides the value set in `Accounts.emailTemplates.from` when resetting
    // passwords.
    subject() {
        return 'Reset Password';
    },
    html(user, url) {
        var ECEmail = require('../../core/email/index.js');
        // This is the content html
        var tplt = `
            <p>Dear ${user.username},</p>
            <p>To reset password, click <a href="${url}">here</a></p>
        `;
        return ECEmail.renderTemplate(tplt);
    }
};

Accounts.emailTemplates.verifyEmail = {
    subject() {
        return 'Activate your account now!';
    },
    html(user, url) {
        var ECEmail = require('../../core/email/index.js');
        // This is the content html
        var tplt = `
            <p>Dear ${user.username},</p>
            <p>Verify your email by following this link: ${url}</p>
        `;
        return ECEmail.renderTemplate(tplt);
    }
};