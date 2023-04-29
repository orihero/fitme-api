import { Document } from "mongoose";
import { UserDocument } from "./../user/types";
import { WorkoutPlanDocument } from "./../workout/types";

export interface IScheduleWorkout {
  plan: WorkoutPlanDocument;
  executor: UserDocument;
  results: WorkoutResult[][][][];
}

export interface WorkoutResult {
  weight: number;
  repeat: number;
}

export type ScheduleWorkoutDocument = Document & IScheduleWorkout;
