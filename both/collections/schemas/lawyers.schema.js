import './location.schema.js';
import './lawyerRate.schema.js';

Schemas.Lawyers = new SimpleSchema({
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
        allowedValues: ['0', '1', '2'],
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
        type: Schemas.Location
    },
    evaluation: {
        type: Number,
        autoform: {
            type: 'hidden'
        }
    },
    rate: {
        type: Schemas.LawyerRate,
        autoform: {
            type: 'hidden'
        }
    }
});