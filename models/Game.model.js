const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const gameSchema = new Schema(
  {
    userName: {
      type: String,
    },
    gameName: {
      type: String,
    },
    status: {
      type: String,
    },
    pokemons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pokemon",
      },
    ],
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("Game", gameSchema);

module.exports = User;
