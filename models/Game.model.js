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

        description: {
            type: String
        },

        rating: {
            type: Number,
            required: true
        },

        platforms: {
            type: String,
            enum: ['Play Station 4', 'Xbox One', 'PC', 'Nintendo', 'Play Station 5', 'Xbox Series X'],
            required: true,
        },

        genre: {
            type: [String]
        },

        price: {
            type: Number
        },

        studio: {
            type: String
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {

        timestamps: true,
    }
)

const Game = model("Game", gameSchema)

module.exports = Game
