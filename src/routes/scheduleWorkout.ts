import { Router } from "express";
import { ScheduleWorkoutController } from "./../controllers";
import { validate, validateIdParam } from "./../middlewares/validate";
import {
  createScheduleWorkoutValidationSchema,
  setWorkoutResultValidationSchema,
} from "./../validation/schemas/schedule-workout";

const controller = new ScheduleWorkoutController();

const router = Router();

router.get("/", controller.find);

router.post(
  "/",
  validate(createScheduleWorkoutValidationSchema),
  controller.create
);

router.get("/:id", validateIdParam, controller.findOne);

router.put("/:id", validateIdParam, controller.update);

router.put(
  "/set-workout-result/:id",
  validateIdParam,
  validate(setWorkoutResultValidationSchema),
  controller.setWorkoutResult
);

router.delete("/:id", validateIdParam, controller.delete);

export default router;
