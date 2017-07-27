Meteor.methods({
    'lawyers.findLawyer'(lawyerId) {
        // Check if legal user
        if (this.userId) {
            return Lawyers.findOne(lawyerId).name;
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
            var lawyerId = Lawyers.findOne({userId: this.userId})._id;
            var res = Contracts.remove({ caseId: caseId, contractor: lawyerId });

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
            var lawyerId = Lawyers.findOne({userId: this.userId})._id;
            var c = Cases.findOne({ _id: caseId });
            var res = Contracts.insert({
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
            return Contracts.findOne({ caseId: caseId, contractor: lawyerId });
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
            var res = Lawyers.update({ _id: objId }, doc);

            // if failed, throw an error
            if (!res) {
                throw new Error('InvalidDocError');
            } else return res;

        } else {
            throw new Meteor.Error('IllegalUserError', 'When updating a lawyer profile');
        }
    }
});