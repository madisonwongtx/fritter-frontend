import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../freet/model';

export type Interaction = {
  _id: Types.ObjectId;
  freet: Freet;
  user: User;
  interaction: string;
  dateCreated: Date;
};

const InteractionSchema = new Schema<Interaction>({
  freet: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Freet'
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  interaction: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true
  }
});

const InteractionModel = model<Interaction>('Interaction', InteractionSchema);
export default InteractionModel;
