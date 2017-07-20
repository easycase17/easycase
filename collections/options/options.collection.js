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

Options = new Mongo.Collection('ec_options');
Options.schema = OptionsSchema;
Options.attachSchema(OptionsSchema);