/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

const LawyerRateSchema = new SimpleSchema({
    success: {
        type: Number,
        defaultValue: 0,
        autoform: {
            type: 'hidden'
        }
    }
});

const LawyersSchema = new SimpleSchema({
    userId: {
        type: String,
        label: 'UserID',
        autoValue: function() {
            return this.userId
        },
        autoform: {
            type: 'hidden'
        }
    },
    name: {
        type: String,
        label: "Name",
        max: 50
    },
    birthday: {
        type: Date,
        label: 'Birthday'
    },
    gender: {
        type: String,
        label: 'Gender',
        optional: true,
        allowedValues: ['Male', 'Female'],
        autoform: {
            type: 'select',
            options: function () {
                return [
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' }
                ]
            }
        }
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            return new Date()
        },
        autoform: {
            type: 'hidden'
        }
    },
    areas: {
        type: [String],
        label: "Areas"
    },
    evaluation: {
        type: Number,
        label: "Evaluation",
        autoform: {
            type: 'hidden'
        }
    },
    rate: {
        type: LawyerRateSchema,
        autoform: {
            type: 'hidden'
        }
    }
});

Lawyers = new Mongo.Collection('ec_lawyers');
Lawyers.schema = LawyersSchema;
Lawyers.attachSchema(LawyersSchema);