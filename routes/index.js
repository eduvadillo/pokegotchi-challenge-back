const router = require("express").Router();
const authRoutes = require("./auth");
const Game = require("../models/Game.model");
const User = require("../models/User.model");
const Pokemons = require("../models/PokemonsInGame.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/newgame", (req, res, next) => {
  const { userName, gameName, userId } = req.body;
  console.log(`he llegado al back`, userName, gameName, userId);

  Game.create({
    userName: userName,
    gameName: gameName,
    status: `open`,
  })
    .then((createdGame) => {
      User.findByIdAndUpdate(userId, { $push: { opengames: createdGame } }, { new: true }).then(
        (response) => {
          res.status(201).json({ game: createdGame });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });

      res.json("All good in here");
    });
});

router.post("/addpokemon", (req, res, next) => {
  const {
    userName,
    gameName,
    userId,
    pokemonName,
    pokemonStats,
    pokemonPhotoFront,
    pokemonPhotoBack,
  } = req.body;
  console.log(`he llegado al back`, userName, gameName, userId, pokemonName, pokemonStats);

  Pokemons.create({
    pokemonName: pokemonName,
    gameName: gameName,
    pokemonStats: pokemonStats,
    pokemonPhotoFront: pokemonPhotoFront,
    pokemonPhotoBack: pokemonPhotoBack,
  })
    .then((createdPokemon) => {
      Game.find({
        userName: userName,
        gameName: gameName,
      }).then((result) => {
        console.log(`***************************ResultGame*********`, result[0]._id);
        Game.findByIdAndUpdate(
          result[0]._id,
          { $push: { pokemons: createdPokemon } },
          { new: true }
        ).then((response) => {
          res.status(201).json({ pokemon: createdPokemon });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });

      res.json("All good in here");
    });
});

router.post("/mypokemons", (req, res, next) => {
  const { userName, gameName } = req.body;

  Game.find({
    userName: userName,
    gameName: gameName,
  })
    .populate("pokemons")
    .then((pokemonResult) => {
      res.status(201).json(pokemonResult);
    });
});

router.post("/mygames", (req, res, next) => {
  const { userName, userId } = req.body;

  User.find({
    username: userName,
    _id: userId,
  })
    .populate("opengames")
    .then((gamesResult) => {
      res.status(201).json(gamesResult);
    });
});

router.use("/auth", authRoutes);

module.exports = router;
