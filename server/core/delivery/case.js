Meteor.methods({
    'core.delivery.case.sendNotification'(caseId) {
        this.unblock();
        try {
            check(caseId, String);
            var caseObject = Cases.findOne({ _id: caseId });
            var lawyerArray = Lawyers.find({ 'location.city': caseObject.location.city, areas: { $in: caseObject.tags } }).fetch();
            lawyerArray.forEach((lawyer) => {
                var user = Meteor.users.findOne({ _id: lawyer.userId });
                Meteor.call('core.email.sendEmail',
                    user.emails[0].address,
                    '',
                    '',
                    '',
                    'Easy Case -- New Case Around',
                    'newcaseNotificationToLawyers',
                    {
                        lawyerName: lawyer.name,
                        caseUrl: `${Meteor.settings.public.Company.domain}/cases/${caseObject._id}`
                    }
                );
            });
        } catch (e) {
            // @TODO error handling
            console.log(e);
        }
    }
});