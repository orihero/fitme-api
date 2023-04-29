import { model, Schema, SchemaTypes } from "mongoose";
import { NUTRITION_TYPE, ROLES } from "./../../../types/common";
import { IUser } from "./types";

const userSchema = new Schema<Partial<IUser>>(
  {
    name: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.TRAINER, ROLES.USER],
      default: ROLES.USER,
    },

    isProAccount: {
      type: Boolean,
      default: false,
    },

    myTrainers: {
      type: [SchemaTypes.ObjectId],
      ref: "Trainer",
    },

    favoriteExercises: {
      type: [SchemaTypes.ObjectId],
      ref: "Exercise",
    },

    workoutPlans: {
      type: [SchemaTypes.ObjectId],
      ref: "WorkoutPlan",
    },

    scheduleWorkouts: {
      type: [SchemaTypes.ObjectId],
      ref: "ScheduleWorkout",
    },

    products: {
      type: [SchemaTypes.ObjectId],
      ref: "Product",
    },

    dishes: {
      type: [SchemaTypes.ObjectId],
      ref: "Dish",
    },

    nutritionPlans: {
      type: [SchemaTypes.ObjectId],
      ref: "NutritionPlan",
    },

    myMeasurements: [
      {
        date: Date,

        data: [
          {
            key: String,
            value: String,
          },
        ],
      },
    ],

    schemaNutritions: [
      {
        date: Date,

        data: {
          dailyNorm: Number,

          amount: Number,

          proteinPercent: Number,

          oilPercent: Number,

          mergeAmount: Number,

          mergeCarb: Number,

          nType: String,
        },

        products: {
          type: [SchemaTypes.ObjectId],
          ref: "Product",
        },

        amountsP: [Number],

        dishes: {
          type: [SchemaTypes.ObjectId],
          ref: "Dish",
        },

        amountsD: [Number],
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
