/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */
import '/both/collections/schemas/cases.schema.js';
import '/both/collections/schemas/location.schema.js';

Collections.Cases = new Mongo.Collection('ec_cases');
Collections.Cases.schema = Schemas.Cases;
Meteor.startup(function() {
    Schemas.Location.i18n("SCHEMAS.LocationSchema");
    Schemas.Cases.i18n("SCHEMAS.CasesSchema");
    Collections.Cases.attachSchema(Schemas.Cases);
});
Collections.Cases.allow({
    insert: function(userId, doc) {
        return false;
    },
    update: function(userId, doc) {
        return !!userId;
    },
    remove: function(userId) {
        return false;
    }
});