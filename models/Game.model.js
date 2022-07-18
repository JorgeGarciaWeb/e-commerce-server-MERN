const { Schema, model } = require("mongoose")

const gameSchema = new Schema(
    {
        name: {
            type: String,
            required: true

        },

        release: {
            type: String,
            required: true
        },

        imgs: {
            type: [String],
            required: true
        },

        rating: {
            type: Number,
            required: true
        },

        platforms: {
            type: [String],
            enum: ['Play Station 4', 'Xbox One', 'PC'],
        },

        genre: {
            type: String
        },

        price: {
            type: Number
        },

        Studio: {
            type: String
        }
    },
    {

        timestamps: true,
    }
)

const Game = model("Game", gameSchema)

module.exports = Game
