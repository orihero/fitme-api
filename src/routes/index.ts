import { Router } from "express";

import auth from "./auth";
import users from "./users";
import trainers from "./trainers";
import categories from "./categories";
import exercises from "./exercises";
import workoutPlans from "./workoutPlans";
import scheduleWorkout from "./scheduleWorkout";
import products from "./products";
import dishes from "./dishes";
import nutritionPlans from "./nutritionPlans";
import uploads from "./uploads";

import authenticate from "../middlewares/authenticate";

const router = Router();

router.use("/auth", auth);
router.use("/users", authenticate, users);
router.use("/trainers", trainers);
router.use("/categories", categories);
router.use("/exercises", exercises);
router.use("/workout-plans", workoutPlans);
router.use("/schedule-workout", scheduleWorkout);
router.use("/products", products);
router.use("/dishes", dishes);
router.use("/nutrition-plans", nutritionPlans);
router.use("/uploads", uploads);

export default router;
