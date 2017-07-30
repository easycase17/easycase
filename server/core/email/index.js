import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';

var ECEmail = {
    renderTemplate: (tplt) => {
        // Load the base email tamplate file
        SSR.compileTemplate('baseEmail', Assets.getText('emailTemplates/_base.html'));
        // Render the template into this _base html
        var res = SSR.render('baseEmail', {
            company: {
                name: `${Meteor.settings.public.Company.name}`,
                address: `${Meteor.settings.public.Company.address}`,
                domain: `${Meteor.settings.public.Company.domain}`,
                unsubUrl: `${Meteor.settings.public.Company.domain}/email/unsubscribe`
            },
            content: tplt
        });
        return res;
    },
    sendEmail: (to, from, cc, replayTo, subject, templateType, templateData) => {
        // Check the parameters type
        check(to, String);
        check(from, String);
        check(cc, String);
        check(replayTo, String);
        check(subject, String);
        check(templateType, String);
        check(templateData, Object);

        // Check if the templateType exists, which is if the related html exists
        var filePath = `emailTemplates/${templateType}.html`;

        // templateType cannot be null
        if (templateType) {
            // Load the html template file
            SSR.compileTemplate(`${templateType}`, Assets.getText(filePath));
            // Render data into the template
            var tplt = SSR.render(`${templateType}`, templateData);

            // Render final email based on _base.html
            var finalEmail = ECEmail.renderTemplate(tplt);

            Meteor.defer(() => {
                // Send the email
                Email.send({
                    to: to,
                    from: (from && from.length > 0) ? from : Meteor.settings.public.Company.contactEmail,
                    cc: (cc && cc.length > 0) ? cc : null,
                    replayTo: (replayTo && replayTo.length > 0) ? replayTo : null,
                    subject: (subject && subject.length > 0) ? subject : "Easy Case",
                    html: finalEmail
                });
            });
        }
        else {
            throw new Error('EmailTemplateError');
        }
    }
}

module.exports = ECEmail;