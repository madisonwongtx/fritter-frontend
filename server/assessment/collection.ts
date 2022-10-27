import type {HydratedDocument, Types} from 'mongoose';
import type {Assessment} from './model';
import AssessmentModel from './model';
import UserCollection from '../user/collection';

class AssessmentCollection {
  /**
   * Create new assessment object for a new user
   *
   * @param {string} userId - the new user's id
   * @return {Promise<HydratedDocument<Assessment>>} - the newly created assessment object
   */
  static async createAssessObject(userId: Types.ObjectId | string): Promise<HydratedDocument<Assessment>> {
    const session_user = await UserCollection.findOneByUserId(userId);
    const date = new Date();
    const placeholder = 0;
    const status = true;
    const new_assessment = new AssessmentModel({
      user: session_user,
      lastAttempt: date,
      score: placeholder,
      retake: status
    });
    await new_assessment.save();
    return new_assessment;
  }

  /**
   * Create new assessment for user of randomized questions
   *
   * @param {string} userId - the current session user
   * @return {Promise<HydratedDocument<Assessment>>} - The question id and the question
   */
  static async makeQuiz(userId: Types.ObjectId | string): Promise<HydratedDocument<Assessment>> {
    const questions = new Map <number, string>([
      [1,	'Posting a group photo from your birthday party'],
      [2,	'Circulating false rumors about another user'],
      [3,	'Taking inappropriate images or other degrading photos of a person without their consent'],
      [4,	'Making a funny gif of your cat'],
      [5,	'Following your friends to see what they are up to'],
      [6,	'Posting your opinion about the president’s policies'],
      [7,	'Posting death threats or anything else that suggests or incites violence'],
      [8,	'Posting 700 times within a day to advertise a new product that everyone should buy'],
      [9,	'Unfollowing your friend because you do not want to see their posts'],
      [10,	'Making defamatory remarks and/or false statements about others'],
      [11,	'Bullying in any form'],
      [12,	'Using the ‘thumbs down’ interaction on a post you disagree with'],
      [13,	'Having a debate with other users on the platform'],
      [14,	'Having a debate with other users on the platform with the intent to instigate personal attacks'],
      [15,	'Posting content that contains slurs or hate speech'],
      [16,	'Pretending to be someone you are not'],
      [17,	'Advertising and showing off the new boots you got'],
      [18,	'Posting about how you disagree with the new law that Congress passed'],
      [19,	'Posting about how you want to hurt a politician due to a law that was just passed'],
      [20,	'Promoting terrorism or violent extremism'],
      [21,	'Posts that contain child exploitation'],
      [22,	'Posting the location of your friend’s party with her permission to get more people to come'],
      [23,	'Posting the location of your friend’s party without her permission'],
      [24,	'Be expressive and be yourself'],
      [25,	'Complaining about your teacher and their grading style in a post'],
      [26,	'Posting an exact copy of an article without proper credit to the original author'],
      [27,	'Posting photos from your amazing vacation'],
      [28,	'Posting a negative review about a restaurant you ate at'],
      [29,	'Posting a positive review about a restaurant you ate at'],
      [30,	'Interacting with posts that violate the community guidelines'],
      [31,	'Following no one'],
      [32,	'Interacting with every single post on your feed']
    ]);

    const new_quiz = [];
    const question_nums: number[] = [];
    while (question_nums.length <= 8) {
      const i = Math.floor(Math.random() * 32) + 1;
      if (!question_nums.includes(i)) {
        question_nums.push(i);
      }
    }

    for (const i of question_nums) {
      new_quiz.push(questions.get(i));
    }

    const session_user = await UserCollection.findOneByUserId(userId);
    const assess_object = await AssessmentModel.findOne({user: session_user});
    assess_object.question1 = new_quiz.at(0);
    assess_object.question2 = new_quiz.at(1);
    assess_object.question3 = new_quiz.at(2);
    assess_object.question4 = new_quiz.at(3);
    assess_object.question5 = new_quiz.at(4);
    assess_object.question6 = new_quiz.at(5);
    assess_object.question7 = new_quiz.at(6);
    assess_object.question8 = new_quiz.at(7);
    assess_object.new = true;
    await assess_object.save();
    return assess_object;
  }

  /**
   * Grades the assessment for the current session user and updates the user's object respectively
   *
   * @param {Array<string>} user_response - the user's responses to the questions
   * @param {string} userId - the id of the current session user
   * @return {Promise<HydratedDocument<Assessment>>} - the updated assessment object
   */
  static async gradeQuiz(userId: Types.ObjectId | string, user_response: string[]): Promise<HydratedDocument<Assessment>> {
    const questions = new Map <number, string>([
      [1,	'Posting a group photo from your birthday party'],
      [2,	'Circulating false rumors about another user'],
      [3,	'Taking inappropriate images or other degrading photos of a person without their consent'],
      [4,	'Making a funny gif of your cat'],
      [5,	'Following your friends to see what they are up to'],
      [6,	'Posting your opinion about the president’s policies'],
      [7,	'Posting death threats or anything else that suggests or incites violence'],
      [8,	'Posting 700 times within a day to advertise a new product that everyone should buy'],
      [9,	'Unfollowing your friend because you do not want to see their posts'],
      [10,	'Making defamatory remarks and/or false statements about others'],
      [11,	'Bullying in any form'],
      [12,	'Using the ‘thumbs down’ interaction on a post you disagree with'],
      [13,	'Having a debate with other users on the platform'],
      [14,	'Having a debate with other users on the platform with the intent to instigate personal attacks'],
      [15,	'Posting content that contains slurs or hate speech'],
      [16,	'Pretending to be someone you are not'],
      [17,	'Advertising and showing off the new boots you got'],
      [18,	'Posting about how you disagree with the new law that Congress passed'],
      [19,	'Posting about how you want to hurt a politician due to a law that was just passed'],
      [20,	'Promoting terrorism or violent extremism'],
      [21,	'Posts that contain child exploitation'],
      [22,	'Posting the location of your friend’s party with her permission to get more people to come'],
      [23,	'Posting the location of your friend’s party without her permission'],
      [24,	'Be expressive and be yourself'],
      [25,	'Complaining about your teacher and their grading style in a post'],
      [26,	'Posting an exact copy of an article without proper credit to the original author'],
      [27,	'Posting photos from your amazing vacation'],
      [28,	'Posting a negative review about a restaurant you ate at'],
      [29,	'Posting a positive review about a restaurant you ate at'],
      [30,	'Interacting with posts that violate the community guidelines'],
      [31,	'Following no one'],
      [32,	'Interacting with every single post on your feed']
    ]);
    const answer = new Map <number, boolean>([
      [1,	true],
      [2,	false],
      [3,	false],
      [4,	true],
      [5,	true],
      [6,	true],
      [7,	false],
      [8,	false],
      [9,	true],
      [10,	false],
      [11,	false],
      [12,	true],
      [13,	true],
      [14,	false],
      [15,	false],
      [16,	false],
      [17,	true],
      [18,	true],
      [19,	false],
      [20,	false],
      [21,	false],
      [22,	true],
      [23,	false],
      [24,	true],
      [25,	true],
      [26,	false],
      [27,	true],
      [28,	true],
      [29,	true],
      [30,	true],
      [31,	true],
      [32,	true]
    ]);
    const session_user = await UserCollection.findOneByUserId(userId);
    const assess_object = await AssessmentModel.findOne({user: session_user});

    const selectedQuestions: string[] = [];
    selectedQuestions.push(assess_object.question1);
    selectedQuestions.push(assess_object.question2);
    selectedQuestions.push(assess_object.question3);
    selectedQuestions.push(assess_object.question4);
    selectedQuestions.push(assess_object.question5);
    selectedQuestions.push(assess_object.question6);
    selectedQuestions.push(assess_object.question7);
    selectedQuestions.push(assess_object.question8);

    const quest_id = [];
    for (const question of selectedQuestions) {
      for (const compare of questions) {
        if (question === compare[1]) {
          quest_id.push(compare[0]);
        }
      }
    }

    let right = 0;
    for (let i = 0; i < user_response.length; i++) {
      let transformed_response = false;
      if (user_response[i] === 'yes') {
        transformed_response = true;
      }

      if (transformed_response === answer.get(quest_id[i])) {
        right += 1;
      }
    }

    const calc_score = (right / 8.0) * 100.0;
    let retake_status = true;
    if (right >= 5) {
      retake_status = false;
    }

    assess_object.retake = retake_status;
    assess_object.lastAttempt = new Date();
    assess_object.score = calc_score;
    assess_object.new = false;
    await assess_object.save();
    return assess_object;
  }

  /**
   * Gets the retake status of the current session user
   *
   * @param {string} userId - the id of the current session user
   * @return {Promise<boolean>} - true if the user needs to retake, false if the user does not
   */
  static async getRetakeStatus(userId: Types.ObjectId | string): Promise<boolean> {
    const session_user = await UserCollection.findOneByUserId(userId);
    const assess_object = await AssessmentModel.findOne({user: session_user});
    return assess_object.retake;
  }

  /**
   * Checks if the user needs to retake the assessment based on time passed
   *
   * @param {string} userId - the id of the current session user
   */
  static async checkTime(userId: Types.ObjectId | string) {
    const session_user = await UserCollection.findOneByUserId(userId);
    const assess_object = await AssessmentModel.findOne({user: session_user});
    const old_date = assess_object.lastAttempt;
    const new_date = new Date();
    const difference = new_date.getTime() - old_date.getTime();
    const msInDay = 24 * 60 * 60 * 1000;
    const days = Math.round(difference / msInDay);

    if (days > 180) { // More than six months
      assess_object.retake = true;
      await assess_object.save();
    }
  }

  /**
   * Deletes the assessment object that is related to the deleted user
   *
   * @param {string} userId - the id of the user that is being deleted
   */
  static async deleteAssessment(userId: Types.ObjectId | string) {
    const deleted_user = await UserCollection.findOneByUserId(userId);
    const deleted = await AssessmentModel.deleteOne({user: deleted_user});
  }

  /**
   * Finds a specific assessment object
   *
   * @param {string} userId - the id of the user
   * @return {Promise<HydratedDocument<Assesment>>} - the assessment object
   */
  static async findOne(userId: Types.ObjectId | string): Promise<HydratedDocument<Assessment>> {
    const session_user = await UserCollection.findOneByUserId(userId);
    const assess_object = await AssessmentModel.findOne({user: session_user});
    return assess_object;
  }
}

export default AssessmentCollection;
