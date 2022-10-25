const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const recommendationSchema = new Schema(
    {
        recommendationBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

recommendationSchema.virtual('recommendationCount').get(function() {
    return this.recommendations.length;
});

const Recommendation = model('Recommendation', recommendationSchema);

module.exports = Recommendation;