import Game from "../models/game.js"

export const getGames = async (req,res)=>{
    const games = await Game.find().populate('category').poulate('reviews.user')
    res.status(201).json(games)
}

export const createGames = async (req,res)=>{
    const {name,price,description,category,reviews} = req.body
    if(!name || !price || !price || !description || !category){
        return res.status(400).json({success:false,message:'Fields are required'})
    }
    const existGame = await Game.findOne({name})
    if(existGame){
        return res.status(400).json({success:false,message:'Game already exists'})
    }
    const game = await new Game(req.body)
    game.save()
    res.status(201).json(game)
}

export const getReview =  async (req, res) => {
        try {
          const { rating, comment } = req.body;
          const game = await Game.findById(req.params.id);
      
          if (!game) {
            return res.status(404).json({ message: "Game not found" });
          }
      
          // check if user already reviewed
          const alreadyReviewed = game.reviews.findIndex(
            review => review.user.toString() === req.user._id
          );
          if (alreadyReviewed) {
            return res.status(400).json({ message: "Game already reviewed" });
          }
      
          const review = {
            user: req.user._id, // from auth middleware
            rating: Number(rating),
            comment,
          };
      
          game.reviews.push(review);
          await game.save();
      
          res.status(201).json({ message: "Review added", reviews: game.reviews });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      
  }

export const gameById = async (req,res)=>{
    const gameId = req.params.id
    const game = await Game.findById(gameById)
    res.status(201).json(game)
}

export const updateGame = async (req,res)=>{
    const gameId = req.params.id
    const game = await Game.findByIdAndUpdate(gameId)
    res.status(201).json(game)
}

export const deleteGame = async (req,res)=>{
    const gameId = req.params.id
    const game = await Game.findByIdAndDelete(gameId)
    res.status(201).json(game)
}

export const toggleLike = async (req, res) => {
  try {
    const gameId = req.params.id;
    const userId = req.user.id;

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: "Game not found" });

    const alreadyLiked = game.likes.includes(userId);

    if (alreadyLiked) {
      // remove like
      game.likes.pull(userId);
    } else {
      // add like
      game.likes.push(userId);
    }

    await game.save();
    res.json({ likes: game.likes.length, liked: !alreadyLiked });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getGamesWithLikes = async (req, res) => {
  try {
    const games = await Game.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: "$category" },
      {
        $addFields: {
          likeCount: { $size: "$likes" }
        }
      }
    ]);
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};