import { Document, ObjectId } from "mongoose";
import { TrainerDocument } from "../trainer";
import { ExerciseDocument } from "../exercise";
import { WorkoutPlanDocument } from "./../workout";
import { ScheduleWorkoutDocument } from "./../schedule-workout";
import { IProduct, ProductDocument } from "../product";
import { DishDocument, IDish } from "../dish";
import { NutritionPlanDocument } from "../nutrition";
import { NUTRITION_TYPE, ROLES } from "./../../../types/common";

export interface IUser {
  _id: ObjectId | string;
  name: string;
  phoneNumber: string;
  role: ROLES;
  isProAccount: boolean;
  myTrainers: TrainerDocument[];
  workoutPlans: WorkoutPlanDocument[];
  favoriteExercises: ExerciseDocument[];
  scheduleWorkouts: ScheduleWorkoutDocument[];
  products: ProductDocument[];
  dishes: DishDocument[];
  nutritionPlans: NutritionPlanDocument[];
  schemaNutritions: SchemaNutrition[];
  myMeasurements: Measurement[];
}

export type UserDocument = Document & IUser;

export type Measurement = {
  date: Date;
  data: MeasurementData[];
};

export type MeasurementData = {
  key: string;
  value: string;
};

export type SchemaNutrition = {
  date: Date;
  data: SchemaNutritionData;
  products: IProduct[];
  amountsP: number[];
  dishes: IDish[];
  amountsD: number[];
};

export type SchemaNutritionData = {
  nType: NUTRITION_TYPE;
  dailyNorm: number;
  amount: number;
  proteinPercent: number;
  oilPercent: number;
  mergeAmount: number;
  mergeCarb: number;
};
