import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
var ECEmail = require('../email/index.js');

module.exports = {
    sendNotification: (caseId) => {
        check(caseId, String);
        var caseObject = Cases.findOne({ _id: caseId });
        var lawyerArray = Lawyers.find({ 'location.city': caseObject.location.city, areas: { $in: caseObject.tags } }).fetch();
        lawyerArray.forEach((lawyer) => {
            var user = Meteor.users.findOne({ _id: lawyer.userId });
            ECEmail.sendEmail(
                user.emails[0].address,
                '',
                '',
                '',
                'Easy Case -- New Case Around',
                'Newcase_Notification_Lawyer',
                {
                    lawyerName: lawyer.name,
                    caseUrl: `${Meteor.settings.public.Company.domain}/cases/${caseObject._id}`
                }
            );
        });
    }
}