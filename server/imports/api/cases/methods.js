Meteor.methods({
    'cases.findCase'(caseId) {
        // Check if legal user
        if (this.userId) {
            return Cases.findOne(caseId);
        } else {
            throw new Meteor.Error('IllegalUserError', 'When finding case');
        }
    },
    'cases.findContract'(caseId) {
        // Check if legal user
        if (this.userId) {
            return Contracts.find({ caseId: caseId });
        } else {
            throw new Meteor.Error('IllegalUserError', 'When finding a contract');
        }
    },
    'cases.findContractors'(caseId) {
        // Check if legal user
        if (this.userId) {
            return Contracts.find({ caseId: caseId }, { contractors: true });
        } else {
            throw new Meteor.Error('IllegalUserError', 'When finding contractors');
        }
    },
    'cases.setPrivate'(caseId, userId) {
        // Check if legal user
        if (this.userId) {
            return Cases.update({ _id: caseId, createdBy: this.userId }, { $set: { isPrivate: true } });
        } else {
            throw new Meteor.Error('IllegalUserError', 'When setting case privacy');
        }
    },
    'cases.setPublic'(caseId) {
        // Check if legal user
        if (this.userId) {
            return Cases.update({ _id: caseId, createdBy: this.userId }, { $set: { isPrivate: false } });
        } else {
            throw new Meteor.Error('IllegalUserError', 'When setting case privacy');
        }
    },
    'cases.insert'(doc) {
        // Check if legal user
        if (this.userId) {
            // To add autoValue in the SimpleSchema
            CasesSchema.clean(doc);

            // Validate doc
            check(doc, CasesSchema);

            this.unblock();

            // Insert doc into collections
            var caseId = Cases.insert(doc);

            // If inserted successfully, trigger delivery notification to related lawyers
            if (caseId) {
                Meteor.call('core.delivery.case.sendNotification', caseId);
            }
        } else {
            throw new Meteor.Error('IllegalUserError', 'When inserting a case');
        }
    },
    'cases.blogs.insert'(doc) {
        if (this.userId) {
            // To add autoValue in the SimpleSchema
            CaseBlogSchema.clean(doc);

            // Validate doc
            check(doc, CaseBlogSchema);

            this.unblock();

            // Insert doc into collection
            var blogId = CasesBlogs.insert(doc);

            if (blogId) {
                // @TODO other services
            }
        } else {
            throw new Meteor.Error('IllegalUserError', 'When inserting a caseblog');
        }
    }
});