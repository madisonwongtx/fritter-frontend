import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Assessment} from '../assessment/model';

type AssessmentResponse = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
};

type ResultResponse = {
  score: number;
  instructions: string;
};

/**
 * Transform assessment from object into string
 *
 * @param {HydratedDocument<Assessment>} assessment - A map mapping the question id to the question
 * @returns {AssessmentResponse} - Returned assessment readable for the user
 */
const constructAssessmentResponse = (assessment: HydratedDocument<Assessment>): AssessmentResponse => {
  const assessment_copy: Assessment = {
    ...assessment.toObject({
      versionKey: false
    })
  };

  return {
    question1: assessment.question1,
    question2: assessment.question2,
    question3: assessment.question3,
    question4: assessment.question4,
    question5: assessment.question5,
    question6: assessment.question6,
    question7: assessment.question7,
    question8: assessment.question8
  };
};

/**
 * Transform assessment from object into string
 *
 * @param {HydratedDocument<Assessment>} assessment - An assessment object
 * @returns {ResultResponse} - Final results
 */
const constructResultResponse = (assessment: HydratedDocument<Assessment>): ResultResponse => {
  const assessment_copy: Assessment = {
    ...assessment.toObject({
      versionKey: false
    })
  };

  let msg = '';
  if (assessment.retake) {
    msg = 'Unfortunately, you have failed the assessment. You must achieve a passing score to have the ability to post.';
  } else {
    msg = 'Congrats! You have passed the assessment. You will be required to take the assessment every 6 months. Happy Freeting!';
  }

  return {
    score: assessment.score,
    instructions: msg
  };
};

export {
  constructAssessmentResponse,
  constructResultResponse
};
