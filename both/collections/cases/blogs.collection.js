
/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */
import '/both/collections/schemas/caseBlog.schema.js';

Collections.CasesBlogs = new Mongo.Collection('ec_cases_blogs');
Collections.CasesBlogs.schema = Schemas.CaseBlog;
Meteor.startup(function() {
    Schemas.CaseBlog.i18n("SCHEMAS.CaseBlogSchema");
    Collections.CasesBlogs.attachSchema(Schemas.CaseBlog);
});
Collections.CasesBlogs.allow({
    update: function(userId) { 
        return !!userId; 
    }
});