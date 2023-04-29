import { model, Schema, SchemaTypes } from "mongoose";
import { IScheduleWorkout } from "./types";

const scheduleWorkoutSchema = new Schema<IScheduleWorkout>(
  {
    plan: {
      type: SchemaTypes.ObjectId,
      ref: "WorkoutPlan",
      required: true,
    },
    executor: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    results: {
      type: [
        [
          [
            [
              {
                weight: {
                  type: Number,
                  required: true,
                },
                repeat: {
                  type: Number,
                  required: true,
                },
              },
            ],
          ],
        ],
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export const ScheduleWorkoutModel = model(
  "ScheduleWorkout",
  scheduleWorkoutSchema
);
