import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { getGameCategories, createGameCategory, getGameCategoryById, updateGameCategory, deleteGameCategory } from "../controllers/gameCategoryController.js"
import role from "../middleware/role.js";

 const router = express.Router()

 
 router.route("/").get(getGameCategories).post(protect,role(["admin"]),createGameCategory); // create protected, get public
 router
   .route("/:id")
   .get(getGameCategoryById)
   .put(protect, updateGameCategory) // update protected
   .delete(protect, deleteGameCategory);
export default router;