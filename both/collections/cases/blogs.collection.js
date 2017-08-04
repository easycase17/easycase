
/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

const CreatedBySchema = new SimpleSchema({
    authorId: {
        type: String,
        autoform: {
            type: 'hidden'
        }
    },
    role: {
        type: String,
        allowedValues: [
            'lawyer',
            'user'
        ],
        autoform: {
            type: 'hidden'
        }
    }
});

CaseBlogSchema = new SimpleSchema({
    caseId: {
        type: String,
        autoform: {
            type: 'hidden'
        }
    },
    createdBy: {
        type: CreatedBySchema,
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            return new Date();
        },
        autoform: {
            type: 'hidden'
        }
    }
});

CasesBlogs = new Mongo.Collection('ec_cases_blogs');
CasesBlogs.schema = CaseBlogSchema;
Meteor.startup(function() {
    CaseBlogSchema.i18n("SCHEMAS.CaseBlogSchema");
    CasesBlogs.attachSchema(CaseBlogSchema);
});
CasesBlogs.allow({
    update: function(userId) { 
        return !!userId; 
    }
});