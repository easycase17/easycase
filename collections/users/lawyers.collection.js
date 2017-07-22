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

const LawyersSchema = new SimpleSchema({
    userId: {
        type: String,
        label: 'UserID',
        autoform: {
            type: 'hidden'
        }
    },
    name: {
        type: String,
        label: "Name",
        max: 50
    },
    birthday: {
        type: Date,
        label: 'Birthday',
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
        label: 'Gender',
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
        label: "Created At",
        autoValue: function () {
            return new Date()
        },
        autoform: {
            type: 'hidden'
        }
    },
    areas: {
        type: [String],
        label: "Areas",
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
        type: LocationSchema,
        label: 'Location'
    },
    evaluation: {
        type: Number,
        label: "Evaluation",
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
Lawyers.attachSchema(LawyersSchema);
Lawyers.allow({
    update: function (userId, doc) {
        return !!userId;
    }
});