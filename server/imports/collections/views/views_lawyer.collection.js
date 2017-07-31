ViewsLawyerSchema = new SimpleSchema({
    lawyerId: {
        type: String
    },
    viewCounts: {
        type: Number,
        defaultValue: 1
    }
});

ViewsLawyer = new Mongo.Collection('ec_views_lawyer');
ViewsLawyer._ensureIndex({ lawyerId: 1 }, { unique: true });
ViewsLawyer.schema = ViewsLawyerSchema;
ViewsLawyer.attachSchema(ViewsLawyerSchema);