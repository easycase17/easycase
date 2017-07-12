/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

const LawyersSchema = new SimpleSchema({
    userId: {
        type: String,
        label: 'UserID',
        autoValue: function() {
            return this.userId
        }
    },
    name: {
        type: String,
        label: "Name",
        max: 50
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            return new Date()
        }
    },
    areas: {
        type: [String],
        label: "Areas"
    },
    // lastLog: {
    //     type: Date,
    //     label: "Last Log",
    // },
    // This is the evaluation score for each lawyer
    evaluation: {
        type: Number,
        label: "Evaluation"
    }
});

Lawyers = new Mongo.Collection('ec_lawyers');
Lawyers.schema = LawyersSchema;