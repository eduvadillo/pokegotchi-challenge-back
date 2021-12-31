const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const pokemonsSchema = new Schema(
  {
    gameName: {
      type: String,
    },
    pokemonName: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },

    pokemonPhotoFront: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },

    pokemonPhotoBack: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },

    password: String,
    pokemonStats: [],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("Pokemon", pokemonsSchema);

module.exports = User;
