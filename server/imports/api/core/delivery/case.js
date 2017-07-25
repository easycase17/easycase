Meteor.methods({
    'core.delivery.case.sendNotification'(caseObject) {
        this.unblock();
        var lawyerArray = Lawyers.find({'location.city': caseObject.location.city, areas: { $in: caseObject.tags }}).fetch();
        lawyerArray.forEach(function (lawyer) {
            var user = Meteor.users.findOne({_id: lawyer.userId});
            Meteor.defer(() => {
                Email.send({
                    to: `${user.emails[0].address}`,
                    from: "contact@mail.easycase.com",
                    subject: "New Case Notification",
                    // @FIXME
                    text: `http://localhost:3000/cases/${caseObject._id}`
                });
            });
        });
    }
});