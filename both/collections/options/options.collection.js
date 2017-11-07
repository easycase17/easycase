/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

const OptionsSchema = new SimpleSchema({
    field: {
        type: String
    },
    options: {
        type: Array
    },
    "options.$": {
        type: Object
    },
    "options.$.label": {
        type: String
    },
    "options.$.value": {
        type: String
    }
});

Collections.Options = new Mongo.Collection('ec_options');
Collections.Options.schema = OptionsSchema;
Collections.Options.attachSchema(OptionsSchema);