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
      default: "../public/images/randomAvatar.png"
    },

    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },

    favorites: [{
      type: Schema.Types.ObjectId,
      ref: 'Game'
    }],

    items: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }]
  },

  {
    timestamps: true,
  }

)

const User = model("User", userSchema)

module.exports = User
