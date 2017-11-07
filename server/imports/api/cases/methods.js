import { ViewsCase } from '/server/core/collections/views/views_case.collection.js' ;

Meteor.methods({
    'cases.insert'(doc) {
        this.unblock();

        // Check if legal user
        if (this.userId) {
            // To add autoValue in the SimpleSchema
            Schemas.Cases.clean(doc);

            // Validate doc
            check(doc, Schemas.Cases);

            // Sanitize the content
            // doc.content = sanitizeHtml(doc.content);

            // Insert doc into collections
            var caseId = Collections.Cases.insert(doc);

            // If inserted successfully, trigger delivery notification to related lawyers
            if (caseId) {
                // Meteor.call('core.delivery.case.sendNotification', caseId);
                try {
                    var delivery = require('../../../core/delivery/case.js');
                    delivery.sendNotification(caseId);
                } catch (e) {
                    // @TODO Handle the erro properly
                    console.log(e);
                }
            }
        } else {
            throw new Meteor.Error('IllegalUserError', 'When inserting a case');
        }
    },
    'cases.blogs.insert'(doc) {
        this.unblock();

        if (this.userId) {
            // To add autoValue in the SimpleSchema
            Schemas.CaseBlog.clean(doc);

            // Validate doc
            check(doc, Schemas.CaseBlog);

            // Sanitize the content
            // doc.content = sanitizeHtml(doc.content);

            // Insert doc into collection
            var blogId = Collections.CasesBlogs.insert(doc);

            if (blogId) {
                // @TODO other services
            }
        } else {
            throw new Meteor.Error('IllegalUserError', 'When inserting a caseblog');
        }
    },
    'cases.findCase'(caseId) {
        // Check if legal user
        if (this.userId) {
            return Collections.Cases.findOne(caseId);
        } else {
            throw new Meteor.Error('IllegalUserError', 'When finding case');
        }
    },
    'cases.findContract'(caseId) {
        // Check if legal user
        if (this.userId) {
            return Collections.Contracts.find({ caseId: caseId });
        } else {
            throw new Meteor.Error('IllegalUserError', 'When finding a contract');
        }
    },
    'cases.findContractors'(caseId) {
        // Check if legal user
        if (this.userId) {
            return Collections.Contracts.find({ caseId: caseId }, { contractors: true });
        } else {
            throw new Meteor.Error('IllegalUserError', 'When finding contractors');
        }
    },
    'cases.setPrivate'(caseId) {
        // Check if legal user
        if (this.userId) {
            return Collections.Cases.update({ _id: caseId, createdBy: this.userId }, { $set: { isPrivate: true } });
        } else {
            throw new Meteor.Error('IllegalUserError', 'When setting case privacy');
        }
    },
    'cases.setPublic'(caseId) {
        // Check if legal user
        if (this.userId) {
            return Collections.Cases.update({ _id: caseId, createdBy: this.userId }, { $set: { isPrivate: false } });
        } else {
            throw new Meteor.Error('IllegalUserError', 'When setting case privacy');
        }
    },
    'cases.setComplete'(caseId) {
        // Check if legal user
        if (this.userId) {
            return Collections.Cases.update({ _id: caseId, createdBy: this.userId }, { $set: { isComplete: true } });
        } else {
            throw new Meteor.Error('IllegalUserError', 'When setting case privacy');
        }
    },
    'cases.setIncomplete'(caseId) {
        // Check if legal user
        if (this.userId) {
            return Collections.Cases.update({ _id: caseId, createdBy: this.userId }, { $set: { isComplete: false } });
        } else {
            throw new Meteor.Error('IllegalUserError', 'When setting case privacy');
        }
    },
    'cases.viewCase'(caseId) {
        if (this.userId) {
            var res = ViewsCase.update({ caseId: caseId }, { $inc: { viewCounts: 1 } });
            if (!res) {
                ViewsCase.insert({ caseId: caseId });
            }
        } else {
            throw new Meteor.Error('IllegalUserError', 'When viewing case information');
        }
    }
});