const { Schema, model } = require("mongoose")

const userSchema = new Schema(

  {
    name: {
      type: String,
      required: true
    },

    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    avatar: {
      type: String,
      default: "./../images/randomAvatar.png"
    },

    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    favorites: {
      type: [String]
    },
    items: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
      },
      quantity: {
        type: Number
      }
    }]
  },

  {
    timestamps: true,
  }

)

const User = model("User", userSchema)

module.exports = User
