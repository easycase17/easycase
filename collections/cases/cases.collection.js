/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

const LocationSchema = new SimpleSchema({
    street: {
        type: String,
        label: 'Street'
    },
    city: {
        type: String,
        label: 'City'
    },
    state: {
        type: String,
        label: 'State'
    },
    country: {
        type: String,
        label: 'Country'
    }
});

const CasesSchema = new SimpleSchema({
    title: {
        type: String,
        label: 'Title',
        max: 40
    },
    tags: {
        type: [String],
        label: 'Tags'
    },
    content: {
        type: String,
        label: 'Content'
    },
    payment: {
        type: Number,
        label: 'Payment',
        optional: true,
        defaultValue: 0
    },
    languages: {
        type: [String],
        label: 'Languages',
        defaultValue: ['EN']
    },
    location: {
        type: LocationSchema,
        label: 'Location'
    },
    createdAt: {
        type: Date,
        label: 'Created At',
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
        label: 'Set Private',
        defaultValue: true
    }
});

Cases = new Mongo.Collection('ec_cases');
Cases.schema = CasesSchema;
Cases.attachSchema(CasesSchema);
Cases.allow({
    insert: function(userId) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    },
    remove: function(userId) {
        return false;
    }
});