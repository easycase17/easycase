import './userProfile.schema.js';

Schemas.Users = new SimpleSchema({
    emails: {
        type: [Object],
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean,
        optional: true,
        autoform: {
            disabled: true,
            type: 'hidden'
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
        type: Schemas.UserProfile,
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
        type: String
    }
});

