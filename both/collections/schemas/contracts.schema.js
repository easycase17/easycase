Schemas.Contracts = new SimpleSchema({
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