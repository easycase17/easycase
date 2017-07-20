const UserProfileSchema = new SimpleSchema({
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
        optional: true,
        allowedValues: ['Male', 'Female']
    },
    pinCode: {
        type: Number,
        optional: true,
        min: 7,
        max: 7
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
        type: Number,
        optional: true,
        min: 9,
        max: 10
    }
});

const UsersSchema = new SimpleSchema({
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean,
        autoform: {
            type: "hidden"
        }
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            return new Date()
        },
        autoform: {
            type: "hidden"
        }
    },
    profile: {
        type: UserProfileSchema,
        label: 'Profile',
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true,
        autoform: {
            type: "hidden"
        }
    },
    username: {
        type: String,
        label: 'Username'
    }
});

Meteor.users.schema = UsersSchema;
Meteor.users.attachSchema(UsersSchema);
Meteor.users.allow({
    update: function (userId, doc) {
        return !!userId;
    }
})