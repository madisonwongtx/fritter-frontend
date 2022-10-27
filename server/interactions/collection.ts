import type {HydratedDocument, Types} from 'mongoose';
import type {Interaction} from './model';
import InteractionModel from './model';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';

class InteractionCollection {
  /**
   * Get all interactions for a user sorted by date of interaction
   *
   * @param {string} userId - the current session user's id
   * @return {Promise<HydratedDocument<Interaction>[]>} - An array of all interactions
   */
  static async getInteractions(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Interaction>>> {
    const session_user = await UserCollection.findOneByUserId(userId);
    const interactions = await InteractionModel.find({user: session_user}).sort({dateCreated: -1}).populate('freet').populate('user');
    return interactions;
  }

  /**
   * Adds an interaction to the post
   *
   * @param {string} interactionType - the type of interaction
   * @param {string} freetId - the id of the freet to add the interaction to
   * @param {string} userId - the id of the current session user
   * @return {Promise<HydratedDocument<Interaction>>} - the newly created interaction
   */
  static async addInteraction(interactionType: string, freetId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<HydratedDocument<Interaction>> {
    const session_user = await UserCollection.findOneByUserId(userId);
    console.log('inside collection');
    const curr_freet = await FreetCollection.findOne(freetId);
    const curr_date = new Date();
    const new_interaction = new InteractionModel({
      freet: curr_freet,
      user: session_user,
      interaction: interactionType,
      dateCreated: curr_date
    });
    await new_interaction.save();
    return new_interaction;
  }

  /**
   * Updates an interaction to the post
   *
   * @param {string} new_interaction - the new interaction
   * @param {string} userId - the id of the freed to update the interaction
   * @param {string} freetId - the id of the freet to add the interaction to
   * @return {Promise<HydratedDocument<Interaction>>} - the updated interaction
   */
  static async changeInteraction(new_interaction: string, freetId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<HydratedDocument<Interaction>> {
    const session_user = await UserCollection.findOneByUserId(userId);
    const curr_freet = await FreetCollection.findOne(freetId);
    const new_date = new Date();
    const change_interaction = await InteractionModel.findOne({freet: curr_freet, user: session_user}); // Should only be one interaction by user per freet
    change_interaction.dateCreated = new_date;
    change_interaction.interaction = new_interaction;
    await change_interaction.save();

    return change_interaction;
  }

  /**
   * Removes an interaction from a post
   *
   * @param {string} freetId - the id of the freet to add the interaction to
   * @param {string} userId - the id of the current session user
   * @return {Promise<Boolean>} - true if the interaction has been deleted, false otherwise
   */
  static async deleteInteraction(freetId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<boolean> {
    const session_user = await UserCollection.findOneByUserId(userId);
    const curr_freet = await FreetCollection.findOne(freetId);
    const deleted = await InteractionModel.deleteOne({freet: curr_freet, user: session_user});
    return deleted !== null;
  }

  /**
   * Find one interaction by user and freet id
   * @param {string} userId - the id of the user on the interaction to find
   * @param {string} freetId - the id of the freed on the interaction to find
   * @return {Promise<HydratedDocument<Interaction>>} - the interaction
   */
  static async findOne(userId: Types.ObjectId | string, freetId: Types.ObjectId | string): Promise<HydratedDocument<Interaction>> | undefined {
    const session_user = await UserCollection.findOneByUserId(userId);
    const curr_freet = await FreetCollection.findOne(freetId);
    const interaction = await InteractionModel.findOne({freet: curr_freet, user: session_user});
    return interaction;
  }

  /**
   * Get interactions by the current session user on a particular date
   *
   * @param {number} month - The target month
   * @param {number} day - The target day
   * @param {year} year - The current year
   * @param {string} userId - the id of the current session user
   * @return {Promise<HydratedDocument<Interaction>[]>} - a list of posts made by the user on that date
   */
  static async interactionsByDate(year: number, month: number, day: number, userId: string | Types.ObjectId): Promise<Array<HydratedDocument<Interaction>>> {
    const session_user = await UserCollection.findOneByUserId(userId);
    const allInteractions = await this.getInteractions(userId);
    const interactions: Array<HydratedDocument<Interaction>> = [];
    for (const curr_interaction of allInteractions) {
      const {dateCreated} = curr_interaction;
      const interactionMonth = dateCreated.getMonth();
      const interactionDay = dateCreated.getDate();
      const interactionYear = dateCreated.getFullYear();

      if (interactionDay === day && interactionMonth === month && interactionYear !== year) {
        interactions.push(curr_interaction);
      }
    }

    return interactions;
  }

  /**
   * Deletes all interactions associated with the user
   *
   * @param {string} userId - the id of the current session user
   */
  static async deleteMany(userId: Types.ObjectId | string) {
    const session_user = await UserCollection.findOneByUserId(userId);
    const deleted = InteractionModel.deleteMany({user: session_user});
  }
}

export default InteractionCollection;
