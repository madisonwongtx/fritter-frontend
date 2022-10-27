import type {Request, Response, NextFunction} from 'express';
import AssessmentCollection from './collection';

/**
 * Checks if user answered all the questions
 */
const isResponseThere = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.question_1) {
    res.status(404).json({error: 'You did not answer question 1.'});
    return;
  }

  if (!req.body.question_2) {
    res.status(404).json({error: 'You did not answer question 2.'});
    return;
  }

  if (!req.body.question_3) {
    res.status(404).json({error: 'You did not answer question 3.'});
    return;
  }

  if (!req.body.question_4) {
    res.status(404).json({error: 'You did not answer question 4.'});
    return;
  }

  if (!req.body.question_4) {
    res.status(404).json({error: 'You did not answer question 4.'});
    return;
  }

  if (!req.body.question_5) {
    res.status(404).json({error: 'You did not answer question 5.'});
    return;
  }

  if (!req.body.question_6) {
    res.status(404).json({error: 'You did not answer question 6.'});
    return;
  }

  if (!req.body.question_7) {
    res.status(404).json({error: 'You did not answer question 7.'});
    return;
  }

  if (!req.body.question_8) {
    res.status(404).json({error: 'You did not answer question 8.'});
    return;
  }

  next();
};

/**
 * Checks if user answers are valid
 */
const isResponseValid = async (req: Request, res: Response, next: NextFunction) => {
  const question_1 = req.body.question_1 as string;
  const question_2 = req.body.question_2 as string;
  const question_3 = req.body.question_3 as string;
  const question_4 = req.body.question_4 as string;
  const question_5 = req.body.question_5 as string;
  const question_6 = req.body.question_6 as string;
  const question_7 = req.body.question_7 as string;
  const question_8 = req.body.question_8 as string;

  if (question_1.toLowerCase() !== 'yes' && question_1.toLowerCase() !== 'no') {
    res.status(413).json({error: 'Question 1 is not formatted correctly. Only yes and no are allowed'});
    return;
  }

  if (question_2.toLowerCase() !== 'yes' && question_2.toLowerCase() !== 'no') {
    res.status(413).json({error: 'Question 2 is not formatted correctly. Only yes and no are allowed'});
    return;
  }

  if (question_3.toLowerCase() !== 'yes' && question_3.toLowerCase() !== 'no') {
    res.status(413).json({error: 'Question 3 is not formatted correctly. Only yes and no are allowed'});
    return;
  }

  if (question_4.toLowerCase() !== 'yes' && question_4.toLowerCase() !== 'no') {
    res.status(413).json({error: 'Question 4 is not formatted correctly. Only yes and no are allowed'});
    return;
  }

  if (question_5.toLowerCase() !== 'yes' && question_5.toLowerCase() !== 'no') {
    res.status(413).json({error: 'Question 5 is not formatted correctly. Only yes and no are allowed'});
    return;
  }

  if (question_6.toLowerCase() !== 'yes' && question_6.toLowerCase() !== 'no') {
    res.status(413).json({error: 'Question 6 is not formatted correctly. Only yes and no are allowed'});
    return;
  }

  if (question_7.toLowerCase() !== 'yes' && question_7.toLowerCase() !== 'no') {
    res.status(413).json({error: 'Question 7 is not formatted correctly. Only yes and no are allowed'});
    return;
  }

  if (question_8.toLowerCase() !== 'yes' && question_8.toLowerCase() !== 'no') {
    res.status(413).json({error: 'Question 8 is not formatted correctly. Only yes and no are allowed'});
    return;
  }

  next();
};

/**
 * Checks if you have taken a certain quiz before
 */
const isNewQuiz = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req.session.userId as string) ?? '';
  const assess_object = await AssessmentCollection.findOne(userId);
  if (!assess_object.new) {
    res.status(406).json({error: 'You have already attempted this quiz, please get a new assessment'});
    return;
  }

  next();
};

export {
  isResponseThere,
  isResponseValid,
  isNewQuiz
};
