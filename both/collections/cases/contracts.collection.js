/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

const ContractsSchema = new SimpleSchema({
    contractee: {
        type: String,
        label: 'Contractee'
    },
    contractor: {
        type: String,
        label: 'Contractor'
    },
    caseId: {
        type: String,
        label: 'CasesID'
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function () {
            return new Date()
        }
    }
});

Contracts = new Mongo.Collection('ec_contracts');
Contracts.schema = ContractsSchema;
Contracts.attachSchema(ContractsSchema);