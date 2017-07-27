/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

const LawyerRateSchema = new SimpleSchema({
    success: {
        type: Number,
        defaultValue: 0,
        autoform: {
            type: 'hidden'
        }
    }
});

LawyersSchema = new SimpleSchema({
    userId: {
        type: String,
        autoform: {
            type: 'hidden'
        }
    },
    name: {
        type: String,
        max: 50
    },
    birthday: {
        type: Date,
        optional: true,
        autoform: {
            type: "bootstrap-datepicker",
            datePickerOptions: {
                autoclose: true
            },
            buttonClasses: "glyphicon glyphicon-calendar"
        }
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female', 'Unknown'],
        autoform: {
            type: 'universe-select',
            afFieldInput: {
                optionsMethod: "options.getOptions",
                optionsMethodParams: {
                    field: 'gender'
                }
            }
        }
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            return new Date()
        },
        autoform: {
            type: 'hidden'
        }
    },
    areas: {
        type: [String],
        autoform: {
            type: 'universe-select',
            afFieldInput: {
                multiple: true,
                optionsMethod: "options.getOptions",
                optionsMethodParams: {
                    field: 'law'
                }
            }
        }
    },
    location: {
        type: LocationSchema
    },
    evaluation: {
        type: Number,
        autoform: {
            type: 'hidden'
        }
    },
    rate: {
        type: LawyerRateSchema,
        autoform: {
            type: 'hidden'
        }
    }
});

Lawyers = new Mongo.Collection('ec_lawyers');
Lawyers.schema = LawyersSchema;
Meteor.startup(function() {
    LawyersSchema.i18n("SCHEMAS.LawyersSchema");
    Lawyers.attachSchema(LawyersSchema);
});
Lawyers.allow({
    update: function (userId, doc) {
        return false;
    }
});