const { Schema, model } = require("mongoose");

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

        img:{
            type: String,
            required: true
        },

        rating:{
            type: Number,
            required: true
        },

        platform:{
            type:[String],
            required: true,
        },

        genre:{
            type: String
        }
    },
    {
        
        timestamps: true,
    }
);

const Game = model("Game", gameSchema);

module.exports = Game;
