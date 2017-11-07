Schemas.UserProfile= new SimpleSchema({
    firstname: {
        type: String,
        optional: true,
        regEx: /^[a-zA-Z-]{2,25}$/
    },
    lastname: {
        type: String,
        optional: true,
        regEx: /^[a-zA-Z]{2,25}$/
    },
    gender: {
        type: String,
        label: 'Gender',
        optional: true,
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
    pinCode: {
        type: Number,
        optional: true,
        regEx: SimpleSchema.RegEx.ZipCode
    },
    birthday: {
        type: Date,
        optional: true,
        label: 'Birthday',
        autoform: {
            type: "bootstrap-datepicker",
            datePickerOptions: {
                autoclose: true
            },
            buttonClasses: "glyphicon glyphicon-calendar"
        }
    },
    phoneNumber: {
        type: String,
        optional: true,
        regEx: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
    }
});