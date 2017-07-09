/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

const ContractsSchema = new SimpleSchema({
    contractee: {
        type: String,
        label: 'Contractee'
    },
    contractors: {
        type: [String],
        label: 'Contractors'
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

Contracts = new Mongo.Collection('ec_contracts');
Contracts.schema = ContractsSchema;
Contracts.attachSchema(ContractsSchema);