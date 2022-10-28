import type {HydratedDocument, Types} from 'mongoose';
import type {User} from './model';
import UserModel from './model';
import FilterCollection from '../filter/collection';
import InteractionCollection from '../interactions/collection';
import AssessmentCollection from '../assessment/collection';
import FreetCollection from '../freet/collection';
import type {Freet} from '../freet/model';
import type {Interaction} from '../interactions/model';

/**
 * This file contains a class with functionality to interact with users stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<User> is the output of the UserModel() constructor,
 * and contains all the information in User. https://mongoosejs.com/docs/typescript.html
 */
class UserCollection {
  /**
   * Add a new user
   *
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   * @return {Promise<HydratedDocument<User>>} - The newly created user
   */
  static async addOne(username: string, password: string): Promise<HydratedDocument<User>> {
    const dateJoined = new Date();

    const user = new UserModel({username, password, dateJoined});
    await user.save(); // Saves user to MongoDB
    const filter = await FilterCollection.createFilter(user.id); // Create new filter
    const new_assessment = await AssessmentCollection.createAssessObject(user.id); // Create new assessment object
    return user;
  }

  /**
   * Find a user by userId.
   *
   * @param {string} userId - The userId of the user to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUserId(userId: Types.ObjectId | string): Promise<HydratedDocument<User>> {
    return UserModel.findOne({_id: userId});
  }

  /**
   * Find a user by username (case insensitive).
   *
   * @param {string} username - The username of the user to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUsername(username: string): Promise<HydratedDocument<User>> {
    return UserModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
  }

  /**
   * Find a user by username (case insensitive).
   *
   * @param {string} username - The username of the user to find
   * @param {string} password - The password of the user to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUsernameAndPassword(username: string, password: string): Promise<HydratedDocument<User>> {
    return UserModel.findOne({
      username: new RegExp(`^${username.trim()}$`, 'i'),
      password
    });
  }

  /**
   * Update user's information
   *
   * @param {string} userId - The userId of the user to update
   * @param {Object} userDetails - An object with the user's updated credentials
   * @return {Promise<HydratedDocument<User>>} - The updated user
   */
  static async updateOne(userId: Types.ObjectId | string, userDetails: {password?: string; username?: string}): Promise<HydratedDocument<User>> {
    const user = await UserModel.findOne({_id: userId});
    if (userDetails.password) {
      user.password = userDetails.password;
    }

    if (userDetails.username) {
      user.username = userDetails.username;
    }

    await user.save();
    return user;
  }

  /**
   * Gets all possible users not including the current session user
   *
   * @param {string} userId - the userId of the current session user
   * @return {Promise<Array<HydratedDocument<User>>>} - the list of users
   */
  static async getAllOthers(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<User>>> {
    const users = await UserModel.find();
    const curr_user = await UserModel.findOne({_id: userId});
    const results: Array<HydratedDocument<User>> = [];
    for (const user of users) {
      if (user !== curr_user) {
        results.push(user);
      }
    }

    return results;
  }

  /**
   * Delete a user from the collection.
   *
   * @param {string} userId - The userId of user to delete
   * @return {Promise<Boolean>} - true if the user has been deleted, false otherwise
   */
  static async deleteOne(userId: Types.ObjectId | string): Promise<boolean> {
    const user = await UserModel.deleteOne({_id: userId});
    return user !== null;
  }

  /**
   * Gets the memories for the current session user
   *
   * @param {string} userId - The userId of user to delete
   * @return {Promise<HydratedDocument<Freet | Interaction>>}
   */
  static async findMemories(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Freet | Interaction>>> {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const interactions: Array<HydratedDocument<Interaction>> = await InteractionCollection.interactionsByDate(year, month, day, userId);
    const posts: Array<HydratedDocument<Freet>> = await FreetCollection.freetsByDate(year, month, day, userId);
    const memories: Array<HydratedDocument<Freet | Interaction>> = [];

    if (interactions.length < 5) {
      memories.push(...interactions);
    } else {
      const random_i: number[] = [];
      while (random_i.length < 5) {
        const i = Math.floor(Math.random() * 5);
        if (!random_i.includes(i)) {
          random_i.push(i);
        }
      }

      for (const i of random_i) {
        memories.push(interactions.at(i));
      }
    }

    if (posts.length < 5) {
      memories.push(...posts);
    } else {
      const random_i: number[] = [];
      while (random_i.length <= 5) {
        const i = Math.floor(Math.random() * 5);
        if (!random_i.includes(i)) {
          random_i.push(i);
        }
      }

      for (const i of random_i) {
        memories.push(posts.at(i));
      }
    }

    return memories;
  }
}

export default UserCollection;
