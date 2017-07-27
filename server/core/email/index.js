Meteor.methods({
    'core.email.sendEmail'(to, from, cc, replayTo, subject, templateType, templateData) {
        this.unblock();

        // Check the parameters type
        check(to, String);
        check(from, String);
        check(cc, String);
        check(replayTo, String);
        check(subject, String);
        check(templateType, String);
        check(templateData, Object);

        // templateType cannot be null
        if (templateType) {
            // Load the html template file
            SSR.compileTemplate('htmlEmail', Assets.getText(`emailTemplates/${templateType}.html`));
            Meteor.defer(() => {
                // Send the email
                Email.send({
                    to: to,
                    from: (from && from.length > 0) ? from : Meteor.settings.public.Company.contactEmail,
                    cc: (cc && cc.length > 0) ? cc : null,
                    replayTo: (replayTo && replayTo.length > 0) ? replayTo : null,
                    subject: (subject && subject.length > 0) ? subject : "Easy Case",
                    html: SSR.render('htmlEmail', templateData)
                });
            });
        }
        else {
            throw new Error('EmailTemplateError');
        }
    }
});