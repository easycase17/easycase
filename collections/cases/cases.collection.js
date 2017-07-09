/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */
const CasesSchema = new SimpleSchema({
    title: {
        type: String,
        label: 'Title',
        max: 255
    },
    tags: {
        type: [String],
        label: 'Tags'
    },
    content: {
        type: String,
        label: 'Content'
    },
    payment: {
        type: Number,
        label: 'Payment'
    },
    createAt: {
        type: Date,
        label: 'CreateAt',
        autoValue: function () {
            return new Date()
        },
        autoform: {
            type: 'hidden'
        }
    },
    createdBy: {
        type: String,
        autoform: {
            type: 'hidden'
        }
    },
    contract: {
        type: ContractSchema,
        label: 'Contract'
    },
    languages: {
        type: [String],
        label: 'Languages'
    }
});

const ContractSchema = new SimpleSchema({
    userId: {
        type: String,
        label: 'UserID',
        autoform: {
            type: 'hidden'
        }
    },
    lawyersId: {
        type: [String],
        label: 'LayerID'
    },
    createAt: {
        type: Date,
        label: "CreateAt",
        autoValue: function () {
            return new Date()
        }
    }
});

Cases = new Meteor.Collection('ec_cases');
Cases.schema = CasesSchema;
Cases.attachSchema(CasesSchema);
Cases.allow({
    insert: function(userId) {
        return !!userId;
    },
    update: function() { return true; },
    remove: function() { return true; }
});