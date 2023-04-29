import * as yup from "yup";
import { objectIdRegex } from "./../../constants/regex";

export const createScheduleWorkoutValidationSchema = yup.object({
  plan: yup.string().matches(objectIdRegex).required(),
  executor: yup.string().matches(objectIdRegex).required(),
});

export const setWorkoutResultValidationSchema = yup.object({
  group: yup.number().required(),
  week: yup.number().required(),
  workout: yup.number().required(),
  approach: yup.number().required(),
  weight: yup.number().required(),
  repeat: yup.number().required(),
});
