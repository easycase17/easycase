import { ViewsLawyer } from '/server/core/collections/views/views_lawyer.collection.js' ;

Meteor.methods({
    'lawyers.findLawyer'(lawyerId) {
        // Check if legal user
        if (this.userId) {
            return Collections.Lawyers.findOne(lawyerId).name;
        } else {
            throw new Meteor.Error('IllegalUserError', 'When finding lawyer');
        }
    },
    'lawyers.dropCase'(caseId) {
        // Check if legal user
        if (this.userId) {
            check(caseId, String);

            this.unblock();

            // For safety, we need to find lawyerId at backend
            var lawyerId = Collections.Lawyers.findOne({userId: this.userId})._id;
            var res = Collections.Contracts.remove({ caseId: caseId, contractor: lawyerId });

            // if failed, throw an error
            if (!res) {
                throw new Error('InvalidDocError');
            } else return res;
        } else {
            throw new Meteor.Error('IllegalUserError', 'When a lawyer dropping a case');
        }
    },
    'lawyers.grabCase'(caseId) {
        // Check if legal user
        if (this.userId) {
            check(caseId, String);

            this.unblock();

            // For safety, we need to find lawyerId at backend
            var lawyerId = Collections.Lawyers.findOne({userId: this.userId})._id;
            var c = Collections.Cases.findOne({ _id: caseId });
            var res = Collections.Contracts.insert({
                contractee: c.createdBy,
                contractor: lawyerId,
                caseId: caseId
            });

            // if failed, throw an error
            if (!res) {
                throw new Error('InvalidDocError');
            } else return res;

        } else {
            throw new Meteor.Error('IllegalUserError', 'When a lawyer grabbing a case');
        }
    },
    'lawyers.hasGrabCase'(caseId, lawyerId) {
        // Check if legal user
        if (this.userId) {
            return Collections.Contracts.findOne({ caseId: caseId, contractor: lawyerId });
        } else {
            throw new Meteor.Error('IllegalUserError', 'When checking if a lawyer has grab a case');
        }
    },
    'lawyers.update'(doc, objId) {
        // Check if legal user
        if (this.userId) {
            // validate lawyerId
            check(objId, String);

            this.unblock();

            // update doc into collections
            var res = Collections.Lawyers.update({ _id: objId }, doc);

            // if failed, throw an error
            if (!res) {
                throw new Error('InvalidDocError');
            } else return res;

        } else {
            throw new Meteor.Error('IllegalUserError', 'When updating a lawyer profile');
        }
    },
    'lawyers.viewLawyer'(lawyerId) {
        if (this.userId) {
            var res = ViewsLawyer.update({ lawyerId: lawyerId }, { $inc: { viewCounts: 1 } });
            if (!res) {
                ViewsLawyer.insert({ lawyerId: lawyerId });
            }
        } else {
            throw new Meteor.Error('IllegalUserError', 'When viewing lawyer information');
        }
    }
});