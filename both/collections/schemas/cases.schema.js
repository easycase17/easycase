import './location.schema.js';

Schemas.Cases = new SimpleSchema({
    title: {
        type: String,
        max: 40
    },
    tags: {
        type: [String],
        autoform: {
            type: 'universe-select',
            afFieldInput: {
                uniPlaceholder: "Enter Related Law Tags",
                multiple: true,
                optionsMethod: "options.getOptions",
                optionsMethodParams: {
                    field: 'law'
                },
                valuesLimit: 3
            }
        }
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
        autoform: {
            type: 'universe-select',
            afFieldInput: {
                uniPlaceholder: "Enter Languages That You Want The Case Be Translated To",
                multiple: true,
                optionsMethod: "options.getOptions",
                optionsMethodParams: {
                    field: 'language'
                },
                valuesLimit: 3
            }
        }
    },
    location: {
        type: Schemas.Location
    },
    createdAt: {
        type: Date,
        defaultValue: function() {
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
    },
    isComplete: {
        type: Boolean,
        defaultValue: false
    },
    lastChange: {
        type: Date,
        optional: true,
        autoValue: function() {
            return new Date();
        },
        autoform: {
            disabled: true,
            type: 'hidden'
        }
    }
});