import mongoose from "mongoose";

const gameCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GameCategory = mongoose.model("GameCategory", gameCategorySchema);

export default GameCategory;
