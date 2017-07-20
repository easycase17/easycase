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
                multiple: true
            },
            options: function () {
                return [
                    { label: "Civil Rights", value: "Civil Rights" },
                    { label: "Corporate and Securities Law", value: "Corporate and Securities Law" },
                    { label: "Criminal Law", value: "Criminal Law" },
                    { label: "Education Law", value: "Education Law" },
                    { label: "Employment and Labor Law", value: "Employment and Labor Law" },
                    { label: "Environmental and Natural Resources Law", value: "Environmental and Natural Resources Law" },
                    { label: "Family and Juvenile Law", value: "Family and Juvenile Law" },
                    { label: "Health Law", value: "Health Law" },
                    { label: "Immigration Law", value: "Immigration Law" },
                    { label: "Intellectual Property Law", value: "Intellectual Property Law" },
                    { label: "International Law", value: "International Law" },
                    { label: "Real Estate Law", value: "Real Estate Law" },
                    { label: "Sports and Entertainment Law", value: "Sports and Entertainment Law" },
                    { label: "Tax Law", value: "Tax Law" }
                ];
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