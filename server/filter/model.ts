import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

export type Filter = {
  _id: Types.ObjectId;
  user: User;
  status: boolean;
};

const FilterSchema = new Schema<Filter>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: Boolean,
    required: true,
    default: false // Auto sets to false
  }
});

const FilterModel = model<Filter>('Filter', FilterSchema);
export default FilterModel;
