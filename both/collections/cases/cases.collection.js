/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

LocationSchema = new SimpleSchema({
    street: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    }
});

CasesSchema = new SimpleSchema({
    title: {
        type: String,
        max: 40
    },
    tags: {
        type: [String],
        autoform: {
            type: 'universe-select',
            afFieldInput: {
                uniPlaceholder: "Enter Related Law Tags",
                multiple: true,
                optionsMethod: "options.getOptions",
                optionsMethodParams: {
                    field: 'law'
                }
            }
        }
    },
    content: {
        type: String
    },
    payment: {
        type: Number,
        optional: true,
        defaultValue: 0
    },
    languages: {
        type: [String],
        autoform: {
            type: 'universe-select',
            afFieldInput: {
                uniPlaceholder: "Enter Languages That You Want The Case Be Translated To",
                multiple: true,
                optionsMethod: "options.getOptions",
                optionsMethodParams: {
                    field: 'language'
                }
            }
        }
    },
    location: {
        type: LocationSchema
    },
    createdAt: {
        type: Date,
        autoValue: function() {
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
    isPrivate: {
        type: Boolean,
        defaultValue: true
    },
    isComplete: {
        type: Boolean,
        defaultValue: false
    }
});

Cases = new Mongo.Collection('ec_cases');
Cases.schema = CasesSchema;
Meteor.startup(function() {
    LocationSchema.i18n("SCHEMAS.LocationSchema");
    CasesSchema.i18n("SCHEMAS.CasesSchema");
    Cases.attachSchema(CasesSchema);
});
Cases.allow({
    insert: function(userId, doc) {
        return false;
    },
    update: function(userId, doc) {
        return !!userId;
    },
    remove: function(userId) {
        return false;
    }
});