import type {Request, Response} from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import * as assessValidator from '../assessment/middleware';
import * as util from './util';
import AssessmentCollection from '../assessment/collection';
import type {Assessment} from '../assessment/model';

const router = express.Router();

/**
 * Get new assessment
 *
 * @name GET /api/assessment
 *
 * @return {AssessmentResponse} - The quiz details
 * @throws {403} - if the user is not logged in
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const new_assessment = await AssessmentCollection.makeQuiz(userId);

    res.status(200).json({
      message: 'Please select all actions that follow the community guidelines and are an acceptable use of our platform',
      quiz: util.constructAssessmentResponse(new_assessment)
    });
  }
);

/**
 * Gets the score of the user's last attempt on the assessment
 *
 * @name GET /api/assessment/score
 *
 * @return {number} - the numerical score
 * @throws {403} - if the user is not logged in
 */
router.get(
  '/score',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const assessment = await AssessmentCollection.findOne(userId);

    res.status(200).json({
      message: 'Here is your most recent assessment score: ',
      score: assessment.score
    });
  }
);

/**
 * Updates the score and date of the last assessment for the current session user
 *
 * @name PUT /api/assessment/grade
 *
 * @return {ResultResponse} - the results of the quiz and next steps
 * @throws {403} - if the user is not logged in
 * @throws {404} - if there are answer choices missing
 * @throws {413} - if the answer choices are inputted incorrectly
 * @throws {406} - if the user has already attempted this quiz
 */
router.put(
  '/grade',
  [
    userValidator.isUserLoggedIn,
    assessValidator.isNewQuiz,
    assessValidator.isResponseThere,
    assessValidator.isResponseValid
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const user_response = [req.body.question_1, req.body.question_2, req.body.question_3, req.body.question_4, req.body.question_5, req.body.question_6, req.body.question_7, req.body.question_8];
    const assess_object = await AssessmentCollection.gradeQuiz(userId, user_response);

    res.status(200).json({
      message: 'Thank you for taking the time to take this assessment. You are helping keep Fritter a safer place!',
      result: util.constructResultResponse(assess_object)
    });
  }

);

export {router as assessmentRouter};
