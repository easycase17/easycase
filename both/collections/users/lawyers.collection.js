/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

Collections.Lawyers = new Mongo.Collection('ec_lawyers');
Collections.Lawyers.schema = Schemas.Lawyers;
Meteor.startup(function() {
    Schemas.Lawyers.i18n("SCHEMAS.LawyersSchema");
    Collections.Lawyers.attachSchema(Schemas.Lawyers);
});
Collections.Lawyers.allow({
    update: function (userId, doc) {
        return false;
    }
});