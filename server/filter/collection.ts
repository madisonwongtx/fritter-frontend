import type {HydratedDocument, Types} from 'mongoose';
import UserCollection from '../user/collection';
import type {Filter} from './model';
import FilterModel from './model';

class FilterCollection {
  /**
   * Gets the current status of the filter for the user
   *
   * @return {Promise<boolean>} - True if only posts will be seen and false if interactions and posts will be seen
   */
  static async getStatus(userId: Types.ObjectId | string): Promise<boolean> {
    const session_user = await UserCollection.findOneByUserId(userId);
    const filter = await FilterModel.findOne({user: session_user});
    return filter.status;
  }

  /**
   * Switches the status of the filter for the usser
   *
   * @return {Promise<HydratedDocument<Filter>>} - The updated filter
   */
  static async switchFilter(userId: Types.ObjectId | string): Promise<HydratedDocument<Filter>> {
    const session_user = await UserCollection.findOneByUserId(userId);
    const curr_status = await this.getStatus(userId);
    const user_filter = await FilterModel.findOne({user: session_user});
    if (curr_status) { // Is true, needs to switch to false
      user_filter.status = false;
    } else { // Is false, needs to switch to true
      user_filter.status = true;
    }

    await user_filter.save();
    return user_filter;
  }

  /**
   * Creates the filter object for a new user
   *
   * @return {Promise<HydratedDocument<Filter>>} - The new filter object
   */
  static async createFilter(userId: Types.ObjectId | string): Promise<HydratedDocument<Filter>> {
    const session_user = await UserCollection.findOneByUserId(userId);
    const new_filter = new FilterModel({
      user: session_user,
      status: false
    });

    await new_filter.save();
    return new_filter;
  }

  /**
   * Delete filter associated with the deleted user
   */
  static async deleteOne(userId: Types.ObjectId | string) {
    const session_user = await UserCollection.findOneByUserId(userId);
    const deleted = FilterModel.deleteOne({user: session_user});
  }
}

export default FilterCollection;
