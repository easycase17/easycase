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

const CasesSchema = new SimpleSchema({
    title: {
        type: String,
        max: 40
    },
    tags: {
        type: [String]
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
        defaultValue: ['EN']
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
        // Send Noti to all related lawyers
        Meteor.call('core.delivery.case.sendNotification', doc);
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    },
    remove: function(userId) {
        return false;
    }
});