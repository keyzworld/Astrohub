import express from "express"
import {protect} from "../middleware/authMiddleware.js"
import { getGames, createGames, updateGame, deleteGame, getReview, gameById, toggleLike, getGamesWithLikes } from "../controllers/gameController.js"
import role from "../middleware/role.js"

 const router = express.Router()

 router.route('/').post(protect,createGames).get(getGames).get(getGamesWithLikes);
 router.post('/:id/reviews',protect,role(["user", "admin"]),getReview)
 router.post("/:id/like", protect, role(["user", "admin"]), toggleLike);
 router.route('/:id').get(gameById).put(updateGame).delete(deleteGame)

 export default router
