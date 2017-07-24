
/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

var CreatedBySchema = new SimpleSchema({
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

const CaseBlogSchema = new SimpleSchema({
    caseId: {
        type: String,
        label: 'Case Id',
        autoform: {
            type: 'hidden'
        }
    },
    createdBy: {
        type: CreatedBySchema,
        label: 'Author Info'
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        label: 'Created At',
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
CasesBlogs.attachSchema(CaseBlogSchema);
CasesBlogs.allow({
    insert: function(userId) {
        return !!userId;
    },
    update: function(userId) { 
        return !!userId; 
    },
    remove: function() { 
        return !!userId; 
    }
})