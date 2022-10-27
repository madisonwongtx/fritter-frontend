import type {HydratedDocument, Types} from 'mongoose';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';
import InteractionCollection from '../interactions/collection';
import FilterCollection from '../filter/collection';
import type {Interaction} from '../interactions/model';
import type {Freet} from '../freet/model';
import type {Follow} from './model';
import FollowModel from './model';

class FollowCollection {
  /**
   * Follow another user
   *
   * @param {string} followingID - the id of the user that the user wants to follow
   * @param {string} followerID - the id of the user
   * @return {Promise<HydratedDocument<Follow>>} - The new following
   */
  static async follow(followingID: Types.ObjectId | string, followerID: Types.ObjectId | string): Promise<HydratedDocument<Follow>> {
    const targetFollow = await UserCollection.findOneByUserId(followingID);
    const user = await UserCollection.findOneByUserId(followerID);
    const new_follow = new FollowModel({
      toFollow: targetFollow,
      follower: user
    });
    await new_follow.save();
    return new_follow;
  }

  /**
   * Unfollow another user
   *
   * @param {string} followingID - the id of the user that the user wants to unfollow
   * @param {string} followerID - the id of the user
   * @return {Promise<Boolean>} - true if the following relationship has been deleted, false otherwise
   */
  static async unfollow(followingID: Types.ObjectId | string, followerID: Types.ObjectId | string): Promise<boolean> {
    const targetUnfollow = await UserCollection.findOneByUserId(followingID);
    const user = await UserCollection.findOneByUserId(followerID);
    const result = await FollowModel.deleteOne({toFollow: targetUnfollow, follower: user});
    return result !== null;
  }

  /**
   * Gets all the users that the user is following in the database
   *
   * @param {string} userId - the id of the user
   * @return {Promise<HydratedDocument<Follow>[]>} - An array of all the users that the user is following
   */
  static async findAllFollowing(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Follow>>> {
    const user = await UserCollection.findOneByUserId(userId); // Finds user object
    return FollowModel.find({follower: user}).populate('toFollow');
  }

  /**
   * Gets all the users that are following the user in the database
   *
   * @param {string} userId - the id of the user
   * @return {Promise<HydratedDocument<Follow>[]>} - An array of all the users that follows the user
   */
  static async findAllFollowers(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Follow>>> {
    const user = await UserCollection.findOneByUserId(userId);
    return FollowModel.find({toFollow: user}).populate('follower');
  }

  /**
   * Gets the following pair
   *
   * @param {string} followingID - the id of the user that the user wants to unfollow
   * @param {string} followerID - the id of the user
   * @return {Promise<HydratedDocument<Follow>[]>} - An array of all the users that hte user is following
   */
  static async findOne(followingID: Types.ObjectId | string, followerID: Types.ObjectId | string): Promise<HydratedDocument<Follow>> | undefined {
    const user = await UserCollection.findOneByUserId(followerID);
    const following = await UserCollection.findOneByUserId(followingID);
    return FollowModel.findOne({toFollow: following, follower: user});
  }

  /**
   * Get feed for the user based off their following
   *
   * @param {string} userId - the userId of user to get the feed for
   * @return {Promise<HydratedDocument<FilterCollection(Freet | Interaction)>[]>} - the resulting feed made of interactions and freets
   */
  static async getFeed(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Freet | Interaction>>> {
    const session_user = await UserCollection.findOneByUserId(userId);
    const filterStatus = await FilterCollection.getStatus(userId);
    const following = await FollowCollection.findAllFollowing(userId);
    const usernames: string[] = [];
    const userIds: Types.ObjectId[] = [];
    for (const user of following) {
      const {username} = user.toFollow;
      const {_id} = user.toFollow;
      usernames.push(username);
      userIds.push(_id);
    }

    const posts_nested = await Promise.all(usernames.map(FreetCollection.findAllByUsername));
    const posts: Array<HydratedDocument<Freet>> = posts_nested.flat(); // Flattens to 1D
    const interactions_nested = await Promise.all(userIds.map(InteractionCollection.getInteractions));
    const interactions: Array<HydratedDocument<Interaction>> = interactions_nested.flat();

    if (filterStatus) { // Just posts
      return posts.sort((a, b) => (a.dateCreated < b.dateCreated) ? -1 : 1);
    }

    const combined: Array<HydratedDocument<Freet | Interaction>> = [...interactions, ...posts];
    return combined.sort((a, b) => (a.dateCreated < b.dateCreated) ? -1 : 1); // Sort in reverse order
  }

  /**
   * Deletes all follower and following relationships with the deleted user
   *
   * @param {string} userId - the id of the current session user
   */
  static async deleteMany(userId: Types.ObjectId | string) {
    const session_user = await UserCollection.findOneByUserId(userId);
    const deleted = FollowModel.deleteMany({toFollow: session_user});
    const deletedFollowing = FollowModel.deleteMany({follower: session_user});
  }
}

export default FollowCollection;
