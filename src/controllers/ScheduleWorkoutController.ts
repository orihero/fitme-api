import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { changeResponse } from "./../utils/changeResponse";
import { ScheduleWorkoutModel } from "./../database/models/schedule-workout";
import { WorkoutPlanModel } from "./../database/models/workout/model";
import { UserModel } from "./../database/models/user/model";

export class ScheduleWorkoutController {
  public async find(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ScheduleWorkoutModel.find().populate([
        "executor",
        {
          path: "plan",
          populate: {
            path: "workouts",
            populate: "exercise",
          },
        },
      ]);

      res.status(StatusCodes.OK).json(changeResponse(true, result));
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { plan, executor } = req.body;

      const foundPlan = await WorkoutPlanModel.findById(plan);

      if (!foundPlan) {
        throw createHttpError(StatusCodes.NOT_FOUND, "Plan not found");
      }

      const foundExecutor = await UserModel.findById(executor);

      if (!foundExecutor) {
        throw createHttpError(StatusCodes.NOT_FOUND, "Executor not found");
      }

      let results = [];

      for (let i = 0; i < foundPlan.workouts.length; i++) {
        let weekResults = [];

        for (let j = 0; j < foundPlan.week; j++) {
          let workoutResults = [];

          for (let k = 0; k < foundPlan.workouts[i].length; k++) {
            let approachResults = [];

            for (let l = 0; l < foundPlan.workouts[i][k].approach; l++) {
              approachResults.push({
                weight: 0,
                repeat: 0,
              });
            }

            workoutResults.push(approachResults);
          }

          weekResults.push(workoutResults);
        }

        results.push(weekResults);
      }

      const created = await ScheduleWorkoutModel.create({
        plan,
        executor,
        results,
      });

      foundExecutor.scheduleWorkouts = [
        // @ts-ignore
        ...foundExecutor.scheduleWorkouts,
        created._id,
      ];
      await foundExecutor.save();

      res.status(StatusCodes.OK).json(changeResponse(true, created));
    } catch (e) {
      next(e);
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const found = await ScheduleWorkoutModel.findById(req.params.id).populate(
        [
          "executor",
          {
            path: "plan",
            populate: {
              path: "workouts",
              populate: "exercise",
            },
          },
        ]
      );

      if (!found) {
        throw createHttpError(
          StatusCodes.NOT_FOUND,
          "ScheduleWorkout not found"
        );
      }

      res.status(StatusCodes.OK).json(changeResponse(true, found));
    } catch (e) {
      next(e);
    }
  }

  public async setWorkoutResult(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { group, week, workout, approach, weight, repeat } = req.body;

      const found = await ScheduleWorkoutModel.findById(req.params.id).populate(
        [
          "executor",
          {
            path: "plan",
            populate: {
              path: "workouts",
              populate: "exercise",
            },
          },
        ]
      );

      if (!found) {
        throw createHttpError(
          StatusCodes.NOT_FOUND,
          "ScheduleWorkout not found"
        );
      }

      if (found.results.length <= group) {
        throw createHttpError(StatusCodes.BAD_REQUEST, "Invalid group value");
      }

      if (found.results[group].length <= week) {
        throw createHttpError(StatusCodes.BAD_REQUEST, "Invalid week value");
      }

      if (found.results[group][week].length <= workout) {
        throw createHttpError(StatusCodes.BAD_REQUEST, "Invalid workout value");
      }

      if (found.results[group][week][workout].length <= approach) {
        throw createHttpError(
          StatusCodes.BAD_REQUEST,
          "Invalid approach value"
        );
      }

      const results = [...found.results];
      for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < results[i].length; j++) {
          for (let k = 0; k < results[i][j].length; k++) {
            for (let l = 0; l < results[i][j][k].length; l++) {
              if (
                i === Number(group) &&
                j === Number(week) &&
                k === Number(workout) &&
                l === Number(approach)
              ) {
                results[i][j][k][l] = {
                  weight: Number(weight),
                  repeat: Number(repeat),
                };
              }
            }
          }
        }
      }

      found.results = [...results];
      await ScheduleWorkoutModel.findByIdAndUpdate(req.params.id, found);

      res.status(StatusCodes.OK).json(changeResponse(true, found));
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("update scheduleWorkout");

      res.status(StatusCodes.OK).json(changeResponse(true, { a: "aa" }));
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await ScheduleWorkoutModel.deleteOne({
        _id: req.params.id,
      });

      if (!deleted.deletedCount) {
        throw createHttpError(
          StatusCodes.NOT_FOUND,
          "ScheduleWorkout not found"
        );
      }

      res.status(StatusCodes.OK).json(changeResponse(true, null));
    } catch (e) {
      next(e);
    }
  }
}
