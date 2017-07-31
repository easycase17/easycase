ViewsCaseSchema = new SimpleSchema({
    caseId: {
        type: String
    },
    viewCounts: {
        type: Number,
        defaultValue: 1
    }
});

ViewsCase = new Mongo.Collection('ec_views_case');
ViewsCase._ensureIndex({ caseId: 1 }, { unique: true });
ViewsCase.schema = ViewsCaseSchema;
ViewsCase.attachSchema(ViewsCaseSchema);