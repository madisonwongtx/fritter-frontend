import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

export type Assessment = {
  _id: Types.ObjectId;
  user: User;
  lastAttempt: Date;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  score: number;
  retake: boolean;
  new: boolean;
};

const AssessmentSchema = new Schema<Assessment>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  lastAttempt: {
    type: Date,
    required: true
  },
  question1: {
    type: String,
    required: false
  },
  question2: {
    type: String,
    required: false
  },
  question3: {
    type: String,
    required: false
  },
  question4: {
    type: String,
    required: false
  },
  question5: {
    type: String,
    required: false
  },
  question6: {
    type: String,
    required: false
  },
  question7: {
    type: String,
    required: false
  },
  question8: {
    type: String,
    required: false
  },
  score: {
    type: Number,
    required: true,
    default: 0
  },
  retake: {
    type: Boolean,
    required: true,
    default: true
  },
  new: {
    type: Boolean,
    required: true,
    default: false
  }
});

const AssessmentModel = model<Assessment>('Assessment', AssessmentSchema);
export default AssessmentModel;
