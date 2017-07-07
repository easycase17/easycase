/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

const ContractsSchema = new SimpleSchema({
    createdBy: {
        type: String,
        label: 'CreatedBy',
        autoform: {
            type: 'hidden'
        }
    },
    lawyersId: {
        type: [String],
        label: 'LayerID'
    },
    caseId: {
        type: String,
        label: 'CasesID'
    },
    createAt: {
        type: Date,
        label: "CreateAt",
        autoValue: function () {
            return new Date()
        }
    }
});

Contracts = new Meteor.Collection('ec_case_contracts');
Contracts.schema = ContractsSchema;
Contracts.attachSchema(ContractsSchema);