import './createdBy.schema.js';

Schemas.CaseBlog = new SimpleSchema({
    caseId: {
        type: String,
        autoform: {
            type: 'hidden'
        }
    },
    createdBy: {
        type: Schemas.CreatedBy,
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