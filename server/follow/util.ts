import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Follow} from '../follow/model';
import type {Freet} from '../freet/model';
import type {Interaction} from '../interactions/model';
import UserCollection from '../user/collection';

type FollowResponse = {
  toFollow: string;
  follower: string;
};

type FeedResponse = {
  author: string;
  content: string;
  interaction: string;
  interaction_by: string;
};

/**
 * Transform a raw Follow object from the database into an object with all the
 * information needed by the frontend
 *
 * @param {HydratedDocument<Follow>} follow - A following relationship
 * @returns {FollowResponse} - The follow object formatted for the front end
 */
const constructFollowResponse = (follow: HydratedDocument<Follow>): FollowResponse => {
  const followCopy: Follow = {
    ...follow.toObject({
      versionKey: false
    })
  };
  return {
    toFollow: followCopy.toFollow.username,
    follower: followCopy.follower.username
  };
};

/**
 * Transform the feed into readable string as well as removing the password for the user
 */
const constructFeedResponse = async (item: HydratedDocument<Interaction | Freet >): Promise<FeedResponse> => {
  if ((typeof item === 'object') && ('freet' in item)) { // Type is interaction
    const user = await UserCollection.findOneByUserId(item.freet.authorId);
    return {
      author: user.username,
      content: item.freet.content,
      interaction: item.interaction,
      interaction_by: item.user.username
    };
  }

  const user = await UserCollection.findOneByUserId(item.authorId);
  return {
    author: user.username,
    content: item.content,
    interaction: '',
    interaction_by: ''
  };
};

export {
  constructFollowResponse,
  constructFeedResponse
};
