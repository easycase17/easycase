
/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

var CreatedBySchema = new SimpleSchema({
    authorId: {
        type: String,
        label: 'Author Id'
    },
    role: {
        type: String,
        allowedValues: [
            'lawyer',
            'user'
        ]
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
        type: String,
        label: 'Content'
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