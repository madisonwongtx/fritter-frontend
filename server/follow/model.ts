import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type Follow = {
  _id: Types.ObjectId;
  toFollow: User;
  follower: User;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FollowSchema = new Schema<Follow>({
  // The user's username
  toFollow: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  follower: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const FollowModel = model<Follow>('Follow', FollowSchema);
export default FollowModel;

