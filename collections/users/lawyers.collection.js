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
        optional: true,
        allowedValues: ['Male', 'Female'],
        autoform: {
            type: 'universe-select',
            options: function () {
                return [
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' }
                ]
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